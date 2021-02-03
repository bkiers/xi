import { Color } from './color';
import { Piece } from './piece';
import { Square } from './square';
import { Board } from './board';
import { Direction } from './direction';

export class Soldier extends Piece {
  constructor(color: Color) {
    super(color);
  }

  label(): string {
    return this.color === Color.Red ? 'S' : 's';
  }

  eyeingSquares(current: Square, board: Board): Square[] {
    let squares: Square[] = [];

    squares = squares.concat(super.squares(current, board, [Direction.N]));

    if (!current.isOnOwnSide(this.color)) {
      // When on the enemy side, append squares left- and right of the current square
      squares = squares.concat(super.squares(current, board, [Direction.E]));
      squares = squares.concat(super.squares(current, board, [Direction.W]));
    }

    return squares.filter((s) => s !== null && !s.isOccupiedBy(this.color));
  }
}
