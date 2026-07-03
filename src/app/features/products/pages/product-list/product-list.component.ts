/**
 * Product List Page (Smart Component)
 *
 * Orchestrates the product listing experience:
 *   - Loads products and categories on init
 *   - Connects filter/search inputs to state service
 *   - Shows loading, empty, and error states
 *   - Navigates to product detail on card click
 *
 * Injects ProductFacade as the single entry point.
 * Presentation is delegated to child components.
 */

import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';

import { Product } from '../../../../core/models';
import { PageHeaderComponent } from '../../../../shared/components';
import { LoadingSpinnerComponent } from '../../../../shared/components';
import { EmptyStateComponent } from '../../../../shared/components';
import { ErrorStateComponent } from '../../../../shared/components';
import { ProductFacade } from '../../application';
import { ProductGridComponent } from '../../components/product-grid/product-grid.component';
import { ProductFiltersComponent } from '../../components/product-filters/product-filters.component';
import { ProductToolbarComponent } from '../../components/product-toolbar/product-toolbar.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    PageHeaderComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    ProductGridComponent,
    ProductFiltersComponent,
    ProductToolbarComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit {
  protected readonly state = inject(ProductFacade);

  ngOnInit(): void {
    this.state.loadProducts();
    this.state.loadCategories();
  }

  protected onProductSelected(product: Product): void {
    this.state.navigateToProduct(product);
  }

  protected onRetry(): void {
    this.state.refresh();
  }
}
