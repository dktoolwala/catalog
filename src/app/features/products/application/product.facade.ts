/**
 * Product Facade
 *
 * Application layer entry point for the Products feature.
 * This is the ONLY injectable that product pages should use.
 *
 * Responsibilities:
 *   - Exposes readonly signals from ProductStateService
 *   - Executes feature actions (load, refresh, navigate)
 *   - Absorbs navigation logic from pages
 *   - Provides a stable API that hides internal state service details
 *   - Prepared for future analytics, caching strategies, and business workflows
 *
 * Architecture:
 *   ProductPages → ProductFacade → ProductStateService → Core Services → Backend
 *
 * Rules:
 *   - Pages inject ONLY this facade
 *   - Presentation components remain unchanged (inputs/outputs)
 *   - State services are never exposed to pages
 */

import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { type Observable } from 'rxjs';

import { type Product } from '../../../core/models';
import { buildProductDetailUrl } from '../../../core/constants';
import { ProductStateService } from '../state';

@Injectable({ providedIn: 'root' })
export class ProductFacade {
  private readonly state = inject(ProductStateService);
  private readonly router = inject(Router);

  // ─── Exposed Signals (readonly) ──────────────────────────────

  readonly products = this.state.products;
  readonly selectedProduct = this.state.selectedProduct;
  readonly categories = this.state.categories;
  readonly loading = this.state.loading;
  readonly error = this.state.error;
  readonly searchTerm = this.state.searchTerm;
  readonly selectedCategory = this.state.selectedCategory;
  readonly filteredProducts = this.state.filteredProducts;
  readonly productCount = this.state.productCount;
  readonly totalCount = this.state.totalCount;

  // ─── Actions ─────────────────────────────────────────────────

  /** Load all products (cached, no-op if already loaded) */
  loadProducts(): void {
    this.state.loadProducts();
  }

  /** Load a single product by slug (for resolvers) */
  loadProduct(slug: string): Observable<boolean> {
    return this.state.loadProduct(slug);
  }

  /** Load categories for filter dropdown */
  loadCategories(): void {
    this.state.loadCategories();
  }

  /** Update the search filter */
  setSearchTerm(term: string): void {
    this.state.setSearchTerm(term);
  }

  /** Update the category filter */
  setSelectedCategory(categoryId: string | null): void {
    this.state.setSelectedCategory(categoryId);
  }

  /** Force reload products */
  refresh(): void {
    this.state.refresh();
  }

  /** Clear the selected product */
  clearSelectedProduct(): void {
    this.state.clearSelectedProduct();
  }

  /** Navigate to product detail */
  navigateToProduct(product: Product): void {
    this.router.navigateByUrl(buildProductDetailUrl(product.slug));
  }
}
