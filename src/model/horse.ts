import { Color } from './color';
import { Piece } from './piece';
import { Square } from './square';
import { Board } from './board';
import { Direction } from './direction';

export class Horse extends Piece {
  constructor(color: Color) {
    super(color);
  }

  eyeingSquares(current: Square, board: Board): Square[] {
    const squares: Square[] = [];
    const jumps: Square[][] = [];

    jumps.push(super.squares(current, board, [Direction.N, Direction.NE]));
    jumps.push(super.squares(current, board, [Direction.E, Direction.NE]));
    jumps.push(super.squares(current, board, [Direction.E, Direction.SE]));
    jumps.push(super.squares(current, board, [Direction.S, Direction.SE]));
    jumps.push(super.squares(current, board, [Direction.S, Direction.SW]));
    jumps.push(super.squares(current, board, [Direction.W, Direction.SW]));
    jumps.push(super.squares(current, board, [Direction.W, Direction.NW]));
    jumps.push(super.squares(current, board, [Direction.N, Direction.NW]));

    for (const jump of jumps) {
      if (jump.length === 2 && jump[0] != null && !jump[0].isOccupied()) {
        squares.push(jump[1]);
      }
    }

    return squares.filter((s) => s !== null && !s.isOccupiedBy(this.color));
  }
}
