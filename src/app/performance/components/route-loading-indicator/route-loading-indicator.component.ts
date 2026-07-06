/**
 * Route Loading Indicator Component
 *
 * Shows a top-bar loading indicator during route transitions.
 * Listens to Router events (NavigationStart/End/Cancel/Error).
 * Uses CSS transform for GPU-accelerated animation.
 */

import { Component, ChangeDetectionStrategy, inject, signal, DestroyRef } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-route-loading-indicator',
  standalone: true,
  template: `
    @if (loading()) {
      <div class="route-loading" role="progressbar" aria-label="Loading page">
        <div class="route-loading__bar"></div>
      </div>
    }
  `,
  styles: [
    `
      .route-loading {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        z-index: 9999;
        overflow: hidden;
      }

      .route-loading__bar {
        height: 100%;
        background: var(--mat-sys-primary, #1976d2);
        animation: loading 1.5s ease-in-out infinite;
        transform-origin: left;
      }

      @keyframes loading {
        0% {
          transform: translateX(-100%) scaleX(0.3);
        }
        40% {
          transform: translateX(20%) scaleX(0.6);
        }
        100% {
          transform: translateX(100%) scaleX(0.3);
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RouteLoadingIndicatorComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly loading = signal(false);

  constructor() {
    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading.set(true);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loading.set(false);
      }
    });
  }
}
