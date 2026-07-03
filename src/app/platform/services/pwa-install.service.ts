/**
 * PWA Install Service
 *
 * Manages the "Add to Home Screen" prompt (beforeinstallprompt).
 * Exposes a signal for UI to show/hide install button.
 */

import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PwaInstallService {
  private deferredPrompt: any = null;

  /** Whether the install prompt is available */
  readonly canInstall = signal(false);

  /** Whether the app is already installed */
  readonly isInstalled = signal(false);

  /** Initialize listeners */
  initialize(): void {
    window.addEventListener('beforeinstallprompt', (event: Event) => {
      event.preventDefault();
      this.deferredPrompt = event;
      this.canInstall.set(true);
    });

    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
      this.canInstall.set(false);
      this.isInstalled.set(true);
    });

    // Check if already in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.isInstalled.set(true);
    }
  }

  /** Trigger the install prompt */
  async promptInstall(): Promise<boolean> {
    if (!this.deferredPrompt) return false;

    this.deferredPrompt.prompt();
    const result = await this.deferredPrompt.userChoice;
    this.deferredPrompt = null;
    this.canInstall.set(false);

    return result.outcome === 'accepted';
  }
}
