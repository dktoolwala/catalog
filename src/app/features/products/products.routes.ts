/**
 * Products Feature Routes
 *
 * Lazy-loaded routes for the Products feature.
 *   /products       → Product list (grid + filters)
 *   /products/:slug → Product detail (resolver pre-loads data)
 */

import { type Routes } from '@angular/router';

import { ROUTE_PATHS } from '../../core/constants';
import { productDetailResolver } from './resolvers';

export const productRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/product-list/product-list.component').then(m => m.ProductListComponent)
  },
  {
    path: ROUTE_PATHS.PRODUCT_DETAIL,
    resolve: { product: productDetailResolver },
    loadComponent: () =>
      import('./pages/product-detail/product-detail.component').then(m => m.ProductDetailComponent)
  }
];
