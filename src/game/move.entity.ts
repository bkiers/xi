import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { GameEntity } from './game.entity';

@Table
export class MoveEntity extends Model<MoveEntity> {
  @AllowNull(false)
  @Column
  fromRowIndex: number;

  @AllowNull(false)
  @Column
  fromColumnIndex: number;

  @AllowNull(false)
  @Column
  toRowIndex: number;

  @AllowNull(false)
  @Column
  toColumnIndex: number;

  @ForeignKey(() => GameEntity)
  @AllowNull(false)
  @Column
  gameId: number;

  @BelongsTo(() => GameEntity)
  game: GameEntity;

  @CreatedAt
  createdAt: Date;
}
