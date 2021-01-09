import {
  AllowNull,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserEntity } from '../user/user.entity';

@Table
export class ResetPasswordEntity extends Model<ResetPasswordEntity> {
  @ForeignKey(() => UserEntity)
  @AllowNull(false)
  @Column
  userId: number;

  @BelongsTo(() => UserEntity, 'userId')
  user: UserEntity;

  @AllowNull(false)
  @Column
  code: string;

  @AllowNull(false)
  @Column
  expiresAt: Date;

  expired(): boolean {
    return new Date() > this.expiresAt;
  }
}
