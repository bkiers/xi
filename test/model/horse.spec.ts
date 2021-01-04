import { Board } from '../../src/model/board';
import { Color } from '../../src/model/color';
import { Horse } from '../../src/model/horse';

describe('Horse', () => {
  describe('eyeingSquares', () => {
    it('returns 2 squares for a start position', () => {
      const board = new Board();

      const square = board.findFirst(Color.Red, Horse.name);
      const squares = square.piece.eyeingSquares(square, board);

      expect(squares.length).toBe(2);
    });

    it('returns 8 squares for a center position', () => {
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
        8 | . . H . . . . . . | 3 
        9 | . . . . . . . . . | 2
       10 | . . . . . . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      const square = board.findFirst(Color.Red, Horse.name);
      const squares = square.piece.eyeingSquares(square, board);

      expect(squares.length).toBe(8);
    });

    it('returns 8 squares for a center position with enemies', () => {
      const board = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | . . . . . . . . . | 10
        2 | . . . . . . . . . | 9
        3 | . . . . . . . . . | 8
        4 | . . . . . . . . . | 7
        5 | . . . . . . . . . | 6
        6 | . s . s . . . . . | 5
        7 | s . . . s . . . . | 4
        8 | . . H . . . . . . | 3 
        9 | s . . . s . . . . | 2
       10 | . s . s . . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      const square = board.findFirst(Color.Red, Horse.name);
      const squares = square.piece.eyeingSquares(square, board);

      expect(squares.length).toBe(8);
    });

    it('returns 0 squares for a center position with own pieces', () => {
      const board = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | . . . . . . . . . | 10
        2 | . . . . . . . . . | 9
        3 | . . . . . . . . . | 8
        4 | . . . . . . . . . | 7
        5 | . . . . . . . . . | 6
        6 | . S . S . . . . . | 5
        7 | S . . . S . . . . | 4
        8 | . . H . . . . . . | 3 
        9 | S . . . S . . . . | 2
       10 | . S . S . . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      const square = board.findFirst(Color.Red, Horse.name);
      const squares = square.piece.eyeingSquares(square, board);

      expect(squares.length).toBe(0);
    });

    it('returns 0 squares for a center position when blocked', () => {
      const board = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | . . . . . . . . . | 10
        2 | . . . . . . . . . | 9
        3 | . . . . . . . . . | 8
        4 | . . . . . . . . . | 7
        5 | . . . . . . . . . | 6
        6 | . s . s . . . . . | 5
        7 | s . C . s . . . . | 4
        8 | . r H r . . . . . | 3 
        9 | s . C . s . . . . | 2
       10 | . s . s . . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      const square = board.findFirst(Color.Red, Horse.name);
      const squares = square.piece.eyeingSquares(square, board);

      expect(squares.length).toBe(0);
    });
  });
});
