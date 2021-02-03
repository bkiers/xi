import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GameEntity } from '../game/game.entity';
import { NotificationEntity } from '../entity/notification.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async checkClockTimes() {
    try {
      const unfinishedGames = await GameEntity.findAll({
        where: {
          winnerPlayerId: null,
          acceptedDrawPlayerId: null,
          accepted: true,
        },
        include: [{ all: true }],
      });

      for (const game of unfinishedGames) {
        const hoursLeft =
          (game.clockRunsOutAt.getTime() - new Date().getTime()) /
          (1000 * 60 * 60);

        if (hoursLeft < 0) {
          this.logger.log(
            `GAME[${game.id}] :: Time is up, ${game.turnPlayer.name} lost`,
          );

          const otherPlayer =
            game.turnPlayerId === game.redPlayerId
              ? game.blackPlayer
              : game.redPlayer;

          await game.setWinner(otherPlayer.id);

          this.eventEmitter.emit('clock.ran.out', game);
        } else if (hoursLeft < 12) {
          const notification = await NotificationEntity.findOne({
            where: {
              gameId: game.id,
              hoursLeft: 12,
              numberOfMoves: game.moves.length,
            },
            include: [{ all: true }],
          });

          if (notification !== null) {
            this.logger.log(`GAME[${game.id}] :: Already sent a notification`);
            return;
          }

          this.logger.log(
            `GAME[${game.id}] :: Only ${hoursLeft} hours left, notify user!`,
          );

          this.eventEmitter.emit('clock.almost.up', game);

          await NotificationEntity.create({
            hoursLeft: 12,
            numberOfMoves: game.moves.length,
            gameId: game.id,
            sentToEmail: game.turnPlayer.email,
          });
        } else {
          this.logger.log(`GAME[${game.id}] :: Still ${hoursLeft} hours left`);
        }
      }
    } catch (e) {
      this.logger.error(`Something went wrong: ${e}`);
    }
  }
}
