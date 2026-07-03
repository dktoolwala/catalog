/**
 * Global Error Handler
 *
 * Replaces Angular's default ErrorHandler to catch all uncaught exceptions.
 * Registered in app.config.ts via { provide: ErrorHandler, useClass: GlobalErrorHandler }.
 *
 * Responsibilities:
 *   - Catch uncaught errors (sync throws, unhandled promise rejections)
 *   - Forward to ErrorService for processing
 *   - Navigate to appropriate error page based on error type
 *   - Log errors via LoggerService pattern
 *
 * Does NOT:
 *   - Display alerts or dialogs
 *   - Reload the application
 *   - Swallow errors silently
 */

import { type ErrorHandler, Injectable, inject, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { ErrorService } from './error.service';
import { ROUTE_URLS } from '../constants';
import { environment } from '../../../environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private readonly errorService = inject(ErrorService);
  private readonly router = inject(Router);
  private readonly zone = inject(NgZone);

  handleError(error: unknown): void {
    const unwrapped = this.unwrapError(error);

    this.errorService.handleError(unwrapped);

    if (environment.enableLogging) {
      console.error('[GlobalErrorHandler]', unwrapped);
    }

    this.navigateToErrorPage(unwrapped);
  }

  /** Angular sometimes wraps errors — extract the root cause */
  private unwrapError(error: unknown): unknown {
    if (error && typeof error === 'object' && 'rejection' in error) {
      return (error as { rejection: unknown }).rejection;
    }
    return error;
  }

  /** Navigate to the appropriate error page based on error classification */
  private navigateToErrorPage(error: unknown): void {
    // Avoid navigation loops if already on an error page
    const currentUrl = this.router.url;
    const errorPages = [ROUTE_URLS.SERVER_ERROR, ROUTE_URLS.OFFLINE, ROUTE_URLS.API_UNAVAILABLE];
    if (errorPages.some(page => currentUrl.startsWith(page))) {
      return;
    }

    let targetUrl: string | null = null;

    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        targetUrl = navigator.onLine ? ROUTE_URLS.API_UNAVAILABLE : ROUTE_URLS.OFFLINE;
      } else if (error.status >= 500) {
        targetUrl = ROUTE_URLS.API_UNAVAILABLE;
      }
    } else if (!navigator.onLine) {
      targetUrl = ROUTE_URLS.OFFLINE;
    }

    if (targetUrl) {
      const url = targetUrl;
      this.zone.run(() => this.router.navigateByUrl(url));
    }
  }
}
