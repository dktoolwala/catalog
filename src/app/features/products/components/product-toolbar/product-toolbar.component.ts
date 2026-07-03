/**
 * Product Toolbar Component
 *
 * Displays product count and filtering status.
 * Presentation only — receives counts as inputs.
 */

import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-product-toolbar',
  standalone: true,
  templateUrl: './product-toolbar.component.html',
  styleUrl: './product-toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductToolbarComponent {
  /** Number of products currently shown (after filtering) */
  readonly filteredCount = input.required<number>();

  /** Total number of products (before filtering) */
  readonly totalCount = input.required<number>();
}
