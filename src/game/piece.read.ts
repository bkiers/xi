import { Piece } from '../model/piece';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PieceRead {
  @ApiProperty()
  @IsString()
  readonly label: string;

  @ApiProperty()
  @IsString()
  readonly color: string;

  constructor(piece: Piece) {
    this.label = piece.label();
    this.color = piece.color;
  }
}
