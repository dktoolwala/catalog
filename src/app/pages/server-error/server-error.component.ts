/**
 * Server Error Component (500)
 *
 * Shown on unexpected application errors.
 * Provides retry and navigate home actions.
 */

import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ROUTE_URLS } from '../../core/constants';

@Component({
  selector: 'app-server-error',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `
    <div class="error-page">
      <div class="error-page__content">
        <mat-icon class="error-page__icon">error_outline</mat-icon>
        <h1 class="error-page__title">Something Went Wrong</h1>
        <p class="error-page__description">
          An unexpected error occurred. Our team has been notified and is working on a fix.
        </p>
        <div class="error-page__actions">
          <button mat-raised-button color="primary" (click)="retry()">
            <mat-icon>refresh</mat-icon>
            Try Again
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
        color: var(--mat-sys-error, #d32f2f);
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
export class ServerErrorComponent {
  private readonly router = inject(Router);

  protected retry(): void {
    window.location.reload();
  }

  protected goHome(): void {
    this.router.navigateByUrl(ROUTE_URLS.HOME);
  }

  protected contactSupport(): void {
    window.open('mailto:support@example.com?subject=Application Error', '_blank');
  }
}
