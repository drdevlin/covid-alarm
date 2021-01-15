import { startDate } from '../dates.js';

describe('Date Functions', () => {
  describe('startDate(dateNow, daysAgo)', () => {
    it('accepts the Date.now() method for <dateNow>, positive integer for <daysAgo>', () => {
      const dateNow = Date.now();
      const integer = 10;
      expect(startDate(dateNow, integer)).toBeDefined();
    });
    it('returns a string value', () => {
      const output = startDate(Date.now(), 10);
      expect(typeof output).toBe('string');
    });
    it('returns a date string like this: yyyy-[m]m-[d]d', () => {
      const output = startDate(Date.now(), 10);
      expect(output).toMatch(/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/g);
    });
    it('returns the date so many <daysAgo> from <dateNow>', () => {
      const mockToday = new Date('January 3, 2000').valueOf();
      const daysAgo = 10;
      const expectedOutput = '1999-12-24';

      const actualOutput = startDate(mockToday, daysAgo);
      expect(actualOutput).toStrictEqual(expectedOutput);
    });
  });
});

