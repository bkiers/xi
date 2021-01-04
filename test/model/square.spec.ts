import { Board } from '../../src/model/board';
import { Color } from '../../src/model/color';
import { Square } from '../../src/model/square';

describe('Square', () => {
  const board = new Board();

  describe('isOccupied', () => {
    it('returns true for an occupied square', () => {
      expect(board.square(1, 1, Color.Red).isOccupied()).toBe(true);
    });

    it('returns false for an unoccupied square', () => {
      expect(board.square(2, 1, Color.Red).isOccupied()).toBe(false);
    });
  });

  describe('isOccupiedBy', () => {
    it('returns true for an occupied square of same color', () => {
      expect(board.square(1, 1, Color.Red).isOccupiedBy(Color.Red)).toBe(true);
    });

    it('returns false for an occupied square of other color', () => {
      expect(board.square(1, 1, Color.Red).isOccupiedBy(Color.Black)).toBe(
        false,
      );
    });

    it('returns false for an unoccupied square', () => {
      expect(board.square(2, 1, Color.Red).isOccupiedBy(Color.Red)).toBe(false);
    });
  });

  describe('isOnOwnSide', () => {
    it("returns true for red on a square on red's side", () => {
      expect(board.squareIndex(5, 1).isOnOwnSide(Color.Red)).toBe(true);
    });

    it("returns true for black on a square on black's side", () => {
      expect(board.squareIndex(4, 1).isOnOwnSide(Color.Black)).toBe(true);
    });

    it("returns false for red on a square on black's side", () => {
      expect(board.squareIndex(4, 1).isOnOwnSide(Color.Red)).toBe(false);
    });
  });

  describe('isInOwnPalace', () => {
    it("returns true for red on a square in red's palace", () => {
      expect(board.squareIndex(7, 3).isInOwnPalace(Color.Red)).toBe(true);
      expect(board.squareIndex(8, 4).isInOwnPalace(Color.Red)).toBe(true);
      expect(board.squareIndex(9, 5).isInOwnPalace(Color.Red)).toBe(true);
    });

    it("returns false for red on a square outside it's palace", () => {
      expect(board.squareIndex(7, 3).isInOwnPalace(Color.Black)).toBe(false);
      expect(board.squareIndex(8, 4).isInOwnPalace(Color.Black)).toBe(false);
      expect(board.squareIndex(9, 5).isInOwnPalace(Color.Black)).toBe(false);
    });

    it("returns true for black on a square in black's palace", () => {
      expect(board.squareIndex(0, 5).isInOwnPalace(Color.Black)).toBe(true);
      expect(board.squareIndex(1, 4).isInOwnPalace(Color.Black)).toBe(true);
      expect(board.squareIndex(2, 3).isInOwnPalace(Color.Black)).toBe(true);
    });
  });
});
