import { Color } from './color';
import { Square } from './square';
import { Board } from './board';
import { Direction } from './direction';

export abstract class Piece {
  readonly color: Color;

  protected constructor(color: Color) {
    this.color = color;
  }

  abstract eyeingSquares(current: Square, board: Board): Square[];

  protected squares(
    current: Square,
    board: Board,
    directions: Direction[],
  ): Square[] {
    const squares: Square[] = [];
    let pointer = current;

    for (const direction of directions) {
      const [deltaRow, deltaColumn] = this.deltas(direction);

      pointer = board.squareIndex(
        pointer.rowIndex + deltaRow,
        pointer.columnIndex + deltaColumn,
        true,
      );

      if (pointer === null) {
        break;
      }

      squares.push(pointer);
    }

    return squares;
  }

  private deltas(direction: Direction): [number, number] {
    const isRed = this.color === Color.Red;

    switch (direction) {
      case Direction.N:
        return isRed ? [-1, 0] : [1, 0];
      case Direction.NE:
        return isRed ? [-1, 1] : [1, -1];
      case Direction.E:
        return isRed ? [0, 1] : [0, -1];
      case Direction.SE:
        return isRed ? [1, 1] : [-1, -1];
      case Direction.S:
        return isRed ? [1, 0] : [-1, 0];
      case Direction.SW:
        return isRed ? [1, -1] : [-1, 1];
      case Direction.W:
        return isRed ? [0, -1] : [0, 1];
      default:
        return isRed ? [-1, -1] : [1, 1];
    }
  }
}
