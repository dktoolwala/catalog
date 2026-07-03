/**
 * Product State Service
 *
 * Central state management for the Products feature using Angular Signals.
 * This is the ONLY service that talks to Core's ProductService/CategoryService.
 * Pages inject this — presentation components never do.
 *
 * State:
 *   products, selectedProduct, categories, loading, error,
 *   searchTerm, selectedCategory
 *
 * Computed:
 *   filteredProducts, productCount
 *
 * Actions:
 *   loadProducts(), loadProduct(slug), loadCategories(),
 *   setSearchTerm(), setSelectedCategory(), clearError()
 */

import { Injectable, computed, inject, signal } from '@angular/core';
import { type Observable, of, tap, map, catchError } from 'rxjs';

import { type Product, type Category } from '../../../core/models';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';

@Injectable({ providedIn: 'root' })
export class ProductStateService {
  private readonly productService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);

  // ─── Private State ───────────────────────────────────────────

  private readonly _products = signal<Product[]>([]);
  private readonly _selectedProduct = signal<Product | null>(null);
  private readonly _categories = signal<Category[]>([]);
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _searchTerm = signal('');
  private readonly _selectedCategory = signal<string | null>(null);

  // ─── Public Readonly Signals ─────────────────────────────────

  readonly products = this._products.asReadonly();
  readonly selectedProduct = this._selectedProduct.asReadonly();
  readonly categories = this._categories.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();
  readonly searchTerm = this._searchTerm.asReadonly();
  readonly selectedCategory = this._selectedCategory.asReadonly();

  // ─── Computed Signals ────────────────────────────────────────

  readonly filteredProducts = computed(() => {
    let products = this._products();
    const categoryId = this._selectedCategory();
    const term = this._searchTerm().toLowerCase().trim();

    if (categoryId !== null && categoryId !== undefined) {
      products = products.filter(p => p.categoryId === categoryId);
    }

    if (term) {
      products = products.filter(
        p =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.sku.toLowerCase().includes(term)
      );
    }

    return products;
  });

  readonly productCount = computed(() => this.filteredProducts().length);
  readonly totalCount = computed(() => this._products().length);

  // ─── Actions ─────────────────────────────────────────────────

  /** Load all products (fire-and-forget, updates signals) */
  loadProducts(): void {
    if (this._products().length > 0 && !this._error()) {
      return; // Already loaded successfully
    }

    this._loading.set(true);
    this._error.set(null);

    this.productService.getProducts().subscribe({
      next: products => {
        this._products.set(products);
        this._loading.set(false);
      },
      error: (err: Error) => {
        this._error.set(err.message);
        this._loading.set(false);
      }
    });
  }

  /**
   * Load a single product by slug.
   * Returns Observable<boolean> for use in resolvers.
   */
  loadProduct(slug: string): Observable<boolean> {
    this._loading.set(true);
    this._error.set(null);
    this._selectedProduct.set(null);

    return this.productService.getProduct(slug).pipe(
      tap(product => {
        this._selectedProduct.set(product);
        this._loading.set(false);
      }),
      map(() => true),
      catchError((err: Error) => {
        this._error.set(err.message);
        this._loading.set(false);
        return of(false);
      })
    );
  }

  /** Load all categories for the filter dropdown */
  loadCategories(): void {
    if (this._categories().length > 0) {
      return;
    }

    this.categoryService.getCategories().subscribe({
      next: categories => this._categories.set(categories),
      error: () => {
        /* Non-critical — filters just won't have categories */
      }
    });
  }

  /** Update the search term (triggers filteredProducts recomputation) */
  setSearchTerm(term: string): void {
    this._searchTerm.set(term);
  }

  /** Update the selected category filter */
  setSelectedCategory(categoryId: string | null): void {
    this._selectedCategory.set(categoryId);
  }

  /** Clear the current error */
  clearError(): void {
    this._error.set(null);
  }

  /** Force reload products (bypasses cache check) */
  refresh(): void {
    this._products.set([]);
    this._error.set(null);
    this.loadProducts();
  }

  /** Clear selected product (on navigation away from detail) */
  clearSelectedProduct(): void {
    this._selectedProduct.set(null);
  }
}
