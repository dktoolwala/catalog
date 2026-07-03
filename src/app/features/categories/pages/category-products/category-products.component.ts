/**
 * Category Products Page (Smart Component)
 *
 * Displays products filtered to the selected category.
 *
 * Orchestrates:
 *   - Resolver pre-loads category data before render
 *   - Reads :categoryId from URL
 *   - Shows category name as page header
 *   - Displays ProductGrid (reused from Products feature)
 *   - Supports browser refresh (resolver ensures data is loaded)
 *   - Shows loading, empty, and error states
 *
 * Architecture:
 *   Resolver → CategoryStateService.loadCategory(id)
 *   Page → reads state signals → delegates to presentation components
 */

import { Component, ChangeDetectionStrategy, inject, type OnDestroy } from '@angular/core';

import { type Product } from '../../../../core/models';
import {
  PageHeaderComponent,
  LoadingSpinnerComponent,
  EmptyStateComponent,
  ErrorStateComponent
} from '../../../../shared/components';
import { ProductGridComponent } from '../../../products/components/product-grid/product-grid.component';
import { ProductToolbarComponent } from '../../../products/components/product-toolbar/product-toolbar.component';
import { CategoryFacade } from '../../application';
import { CategorySidebarComponent } from '../../components/category-sidebar/category-sidebar.component';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [
    PageHeaderComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    ProductGridComponent,
    ProductToolbarComponent,
    CategorySidebarComponent
  ],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryProductsComponent implements OnDestroy {
  protected readonly state = inject(CategoryFacade);

  protected onProductSelected(product: Product): void {
    this.state.navigateToProduct(product);
  }

  protected onRetry(): void {
    this.state.retryProducts();
  }

  ngOnDestroy(): void {
    this.state.clearSelection();
  }
}
