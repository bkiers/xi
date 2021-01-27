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

  @ApiProperty()
  @IsString()
  readonly occupiedBy: string | null;

  @ApiProperty()
  @IsString()
  readonly tileName: string;

  constructor(
    rowIndex: number,
    columnIndex: number,
    piece: Piece | null = null,
    reversed = false,
  ) {
    this.rowIndex = rowIndex;
    this.columnIndex = columnIndex;
    this.piece = piece === null ? null : new PieceRead(piece);
    this.occupiedBy = piece === null ? null : piece.color;
    this.tileName = `${reversed ? 10 - rowIndex : rowIndex + 1}_${
      reversed ? 9 - columnIndex : columnIndex + 1
    }.png`;
  }
}
