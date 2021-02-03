import {
  AllowNull,
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserEntity } from '../user/user.entity';
import { GameEntity } from './game.entity';

@Table
export class DrawProposalEntity extends Model<DrawProposalEntity> {
  @ForeignKey(() => GameEntity)
  @AllowNull(false)
  @Column
  gameId: number;

  @BelongsTo(() => GameEntity, 'gameId')
  game: GameEntity;

  @AllowNull(false)
  @Column
  moveNumber: number;

  @ForeignKey(() => UserEntity)
  @AllowNull(false)
  @Column
  proposalSentByUserId: number;

  @BelongsTo(() => UserEntity, 'proposalSentByUserId')
  proposalSentByUser: UserEntity;

  @ForeignKey(() => UserEntity)
  @AllowNull(false)
  @Column
  proposalAcceptByUserId: number;

  @BelongsTo(() => UserEntity, 'proposalAcceptByUserId')
  proposalAcceptByUser: UserEntity;

  @Column
  accepted: boolean;
}
