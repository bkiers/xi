import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Index,
  Model,
} from 'sequelize-typescript';
import { GameEntity } from '../game/game.entity';

export class NotificationEntity extends Model<NotificationEntity> {
  @AllowNull(false)
  @Index('hoursLeft-numberOfMoves-gameId')
  @Column
  hoursLeft: number;

  @AllowNull(false)
  @Index('hoursLeft-numberOfMoves-gameId')
  @Column
  numberOfMoves: number;

  @ForeignKey(() => GameEntity)
  @AllowNull(false)
  @Index('hoursLeft-numberOfMoves-gameId')
  @Column
  gameId: number;

  @BelongsTo(() => GameEntity)
  game: GameEntity;

  @AllowNull(false)
  @Column
  sentToEmail: string;

  @CreatedAt
  createdAt: Date;
}
