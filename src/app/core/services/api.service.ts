/**
 * API Service
 *
 * Single HTTP abstraction layer for the Google Apps Script backend.
 * Responsibilities:
 *   - Build request URL with action query parameter
 *   - Attach additional query parameters
 *   - Return strongly typed Observable<ApiResponse<T>>
 *
 * This service does NOT:
 *   - Cache responses (interceptors handle that)
 *   - Retry failed requests (retry interceptor handles that)
 *   - Unwrap the response envelope (feature services do that)
 *   - Contain business logic
 *
 * Base URL source: environment configuration (build-time per target).
 */

import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { type Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment';
import { RuntimeConfigService } from '../../platform/services/runtime-config.service';
import { API_PARAMS } from '../constants';
import { type ApiResponse } from '../models';

/**
 * Typed error thrown when the API returns success: false.
 * Carries the error code and requestId for tracing.
 */
export class ApiRequestError extends Error {
  override readonly name = 'ApiRequestError';

  constructor(
    readonly code: string,
    message: string,
    readonly requestId: string
  ) {
    super(message);
  }
}

/**
 * RxJS operator that unwraps ApiResponse<T> into Observable<T>.
 * Throws ApiRequestError if the response indicates failure.
 *
 * Usage:
 *   this.api.get<Product[]>(action).pipe(unwrapResponse())
 */
export function unwrapResponse<T>() {
  return (source: Observable<ApiResponse<T>>): Observable<T> =>
    source.pipe(
      map(response => {
        if (response.success) {
          return response.data;
        }
        throw new ApiRequestError(response.error.code, response.error.message, response.requestId);
      })
    );
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly runtimeConfig = inject(RuntimeConfigService);

  /** Resolve API base URL: prefer runtime config (loaded from config.json), fall back to build-time environment */
  private get baseUrl(): string {
    return this.runtimeConfig.apiUrl || environment.apiBaseUrl;
  }

  /**
   * Performs a GET request to the GAS backend.
   *
   * @param action - The API action name (from API_ACTIONS constant)
   * @param params - Optional additional query parameters
   * @returns Observable of the raw API response envelope
   */
  get<T>(action: string, params?: Record<string, string>): Observable<ApiResponse<T>> {
    let httpParams = new HttpParams().set(API_PARAMS.ACTION, action);

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        httpParams = httpParams.set(key, value);
      }
    }

    return this.http.get<ApiResponse<T>>(this.baseUrl, { params: httpParams });
  }
}
