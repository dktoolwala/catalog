/**
 * Application Injection Tokens
 *
 * Configurable values provided at bootstrap time.
 * Components inject these rather than importing constants directly,
 * enabling testability (tokens can be overridden in TestBed).
 */

import { InjectionToken } from '@angular/core';

import { APP_INFO, PAGINATION, IMAGES } from '../../core/constants';

/** Application display title */
export const APP_TITLE = new InjectionToken<string>('APP_TITLE', {
  providedIn: 'root',
  factory: () => APP_INFO.NAME
});

/** Default number of items per page/grid */
export const DEFAULT_PAGE_SIZE = new InjectionToken<number>('DEFAULT_PAGE_SIZE', {
  providedIn: 'root',
  factory: () => PAGINATION.DEFAULT_PAGE_SIZE
});

/** Placeholder image path used when no image is available */
export const IMAGE_PLACEHOLDER = new InjectionToken<string>('IMAGE_PLACEHOLDER', {
  providedIn: 'root',
  factory: () => IMAGES.PLACEHOLDER
});
