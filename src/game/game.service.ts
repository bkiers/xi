import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GameCreate } from './game.create';
import { GameEntity } from './game.entity';
import { Color } from '../model/color';
import { Board } from '../model/board';
import { MoveEntity } from './move.entity';

@Injectable()
export class GameService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

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

    const entity = await GameEntity.create({
      initiatedPlayerId: loggedInUserId,
      invitedPlayerId: gameCreate.opponentPlayerId,
      turnPlayerId: redPlayerId,
      redPlayerId: redPlayerId,
      blackPlayerId: blackPlayerId,
      accepted: false,
      secondsPerMove: gameCreate.secondsPerMove,
    });

    await entity.reload({ include: [{ all: true }] });

    this.eventEmitter.emit('game.created', entity);

    return entity;
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

  async accept(gameId: number, userId: number): Promise<GameEntity> {
    const entity = await this.findById(gameId);

    if (entity === null) {
      throw new Error(`No game found with id ${gameId}`);
    }

    if (entity.accepted) {
      throw new Error(`Game with id ${gameId} is already accepted`);
    }

    if (entity.invitedPlayerId !== userId) {
      throw new Error(`Only ${entity.invitedPlayer.name} can accept this game`);
    }

    entity.accepted = true;
    entity.clockRunsOutAt = new Date(
      new Date().getTime() + entity.secondsPerMove * 1000,
    );

    entity.save();

    this.eventEmitter.emit('game.accepted', entity);

    return entity;
  }

  async move(
    gameId: number,
    userId: number,
    fromColumnIndex: number,
    fromRowIndex: number,
    toColumnIndex: number,
    toRowIndex: number,
  ): Promise<GameEntity> {
    const gameEntity = await this.findById(gameId);

    if (gameEntity === null) {
      throw new Error(`No such game with id ${gameId}`);
    }

    if (gameEntity.winnerPlayerId !== null) {
      throw new Error('This game is already over');
    }

    if (gameEntity.turnPlayerId !== userId) {
      throw new Error(`It's ${gameEntity.turnPlayer.name}'s turn`);
    }

    const board = new Board();

    // First make all moves that have previously been made
    for (const move of gameEntity.moves) {
      board.move(
        move.fromRowIndex,
        move.fromColumnIndex,
        move.toRowIndex,
        move.toColumnIndex,
      );
    }

    const turnColor = gameEntity.turnColor();
    const opponentColor = turnColor === Color.Red ? Color.Black : Color.Red;
    const fromSquare = board.squareIndex(fromRowIndex, fromColumnIndex, true);

    if (fromSquare === null) {
      throw new Error(`That's an unoccupied square`);
    }

    if (fromSquare.isOccupiedBy(opponentColor)) {
      throw new Error(`It's ${turnColor}'s turn`);
    }

    // This will throw an error if the move is invalid
    board.move(fromRowIndex, fromColumnIndex, toRowIndex, toColumnIndex);

    await MoveEntity.create({
      gameId: gameEntity.id,
      fromRowIndex: fromRowIndex,
      fromColumnIndex: fromColumnIndex,
      toRowIndex: toRowIndex,
      toColumnIndex: toColumnIndex,
    });

    await gameEntity.switchTurn();

    if (
      board.isCheckmate(opponentColor) ||
      !board.hasPossibleMoves(opponentColor)
    ) {
      await gameEntity.setWinner(userId);
    }

    if (gameEntity.isGameOver()) {
      this.eventEmitter.emit('game.over', gameEntity);
    } else {
      this.eventEmitter.emit('move.created', gameEntity);
    }

    return gameEntity;
  }
}
