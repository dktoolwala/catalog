/**
 * Application Routes
 *
 * Top-level route configuration.
 * All routes are children of ShellComponent which provides the layout frame.
 * Feature routes are lazy-loaded via loadChildren for code splitting.
 *
 * Route structure:
 *   / → Shell (layout wrapper)
 *     ├── "" → Home
 *     ├── "products" → lazy Products feature
 *     ├── "categories" → lazy Categories feature
 *     ├── "search" → lazy Search feature
 *     ├── "not-found" → 404 page
 *     └── "**" → redirect to not-found
 */

import { type Routes } from '@angular/router';

import { ROUTE_PATHS, ROUTE_TITLES } from './core/constants';
import { ShellComponent } from './layout';

export const routes: Routes = [
  {
    path: ROUTE_PATHS.HOME,
    component: ShellComponent,
    children: [
      {
        path: ROUTE_PATHS.HOME,
        pathMatch: 'full',
        title: ROUTE_TITLES.HOME,
        loadComponent: () =>
          import('./pages/home-placeholder/home-placeholder.component').then(
            m => m.HomePlaceholderComponent
          )
      },
      {
        path: ROUTE_PATHS.PRODUCTS,
        title: ROUTE_TITLES.PRODUCTS,
        data: { preload: true, preloadDelay: 2000 },
        loadChildren: () => import('./features/products/products.routes').then(m => m.productRoutes)
      },
      {
        path: ROUTE_PATHS.CATEGORIES,
        title: ROUTE_TITLES.CATEGORIES,
        data: { preload: true, preloadDelay: 3000 },
        loadChildren: () =>
          import('./features/categories/categories.routes').then(m => m.categoryRoutes)
      },
      {
        path: ROUTE_PATHS.SEARCH,
        title: ROUTE_TITLES.SEARCH,
        data: { preload: true, preloadDelay: 4000 },
        loadChildren: () => import('./features/search/search.routes').then(m => m.searchRoutes)
      },
      {
        path: ROUTE_PATHS.NOT_FOUND,
        title: ROUTE_TITLES.NOT_FOUND,
        loadComponent: () =>
          import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
      },
      {
        path: ROUTE_PATHS.SERVER_ERROR,
        title: ROUTE_TITLES.SERVER_ERROR,
        loadComponent: () =>
          import('./pages/server-error/server-error.component').then(m => m.ServerErrorComponent)
      },
      {
        path: ROUTE_PATHS.OFFLINE,
        title: ROUTE_TITLES.OFFLINE,
        loadComponent: () =>
          import('./pages/offline/offline.component').then(m => m.OfflineComponent)
      },
      {
        path: ROUTE_PATHS.API_UNAVAILABLE,
        title: ROUTE_TITLES.API_UNAVAILABLE,
        loadComponent: () =>
          import('./pages/api-unavailable/api-unavailable.component').then(
            m => m.ApiUnavailableComponent
          )
      },
      {
        path: ROUTE_PATHS.WILDCARD,
        redirectTo: ROUTE_PATHS.NOT_FOUND
      }
    ]
  }
];
