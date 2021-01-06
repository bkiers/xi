import { Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { Color } from '../model/color';

@Table
export class GameCreate {
  @ApiProperty()
  @IsNumber()
  opponentPlayerId: number;

  @ApiProperty()
  @IsString()
  ownColor: Color;

  @ApiProperty()
  @IsNumber()
  secondsPerMove: number;
}
