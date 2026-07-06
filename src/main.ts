/**
 * Application Entry Point
 *
 * Bootstraps the Angular application with the root component and configuration.
 * Uses standalone bootstrap (no NgModule).
 */

import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/core/config/app.config';

bootstrapApplication(AppComponent, appConfig).catch(err =>
  console.error('Application bootstrap failed:', err)
);
