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
import { Move } from './move';
import { SquareRead } from '../game/square.read';

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
        const square = new Square(rowIndex, columnIndex, piece);

        this.squares[rowIndex].push(square);
      });
    });
  }

  generalsEyeing(): boolean {
    const redCell = this.findGeneral(Color.Red);
    const blackCell = this.findGeneral(Color.Black);

    if (blackCell.columnIndex !== redCell.columnIndex) {
      return false;
    }

    for (let r = blackCell.rowIndex + 1; r < redCell.rowIndex; r++) {
      if (this.squareIndex(r, blackCell.columnIndex).isOccupied()) {
        return false;
      }
    }

    return true;
  }

  getSquaresOccupiedBy(color: Color): Square[] {
    return [].concat(...this.squares).filter((s) => s.isOccupiedBy(color));
  }

  getSquaresAttackedBy(color: Color): Square[] {
    let attacking = [];
    const occupiedSquares = this.getSquaresOccupiedBy(color);

    for (const square of occupiedSquares) {
      attacking = attacking.concat(square.piece.eyeingSquares(square, this));
    }

    return attacking;
  }

  isCheckmate(color: Color): boolean {
    return !this.hasPossibleMoves(color) && this.isCheck(color);
  }

  isCheck(color: Color): boolean {
    const generalCell = this.findGeneral(color);
    const otherColor = color === Color.Black ? Color.Red : Color.Black;
    const otherSquaresAttacked = this.getSquaresAttackedBy(otherColor);

    return otherSquaresAttacked.indexOf(generalCell) > -1;
  }

  hasPossibleMoves(color: Color): boolean {
    return this.possibleMoves(color).length > 0;
  }

  possibleMoves(color: Color): Move[] {
    const moves = [];
    const occupiedSquares = this.getSquaresOccupiedBy(color);

    for (const from of occupiedSquares) {
      const attacking = from.piece.eyeingSquares(from, this);

      for (const to of attacking) {
        try {
          // move(...) will throw an error if it was invalid
          this.move(
            from.rowIndex,
            from.columnIndex,
            to.rowIndex,
            to.columnIndex,
            true,
          );

          moves.push(new Move(from, to));
        } catch {
          // Ignore this
        }
      }
    }

    return moves;
  }

  move(
    fromRowIndex: number,
    fromColumnIndex: number,
    toRowIndex: number,
    toColumnIndex: number,
    undoMove = false,
  ): Move {
    const fromSquare = this.squareIndex(fromRowIndex, fromColumnIndex);
    const toSquare = this.squareIndex(toRowIndex, toColumnIndex);

    if (!fromSquare.isOccupied()) {
      throw new Error(`Square ${fromSquare} is not occupied`);
    }

    if (toSquare.isOccupiedBy(fromSquare.piece.color)) {
      throw new Error(`Square ${toSquare} is occupied by the same color`);
    }

    const eyeingSquares = fromSquare.piece.eyeingSquares(fromSquare, this);

    if (eyeingSquares.indexOf(toSquare) < 0) {
      throw new Error('Cannot move there');
    }

    const colorMoved = fromSquare.piece.color;
    const capturedPiece = toSquare.piece;

    toSquare.piece = fromSquare.piece;
    fromSquare.piece = null;

    const undo = (errorMessage: string = null) => {
      fromSquare.piece = toSquare.piece;
      toSquare.piece = capturedPiece;

      if (errorMessage !== null) {
        throw new Error(errorMessage);
      }
    };

    if (this.generalsEyeing()) {
      undo('The generals cannot eye each other');
    }

    if (this.isCheck(colorMoved)) {
      undo(`${colorMoved} is (still) check`);
    }

    if (undoMove) {
      undo();
    }

    return new Move(fromSquare, toSquare, capturedPiece);
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
  ): Square | null {
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

  isOccupied(rowIndex: number, columnIndex: number): boolean {
    const square = this.squareIndex(rowIndex, columnIndex, true);
    return square !== null && square.isOccupied();
  }

  state(reversed: boolean): SquareRead[][] {
    const state = [];

    for (const row of this.squares) {
      const readRow = row.map(
        (s) => new SquareRead(s.rowIndex, s.columnIndex, s.piece, reversed),
      );
      state.push(reversed ? readRow.reverse() : readRow);
    }

    return reversed ? state.reverse() : state;
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
