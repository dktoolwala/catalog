/**
 * Runtime Configuration Model
 *
 * Loaded from assets/config.json at bootstrap.
 * Allows environment-specific overrides without rebuilding.
 */

export interface RuntimeConfig {
  readonly apiUrl: string;
  readonly production: boolean;
  readonly logLevel: 'debug' | 'info' | 'warn' | 'error' | 'none';
  readonly appTitle: string;
  readonly appDescription: string;
  readonly baseUrl: string;
  readonly features: {
    readonly pwa: boolean;
    readonly analytics: boolean;
    readonly structuredData: boolean;
  };
}

export const DEFAULT_RUNTIME_CONFIG: RuntimeConfig = {
  apiUrl: '',
  production: false,
  logLevel: 'info',
  appTitle: 'Product Catalog',
  appDescription: 'Browse and discover our complete product catalog',
  baseUrl: 'https://localhost:4200',
  features: {
    pwa: false,
    analytics: false,
    structuredData: true
  }
};
