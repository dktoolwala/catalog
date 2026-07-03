/**
 * Route Constants
 *
 * Every URL path segment and route pattern used in the application.
 * No route strings should appear anywhere else in the codebase.
 * app.routes.ts and navigation components import from here exclusively.
 */

/** Route path segments (without leading slash) */
export const ROUTE_PATHS = Object.freeze({
  HOME: '',
  PRODUCTS: 'products',
  PRODUCT_DETAIL: ':slug',
  CATEGORIES: 'categories',
  CATEGORY_DETAIL: ':categoryId',
  SEARCH: 'search',
  NOT_FOUND: 'not-found',
  SERVER_ERROR: 'error',
  OFFLINE: 'offline',
  API_UNAVAILABLE: 'service-unavailable',
  WILDCARD: '**'
} as const);

/** Full route paths for programmatic navigation (with leading slash) */
export const ROUTE_URLS = Object.freeze({
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:slug',
  CATEGORIES: '/categories',
  CATEGORY_DETAIL: '/categories/:categoryId',
  SEARCH: '/search',
  NOT_FOUND: '/not-found',
  SERVER_ERROR: '/error',
  OFFLINE: '/offline',
  API_UNAVAILABLE: '/service-unavailable'
} as const);

/** Route parameter names */
export const ROUTE_PARAMS = Object.freeze({
  SLUG: 'slug',
  CATEGORY_ID: 'categoryId'
} as const);

/** Route query parameter names */
export const ROUTE_QUERY_PARAMS = Object.freeze({
  CATEGORY: 'category',
  SEARCH: 'q',
  PAGE: 'page'
} as const);

/** Page titles for SEO — appended with app name by SeoService */
export const ROUTE_TITLES = Object.freeze({
  HOME: 'Home',
  PRODUCTS: 'Products',
  PRODUCT_DETAIL: '',
  CATEGORIES: 'Categories',
  SEARCH: 'Search',
  NOT_FOUND: 'Page Not Found',
  SERVER_ERROR: 'Server Error',
  OFFLINE: 'Offline',
  API_UNAVAILABLE: 'Service Unavailable'
} as const);

/**
 * Builds a product detail URL by replacing the :slug parameter.
 * This is a pure utility — no Angular dependency.
 */
export function buildProductDetailUrl(slug: string): string {
  return ROUTE_URLS.PRODUCT_DETAIL.replace(':slug', slug);
}

/**
 * Builds a category products URL by replacing the :categoryId parameter.
 * This is a pure utility — no Angular dependency.
 */
export function buildCategoryUrl(categoryId: string): string {
  return ROUTE_URLS.CATEGORY_DETAIL.replace(':categoryId', categoryId);
}
