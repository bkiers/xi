import { Square } from './square';
import { Piece } from './piece';

export class Move {
  readonly from: Square;
  readonly to: Square;
  readonly captured: Piece | null;

  constructor(from: Square, to: Square, captured: Piece | null = null) {
    this.from = from;
    this.to = to;
    this.captured = captured;
  }
}
