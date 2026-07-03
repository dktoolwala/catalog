/**
 * API Response Models
 *
 * Matches the output of ResponseBuilder.gs → success(data) and error(code, message).
 * Every endpoint returns this envelope structure. The HTTP status is always 200;
 * success/failure is indicated by the `success` boolean field.
 *
 * Usage:
 *   ApiResponse<Product[]>   → getProducts
 *   ApiResponse<Product>     → getProduct
 *   ApiResponse<Category[]>  → getCategories
 *   ApiResponse<Settings>    → getSettings
 *   ApiResponse<HealthData>  → health
 */

/** Successful API response envelope */
export interface ApiSuccessResponse<T> {
  readonly success: true;
  readonly apiVersion: string;
  readonly catalogVersion: number;
  readonly requestId: string;
  readonly timestamp: string;
  readonly data: T;
}

/** Error detail object within the error response */
export interface ApiError {
  readonly code: string;
  readonly message: string;
}

/** Failed API response envelope */
export interface ApiErrorResponse {
  readonly success: false;
  readonly apiVersion: string;
  readonly catalogVersion: number;
  readonly requestId: string;
  readonly timestamp: string;
  readonly error: ApiError;
}

/**
 * Discriminated union of all possible API responses.
 * Use `response.success` as the type guard to narrow to success or error.
 *
 * Example:
 *   if (response.success) {
 *     // TypeScript knows response.data exists
 *   } else {
 *     // TypeScript knows response.error exists
 *   }
 */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
