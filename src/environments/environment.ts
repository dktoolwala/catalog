/**
 * Environment — Production
 *
 * Build-time configuration for production.
 * Runtime overrides come from assets/config.json via RuntimeConfigService.
 *
 * This is the DEFAULT environment used when no fileReplacement is configured.
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
