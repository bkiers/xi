import { Board } from '../../src/model/board';
import { Color } from '../../src/model/color';
import { Rook } from '../../src/model/rook';

describe('Rook', () => {
  describe('eyeingSquares', () => {
    it('returns 2 squares for a start position', () => {
      const board = new Board();

      const square = board.findFirst(Color.Red, Rook.name);
      const squares = square.piece.eyeingSquares(square, board);

      expect(squares.length).toBe(2);
    });

    it('returns 17 square in corner', () => {
      const board = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | . . . . . . . . . | 10
        2 | . . . . . . . . . | 9
        3 | . . . . . . . . . | 8
        4 | . . . . . . . . . | 7
        5 | . . . . . . . . . | 6
        6 | . . . . . . . . . | 5
        7 | . . . . . . . . . | 4
        8 | . . . . . . . . . | 3 
        9 | . . . . . . . . . | 2
       10 | R . . . . . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      const square = board.findFirst(Color.Red, Rook.name);
      const squares = square.piece.eyeingSquares(square, board);

      expect(squares.length).toBe(17);
    });

    it('returns 0 square blocked in corner', () => {
      const board = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | . . . . . . . . . | 10
        2 | . . . . . . . . . | 9
        3 | . . . . . . . . . | 8
        4 | . . . . . . . . . | 7
        5 | . . . . . . . . . | 6
        6 | . . . . . . . . . | 5
        7 | . . . . . . . . . | 4
        8 | . . . . . . . . . | 3 
        9 | C . . . . . . . . | 2
       10 | R C . . . . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      const square = board.findFirst(Color.Red, Rook.name);
      const squares = square.piece.eyeingSquares(square, board);

      expect(squares.length).toBe(0);
    });

    it('returns 2 square blocked in corner by enemies', () => {
      const board = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | . . . . . . . . . | 10
        2 | . . . . . . . . . | 9
        3 | . . . . . . . . . | 8
        4 | . . . . . . . . . | 7
        5 | . . . . . . . . . | 6
        6 | . . . . . . . . . | 5
        7 | . . . . . . . . . | 4
        8 | . . . . . . . . . | 3 
        9 | c . . . . . . . . | 2
       10 | R c . . . . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      const square = board.findFirst(Color.Red, Rook.name);
      const squares = square.piece.eyeingSquares(square, board);

      expect(squares.length).toBe(2);
    });
  });
});
