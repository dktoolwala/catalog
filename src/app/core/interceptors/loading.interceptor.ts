/**
 * Loading Interceptor
 *
 * Position: 3rd in the chain.
 * Notifies LoadingService when requests start and complete.
 * Uses finalize() to guarantee the counter decrements on both
 * success and error — preventing leaked loading state.
 *
 * Concurrent-safe: each request independently increments/decrements.
 * Never modifies the request or response.
 */

import { type HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

import { LoadingService } from '../state';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  loadingService.begin();

  return next(req).pipe(finalize(() => loadingService.end()));
};
