import { Color } from './color';
import { Piece } from './piece';
import { Square } from './square';
import { Board } from './board';
import { Direction } from './direction';

export class General extends Piece {
  constructor(color: Color) {
    super(color);
  }

  label(): string {
    return this.color === Color.Red ? 'G' : 'g';
  }

  eyeingSquares(current: Square, board: Board): Square[] {
    let squares: Square[] = [];

    squares = squares.concat(super.squares(current, board, [Direction.N]));
    squares = squares.concat(super.squares(current, board, [Direction.E]));
    squares = squares.concat(super.squares(current, board, [Direction.S]));
    squares = squares.concat(super.squares(current, board, [Direction.W]));

    return squares.filter(
      (s) =>
        s !== null &&
        !s.isOccupiedBy(this.color) &&
        s.isInOwnPalace(this.color),
    );
  }
}
