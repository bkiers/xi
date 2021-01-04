import { Board } from '../../src/model/board';
import { Color } from '../../src/model/color';
import { Elephant } from '../../src/model/elephant';

describe('Elephant', () => {
  describe('eyeingSquares', () => {
    it('returns 2 squares for a start position', () => {
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
       10 | . . E . . . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      const square = board.findFirst(Color.Red, Elephant.name);
      const squares = square.piece.eyeingSquares(square, board);

      expect(squares.length).toBe(2);
      expect([squares[0].rowIndex, squares[0].columnIndex]).toStrictEqual([
        7,
        4,
      ]);
      expect([squares[1].rowIndex, squares[1].columnIndex]).toStrictEqual([
        7,
        0,
      ]);
    });

    it('returns 4 squares when placed in the center', () => {
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
        8 | . . . . E . . . . | 3 
        9 | . . . . . . . . . | 2
       10 | . . . . . . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      const square = board.findFirst(Color.Red, Elephant.name);
      const squares = square.piece.eyeingSquares(square, board);

      expect(squares.length).toBe(4);
    });

    it('returns 0 squares when blocked in the center', () => {
      const board = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | . . . . . . . . . | 10
        2 | . . . . . . . . . | 9
        3 | . . . . . . . . . | 8
        4 | . . . . . . . . . | 7
        5 | . . . . . . . . . | 6
        6 | . . . . . . . . . | 5
        7 | . . . s . s . . . | 4
        8 | . . . . E . . . . | 3 
        9 | . . . s . s . . . | 2
       10 | . . . . . . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      const square = board.findFirst(Color.Red, Elephant.name);
      const squares = square.piece.eyeingSquares(square, board);

      expect(squares.length).toBe(0);
    });
  });
});
