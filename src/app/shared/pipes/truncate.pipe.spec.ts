import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should truncate text exceeding max length', () => {
    const result = pipe.transform('Hello World', 5);
    expect(result.length).toBeLessThanOrEqual(6);
    expect(result).toContain('…');
  });

  it('should not truncate text within max length', () => {
    const result = pipe.transform('Hi', 10);
    expect(result).toBe('Hi');
  });

  it('should handle empty string', () => {
    const result = pipe.transform('', 10);
    expect(result).toBe('');
  });

  it('should handle null/undefined', () => {
    const result = pipe.transform(null as unknown as string, 10);
    expect(result).toBe('');
  });
});
