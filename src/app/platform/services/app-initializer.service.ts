/**
 * App Initializer Service
 *
 * Runs during APP_INITIALIZER phase before the app bootstraps.
 * Orchestrates all startup tasks in order:
 *   1. Load runtime config
 *   2. Initialize platform services (SEO defaults, canonical)
 *
 * Replaces the previous core AppInitializerService.
 */

import { Injectable, inject } from '@angular/core';

import { RuntimeConfigService } from './runtime-config.service';
import { SeoService } from './seo.service';
import { CanonicalUrlService } from './canonical-url.service';

@Injectable({ providedIn: 'root' })
export class AppInitializerService {
  private readonly runtimeConfig = inject(RuntimeConfigService);
  private readonly seo = inject(SeoService);
  private readonly canonical = inject(CanonicalUrlService);

  /**
   * Initialization sequence (called by provideAppInitializer).
   * Must return a Promise for Angular to await before bootstrap.
   */
  async initialize(): Promise<void> {
    // 1. Load runtime config (non-blocking on failure)
    await this.runtimeConfig.load();

    // 2. Set default SEO metadata
    this.seo.setDefaults();

    // 3. Initialize canonical URL tracking
    this.canonical.initialize();
  }
}
