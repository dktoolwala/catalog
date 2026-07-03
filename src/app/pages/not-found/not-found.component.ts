/**
 * Not Found Component
 *
 * 404 page displayed for unknown routes.
 * Provides Home, Back, and Search actions.
 * Wildcard routes redirect here.
 */

import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ROUTE_URLS } from '../../core/constants';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  template: `
    <div class="error-page">
      <div class="error-page__content">
        <mat-icon class="error-page__icon">search_off</mat-icon>
        <h1 class="error-page__title">Page Not Found</h1>
        <p class="error-page__description">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div class="error-page__actions">
          <button mat-raised-button color="primary" (click)="goHome()">
            <mat-icon>home</mat-icon>
            Go Home
          </button>
          <button mat-stroked-button (click)="goBack()">
            <mat-icon>arrow_back</mat-icon>
            Go Back
          </button>
          <button mat-stroked-button (click)="goSearch()">
            <mat-icon>search</mat-icon>
            Search
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
    .error-page__actions {
      display: flex;
      gap: 0.75rem;
      justify-content: center;
      flex-wrap: wrap;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  protected goHome(): void {
    this.router.navigateByUrl(ROUTE_URLS.HOME);
  }

  protected goBack(): void {
    this.location.back();
  }

  protected goSearch(): void {
    this.router.navigateByUrl(ROUTE_URLS.SEARCH);
  }
}
