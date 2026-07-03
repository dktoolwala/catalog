/**
 * Environment — Development
 *
 * Build-time configuration for local development.
 * Runtime overrides come from assets/config.json via RuntimeConfigService.
 *
 * Replaces environment.ts via fileReplacements in angular.json (development config).
 */

import { AppConfig } from '../app/core/models/app-config.model';

export const environment: AppConfig = {
  production: false,
  apiBaseUrl: 'https://script.google.com/macros/s/AKfycbz1SkY1eunuAdLMyzFW4BbG-fwIVx6VKbl6BHk1lA9jcU9Bzw9ERc674TmNKeE2-QvcXg/exec',
  imageBaseUrl: 'https://drive.google.com/thumbnail',
  appName: 'DK Tools',
  appVersion: '1.0.0-dev',
  enableLogging: true,
  enableAnalytics: false,
  enableDebugTools: true,
  requestTimeout: 30000,
  retryCount: 1
};
