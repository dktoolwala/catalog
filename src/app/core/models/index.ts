/**
 * Models Barrel Export
 *
 * All model interfaces are re-exported from this single entry point.
 * Consumers should import from '@core/models' (path alias)
 * or '../models' (relative) — never from individual files.
 */

export type { AppConfig } from './app-config.model';
export type { Product } from './product.model';
export type { Category } from './category.model';
export type { Settings } from './settings.model';
export type {
  ApiSuccessResponse,
  ApiError,
  ApiErrorResponse,
  ApiResponse
} from './api-response.model';
export type { HealthData, HealthCheckResult } from './health.model';
