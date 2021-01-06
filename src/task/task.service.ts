import { Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { GameEntity } from '../game/game.entity';

export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  @Cron('* * * * *')
  async handleCron() {
    const unfinishedGames = await GameEntity.findAll({
      where: { winnerPlayerId: null },
    });

    for (const game of unfinishedGames) {
      const hoursLeft =
        (game.clockRunsOutAt.getTime() - new Date().getTime()) /
        (1000 * 60 * 60);

      if (hoursLeft < 0) {
        this.logger.log('Time is up, user lost');
        // TODO lost game
      } else if (hoursLeft < 12) {
        // TODO email (if not done already)
      }
    }
  }
}
