import { nowISO, isValidDate } from './date.util';

describe('DateUtil', () => {
  describe('nowISO', () => {
    it('should return a valid ISO string', () => {
      const result = nowISO();
      expect(new Date(result).toISOString()).toBe(result);
    });
  });

  describe('isValidDate', () => {
    it('should return true for valid date string', () => {
      expect(isValidDate('2024-01-15')).toBe(true);
    });

    it('should return true for Date object', () => {
      expect(isValidDate(new Date().toISOString())).toBe(true);
    });

    it('should return false for invalid string', () => {
      expect(isValidDate('not-a-date')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(isValidDate('')).toBe(false);
    });
  });
});
