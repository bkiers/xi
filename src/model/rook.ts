import { Color } from './color';
import { Piece } from './piece';
import { Square } from './square';
import { Board } from './board';
import { Direction } from './direction';

export class Rook extends Piece {
  constructor(color: Color) {
    super(color);
  }

  label(): string {
    return this.color === Color.Red ? 'R' : 'r';
  }

  eyeingSquares(current: Square, board: Board): Square[] {
    const squares: Square[] = [];

    this.appendTo(
      squares,
      super.squares(current, board, Array(9).fill(Direction.N)),
    );

    this.appendTo(
      squares,
      super.squares(current, board, Array(8).fill(Direction.E)),
    );

    this.appendTo(
      squares,
      super.squares(current, board, Array(9).fill(Direction.S)),
    );

    this.appendTo(
      squares,
      super.squares(current, board, Array(8).fill(Direction.W)),
    );

    return squares;
  }

  private appendTo(squares: Square[], newSquares: Square[]): void {
    for (const square of newSquares) {
      if (squares === null || square.isOccupiedBy(this.color)) {
        break;
      }

      squares.push(square);

      if (square.isOccupied()) {
        break;
      }
    }
  }
}
