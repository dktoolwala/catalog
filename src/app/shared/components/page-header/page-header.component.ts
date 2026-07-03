/**
 * Page Header Component
 *
 * Reusable page-level heading with optional subtitle.
 * Uses content projection (ng-content) for:
 *   - [actions] slot: buttons, filters
 *   - [breadcrumbs] slot: navigation breadcrumbs
 *
 * No routing logic — parent provides content for slots.
 */

import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageHeaderComponent {
  /** Page title */
  readonly title = input.required<string>();

  /** Optional subtitle */
  readonly subtitle = input<string>('');
}
