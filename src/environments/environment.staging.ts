/**
 * Environment — Staging
 *
 * Build-time configuration for staging/QA environment.
 * Mirrors production settings with additional diagnostics enabled.
 *
 * Replaces environment.ts via fileReplacements in angular.json (staging config).
 */

import { type AppConfig } from '../app/core/models/app-config.model';

export const environment: AppConfig = {
  production: false,
  apiBaseUrl:
    'https://script.google.com/macros/s/AKfycbxOwPnsvmkfYFbS45shoKF378Ws4yncVDIs8jG-Z7UGln6KFFtC_00tPFlEHb4htSMCCg/exec',
  imageBaseUrl: 'https://drive.google.com/thumbnail',
  appName: 'DK Tools',
  appVersion: '1.0.0-staging',
  enableLogging: true,
  enableAnalytics: true,
  enableDebugTools: false,
  requestTimeout: 20000,
  retryCount: 2
};
