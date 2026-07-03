/**
 * Category Products Resolver
 *
 * Ensures category and product data are loaded before the category-products page renders.
 * Calls CategoryFacade.loadCategory(id) which internally:
 *   1. Loads categories (if not cached)
 *   2. Validates the category ID exists
 *   3. Selects the category and triggers ProductStateService filtering
 *
 * Returns false if category is not found — page shows error state.
 */

import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';

import { ROUTE_URLS } from '../../../core/constants';
import { CategoryFacade } from '../application';

/** Route parameter name for category ID */
export const CATEGORY_ID_PARAM = 'categoryId';

export const categoryProductsResolver: ResolveFn<boolean> = (route) => {
  const facade = inject(CategoryFacade);
  const router = inject(Router);
  const categoryId = route.paramMap.get(CATEGORY_ID_PARAM);

  if (!categoryId) {
    router.navigateByUrl(ROUTE_URLS.CATEGORIES);
    return false;
  }

  return facade.loadCategory(categoryId);
};
