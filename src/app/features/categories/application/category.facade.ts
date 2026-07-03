/**
 * Category Facade
 *
 * Application layer entry point for the Categories feature.
 * This is the ONLY injectable that category pages should use.
 *
 * Responsibilities:
 *   - Exposes readonly signals from CategoryStateService
 *   - Executes feature actions (load, select, navigate)
 *   - Absorbs navigation logic from pages
 *   - Provides a stable API that hides internal state service details
 *   - Prepared for future analytics, caching strategies, and business workflows
 *
 * Architecture:
 *   CategoryPages → CategoryFacade → CategoryStateService → ProductStateService / CategoryService → Backend
 *
 * Rules:
 *   - Pages inject ONLY this facade
 *   - Presentation components remain unchanged (inputs/outputs)
 *   - State services are never exposed to pages
 */

import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Category, Product } from '../../../core/models';
import { ROUTE_URLS, buildProductDetailUrl } from '../../../core/constants';
import { CategoryStateService } from '../state';

@Injectable({ providedIn: 'root' })
export class CategoryFacade {
  private readonly state = inject(CategoryStateService);
  private readonly router = inject(Router);

  // ─── Exposed Signals (readonly) ──────────────────────────────

  readonly categories = this.state.categories;
  readonly selectedCategory = this.state.selectedCategory;
  readonly selectedCategoryId = this.state.selectedCategoryId;
  readonly categoriesWithCounts = this.state.categoriesWithCounts;
  readonly categoryCount = this.state.categoryCount;
  readonly products = this.state.products;
  readonly productCount = this.state.productCount;
  readonly loading = this.state.loading;
  readonly error = this.state.error;
  readonly productsLoading = this.state.productsLoading;
  readonly productsError = this.state.productsError;

  // ─── Actions ─────────────────────────────────────────────────

  /** Load all categories */
  loadCategories(): void {
    this.state.loadCategories();
  }

  /** Load products (for category count computation) */
  loadProducts(): void {
    this.state.loadProducts();
  }

  /** Load a category by ID (for resolvers) */
  loadCategory(categoryId: string): Observable<boolean> {
    return this.state.loadCategory(categoryId);
  }

  /** Select a category and filter products */
  selectCategory(categoryId: string): void {
    this.state.selectCategory(categoryId);
  }

  /** Clear category selection */
  clearSelection(): void {
    this.state.clearSelection();
  }

  /** Force reload categories */
  refresh(): void {
    this.state.refresh();
  }

  /** Retry loading products */
  retryProducts(): void {
    this.state.retryProducts();
  }

  /** Navigate to a category's products page */
  navigateToCategory(category: Category): void {
    this.router.navigate([ROUTE_URLS.CATEGORIES, category.id]);
  }

  /** Navigate to product detail */
  navigateToProduct(product: Product): void {
    this.router.navigateByUrl(buildProductDetailUrl(product.slug));
  }
}
