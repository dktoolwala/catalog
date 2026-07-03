/**
 * Category Sidebar Component
 *
 * Reusable navigation list for category browsing.
 * Highlights the active category using RouterLinkActive.
 * Uses Angular Router integration for navigation.
 *
 * Presentation-only — parent provides categories and route base.
 * No service injection.
 */

import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

import { type CategoryWithCount } from '../../models';

@Component({
  selector: 'app-category-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIcon],
  templateUrl: './category-sidebar.component.html',
  styleUrl: './category-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategorySidebarComponent {
  /** Categories with product counts to display */
  readonly categories = input.required<readonly CategoryWithCount[]>();

  /** The currently selected category ID (for non-router highlighting) */
  readonly activeCategoryId = input<string | null>(null);
}
