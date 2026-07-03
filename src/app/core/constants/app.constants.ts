/**
 * Application Constants
 *
 * Business defaults and application-wide values that do NOT change per environment.
 * Environment-specific values (API URL, feature flags) belong in src/environments/.
 * No Angular dependencies — pure TypeScript.
 */

/** Application identity */
export const APP_INFO = Object.freeze({
  NAME: 'DK Tools',
  VERSION: '1.0.0',
  DESCRIPTION: 'Product Catalog Web Application',
  LANGUAGE: 'en'
} as const);

/** Pagination defaults */
export const PAGINATION = Object.freeze({
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 48,
  FIRST_PAGE: 1
} as const);

/** Currency and locale formatting */
export const CURRENCY = Object.freeze({
  DEFAULT_CODE: 'INR',
  DEFAULT_SYMBOL: '₹',
  LOCALE: 'en-IN'
} as const);

/** Date and time format patterns */
export const DATE_FORMATS = Object.freeze({
  DISPLAY_DATE: 'dd MMM yyyy',
  DISPLAY_DATETIME: 'dd MMM yyyy, hh:mm a',
  ISO: "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
  SHORT: 'dd/MM/yyyy'
} as const);

/** Image handling defaults */
export const IMAGES = Object.freeze({
  MAX_COUNT: 5,
  SEPARATOR: '|',
  PLACEHOLDER: 'assets/images/placeholder.svg',
  FALLBACK: 'assets/images/fallback.svg',
  ALLOWED_EXTENSIONS: ['jpg', 'jpeg', 'png', 'webp', 'avif']
} as const);

/** WhatsApp integration */
export const WHATSAPP = Object.freeze({
  BASE_URL: 'https://wa.me/',
  DEFAULT_COUNTRY_CODE: '91'
} as const);

/** Company defaults */
export const COMPANY = Object.freeze({
  NAME: 'GALC',
  PHONE_DIGITS: 10,
  COUNTRY_CODE: '+91'
} as const);

/** Search configuration */
export const SEARCH = Object.freeze({
  MIN_QUERY_LENGTH: 2,
  DEBOUNCE_MS: 350,
  MAX_RESULTS: 50
} as const);

/** Local storage keys used by the application */
export const STORAGE_KEYS = Object.freeze({
  THEME: 'app-theme',
  CACHE_PREFIX: 'pc-cache-',
  LAST_VISIT: 'last-visit'
} as const);

/** Cache TTL values (milliseconds) */
export const CACHE_TTL = Object.freeze({
  SHORT: 5 * 60 * 1_000,
  MEDIUM: 30 * 60 * 1_000,
  LONG: 60 * 60 * 1_000,
  SESSION: 0
} as const);
