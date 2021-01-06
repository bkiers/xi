import { Injectable } from '@nestjs/common';
import { GameCreate } from './game.create';
import { GameEntity } from './game.entity';
import { Color } from '../model/color';

@Injectable()
export class GameService {
  async findById(id: number): Promise<GameEntity | null> {
    return GameEntity.findByPk(id, { include: [{ all: true }] });
  }

  async findAll(): Promise<GameEntity[]> {
    return GameEntity.findAll({ include: [{ all: true }] });
  }

  async create(
    loggedInUserId: number,
    gameCreate: GameCreate,
  ): Promise<GameEntity> {
    const [redPlayerId, blackPlayerId] =
      gameCreate.ownColor == Color.Red
        ? [loggedInUserId, gameCreate.opponentPlayerId]
        : [gameCreate.opponentPlayerId, loggedInUserId];

    const gameEntity = new GameEntity({
      initiatedPlayerId: loggedInUserId,
      invitedPlayerId: gameCreate.opponentPlayerId,
      turnPlayerId: redPlayerId,
      redPlayerId: redPlayerId,
      blackPlayerId: blackPlayerId,
      accepted: false,
      secondsPerMove: gameCreate.secondsPerMove,
      acceptanceCode: Math.random().toString(36).substring(32),
    });

    return gameEntity.save();
  }

  async delete(loggedInUserId: number, id: number) {
    const entity = await this.findById(id);

    if (entity === null || entity.initiatedPlayerId !== loggedInUserId) {
      throw new Error(`You can only delete a game you started yourself`);
    }

    if (entity.moves.length > 0) {
      throw new Error(`You cannot delete a game that has already started`);
    }

    entity.destroy();
  }
}
