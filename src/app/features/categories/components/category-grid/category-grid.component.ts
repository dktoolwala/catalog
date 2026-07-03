/**
 * Category Grid Component
 *
 * Responsive CSS Grid layout for category cards.
 * Receives an array of CategoryWithCount and renders CategoryCardComponents.
 * Uses @for with track by category.id for optimal DOM reconciliation.
 *
 * Presentation only — no services, no HTTP.
 */

import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

import { type Category } from '../../../../core/models';
import { type CategoryWithCount } from '../../models';
import { CategoryCardComponent } from '../category-card/category-card.component';

@Component({
  selector: 'app-category-grid',
  standalone: true,
  imports: [CategoryCardComponent],
  templateUrl: './category-grid.component.html',
  styleUrl: './category-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryGridComponent {
  /** Array of categories with their product counts */
  readonly categories = input.required<readonly CategoryWithCount[]>();

  /** Emitted when a category card is selected */
  readonly categorySelected = output<Category>();
}
