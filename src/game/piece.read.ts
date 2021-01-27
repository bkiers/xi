import { Piece } from '../model/piece';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Color } from '../model/color';

export class PieceRead {
  @ApiProperty()
  @IsString()
  readonly label: string;

  @ApiProperty()
  @IsString()
  readonly color: string;

  @ApiProperty()
  @IsString()
  readonly pieceName: string;

  constructor(piece: Piece) {
    this.label = piece.label();
    this.color = piece.color;
    this.pieceName = `${piece.label().toLowerCase()}${
      piece.color === Color.Red ? 'r' : 'b'
    }.svg`;
  }
}
