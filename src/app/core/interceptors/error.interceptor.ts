/**
 * Error Interceptor
 *
 * Position: 5th in the chain (innermost, closest to the server).
 * Catches HttpErrorResponse (network/CORS/timeout failures) and
 * forwards them to ErrorService for centralized processing.
 *
 * Does NOT handle API business errors (success: false in HTTP 200 body).
 * Those are handled by the unwrapResponse() operator in feature services.
 *
 * Always re-throws the error so upstream interceptors (retry) can act on it.
 * Never displays UI.
 */

import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { ErrorService } from '../error';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const errorService = inject(ErrorService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const code = classifyHttpError(error);
      errorService.setError(code, error.message);
      return throwError(() => error);
    })
  );
};

/** Classify an HttpErrorResponse into an application error code */
function classifyHttpError(error: HttpErrorResponse): string {
  if (error.status === 0) {
    return 'NETWORK_ERROR';
  }
  if (error.status === 408) {
    return 'TIMEOUT_ERROR';
  }
  return `HTTP_${error.status}`;
}
