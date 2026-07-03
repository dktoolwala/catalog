/**
 * Error Service
 *
 * Central error processing hub for the application.
 * Responsibilities:
 *   - Receive errors from interceptors, GlobalErrorHandler, and services
 *   - Map API error codes to user-friendly messages
 *   - Expose a readonly signal with the latest error
 *   - Log errors to console
 *
 * Does NOT:
 *   - Display UI (SnackbarService does that, reading the error signal)
 *   - Import Angular Material
 *   - Import HttpClient or HttpErrorResponse
 */

import { Injectable, signal } from '@angular/core';

/** Application-level error representation */
export interface AppError {
  readonly code: string;
  readonly message: string;
  readonly timestamp: number;
}

/** Map of backend error codes → user-friendly messages */
const ERROR_MESSAGE_MAP: Readonly<Record<string, string>> = {
  // API validation errors (from GAS Constants.gs ERROR_CODES)
  INVALID_ACTION: 'The requested operation is not supported.',
  INVALID_SLUG: 'The product identifier is invalid.',
  INVALID_CATEGORY_ID: 'The category identifier is invalid.',
  INVALID_FEATURED_PARAM: 'The featured filter value is invalid.',
  INVALID_SEARCH_QUERY: 'Please enter a valid search term.',
  PRODUCT_NOT_FOUND: 'The requested product could not be found.',
  INTERNAL_ERROR: 'Something went wrong on the server. Please try again later.',
  METHOD_NOT_SUPPORTED: 'This operation is not supported.',

  // Client-side error codes
  NETWORK_ERROR: 'Unable to reach the server. Please check your internet connection.',
  TIMEOUT_ERROR: 'The request took too long. Please try again.',
  UNKNOWN_ERROR: 'An unexpected error occurred.'
};

@Injectable({ providedIn: 'root' })
export class ErrorService {
  private readonly _error = signal<AppError | null>(null);

  /** Readonly signal exposing the latest application error, or null */
  readonly error = this._error.asReadonly();

  /**
   * Process any error and update the error signal.
   * Handles ApiRequestError (by name check), Error, and unknown types.
   *
   * @param error - The caught error value
   */
  handleError(error: unknown): void {
    const appError = this.toAppError(error);
    this._error.set(appError);
    console.error(`[ErrorService] ${appError.code}: ${appError.message}`, error);
  }

  /**
   * Set an error from known code and message.
   * Used by interceptors that have already classified the error.
   *
   * @param code - Error code (e.g., 'NETWORK_ERROR')
   * @param message - Technical error message (fallback if code not mapped)
   */
  setError(code: string, message: string): void {
    const userMessage = this.getUserMessage(code) ?? message;
    const appError: AppError = { code, message: userMessage, timestamp: Date.now() };
    this._error.set(appError);
    console.error(`[ErrorService] ${code}: ${message}`);
  }

  /** Clear the current error */
  clearError(): void {
    this._error.set(null);
  }

  /**
   * Returns the user-friendly message for an error code.
   * Returns undefined if the code is not mapped.
   */
  getUserMessage(code: string): string | undefined {
    return ERROR_MESSAGE_MAP[code];
  }

  /** Convert an unknown error into a structured AppError */
  private toAppError(error: unknown): AppError {
    // ApiRequestError (identified by name to avoid importing from services layer)
    if (error instanceof Error && error.name === 'ApiRequestError') {
      const code = (error as Error & { code: string }).code;
      return {
        code,
        message: this.getUserMessage(code) ?? error.message,
        timestamp: Date.now()
      };
    }

    // Standard Error
    if (error instanceof Error) {
      return {
        code: 'UNKNOWN_ERROR',
        message: error.message,
        timestamp: Date.now()
      };
    }

    // Unknown
    return {
      code: 'UNKNOWN_ERROR',
      message: this.getUserMessage('UNKNOWN_ERROR') ?? 'An unexpected error occurred',
      timestamp: Date.now()
    };
  }
}
