/**
 * Product Detail Resolver
 *
 * Ensures product data is loaded before the detail page renders.
 * Calls ProductFacade.loadProduct(slug) and waits for completion.
 * If the product is not found, the page will show an error state.
 */

import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { ROUTE_PARAMS } from '../../../core/constants';
import { ProductFacade } from '../application';

export const productDetailResolver: ResolveFn<boolean> = (route) => {
  const facade = inject(ProductFacade);
  const slug = route.paramMap.get(ROUTE_PARAMS.SLUG);

  if (!slug) {
    return false;
  }

  return facade.loadProduct(slug);
};
