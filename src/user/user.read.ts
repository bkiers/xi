import { IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';

export class UserRead {
  @ApiProperty()
  @IsNumber()
  readonly id: number;

  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly email: string;

  @ApiProperty()
  @IsBoolean()
  readonly isAdmin: boolean;

  constructor(entity: UserEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.email = entity.email;
    this.isAdmin = entity.isAdmin;
  }
}
