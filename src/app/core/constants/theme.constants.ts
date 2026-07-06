/**
 * Theme Constants
 *
 * Theme identifiers, CSS class names, breakpoints, animation durations,
 * and Material 3 theme configuration values.
 * ThemeService uses these exclusively — no hardcoded theme strings elsewhere.
 */

/** Available theme modes */
export const THEME_MODES = Object.freeze({
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
} as const);

/** Type derived from theme mode values */
export type ThemeMode = (typeof THEME_MODES)[keyof typeof THEME_MODES];

/** CSS classes applied to document body for theming */
export const THEME_CLASSES = Object.freeze({
  LIGHT: 'theme-light',
  DARK: 'theme-dark'
} as const);

/** CSS custom property prefix for theme variables */
export const THEME_CSS_PREFIX = '--app-' as const;

/** LocalStorage key for persisted theme preference */
export const THEME_STORAGE_KEY = 'app-theme' as const;

/** Media query for detecting system dark mode preference */
export const DARK_MODE_MEDIA_QUERY = '(prefers-color-scheme: dark)' as const;

/** Responsive breakpoints (pixels) — matches Angular Material defaults */
export const BREAKPOINTS = Object.freeze({
  XS: 0,
  SM: 600,
  MD: 960,
  LG: 1280,
  XL: 1920
} as const);

/** Breakpoint media queries for use in TypeScript */
export const BREAKPOINT_QUERIES = Object.freeze({
  XS: '(max-width: 599.98px)',
  SM: '(min-width: 600px) and (max-width: 959.98px)',
  MD: '(min-width: 960px) and (max-width: 1279.98px)',
  LG: '(min-width: 1280px) and (max-width: 1919.98px)',
  XL: '(min-width: 1920px)'
} as const);

/** Animation durations (milliseconds) — used by Angular animations and transitions */
export const ANIMATION_DURATIONS = Object.freeze({
  FAST: 150,
  NORMAL: 250,
  SLOW: 400,
  PAGE_TRANSITION: 300
} as const);

/** Animation easing curves */
export const ANIMATION_EASINGS = Object.freeze({
  STANDARD: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  DECELERATE: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  ACCELERATE: 'cubic-bezier(0.4, 0.0, 1, 1)',
  SHARP: 'cubic-bezier(0.4, 0.0, 0.6, 1)'
} as const);

/** Z-index layers for consistent stacking */
export const Z_INDEX = Object.freeze({
  DROPDOWN: 100,
  STICKY: 200,
  OVERLAY: 300,
  MODAL: 400,
  SNACKBAR: 500,
  TOOLTIP: 600
} as const);
