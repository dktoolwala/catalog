/**
 * API Constants
 *
 * Maps directly to the Google Apps Script backend's Constants.gs.
 * Every API action name, query parameter, header, and timeout is defined here.
 * No other file in the application should hardcode these values.
 */

/** API action names — must match GAS Router.gs ACTION_REGISTRY keys exactly */
export const API_ACTIONS = Object.freeze({
  GET_PRODUCTS: 'getProducts',
  GET_PRODUCT: 'getProduct',
  GET_CATEGORIES: 'getCategories',
  GET_SETTINGS: 'getSettings',
  HEALTH: 'health',
  SEARCH_PRODUCTS: 'searchProducts'
} as const);

/** Query parameter names sent to the GAS web app */
export const API_PARAMS = Object.freeze({
  ACTION: 'action',
  SLUG: 'slug',
  CATEGORY_ID: 'categoryId',
  FEATURED: 'featured',
  QUERY: 'q'
} as const);

/** Custom HTTP headers used by interceptors */
export const API_HEADERS = Object.freeze({
  REQUEST_ID: 'X-Request-ID',
  CONTENT_TYPE: 'Content-Type'
} as const);

/** HTTP timeout configuration (milliseconds) */
export const API_TIMEOUTS = Object.freeze({
  DEFAULT: 15_000,
  HEALTH: 5_000,
  SEARCH: 10_000
} as const);

/** Keys in the API response envelope — matches ResponseBuilder.gs output */
export const API_RESPONSE_KEYS = Object.freeze({
  SUCCESS: 'success',
  DATA: 'data',
  ERROR: 'error',
  API_VERSION: 'apiVersion',
  CATALOG_VERSION: 'catalogVersion',
  REQUEST_ID: 'requestId',
  TIMESTAMP: 'timestamp'
} as const);

/** Error object keys within the error envelope */
export const API_ERROR_KEYS = Object.freeze({
  CODE: 'code',
  MESSAGE: 'message'
} as const);

/** Retry configuration for the retry interceptor */
export const API_RETRY = Object.freeze({
  MAX_RETRIES: 2,
  RETRY_DELAY_MS: 1_000,
  RETRYABLE_STATUS_CODES: [0, 408, 429, 500, 502, 503, 504]
} as const);

/** HTTP methods supported by the application */
export const HTTP_METHODS = Object.freeze({
  GET: 'GET',
  POST: 'POST'
} as const);
