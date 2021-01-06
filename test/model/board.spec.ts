import { Board } from '../../src/model/board';
import { Color } from '../../src/model/color';

describe('Board', () => {
  const board = new Board();

  describe('square', () => {
    it('returns square (0, 0) for black (1, 1)', () => {
      const square = board.square(1, 1, Color.Black);

      expect(square.rowIndex).toBe(0);
      expect(square.columnIndex).toBe(0);
    });

    it('returns square (8, 9) for red (1, 1)', () => {
      const square = board.square(1, 1, Color.Red);

      expect(square.rowIndex).toBe(9);
      expect(square.columnIndex).toBe(8);
    });
  });

  describe('findGeneral', () => {
    it("returns red's general", () => {
      const square = board.findGeneral(Color.Red);

      expect(square.rowIndex).toBe(9);
      expect(square.columnIndex).toBe(4);
    });

    it("returns black's general", () => {
      const square = board.findGeneral(Color.Black);

      expect(square.rowIndex).toBe(0);
      expect(square.columnIndex).toBe(4);
    });
  });

  describe('move', () => {
    it('throws an error when generals are eyeing each other', () => {
      const b = new Board(`
            0 1 2 3 4 5 6 7 8
          +-------------------+
        0 | . . . . g . . . . |
        1 | . . . . . . . . . |
        2 | . . . . . . . . . |
        3 | . . . . . . . . . |
        4 | . . . . . . . . . |
        5 | . . . . . . . . . |
        6 | . . . . . . . . . |
        7 | . . . . . . . . . | 
        8 | . . . . . . . . . |
        9 | . . . G . . . . . |
          +-------------------+
            0 1 2 3 4 5 6 7 8
      `);

      const move = () => {
        b.move(9, 3, 9, 4);
      };

      expect(move).toThrow(Error);
    });

    it('throws an error when generals are eyeing each other', () => {
      const b = new Board(`
            0 1 2 3 4 5 6 7 8
          +-------------------+
        0 | . . . . . g . . . |
        1 | . . . . . . . . . |
        2 | . . . . . . . . . |
        3 | . . . . . . . . . |
        4 | . . . . . . . . . |
        5 | . . . . . . . . . |
        6 | . . . . . . . . . |
        7 | . . . . . . . . . | 
        8 | . . . . s . . . . |
        9 | . . . G . . . . . |
          +-------------------+
            0 1 2 3 4 5 6 7 8
      `);

      const move = () => {
        b.move(9, 3, 9, 4);
      };

      expect(move).toThrow(Error);
    });
  });

  describe('generalsEyeing', () => {
    it('returns true when eyeing each other', () => {
      const b = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | . . . . g . . . . | 10
        2 | . . . . . . . . . | 9
        3 | . . . . . . . . . | 8
        4 | . . . . . . . . . | 7
        5 | . . . . . . . . . | 6
        6 | . . . . . . . . . | 5
        7 | . . . . . . . . . | 4
        8 | . . . . . . . . . | 3 
        9 | . . . . . . . . . | 2
       10 | . . . . G . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      expect(b.generalsEyeing()).toBe(true);
    });

    it('returns false when not eyeing each other', () => {
      const b = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | . . . . g . . . . | 10
        2 | . . . . . . . . . | 9
        3 | . . . . . . . . . | 8
        4 | . . . . . . . . . | 7
        5 | . . . . . . . . . | 6
        6 | . . . . . . . . . | 5
        7 | . . . . . . . . . | 4
        8 | . . . . . . . . . | 3 
        9 | . . . . . . . . . | 2
       10 | . . . G . . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      expect(b.generalsEyeing()).toBe(false);
    });

    it('returns false when a piece is in their way', () => {
      const b = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | . . . . g . . . . | 10
        2 | . . . . a . . . . | 9
        3 | . . . . . . . . . | 8
        4 | . . . . . . . . . | 7
        5 | . . . . . . . . . | 6
        6 | . . . . . . . . . | 5
        7 | . . . . . . . . . | 4
        8 | . . . . . . . . . | 3 
        9 | . . . . . . . . . | 2
       10 | . . . . G . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      expect(b.generalsEyeing()).toBe(false);
    });
  });

  describe('getSquaresOccupiedBy', () => {
    it('returns 16 for the start position', () => {
      expect(board.getSquaresOccupiedBy(Color.Red).length).toBe(16);
    });

    it('returns 0 for an empty board', () => {
      const b = new Board(`
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
       10 | . . . . . . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      expect(b.getSquaresOccupiedBy(Color.Red).length).toBe(0);
    });
  });

  describe('getSquaresAttackedBy', () => {
    it('...', () => {
      const b = new Board();

      // TODO
    });
  });

  describe('isCheck', () => {
    it('returns true for 2 cannon check', () => {
      const b = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | . . . . g . . . . | 10
        2 | . . . . . . . . . | 9
        3 | . . . . . . . . . | 8
        4 | . . . . . . . . . | 7
        5 | . . . . . . . . . | 6
        6 | . . . . . . . . . | 5
        7 | . . . . C . . . . | 4
        8 | . . . . C . . . . | 3 
        9 | . . . . . . . . . | 2
       10 | . . . . . . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      expect(b.isCheck(Color.Black)).toBe(true);
    });

    it('returns true for horse check', () => {
      const b = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | . . . . g . . . . | 10
        2 | . . . . . . . . . | 9
        3 | . . . . . H . . . | 8
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

      expect(b.isCheck(Color.Black)).toBe(true);
    });

    it('returns true for rook check', () => {
      const b = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | R . . . g . . . . | 10
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

      expect(b.isCheck(Color.Black)).toBe(true);
    });

    it('returns true for soldier check', () => {
      const b = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | . . . S g . . . . | 10
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

      expect(b.isCheck(Color.Black)).toBe(true);
    });

    it('returns false for blocked 2 cannon check', () => {
      const b = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | . . . . g . . . . | 10
        2 | . . . . . . . . . | 9
        3 | . . . . . . . . . | 8
        4 | . . . . . . . . . | 7
        5 | . . . . s . . . . | 6
        6 | . . . . s . . . . | 5
        7 | . . . . C . . . . | 4
        8 | . . . . C . . . . | 3 
        9 | . . . . . . . . . | 2
       10 | . . . . . . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      expect(b.isCheck(Color.Black)).toBe(false);
    });

    it('returns false for blocked horse check', () => {
      const b = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | . . . . g . . . . | 10
        2 | . . . . . s . . . | 9
        3 | . . . . . H . . . | 8
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

      expect(b.isCheck(Color.Black)).toBe(false);
    });

    it('returns false for blocked rook check', () => {
      const b = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | R . c . g . . . . | 10
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

      expect(b.isCheck(Color.Black)).toBe(false);
    });
  });

  describe('isCheckmate', () => {
    it('returns true when checkmate 1', () => {
      const b = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | . . . g . . . . . | 10
        2 | . . . S S . . . . | 9
        3 | . . . . . . . . . | 8
        4 | . . . . . . . . . | 7
        5 | . . . . . . . . . | 6
        6 | . . . . . . . . . | 5
        7 | . . . . . . . . . | 4
        8 | . . . . . . . . . | 3 
        9 | . . . . . . . . . | 2
       10 | . . . . G . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      expect(b.isCheckmate(Color.Black)).toBe(true);
    });

    it('returns true when checkmate 2', () => {
      const b = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | . . . g . . . . . | 10
        2 | . . . . . . . . . | 9
        3 | . . . . . . . . . | 8
        4 | . . . . . . . . . | 7
        5 | . . . . . . . . . | 6
        6 | . . . . . . . . . | 5
        7 | . . . . . . . . . | 4
        8 | . . . . . . . . . | 3 
        9 | . . . R . . . . . | 2
       10 | . . . . G . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      expect(b.isCheckmate(Color.Black)).toBe(true);
    });

    it('returns true when checkmate 3', () => {
      const b = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | . . . a g a . . . | 10
        2 | . . . . . . . . . | 9
        3 | . . . . . . . . . | 8
        4 | . . . . . . . . . | 7
        5 | . . . . . . . . . | 6
        6 | . . . . . . . . . | 5
        7 | . . . . C . . . . | 4
        8 | . . . . C . . . . | 3 
        9 | . . . . . . . . . | 2
       10 | . . . . G . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      expect(b.isCheckmate(Color.Black)).toBe(true);
    });
  });

  describe('possibleMoves', () => {
    it('returns 0 when general is cut off', () => {
      const b = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | . . . g . . . . . | 10
        2 | . . . . S . . . . | 9
        3 | . . . . . . . . . | 8
        4 | . . . . . . . . . | 7
        5 | . . . . . . . . . | 6
        6 | . . . . . . . . . | 5
        7 | . . . . . . . . . | 4
        8 | . . . . . . . . . | 3 
        9 | . . . . . . . . . | 2
       10 | . . . . G . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      expect(b.possibleMoves(Color.Black).length).toBe(0);
    });

    it('returns 1 when general is cut off and 1 soldier', () => {
      const b = new Board(`
            1 2 3 4 5 6 7 8 9
          +-------------------+
        1 | . . . g . . . . . | 10
        2 | . . . . S . . . . | 9
        3 | . . . . . . . . . | 8
        4 | s . . . . . . . . | 7
        5 | . . . . . . . . . | 6
        6 | . . . . . . . . . | 5
        7 | . . . . . . . . . | 4
        8 | . . . . . . . . . | 3 
        9 | . . . . . . . . . | 2
       10 | . . . . G . . . . | 1
          +-------------------+
            9 8 7 6 5 4 3 2 1
      `);

      expect(b.possibleMoves(Color.Black).length).toBe(1);
    });
  });
});
