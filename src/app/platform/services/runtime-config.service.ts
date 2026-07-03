/**
 * Runtime Config Service
 *
 * Loads configuration from assets/config.json before bootstrap.
 * Provides runtime-overridable settings without rebuilding the app.
 *
 * Used by AppInitializerService during APP_INITIALIZER phase.
 * Other services read config via the readonly `config` signal.
 */

import { Injectable, signal } from '@angular/core';

import { RuntimeConfig, DEFAULT_RUNTIME_CONFIG } from '../models';

@Injectable({ providedIn: 'root' })
export class RuntimeConfigService {
  private readonly _config = signal<RuntimeConfig>(DEFAULT_RUNTIME_CONFIG);
  private _loaded = false;

  /** Current runtime configuration (reactive) */
  readonly config = this._config.asReadonly();

  /** Whether config has been loaded */
  get loaded(): boolean {
    return this._loaded;
  }

  /** Shorthand accessors */
  get apiUrl(): string { return this._config().apiUrl; }
  get production(): boolean { return this._config().production; }
  get logLevel(): string { return this._config().logLevel; }
  get baseUrl(): string { return this._config().baseUrl; }
  get appTitle(): string { return this._config().appTitle; }

  /**
   * Load config from assets/config.json.
   * Uses document.baseURI to resolve the path correctly regardless of base href.
   * Falls back to defaults on failure (app remains functional).
   */
  async load(): Promise<void> {
    try {
      const configUrl = new URL('assets/config.json', document.baseURI).href;
      const response = await fetch(configUrl);
      if (response.ok) {
        const json = await response.json();
        this._config.set({ ...DEFAULT_RUNTIME_CONFIG, ...json });
      }
    } catch {
      // Non-critical — use defaults
    }
    this._loaded = true;
  }
}
