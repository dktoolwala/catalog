/**
 * Home Placeholder Component
 *
 * Temporary landing page shown at the root route.
 * Will be replaced with a proper home/hero page when that feature is built.
 * Uses EmptyStateComponent for consistent styling.
 *
 * No HTTP calls. No business logic.
 */

import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

import { ROUTE_URLS } from '../../core/constants';

@Component({
  selector: 'app-home-placeholder',
  standalone: true,
  imports: [RouterLink, MatIcon],
  templateUrl: './home-placeholder.component.html',
  styleUrl: './home-placeholder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePlaceholderComponent {
  private readonly router = inject(Router);

  protected browseProducts(): void {
    this.router.navigateByUrl(ROUTE_URLS.PRODUCTS);
  }

  protected browseCategories(): void {
    this.router.navigateByUrl(ROUTE_URLS.CATEGORIES);
  }

  protected goToSearch(): void {
    this.router.navigateByUrl(ROUTE_URLS.SEARCH);
  }
}
