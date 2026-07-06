/**
 * PWA Update Banner Component
 *
 * Shows a notification banner when a new app version is available.
 * Provides a button to activate the update and reload.
 */

import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { PwaUpdateService } from '../../../platform/services/pwa-update.service';

@Component({
  selector: 'app-pwa-update-banner',
  standalone: true,
  imports: [MatButton, MatIcon],
  template: `
    @if (pwaUpdate.updateAvailable()) {
      <div class="update-banner" role="alert" aria-live="polite">
        <mat-icon aria-hidden="true">system_update</mat-icon>
        <span>A new version is available.</span>
        <button mat-flat-button color="primary" (click)="onUpdate()">Update Now</button>
      </div>
    }
  `,
  styles: [
    `
      .update-banner {
        position: fixed;
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1.25rem;
        background: var(--mat-sys-primary-container, #e3f2fd);
        color: var(--mat-sys-on-primary-container, #1565c0);
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        z-index: 9997;
        font-size: 0.875rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PwaUpdateBannerComponent {
  protected readonly pwaUpdate = inject(PwaUpdateService);

  protected onUpdate(): void {
    this.pwaUpdate.activateUpdate();
  }
}
