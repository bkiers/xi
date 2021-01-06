import { Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsObject, IsDate } from 'class-validator';
import { GameEntity } from './game.entity';
import { UserRead } from '../user/user.read';
import { MoveRead } from './move.read';
import { SquareRead } from './square.read';

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

  constructor(entity: GameEntity) {
    this.id = entity.id;
    this.redPlayer = new UserRead(entity.redPlayer);
    this.blackPlayer = new UserRead(entity.blackPlayer);
    this.initiatedPlayer = new UserRead(entity.initiatedPlayer);
    this.invitedPlayer = new UserRead(entity.invitedPlayer);
    this.turnPlayer = new UserRead(entity.turnPlayer);
    this.winnerPlayer =
      entity.winnerPlayer === null ? null : new UserRead(entity.winnerPlayer);
    this.secondsPerMove = entity.secondsPerMove;
    this.clockRunsOutAt = entity.clockRunsOutAt;
    this.accepted = entity.accepted;
    this.moves = entity.moves.map(
      (m) =>
        new MoveRead(
          new SquareRead(m.fromColumnIndex, m.fromRowIndex),
          new SquareRead(m.toColumnIndex, m.toRowIndex),
        ),
    );
    this.gameOver = entity.winnerPlayer !== null;
  }
}
