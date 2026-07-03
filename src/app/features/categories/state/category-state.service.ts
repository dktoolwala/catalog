/**
 * Category State Service
 *
 * Central state management for the Categories feature using Angular Signals.
 *
 * Responsibilities:
 *   - Loads categories via CategoryService (through ProductStateService which caches them)
 *   - Synchronizes selected category with URL parameters
 *   - Coordinates ProductStateService filtering by category
 *   - Exposes computed views (categories with counts, filtered products)
 *
 * Architecture:
 *   CategoryPages → CategoryStateService → ProductStateService → CategoryService / ProductService → Backend
 *
 * This service NEVER injects ProductService or CategoryService directly.
 * All data flows through ProductStateService which owns the cache.
 */

import { Injectable, computed, inject, signal } from '@angular/core';
import { type Observable, of, tap, map, catchError } from 'rxjs';

import { type Category, type Product } from '../../../core/models';
import { CategoryService } from '../../../core/services/category.service';
import { ProductStateService } from '../../products/state';
import { type CategoryWithCount } from '../models';

@Injectable({ providedIn: 'root' })
export class CategoryStateService {
  private readonly productState = inject(ProductStateService);
  private readonly categoryService = inject(CategoryService);

  // ─── Private State ───────────────────────────────────────────

  private readonly _categories = signal<Category[]>([]);
  private readonly _selectedCategoryId = signal<string | null>(null);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  // ─── Public Readonly Signals ─────────────────────────────────

  readonly categories = this._categories.asReadonly();
  readonly selectedCategoryId = this._selectedCategoryId.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  // ─── Computed Signals ────────────────────────────────────────

  /** The currently selected category object */
  readonly selectedCategory = computed<Category | null>(() => {
    const id = this._selectedCategoryId();
    if (id === null || id === undefined) return null;
    return this._categories().find(c => c.id === id) ?? null;
  });

  /** Categories enriched with product counts */
  readonly categoriesWithCounts = computed<CategoryWithCount[]>(() => {
    const categories = this._categories();
    const allProducts = this.productState.products();

    return categories.map(category => ({
      category,
      productCount: allProducts.filter(p => p.categoryId === category.id).length
    }));
  });

  /** Total number of categories */
  readonly categoryCount = computed(() => this._categories().length);

  /** Products filtered to the selected category (delegates to ProductStateService) */
  readonly products = computed<readonly Product[]>(() => {
    return this.productState.filteredProducts();
  });

  /** Count of products in the current category */
  readonly productCount = computed(() => this.products().length);

  /** Whether products are loading */
  readonly productsLoading = computed(() => this.productState.loading());

  /** Any error from product loading */
  readonly productsError = computed(() => this.productState.error());

  // ─── Actions ─────────────────────────────────────────────────

  /** Load all categories (fire-and-forget, updates signals) */
  loadCategories(): void {
    if (this._categories().length > 0 && !this._error()) {
      return; // Already loaded
    }

    this._loading.set(true);
    this._error.set(null);

    this.categoryService.getCategories().subscribe({
      next: categories => {
        this._categories.set(categories);
        this._loading.set(false);
      },
      error: (err: Error) => {
        this._error.set(err.message);
        this._loading.set(false);
      }
    });
  }

  /** Load products (for computing category counts on the list page) */
  loadProducts(): void {
    this.productState.loadProducts();
  }

  /**
   * Select a category by ID and synchronize ProductStateService filter.
   * Also ensures products are loaded for the category-products page.
   */
  selectCategory(categoryId: string): void {
    this._selectedCategoryId.set(categoryId);
    this.productState.setSelectedCategory(categoryId);
    this.productState.loadProducts();
  }

  /**
   * Load a category by ID for the resolver.
   * Returns Observable<boolean> for route resolver usage.
   */
  loadCategory(categoryId: string): Observable<boolean> {
    this._loading.set(true);
    this._error.set(null);

    // Ensure categories are loaded first
    if (this._categories().length === 0) {
      return this.categoryService.getCategories().pipe(
        tap(categories => {
          this._categories.set(categories);
          this._loading.set(false);
        }),
        map(categories => {
          const found = categories.some(c => c.id === categoryId);
          if (found) {
            this.selectCategory(categoryId);
          }
          return found;
        }),
        catchError((err: Error) => {
          this._error.set(err.message);
          this._loading.set(false);
          return of(false);
        })
      );
    }

    // Categories already loaded — just select
    const found = this._categories().some(c => c.id === categoryId);
    if (found) {
      this.selectCategory(categoryId);
    }
    this._loading.set(false);
    return of(found);
  }

  /** Clear the selected category */
  clearSelection(): void {
    this._selectedCategoryId.set(null);
    this.productState.setSelectedCategory(null);
  }

  /** Clear the current error */
  clearError(): void {
    this._error.set(null);
  }

  /** Force reload categories */
  refresh(): void {
    this._categories.set([]);
    this._error.set(null);
    this.loadCategories();
  }

  /** Retry loading products for the selected category */
  retryProducts(): void {
    this.productState.clearError();
    this.productState.refresh();
  }
}
