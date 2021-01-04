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
    it('...', () => {
      const b = new Board();

      // TODO
    });
  });
});
