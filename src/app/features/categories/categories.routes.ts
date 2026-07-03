/**
 * Categories Feature Routes
 *
 * Lazy-loaded routes for the Categories feature.
 *   /categories              → Category list (grid with counts)
 *   /categories/:categoryId  → Products filtered by category (resolver pre-loads)
 */

import { Routes } from '@angular/router';

import { categoryProductsResolver } from './resolvers';

export const categoryRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/category-list/category-list.component')
        .then(m => m.CategoryListComponent)
  },
  {
    path: ':categoryId',
    resolve: { category: categoryProductsResolver },
    loadComponent: () =>
      import('./pages/category-products/category-products.component')
        .then(m => m.CategoryProductsComponent)
  }
];
