/**
 * String Utility
 *
 * Pure string helper functions.
 * No Angular imports.
 */

/**
 * Capitalizes the first letter of a string.
 */
export function capitalize(value: string): string {
  if (!value) return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Truncates a string to the specified length, appending a suffix.
 *
 * @param value - The string to truncate
 * @param maxLength - Maximum length including suffix
 * @param suffix - Suffix appended when truncated (default: '…')
 */
export function truncate(value: string, maxLength: number, suffix = '…'): string {
  if (!value || value.length <= maxLength) return value;
  return value.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Converts a string to a URL-safe slug.
 * Lowercases, replaces non-alphanumeric characters with hyphens,
 * collapses consecutive hyphens, and trims leading/trailing hyphens.
 */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Strips HTML tags from a string.
 * Uses regex — safe for display purposes, NOT for sanitization of untrusted input.
 */
export function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, '');
}

/**
 * Checks if a string is empty or contains only whitespace.
 */
export function isBlank(value: string | null | undefined): boolean {
  return value === null || value === undefined || value.trim().length === 0;
}

/**
 * Formats a phone number by prepending the country code if missing.
 *
 * @param phone - Raw phone number
 * @param countryCode - Country code with '+' prefix (default: '+91')
 */
export function formatPhoneNumber(phone: string, countryCode = '+91'): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith(countryCode.replace('+', ''))) {
    return `+${digits}`;
  }
  return `${countryCode}${digits}`;
}
