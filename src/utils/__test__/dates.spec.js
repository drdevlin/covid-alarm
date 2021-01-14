import { startDate } from '../dates.js';

describe('Date Functions', () => {
  describe('startDate(daysAgo)', () => {
    it('accepts an integer argument', () => {
      const integer = 10;
      expect(startDate(integer)).toBeDefined();
    });
    it('returns a string value', () => {
      const output = startDate(10);
      expect(typeof output).toBe('string');
    });
    it('returns a date string like this: yyyy-[m]m-[d]d', () => {
      const output = startDate(10);
      expect(output).toMatch(/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/g);
    });
  });
});

