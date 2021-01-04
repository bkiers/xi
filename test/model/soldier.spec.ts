import { Board } from '../../src/model/board';
import { Color } from '../../src/model/color';
import { Soldier } from '../../src/model/soldier';

describe('Soldier', () => {
  describe('eyeingSquares', () => {
    it('returns 1 square for a start position at the side', () => {
      const board = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | . . . . . . . . . | 10
        2 | . . . . . . . . . | 9
        3 | . . . . . . . . . | 8
        4 | . . . . . . . . . | 7
        5 | . . . . . . . . . | 6
        6 | . . . . . . . . . | 5
        7 | S . . . . . . . . | 4
        8 | . . . . . . . . . | 3 
        9 | . . . . . . . . . | 2
       10 | . . . . . . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      const square = board.findFirst(Color.Red, Soldier.name);
      const squares = square.piece.eyeingSquares(square, board);

      expect(squares.length).toBe(1);
    });

    it('returns 1 square for a start position in the center', () => {
      const board = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | . . . . . . . . . | 10
        2 | . . . . . . . . . | 9
        3 | . . . . . . . . . | 8
        4 | . . . . . . . . . | 7
        5 | . . . . . . . . . | 6
        6 | . . . . . . . . . | 5
        7 | . . . . S . . . . | 4
        8 | . . . . . . . . . | 3 
        9 | . . . . . . . . . | 2
       10 | . . . . . . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      const square = board.findFirst(Color.Red, Soldier.name);
      const squares = square.piece.eyeingSquares(square, board);

      expect(squares.length).toBe(1);
    });

    it('returns 3 squares for a piece in the center on the other side', () => {
      const board = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | . . . . . . . . . | 10
        2 | . . . . . . . . . | 9
        3 | . . . . . . . . . | 8
        4 | . . . . . . . . . | 7
        5 | . . . . S . . . . | 6
        6 | . . . . . . . . . | 5
        7 | . . . . . . . . . | 4
        8 | . . . . . . . . . | 3 
        9 | . . . . . . . . . | 2
       10 | . . . . . . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      const square = board.findFirst(Color.Red, Soldier.name);
      const squares = square.piece.eyeingSquares(square, board);

      expect(squares.length).toBe(3);
    });

    it('returns 2 squares for a piece in the center on the other side', () => {
      const board = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | . . . . . . . . . | 10
        2 | . . . . . . . . . | 9
        3 | . . . . . . . . . | 8
        4 | . . . . . . . . . | 7
        5 | S . . . . . . . . | 6
        6 | . . . . . . . . . | 5
        7 | . . . . . . . . . | 4
        8 | . . . . . . . . . | 3 
        9 | . . . . . . . . . | 2
       10 | . . . . . . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      const square = board.findFirst(Color.Red, Soldier.name);
      const squares = square.piece.eyeingSquares(square, board);

      expect(squares.length).toBe(2);
    });

    it('returns 1 square for a piece in the corner on the other side', () => {
      const board = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | . . . . . . . . S | 10
        2 | . . . . . . . . . | 9
        3 | . . . . . . . . . | 8
        4 | . . . . . . . . . | 7
        5 | . . . . . . . . . | 6
        6 | . . . . . . . . . | 5
        7 | . . . . . . . . . | 4
        8 | . . . . . . . . . | 3 
        9 | . . . . . . . . . | 2
       10 | . . . . . . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      const square = board.findFirst(Color.Red, Soldier.name);
      const squares = square.piece.eyeingSquares(square, board);

      expect(squares.length).toBe(1);
    });

    it('returns 0 squares for a blocked piece in the corner on the other side', () => {
      const board = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | . . . . . . . R S | 10
        2 | . . . . . . . . . | 9
        3 | . . . . . . . . . | 8
        4 | . . . . . . . . . | 7
        5 | . . . . . . . . . | 6
        6 | . . . . . . . . . | 5
        7 | . . . . . . . . . | 4
        8 | . . . . . . . . . | 3 
        9 | . . . . . . . . . | 2
       10 | . . . . . . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      const square = board.findFirst(Color.Red, Soldier.name);
      const squares = square.piece.eyeingSquares(square, board);

      expect(squares.length).toBe(0);
    });

    it('returns 0 squares for a blocked piece in the corner on the other side', () => {
      const board = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | . . . . . . . . . | 10
        2 | . . . . R . . . . | 9
        3 | . . . R S C . . . | 8
        4 | . . . . . . . . . | 7
        5 | . . . . . . . . . | 6
        6 | . . . . . . . . . | 5
        7 | . . . . . . . . . | 4
        8 | . . . . . . . . . | 3 
        9 | . . . . . . . . . | 2
       10 | . . . . . . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      const square = board.findFirst(Color.Red, Soldier.name);
      const squares = square.piece.eyeingSquares(square, board);

      expect(squares.length).toBe(0);
    });

    it('returns 3 squares for a piece in the center on the other side', () => {
      const board = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | . . . . . . . . . | 10
        2 | . . . . r . . . . | 9
        3 | . . . r S c . . . | 8
        4 | . . . . . . . . . | 7
        5 | . . . . . . . . . | 6
        6 | . . . . . . . . . | 5
        7 | . . . . . . . . . | 4
        8 | . . . . . . . . . | 3 
        9 | . . . . . . . . . | 2
       10 | . . . . . . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      const square = board.findFirst(Color.Red, Soldier.name);
      const squares = square.piece.eyeingSquares(square, board);

      expect(squares.length).toBe(3);
      expect([squares[0].rowIndex, squares[0].columnIndex]).toStrictEqual([
        1,
        4,
      ]);
      expect([squares[1].rowIndex, squares[1].columnIndex]).toStrictEqual([
        2,
        5,
      ]);
      expect([squares[2].rowIndex, squares[2].columnIndex]).toStrictEqual([
        2,
        3,
      ]);
    });

    it('returns 2 squares for a piece on the last row on the other side', () => {
      const board = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | r S r . . . . . . | 10
        2 | . . . . . . . . . | 9
        3 | . . . . . . . . . | 8
        4 | . . . . . . . . . | 7
        5 | . . . . . . . . . | 6
        6 | . . . . . . . . . | 5
        7 | . . . . . . . . . | 4
        8 | . . . . . . . . . | 3 
        9 | . . . . . . . . . | 2
       10 | . . . . . . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      const square = board.findFirst(Color.Red, Soldier.name);
      const squares = square.piece.eyeingSquares(square, board);

      expect(squares.length).toBe(2);
      expect([squares[0].rowIndex, squares[0].columnIndex]).toStrictEqual([
        0,
        2,
      ]);
      expect([squares[1].rowIndex, squares[1].columnIndex]).toStrictEqual([
        0,
        0,
      ]);
    });
  });
});
