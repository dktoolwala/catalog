/**
 * Settings State Service
 *
 * Central, app-wide cache for backend Settings (loaded once, shared by all
 * consumers via Angular Signals) so features don't each issue their own
 * getSettings() HTTP call.
 */

import { Injectable, computed, inject, signal } from '@angular/core';

import { type Settings } from '../models';
import { SettingsService } from '../services';

@Injectable({ providedIn: 'root' })
export class SettingsStateService {
  private readonly settingsService = inject(SettingsService);

  private readonly _settings = signal<Settings | null>(null);
  private readonly _loading = signal(false);

  readonly settings = this._settings.asReadonly();
  readonly loading = this._loading.asReadonly();

  /** Whether prices should be displayed; defaults to true until settings load or if unset */
  readonly showPrices = computed(() => this._settings()?.showPrices ?? true);

  /** Load settings once (fire-and-forget, updates signals). No-op if already loaded/loading. */
  loadSettings(): void {
    if (this._settings() !== null || this._loading()) {
      return;
    }

    this._loading.set(true);
    this.settingsService.getSettings().subscribe({
      next: settings => {
        this._settings.set(settings);
        this._loading.set(false);
      },
      error: () => {
        this._loading.set(false);
      }
    });
  }
}
