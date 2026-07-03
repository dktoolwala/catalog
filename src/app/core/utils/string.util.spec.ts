import { capitalize, truncate, slugify, stripHtml, isBlank } from './string.util';

describe('StringUtil', () => {
  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('should handle empty string', () => {
      expect(capitalize('')).toBe('');
    });

    it('should handle single character', () => {
      expect(capitalize('a')).toBe('A');
    });
  });

  describe('truncate', () => {
    it('should truncate long strings', () => {
      expect(truncate('Hello World', 5)).toBe('Hell…');
    });

    it('should not truncate short strings', () => {
      expect(truncate('Hi', 10)).toBe('Hi');
    });

    it('should handle empty string', () => {
      expect(truncate('', 5)).toBe('');
    });
  });

  describe('slugify', () => {
    it('should convert to slug format', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    it('should handle special characters', () => {
      expect(slugify('Hello & World!')).toBe('hello-world');
    });

    it('should handle multiple spaces', () => {
      expect(slugify('Hello   World')).toBe('hello-world');
    });
  });

  describe('stripHtml', () => {
    it('should remove HTML tags', () => {
      expect(stripHtml('<p>Hello</p>')).toBe('Hello');
    });

    it('should handle nested tags', () => {
      expect(stripHtml('<div><strong>Bold</strong></div>')).toBe('Bold');
    });

    it('should handle empty string', () => {
      expect(stripHtml('')).toBe('');
    });
  });

  describe('isBlank', () => {
    it('should return true for empty string', () => {
      expect(isBlank('')).toBe(true);
    });

    it('should return true for whitespace-only string', () => {
      expect(isBlank('   ')).toBe(true);
    });

    it('should return true for null/undefined', () => {
      expect(isBlank(null as unknown as string)).toBe(true);
      expect(isBlank(undefined as unknown as string)).toBe(true);
    });

    it('should return false for non-empty string', () => {
      expect(isBlank('hello')).toBe(false);
    });
  });
});
