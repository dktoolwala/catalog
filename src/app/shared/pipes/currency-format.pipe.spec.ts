import { CurrencyFormatPipe } from './currency-format.pipe';

describe('CurrencyFormatPipe', () => {
  let pipe: CurrencyFormatPipe;

  beforeEach(() => {
    pipe = new CurrencyFormatPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format a number as INR currency', () => {
    const result = pipe.transform(1000);
    expect(result).toContain('1,000');
    expect(result).toContain('₹');
  });

  it('should format zero', () => {
    const result = pipe.transform(0);
    expect(result).toContain('0');
  });

  it('should handle decimal values', () => {
    const result = pipe.transform(99.5);
    expect(result).toContain('99');
  });

  it('should return empty string for null', () => {
    const result = pipe.transform(null as unknown as number);
    expect(result).toBe('');
  });

  it('should return empty string for undefined', () => {
    const result = pipe.transform(undefined as unknown as number);
    expect(result).toBe('');
  });
});
