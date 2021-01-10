import { Piece } from './piece';
import { Color } from './color';

export class Square {
  rowIndex: number;
  columnIndex: number;
  piece: Piece | null;

  constructor(
    rowIndex: number,
    columnIndex: number,
    piece: Piece | null = null,
  ) {
    this.rowIndex = rowIndex;
    this.columnIndex = columnIndex;
    this.piece = piece;
  }

  isOccupied(): boolean {
    return this.piece !== null;
  }

  isOccupiedBy(color: Color): boolean {
    return this.isOccupied() && this.piece.color === color;
  }

  isOnOwnSide(color: Color): boolean {
    if (color === Color.Red) {
      return this.rowIndex >= 5;
    }

    return this.rowIndex <= 4;
  }

  isInOwnPalace(color: Color): boolean {
    if (this.columnIndex < 3 || this.columnIndex > 5) {
      return false;
    }

    if (color === Color.Red) {
      return this.rowIndex >= 7;
    }

    return this.rowIndex <= 2;
  }

  toString(): string {
    return `(${this.rowIndex}, ${this.columnIndex})`;
  }
}
