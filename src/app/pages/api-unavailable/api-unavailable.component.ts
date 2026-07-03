/**
 * API Unavailable Component
 *
 * Shown when the backend API is unreachable (5xx, network timeout, server unavailable).
 * Implements automatic retry with exponential backoff and a visible countdown.
 */

import {
  Component,
  ChangeDetectionStrategy,
  inject,
  signal,
  type OnInit,
  type OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ROUTE_URLS } from '../../core/constants';
import { HealthService } from '../../core/services/health.service';

@Component({
  selector: 'app-api-unavailable',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatProgressBarModule],
  template: `
    <div class="error-page">
      <div class="error-page__content">
        <mat-icon class="error-page__icon">cloud_off</mat-icon>
        <h1 class="error-page__title">Service Unavailable</h1>
        <p class="error-page__description">
          We're having trouble connecting to our servers. This is usually temporary — we'll retry
          automatically.
        </p>

        @if (retrying()) {
          <div class="error-page__retry-info">
            <mat-progress-bar mode="indeterminate"></mat-progress-bar>
            <p class="error-page__countdown">
              Retrying in {{ countdown() }}s (attempt {{ attempt() }}/{{ maxAttempts }})
            </p>
          </div>
        }

        <div class="error-page__actions">
          <button mat-raised-button color="primary" (click)="retryNow()">
            <mat-icon>refresh</mat-icon>
            Retry Now
          </button>
          <button mat-stroked-button (click)="goHome()">
            <mat-icon>home</mat-icon>
            Go Home
          </button>
          <button mat-stroked-button (click)="contactSupport()">
            <mat-icon>support_agent</mat-icon>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
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
        color: var(--mat-sys-error, #f57c00);
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
      .error-page__retry-info {
        margin-bottom: 2rem;
      }
      .error-page__countdown {
        margin-top: 0.75rem;
        font-size: 0.875rem;
        color: var(--mat-sys-on-surface-variant, #888);
      }
      .error-page__actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiUnavailableComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly healthService = inject(HealthService);

  protected readonly retrying = signal(true);
  protected readonly countdown = signal(5);
  protected readonly attempt = signal(1);
  protected readonly maxAttempts = 5;

  private countdownTimer: ReturnType<typeof setInterval> | null = null;
  private retryTimer: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.startRetryCountdown();
  }

  ngOnDestroy(): void {
    this.clearTimers();
  }

  protected retryNow(): void {
    this.clearTimers();
    this.checkHealth();
  }

  protected goHome(): void {
    this.clearTimers();
    this.router.navigateByUrl(ROUTE_URLS.HOME);
  }

  protected contactSupport(): void {
    window.open('mailto:support@example.com?subject=API Unavailable', '_blank');
  }

  private startRetryCountdown(): void {
    const delay = this.getBackoffDelay();
    this.countdown.set(Math.ceil(delay / 1000));
    this.retrying.set(true);

    this.countdownTimer = setInterval(() => {
      const current = this.countdown();
      if (current <= 1) {
        this.clearTimers();
        this.checkHealth();
      } else {
        this.countdown.set(current - 1);
      }
    }, 1000);
  }

  private checkHealth(): void {
    this.healthService.checkHealth().subscribe({
      next: () => {
        this.retrying.set(false);
        this.router.navigateByUrl(ROUTE_URLS.HOME);
      },
      error: () => {
        if (this.attempt() < this.maxAttempts) {
          this.attempt.update(a => a + 1);
          this.startRetryCountdown();
        } else {
          this.retrying.set(false);
        }
      }
    });
  }

  private getBackoffDelay(): number {
    return Math.min(5000 * Math.pow(2, this.attempt() - 1), 30000);
  }

  private clearTimers(): void {
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = null;
    }
    if (this.retryTimer) {
      clearTimeout(this.retryTimer);
      this.retryTimer = null;
    }
  }
}
