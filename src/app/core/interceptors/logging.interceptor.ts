/**
 * Logging Interceptor
 *
 * Position: 2nd in the chain.
 * Logs HTTP request method, URL, status, and duration.
 * Only active when Angular is in development mode (isDevMode()).
 * In production builds, this interceptor is a no-op passthrough.
 *
 * Never modifies the request or response.
 */

import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { isDevMode } from '@angular/core';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  if (!isDevMode()) {
    return next(req);
  }

  const started = performance.now();

  return next(req).pipe(
    tap({
      next: event => {
        if (event instanceof HttpResponse) {
          const elapsed = Math.round(performance.now() - started);
          console.log(`[HTTP] ${req.method} ${req.urlWithParams} ${event.status} ${elapsed}ms`);
        }
      },
      error: error => {
        const elapsed = Math.round(performance.now() - started);
        const status = error?.status ?? 0;
        console.error(`[HTTP] ${req.method} ${req.urlWithParams} ${status} FAILED ${elapsed}ms`);
      }
    })
  );
};
