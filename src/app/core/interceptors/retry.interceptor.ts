/**
 * Retry Interceptor
 *
 * Position: 4th in the chain.
 * Retries failed requests with exponential backoff.
 *
 * Retries ONLY:
 *   - Network failures (status 0)
 *   - HTTP 502 Bad Gateway
 *   - HTTP 503 Service Unavailable
 *   - HTTP 504 Gateway Timeout
 *
 * NEVER retries:
 *   - 4xx client errors (400, 401, 403, 404, 422, etc.)
 *   - 500 Internal Server Error (indicates a bug, not transient)
 *
 * Max retries: 2 (from API_RETRY constant)
 * Backoff: 1s → 2s (exponential, base from API_RETRY.RETRY_DELAY_MS)
 */

import { HttpInterceptorFn } from '@angular/common/http';
import { retry, timer } from 'rxjs';

import { API_RETRY } from '../constants';

/** Status codes that indicate a transient server/network issue */
const RETRYABLE_SERVER_CODES = new Set([502, 503, 504]);

export const retryInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    retry({
      count: API_RETRY.MAX_RETRIES,
      delay: (error, retryCount) => {
        const status: number = error?.status ?? 0;
        const isNetworkError = status === 0;
        const isRetryableServer = RETRYABLE_SERVER_CODES.has(status);

        if (!isNetworkError && !isRetryableServer) {
          throw error;
        }

        const backoffMs = API_RETRY.RETRY_DELAY_MS * Math.pow(2, retryCount - 1);
        return timer(backoffMs);
      }
    })
  );
};
