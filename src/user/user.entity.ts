import { Column, Index, Model, Table, Unique } from 'sequelize-typescript';

@Table
export class UserEntity extends Model<UserEntity> {
  @Column
  name: string;

  @Column
  @Index({ unique: true })
  email: string;

  @Column
  passwordHash: string;
}
