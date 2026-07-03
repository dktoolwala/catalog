/**
 * Category Service
 *
 * Provides category data from the GAS backend.
 * Backend endpoint: ?action=getCategories
 *
 * Categories are returned pre-sorted by sortOrder from the backend.
 * Returns unwrapped domain models (not raw API envelope).
 */

import { Injectable, inject } from '@angular/core';
import { type Observable } from 'rxjs';

import { API_ACTIONS } from '../constants';
import { type Category } from '../models';
import { ApiService, unwrapResponse } from './api.service';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly api = inject(ApiService);

  /** Fetch all active categories */
  getCategories(): Observable<Category[]> {
    return this.api.get<Category[]>(API_ACTIONS.GET_CATEGORIES).pipe(unwrapResponse());
  }
}
