/**
 * Health Model
 *
 * Matches the output of HealthController.gs → handleHealth().
 * Backend endpoint: ?action=health
 *
 * The health endpoint returns via ResponseBuilder.success(), so the full
 * response type is ApiResponse<HealthData>. This interface represents
 * only the `data` payload within that envelope.
 *
 * HealthCheckResult is a convenience type that flattens envelope + data
 * for use by AppInitializerService after processing the raw response.
 */

/** The `data` payload returned by ?action=health */
export interface HealthData {
  readonly status: string;
  readonly buildDate: string;
  readonly buildNumber: string;
  readonly environment: string;
}

/**
 * Flattened health check result combining envelope and data fields.
 * Used by AppInitializerService after extracting from ApiResponse<HealthData>.
 */
export interface HealthCheckResult {
  readonly status: string;
  readonly apiVersion: string;
  readonly catalogVersion: number;
  readonly buildDate: string;
  readonly buildNumber: string;
  readonly environment: string;
  readonly timestamp: string;
  readonly requestId: string;
}
