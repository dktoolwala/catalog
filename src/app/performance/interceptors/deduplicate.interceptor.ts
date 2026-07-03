/**
 * Request Deduplication Interceptor
 *
 * Prevents duplicate simultaneous GET requests to the same URL.
 * If a request is already in flight, subsequent identical requests
 * share the same response Observable instead of making new HTTP calls.
 *
 * Useful when multiple components load the same data on init.
 */

import { type HttpInterceptorFn, type HttpEvent } from '@angular/common/http';
import { type Observable, share, finalize } from 'rxjs';

const inFlight = new Map<string, Observable<HttpEvent<unknown>>>();

export const DeduplicateInterceptorFn: HttpInterceptorFn = (req, next) => {
  // Only deduplicate GET requests
  if (req.method !== 'GET') {
    return next(req);
  }

  const key = req.urlWithParams;
  const existing = inFlight.get(key);

  if (existing) {
    return existing;
  }

  const shared$ = next(req).pipe(
    share(),
    finalize(() => inFlight.delete(key))
  );

  inFlight.set(key, shared$);
  return shared$;
};
