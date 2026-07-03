/**
 * Date Utility
 *
 * Pure date helper functions.
 * No Angular imports — uses native Date and Intl APIs.
 */

/**
 * Returns the current timestamp as an ISO 8601 string.
 */
export function nowISO(): string {
  return new Date().toISOString();
}

/**
 * Formats a date string or Date object for display.
 * Uses Intl.DateTimeFormat for locale-aware formatting.
 *
 * @param value - ISO date string or Date object
 * @param locale - BCP 47 locale string (default: 'en-IN')
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string, or empty string if invalid
 */
export function formatDisplayDate(
  value: string | Date,
  locale = 'en-IN',
  options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' }
): string {
  const date = value instanceof Date ? value : new Date(value);
  if (isNaN(date.getTime())) {
    return '';
  }
  return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * Returns a human-readable relative time string (e.g., "2 minutes ago").
 *
 * @param value - ISO date string or Date object
 * @param locale - BCP 47 locale string (default: 'en')
 * @returns Relative time string, or empty string if invalid
 */
export function getRelativeTime(value: string | Date, locale = 'en'): string {
  const date = value instanceof Date ? value : new Date(value);
  if (isNaN(date.getTime())) {
    return '';
  }

  const now = Date.now();
  const diffMs = date.getTime() - now;
  const absDiffMs = Math.abs(diffMs);

  const units: { unit: Intl.RelativeTimeFormatUnit; ms: number }[] = [
    { unit: 'year', ms: 365.25 * 24 * 60 * 60 * 1_000 },
    { unit: 'month', ms: 30.44 * 24 * 60 * 60 * 1_000 },
    { unit: 'week', ms: 7 * 24 * 60 * 60 * 1_000 },
    { unit: 'day', ms: 24 * 60 * 60 * 1_000 },
    { unit: 'hour', ms: 60 * 60 * 1_000 },
    { unit: 'minute', ms: 60 * 1_000 },
    { unit: 'second', ms: 1_000 }
  ];

  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  for (const { unit, ms } of units) {
    if (absDiffMs >= ms) {
      const value = Math.round(diffMs / ms);
      return formatter.format(value, unit);
    }
  }

  return formatter.format(0, 'second');
}

/**
 * Checks if a value is a valid date string or Date object.
 */
export function isValidDate(value: unknown): boolean {
  if (value instanceof Date) {
    return !isNaN(value.getTime());
  }
  if (typeof value === 'string' && value.length > 0) {
    return !isNaN(new Date(value).getTime());
  }
  return false;
}
