/**
 * PWA Update Service
 *
 * Monitors the Angular Service Worker for available updates.
 * Notifies users when a new version is available and handles the update flow.
 *
 * Uses Angular Signals for reactive update state.
 */

import { Injectable, inject, signal } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PwaUpdateService {
  private readonly swUpdate = inject(SwUpdate);

  /** Whether a new version is available */
  readonly updateAvailable = signal(false);

  /** Initialize update monitoring */
  initialize(): void {
    if (!this.swUpdate.isEnabled) return;

    this.swUpdate.versionUpdates.pipe(
      filter((event): event is VersionReadyEvent => event.type === 'VERSION_READY')
    ).subscribe(() => {
      this.updateAvailable.set(true);
    });
  }

  /** Activate the update and reload */
  async activateUpdate(): Promise<void> {
    if (!this.swUpdate.isEnabled) return;

    try {
      const success = await this.swUpdate.activateUpdate();
      if (success) {
        document.location.reload();
      }
    } catch {
      document.location.reload();
    }
  }

  /** Check for updates manually */
  async checkForUpdate(): Promise<void> {
    if (!this.swUpdate.isEnabled) return;
    await this.swUpdate.checkForUpdate();
  }
}
