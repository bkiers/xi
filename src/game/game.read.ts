import { Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsObject } from 'class-validator';
import { GameEntity } from './game.entity';
import { UserRead } from '../user/user.read';
import { MoveRead } from './move.read';
import { SquareRead } from './square.read';
import { Board } from '../model/board';
import { Color } from '../model/color';

@Table
export class GameRead {
  @ApiProperty()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @IsObject()
  readonly redPlayer: UserRead;

  @ApiProperty()
  @IsObject()
  readonly blackPlayer: UserRead;

  @ApiProperty()
  @IsObject()
  readonly initiatedPlayer: UserRead;

  @ApiProperty()
  @IsObject()
  readonly invitedPlayer: UserRead;

  @ApiProperty()
  @IsObject()
  readonly turnPlayer: UserRead;

  @ApiProperty()
  @IsObject()
  readonly winnerPlayer: UserRead | null;

  @ApiProperty()
  @IsObject()
  readonly loggedInPlayer: UserRead;

  @ApiProperty()
  @IsNumber()
  readonly secondsPerMove: number;

  @ApiProperty()
  @IsDate()
  readonly clockRunsOutAt: Date;

  @ApiProperty()
  @IsBoolean()
  readonly accepted: boolean;

  @ApiProperty()
  @IsObject()
  readonly moves: MoveRead[];

  @ApiProperty()
  @IsBoolean()
  readonly gameOver: boolean;

  @ApiProperty()
  @IsBoolean()
  readonly reversed: boolean;

  @ApiProperty()
  @IsBoolean()
  readonly turnPlayerIsCheck: boolean;

  @ApiProperty()
  @IsObject()
  readonly currentState: SquareRead[][];

  constructor(entity: GameEntity, forUserId: number) {
    this.id = entity.id;
    this.redPlayer = new UserRead(entity.redPlayer);
    this.blackPlayer = new UserRead(entity.blackPlayer);
    this.initiatedPlayer = new UserRead(entity.initiatedPlayer);
    this.invitedPlayer = new UserRead(entity.invitedPlayer);
    this.turnPlayer = new UserRead(entity.turnPlayer);
    this.winnerPlayer =
      entity.winnerPlayer === null ? null : new UserRead(entity.winnerPlayer);
    this.loggedInPlayer = GameRead.getLoggedInPlayer(entity, forUserId);
    this.secondsPerMove = entity.secondsPerMove;
    this.clockRunsOutAt = entity.clockRunsOutAt;
    this.accepted = entity.accepted;
    this.moves = entity.moves.map(
      (m) =>
        new MoveRead(
          new SquareRead(m.fromRowIndex, m.fromColumnIndex),
          new SquareRead(m.toRowIndex, m.toColumnIndex),
        ),
    );
    this.gameOver = entity.winnerPlayer !== null;
    this.turnPlayerIsCheck = GameRead.isCheck(entity);
    this.reversed = forUserId === entity.blackPlayerId;
    this.currentState = GameRead.getCurrentState(entity, this.reversed);
  }

  private static getCurrentState(
    entity: GameEntity,
    reversed: boolean,
  ): SquareRead[][] {
    const board = GameRead.getBoard(entity);

    return board.state(reversed);
  }

  private static isCheck(entity: GameEntity): boolean {
    const board = GameRead.getBoard(entity);
    const color =
      entity.turnPlayerId === entity.redPlayerId ? Color.Red : Color.Black;

    return board.isCheck(color);
  }

  private static getBoard(entity: GameEntity): Board {
    const board = new Board();

    for (const move of entity.moves) {
      board.move(
        move.fromRowIndex,
        move.fromColumnIndex,
        move.toRowIndex,
        move.toColumnIndex,
      );
    }

    return board;
  }

  private static getLoggedInPlayer(
    entity: GameEntity,
    userId: number,
  ): UserRead | null {
    const user =
      userId === entity.redPlayerId ? entity.redPlayer : entity.blackPlayer;

    return new UserRead(user);
  }
}
