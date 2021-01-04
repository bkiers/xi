import { Color } from './color';
import { Piece } from './piece';
import { Square } from './square';
import { Board } from './board';
import { Direction } from './direction';

export class Elephant extends Piece {
  constructor(color: Color) {
    super(color);
  }

  eyeingSquares(current: Square, board: Board): Square[] {
    const squares: Square[] = [];
    const diagonals: Square[][] = [];

    diagonals.push(super.squares(current, board, [Direction.NE, Direction.NE]));
    diagonals.push(super.squares(current, board, [Direction.SE, Direction.SE]));
    diagonals.push(super.squares(current, board, [Direction.SW, Direction.SW]));
    diagonals.push(super.squares(current, board, [Direction.NW, Direction.NW]));

    for (const diagonal of diagonals) {
      if (
        diagonal.length === 2 &&
        diagonal[0] != null &&
        !diagonal[0].isOccupied()
      ) {
        squares.push(diagonal[1]);
      }
    }

    return squares.filter((s) => s !== null && !s.isOccupiedBy(this.color));
  }
}
