/**
 * Environment — Production (explicit)
 *
 * Explicit production configuration file.
 * Identical to environment.ts (default) — exists for clarity in CI pipelines.
 *
 * Replaces environment.ts via fileReplacements in angular.json (production config).
 */

import { type AppConfig } from '../app/core/models/app-config.model';

export const environment: AppConfig = {
  production: true,
  apiBaseUrl:
    'https://script.google.com/macros/s/AKfycbz1SkY1eunuAdLMyzFW4BbG-fwIVx6VKbl6BHk1lA9jcU9Bzw9ERc674TmNKeE2-QvcXg/exec',
  imageBaseUrl: 'https://drive.google.com/thumbnail',
  appName: 'DK Tools',
  appVersion: '1.0.0',
  enableLogging: false,
  enableAnalytics: true,
  enableDebugTools: false,
  requestTimeout: 15000,
  retryCount: 2
};
