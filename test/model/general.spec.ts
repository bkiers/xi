import { Board } from '../../src/model/board';
import { Color } from '../../src/model/color';
import { General } from '../../src/model/general';

describe('General', () => {
  describe('eyeingSquares', () => {
    it('returns 1 square for a start position', () => {
      const board = new Board();

      const square = board.findFirst(Color.Red, General.name);
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
        9 | . . . . G . . . . | 2
       10 | . . . . . . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      const square = board.findFirst(Color.Red, General.name);
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
        8 | . . . . s . . . . | 3 
        9 | . . . s G s . . . | 2
       10 | . . . . s . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      const square = board.findFirst(Color.Red, General.name);
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
        8 | . . . . R . . . . | 3 
        9 | . . . C G C . . . | 2
       10 | . . . . R . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      const square = board.findFirst(Color.Red, General.name);
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
        8 | . . . . C G . . . | 3 
        9 | . . . . . C . . . | 2
       10 | . . . . . . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      const square = board.findFirst(Color.Red, General.name);
      const squares = square.piece.eyeingSquares(square, board);

      expect(squares.length).toBe(0);
    });

    it('returns 2 squares in corner with enemy piece', () => {
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
        8 | . . . . c G . . . | 3 
        9 | . . . . . c . . . | 2
       10 | . . . . . . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      const square = board.findFirst(Color.Red, General.name);
      const squares = square.piece.eyeingSquares(square, board);

      expect(squares.length).toBe(2);
    });
  });
});
