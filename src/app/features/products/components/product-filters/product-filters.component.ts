/**
 * Product Filters Component
 *
 * Contains search input and category dropdown.
 * Presentation only — receives data as inputs, emits changes as outputs.
 * Uses SearchBoxComponent from shared for debounced search.
 */

import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect, MatOption } from '@angular/material/select';

import { type Category } from '../../../../core/models';
import { SearchBoxComponent } from '../../../../shared/components';

@Component({
  selector: 'app-product-filters',
  standalone: true,
  imports: [MatFormField, MatLabel, MatSelect, MatOption, SearchBoxComponent],
  templateUrl: './product-filters.component.html',
  styleUrl: './product-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFiltersComponent {
  /** Available categories for the dropdown */
  readonly categories = input.required<readonly Category[]>();

  /** Currently selected category ID */
  readonly selectedCategory = input<string | null>(null);

  /** Emitted when the search term changes (debounced) */
  readonly searchChange = output<string>();

  /** Emitted when the category selection changes */
  readonly categoryChange = output<string | null>();

  protected onCategoryChange(value: string | null): void {
    this.categoryChange.emit(value);
  }
}
