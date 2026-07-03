/**
 * Offline Banner Component
 *
 * Shows a banner when the browser goes offline.
 * Automatically hides when connectivity is restored.
 * Uses browser online/offline events.
 */

import { Component, ChangeDetectionStrategy, signal, DestroyRef, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-offline-banner',
  standalone: true,
  imports: [MatIcon],
  template: `
    @if (offline()) {
      <div class="offline-banner" role="alert" aria-live="assertive">
        <mat-icon aria-hidden="true">cloud_off</mat-icon>
        <span>You are offline. Some features may be unavailable.</span>
      </div>
    }
  `,
  styles: [`
    .offline-banner {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      background: var(--mat-sys-error-container, #fdecea);
      color: var(--mat-sys-on-error-container, #5f2120);
      font-size: 0.875rem;
      font-weight: 500;
      z-index: 9998;
      box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfflineBannerComponent {
  protected readonly offline = signal(!navigator.onLine);

  private readonly destroyRef = inject(DestroyRef);
  private onlineHandler = () => this.offline.set(false);
  private offlineHandler = () => this.offline.set(true);

  constructor() {
    window.addEventListener('online', this.onlineHandler);
    window.addEventListener('offline', this.offlineHandler);

    this.destroyRef.onDestroy(() => {
      window.removeEventListener('online', this.onlineHandler);
      window.removeEventListener('offline', this.offlineHandler);
    });
  }
}
