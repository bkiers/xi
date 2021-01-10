import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsObject, IsString } from 'class-validator';
import { Piece } from '../model/piece';
import { PieceRead } from './piece.read';

export class SquareRead {
  @ApiProperty()
  @IsNumber()
  readonly rowIndex: number;

  @ApiProperty()
  @IsNumber()
  readonly columnIndex: number;

  @ApiProperty()
  @IsObject()
  readonly piece: PieceRead | null;

  constructor(
    rowIndex: number,
    columnIndex: number,
    piece: Piece | null = null,
  ) {
    this.rowIndex = rowIndex;
    this.columnIndex = columnIndex;
    this.piece = piece === null ? null : new PieceRead(piece);
  }
}
