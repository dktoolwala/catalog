/**
 * Offline Component
 *
 * Shown when the browser loses internet connectivity.
 * Automatically navigates back when connection is restored.
 */

import { Component, ChangeDetectionStrategy, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ROUTE_URLS } from '../../core/constants';

@Component({
  selector: 'app-offline',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `
    <div class="error-page">
      <div class="error-page__content">
        <mat-icon class="error-page__icon">wifi_off</mat-icon>
        <h1 class="error-page__title">You're Offline</h1>
        <p class="error-page__description">
          It looks like you've lost your internet connection.
          The page will automatically reload once you're back online.
        </p>
        @if (isOnline()) {
          <p class="error-page__status error-page__status--online">
            <mat-icon>wifi</mat-icon> Connection restored! Redirecting...
          </p>
        }
        <div class="error-page__actions">
          <button mat-raised-button color="primary" (click)="retry()">
            <mat-icon>refresh</mat-icon>
            Retry
          </button>
          <button mat-stroked-button (click)="goHome()">
            <mat-icon>home</mat-icon>
            Go Home
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .error-page {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      padding: 2rem;
      text-align: center;
    }
    .error-page__content {
      max-width: 480px;
    }
    .error-page__icon {
      font-size: 72px;
      width: 72px;
      height: 72px;
      color: var(--mat-sys-tertiary, #757575);
      margin-bottom: 1.5rem;
    }
    .error-page__title {
      font-size: 1.75rem;
      font-weight: 500;
      margin-bottom: 0.75rem;
      color: var(--mat-sys-on-surface, #1a1a1a);
    }
    .error-page__description {
      font-size: 1rem;
      color: var(--mat-sys-on-surface-variant, #666);
      margin-bottom: 2rem;
      line-height: 1.6;
    }
    .error-page__status {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
      font-weight: 500;
    }
    .error-page__status--online {
      color: var(--mat-sys-primary, #4caf50);
    }
    .error-page__actions {
      display: flex;
      gap: 0.75rem;
      justify-content: center;
      flex-wrap: wrap;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OfflineComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  protected readonly isOnline = signal(navigator.onLine);
  private onlineHandler = () => this.handleOnline();
  private offlineHandler = () => this.isOnline.set(false);

  ngOnInit(): void {
    window.addEventListener('online', this.onlineHandler);
    window.addEventListener('offline', this.offlineHandler);
  }

  ngOnDestroy(): void {
    window.removeEventListener('online', this.onlineHandler);
    window.removeEventListener('offline', this.offlineHandler);
  }

  protected retry(): void {
    if (navigator.onLine) {
      this.router.navigateByUrl(ROUTE_URLS.HOME);
    } else {
      window.location.reload();
    }
  }

  protected goHome(): void {
    this.router.navigateByUrl(ROUTE_URLS.HOME);
  }

  private handleOnline(): void {
    this.isOnline.set(true);
    setTimeout(() => this.router.navigateByUrl(ROUTE_URLS.HOME), 1500);
  }
}
