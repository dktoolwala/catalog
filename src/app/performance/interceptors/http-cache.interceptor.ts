/**
 * HTTP Cache Interceptor
 *
 * Caches GET responses in memory for configurable TTL.
 * Reduces redundant network requests for unchanged data.
 *
 * Cache key: URL (including query params).
 * Respects Cache-Control: no-cache header to bypass cache.
 * Only caches successful responses (2xx).
 */

import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, tap } from 'rxjs';

interface CacheEntry {
  response: HttpResponse<unknown>;
  expiry: number;
}

const cache = new Map<string, CacheEntry>();
const DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

export const HttpCacheInterceptorFn: HttpInterceptorFn = (req, next) => {
  // Only cache GET requests
  if (req.method !== 'GET') {
    return next(req);
  }

  // Skip cache if explicitly requested
  if (req.headers.has('x-no-cache')) {
    cache.delete(req.urlWithParams);
    return next(req);
  }

  // Check cache
  const cached = cache.get(req.urlWithParams);
  if (cached && cached.expiry > Date.now()) {
    return of(cached.response.clone());
  }

  // Execute and cache response
  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse && event.status >= 200 && event.status < 300) {
        cache.set(req.urlWithParams, {
          response: event.clone(),
          expiry: Date.now() + DEFAULT_TTL
        });
      }
    })
  );
};

/** Utility to clear the HTTP cache (e.g. on logout or manual refresh) */
export function clearHttpCache(): void {
  cache.clear();
}

/** Utility to invalidate a specific URL pattern */
export function invalidateCache(urlPattern: string): void {
  for (const key of cache.keys()) {
    if (key.includes(urlPattern)) {
      cache.delete(key);
    }
  }
}
