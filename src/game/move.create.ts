import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';

export class MoveCreate {
  @ApiProperty()
  @IsNumber()
  fromRowIndex: number;

  @ApiProperty()
  @IsNumber()
  fromColumnIndex: number;

  @ApiProperty()
  @IsNumber()
  toRowIndex: number;

  @ApiProperty()
  @IsNumber()
  toColumnIndex: number;

  constructor(
    fromRowIndex: number,
    fromColumnIndex: number,
    toRowIndex: number,
    toColumnIndex: number,
  ) {
    this.fromRowIndex = fromRowIndex;
    this.fromColumnIndex = fromColumnIndex;
    this.toRowIndex = toRowIndex;
    this.toColumnIndex = toColumnIndex;
  }
}
