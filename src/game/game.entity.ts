import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  HasMany,
  Index,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { MoveEntity } from './move.entity';
import { UserEntity } from '../user/user.entity';

@Table
export class GameEntity extends Model<GameEntity> {
  @ForeignKey(() => UserEntity)
  @AllowNull(false)
  @Column
  initiatedPlayerId: number;

  @BelongsTo(() => UserEntity, 'initiatedPlayerId')
  initiatedPlayer: UserEntity;

  @ForeignKey(() => UserEntity)
  @AllowNull(false)
  @Column
  invitedPlayerId: number;

  @BelongsTo(() => UserEntity, 'invitedPlayerId')
  invitedPlayer: UserEntity;

  @ForeignKey(() => UserEntity)
  @AllowNull(false)
  @Column
  turnPlayerId: number;

  @BelongsTo(() => UserEntity, 'turnPlayerId')
  turnPlayer: UserEntity;

  @ForeignKey(() => UserEntity)
  @AllowNull(false)
  @Column
  redPlayerId: number;

  @BelongsTo(() => UserEntity, 'redPlayerId')
  redPlayer: UserEntity;

  @ForeignKey(() => UserEntity)
  @AllowNull(false)
  @Column
  blackPlayerId: number;

  @BelongsTo(() => UserEntity, 'blackPlayerId')
  blackPlayer: UserEntity;

  @AllowNull(false)
  @Index('idx_game_status')
  @Column
  accepted: boolean;

  @ForeignKey(() => UserEntity)
  @Index('idx_game_status')
  @Column
  winnerPlayerId: number | null;

  @BelongsTo(() => UserEntity, 'winnerPlayerId')
  winnerPlayer: UserEntity | null;

  @Column
  eloRatingChange: number | null;

  @AllowNull(false)
  @Column
  secondsPerMove: number;

  @Column
  clockRunsOutAt: Date;

  @HasMany(() => MoveEntity)
  moves: MoveEntity[];

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
