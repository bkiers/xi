import { ApiProperty } from '@nestjs/swagger';
import { IsObject } from 'class-validator';
import { SquareRead } from './square.read';

export class MoveRead {
  @ApiProperty()
  @IsObject()
  readonly from: SquareRead;

  @ApiProperty()
  @IsObject()
  readonly to: SquareRead;

  constructor(from: SquareRead, to: SquareRead) {
    this.from = from;
    this.to = to;
  }
}
