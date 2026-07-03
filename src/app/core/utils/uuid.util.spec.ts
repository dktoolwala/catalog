import { generateUuid } from './uuid.util';

describe('UuidUtil', () => {
  describe('generateUuid', () => {
    it('should return a string', () => {
      expect(typeof generateUuid()).toBe('string');
    });

    it('should return a valid UUID v4 format', () => {
      const uuid = generateUuid();
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(uuid).toMatch(uuidRegex);
    });

    it('should generate unique values', () => {
      const uuid1 = generateUuid();
      const uuid2 = generateUuid();
      expect(uuid1).not.toBe(uuid2);
    });
  });
});
