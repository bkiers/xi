import { humanReadable } from '../../src/util/string.utils';

describe('humanReadable', () => {
  it('returns only seconds when less than 60', () => {
    expect(humanReadable(59)).toBe('59 seconds');
  });

  it('returns 1 second for input 1', () => {
    expect(humanReadable(1)).toBe('1 second');
  });

  it('returns 1 minute for input 60', () => {
    expect(humanReadable(60)).toBe('1 minute');
  });

  it('returns 1 hour for input 3600', () => {
    expect(humanReadable(3600)).toBe('1 hour');
  });

  it('returns 1 day for input 86400', () => {
    expect(humanReadable(86400)).toBe('1 day');
  });

  it("returns all 1's", () => {
    expect(humanReadable(86400 + 3600 + 60 + 1)).toBe(
      '1 day, 1 hour, 1 minute and 1 second',
    );
  });

  it("returns all 2's", () => {
    expect(humanReadable(2 * 86400 + 2 * 3600 + 2 * 60 + 2)).toBe(
      '2 days, 2 hours, 2 minutes and 2 seconds',
    );
  });
});
