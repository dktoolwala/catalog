import { buildQueryString, appendQueryParams } from './url.util';

describe('UrlUtil', () => {
  describe('buildQueryString', () => {
    it('should build query string from object', () => {
      const result = buildQueryString({ action: 'getProducts', page: '1' });
      expect(result).toContain('action=getProducts');
      expect(result).toContain('page=1');
    });

    it('should handle empty object', () => {
      const result = buildQueryString({});
      expect(result).toBe('');
    });

    it('should encode special characters', () => {
      const result = buildQueryString({ q: 'hello world' });
      expect(result).toContain('q=hello%20world');
    });
  });

  describe('appendQueryParams', () => {
    it('should append params to URL without existing params', () => {
      const result = appendQueryParams('http://api.com', { action: 'test' });
      expect(result).toBe('http://api.com?action=test');
    });

    it('should append params to URL with existing params', () => {
      const result = appendQueryParams('http://api.com?a=1', { b: '2' });
      expect(result).toContain('a=1');
      expect(result).toContain('b=2');
    });
  });
});
