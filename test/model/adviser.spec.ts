import { Board } from '../../src/model/board';
import { Color } from '../../src/model/color';
import { Adviser } from '../../src/model/adviser';

describe('Adviser', () => {
  describe('eyeingSquares', () => {
    it('returns 1 square for a start position', () => {
      const board = new Board();

      const square = board.findFirst(Color.Red, Adviser.name);
      const squares = square.piece.eyeingSquares(square, board);

      expect(squares.length).toBe(1);
    });

    it('returns 4 squares for a center position', () => {
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
        9 | . . . . A . . . . | 2
       10 | . . . . . . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      const square = board.findFirst(Color.Red, Adviser.name);
      const squares = square.piece.eyeingSquares(square, board);

      expect(squares.length).toBe(4);
    });

    it('returns 4 squares for a center position with enemy pieces', () => {
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
        8 | . . . s . s . . . | 3 
        9 | . . . . A . . . . | 2
       10 | . . . s . s . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      const square = board.findFirst(Color.Red, Adviser.name);
      const squares = square.piece.eyeingSquares(square, board);

      expect(squares.length).toBe(4);
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
        6 | . . . . . . . . . | 5
        7 | . . . . . . . . . | 4
        8 | . . . R . R . . . | 3 
        9 | . . . . A . . . . | 2
       10 | . . . C . C . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      const square = board.findFirst(Color.Red, Adviser.name);
      const squares = square.piece.eyeingSquares(square, board);

      expect(squares.length).toBe(0);
    });

    it('returns 0 squares in corner with own piece', () => {
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
        8 | . . . . . A . . . | 3 
        9 | . . . . C . . . . | 2
       10 | . . . . . . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      const square = board.findFirst(Color.Red, Adviser.name);
      const squares = square.piece.eyeingSquares(square, board);

      expect(squares.length).toBe(0);
    });

    it('returns 1 square in corner with enemy piece', () => {
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
        8 | . . . . . A . . . | 3 
        9 | . . . . c . . . . | 2
       10 | . . . . . . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      const square = board.findFirst(Color.Red, Adviser.name);
      const squares = square.piece.eyeingSquares(square, board);

      expect(squares.length).toBe(1);
    });
  });
});
