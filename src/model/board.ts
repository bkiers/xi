import { Square } from './square';
import { Piece } from './piece';
import { Color } from './color';
import { Soldier } from './soldier';
import { Cannon } from './cannon';
import { Rook } from './rook';
import { Horse } from './horse';
import { Elephant } from './elephant';
import { Adviser } from './adviser';
import { General } from './general';

const startState = `
      1 2 3 4 5 6 7 8 9
    +-------------------+
  1 | r h e a g a e h r | 10
  2 | . . . . . . . . . | 9
  3 | . c . . . . . c . | 8
  4 | s . s . s . s . s | 7
  5 | . . . . . . . . . | 6
  6 | . . . . . . . . . | 5
  7 | S . S . S . S . S | 4
  8 | . C . . . . . C . | 3 
  9 | . . . . . . . . . | 2
 10 | R H E A G A E H R | 1
    +-------------------+
      9 8 7 6 5 4 3 2 1
`;

export class Board {
  private readonly squares: Square[][];

  constructor(state: string = startState) {
    this.squares = [];

    const cleanedState = state.replace(/[^rheagcs.]/gi, '');
    const rows = cleanedState.match(/.{9}/g);

    rows.map((rowState, rowIndex) => {
      this.squares.push([]);

      Array.from(rowState).map((char, columnIndex) => {
        const piece = Board.parse(char);
        const square = new Square(columnIndex, rowIndex, piece);

        this.squares[rowIndex].push(square);
      });
    });
  }

  move(
    fromRowIndex: number,
    fromColumnIndex: number,
    toRowIndex: number,
    toColumnIndex: number,
  ): Piece | null {
    const fromSquare = this.squareIndex(fromRowIndex, fromColumnIndex);
    const toSquare = this.squareIndex(toRowIndex, toColumnIndex);

    if (!fromSquare.isOccupied()) {
      throw new Error(`Square ${fromSquare} is not occupied`);
    }

    if (toSquare.isOccupiedBy(fromSquare.piece.color)) {
      throw new Error(`Square ${toSquare} is occupied by the same color`);
    }

    const colorMoved = fromSquare.piece.color;
    const capturedPiece = toSquare.piece;

    toSquare.piece = fromSquare.piece;
    fromSquare.piece = null;

    // TODO checks

    return capturedPiece;
  }

  findGeneral(color: Color): Square {
    return this.findFirst(color, General.name);
  }

  findFirst(color: Color, className: string): Square {
    for (const row of this.squares) {
      for (const square of row) {
        if (
          square.isOccupiedBy(color) &&
          square.piece.constructor.name === className
        ) {
          return square;
        }
      }
    }

    throw new Error(`Could not find a ${color} ${className}`);
  }

  square(rank: number, file: number, color: Color): Square {
    if (rank < 1 || rank > 10 || file < 1 || file > 9) {
      throw new Error(`Invalid (rank, file): (${rank}, ${file})`);
    }

    const rowIndex = color == Color.Black ? rank - 1 : 10 - rank;
    const columnIndex = color == Color.Black ? file - 1 : 9 - file;

    return this.squareIndex(rowIndex, columnIndex);
  }

  squareIndex(
    rowIndex: number,
    columnIndex: number,
    returnNull = false,
  ): Square {
    if (rowIndex < 0 || rowIndex > 9 || columnIndex < 0 || columnIndex > 8) {
      if (returnNull) {
        return null;
      }

      throw new Error(
        `Invalid (rowIndex, columnIndex): (${rowIndex}, ${columnIndex})`,
      );
    }

    return this.squares[rowIndex][columnIndex];
  }

  private static parse(label: string): Piece | null {
    const color = label.toUpperCase() == label ? Color.Red : Color.Black;

    switch (label.toUpperCase()) {
      case 'S':
        return new Soldier(color);
      case 'C':
        return new Cannon(color);
      case 'R':
        return new Rook(color);
      case 'H':
        return new Horse(color);
      case 'E':
        return new Elephant(color);
      case 'A':
        return new Adviser(color);
      case 'G':
        return new General(color);
      case '.':
        return null;
      default:
        throw new Error(`Unknown piece: '${label}'`);
    }
  }
}
