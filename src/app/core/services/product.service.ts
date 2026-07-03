/**
 * Product Service
 *
 * Provides product data from the GAS backend.
 * Backend endpoints:
 *   - ?action=getProducts         → all active products
 *   - ?action=getProduct&slug=x   → single product by slug
 *   - ?action=searchProducts&q=x  → search products by query
 *
 * Returns unwrapped domain models (not raw API envelope).
 * Delegates URL building entirely to ApiService.
 */

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ACTIONS, API_PARAMS } from '../constants';
import { Product } from '../models';
import { ApiService, unwrapResponse } from './api.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly api = inject(ApiService);

  /** Fetch all active products */
  getProducts(): Observable<Product[]> {
    return this.api
      .get<Product[]>(API_ACTIONS.GET_PRODUCTS)
      .pipe(unwrapResponse());
  }

  /** Fetch a single product by its URL slug */
  getProduct(slug: string): Observable<Product> {
    return this.api
      .get<Product>(API_ACTIONS.GET_PRODUCT, {
        [API_PARAMS.SLUG]: slug
      })
      .pipe(unwrapResponse());
  }

  /** Search products by query string */
  searchProducts(query: string): Observable<Product[]> {
    return this.api
      .get<Product[]>(API_ACTIONS.SEARCH_PRODUCTS, {
        [API_PARAMS.QUERY]: query
      })
      .pipe(unwrapResponse());
  }
}
