/**
 * AppConfig Interface
 *
 * Type-safe build-time environment configuration.
 * Every environment file must satisfy this contract.
 */

export interface AppConfig {
  readonly production: boolean;
  readonly apiBaseUrl: string;
  readonly imageBaseUrl: string;
  readonly appName: string;
  readonly appVersion: string;
  readonly enableLogging: boolean;
  readonly enableAnalytics: boolean;
  readonly enableDebugTools: boolean;
  readonly requestTimeout: number;
  readonly retryCount: number;
}
