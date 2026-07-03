/**
 * Services Barrel Export
 *
 * All services are re-exported from this single entry point.
 * Consumers should import from '@core/services' (path alias)
 * or '../services' (relative) — never from individual files.
 */

export { ApiService, ApiRequestError, unwrapResponse } from './api.service';
export { ProductService } from './product.service';
export { CategoryService } from './category.service';
export { SettingsService } from './settings.service';
export { HealthService } from './health.service';
