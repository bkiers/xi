import { Color } from './color';
import { Piece } from './piece';
import { Square } from './square';
import { Board } from './board';
import { Direction } from './direction';

export class Adviser extends Piece {
  constructor(color: Color) {
    super(color);
  }

  eyeingSquares(current: Square, board: Board): Square[] {
    let squares: Square[] = [];

    squares = squares.concat(super.squares(current, board, [Direction.NE]));
    squares = squares.concat(super.squares(current, board, [Direction.SE]));
    squares = squares.concat(super.squares(current, board, [Direction.SW]));
    squares = squares.concat(super.squares(current, board, [Direction.NW]));

    return squares.filter(
      (s) =>
        s !== null &&
        !s.isOccupiedBy(this.color) &&
        s.isInOwnPalace(this.color),
    );
  }
}
