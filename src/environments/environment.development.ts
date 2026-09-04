/**
 * Environment — Development
 *
 * Build-time configuration for local development.
 * Runtime overrides come from assets/config.json via RuntimeConfigService.
 *
 * Replaces environment.ts via fileReplacements in angular.json (development config).
 */

import { type AppConfig } from '../app/core/models/app-config.model';

export const environment: AppConfig = {
  production: false,
  apiBaseUrl:
    'https://script.google.com/macros/s/AKfycbxOwPnsvmkfYFbS45shoKF378Ws4yncVDIs8jG-Z7UGln6KFFtC_00tPFlEHb4htSMCCg/exec',
  imageBaseUrl: 'https://drive.google.com/thumbnail',
  appName: 'DK Tools',
  appVersion: '1.0.0-dev',
  enableLogging: true,
  enableAnalytics: false,
  enableDebugTools: true,
  requestTimeout: 30000,
  retryCount: 1
};
