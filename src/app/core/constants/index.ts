/**
 * Constants Barrel Export
 *
 * All constants are re-exported from this single entry point.
 * Consumers should import from '@core/constants' (path alias)
 * or '../../core/constants' (relative) — never from individual files.
 */

export {
  API_ACTIONS,
  API_PARAMS,
  API_HEADERS,
  API_TIMEOUTS,
  API_RESPONSE_KEYS,
  API_ERROR_KEYS,
  API_RETRY,
  HTTP_METHODS
} from './api.constants';

export {
  APP_INFO,
  PAGINATION,
  CURRENCY,
  DATE_FORMATS,
  IMAGES,
  WHATSAPP,
  COMPANY,
  SEARCH,
  STORAGE_KEYS,
  CACHE_TTL
} from './app.constants';

export {
  ROUTE_PATHS,
  ROUTE_URLS,
  ROUTE_PARAMS,
  ROUTE_QUERY_PARAMS,
  ROUTE_TITLES,
  buildProductDetailUrl,
  buildCategoryUrl
} from './route.constants';

export type { ThemeMode } from './theme.constants';
export {
  THEME_MODES,
  THEME_CLASSES,
  THEME_CSS_PREFIX,
  THEME_STORAGE_KEY,
  DARK_MODE_MEDIA_QUERY,
  BREAKPOINTS,
  BREAKPOINT_QUERIES,
  ANIMATION_DURATIONS,
  ANIMATION_EASINGS,
  Z_INDEX
} from './theme.constants';
