import { Color } from './color';
import { Piece } from './piece';
import { Square } from './square';
import { Board } from './board';
import { Direction } from './direction';

export class Cannon extends Piece {
  constructor(color: Color) {
    super(color);
  }

  label(): string {
    return this.color === Color.Red ? 'C' : 'c';
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

  // [x, x, x, S, x, x, s]
  private appendTo(squares: Square[], newSquares: Square[]): void {
    let hasJumped = false;

    for (const square of newSquares) {
      if (squares === null) {
        break;
      }

      if (!hasJumped) {
        if (square.isOccupied()) {
          hasJumped = true;
        } else {
          squares.push(square);
        }
      } else if (hasJumped && square.isOccupied()) {
        if (!square.isOccupiedBy(this.color)) {
          squares.push(square);
        }
        break;
      }
    }
  }
}
