/**
 * Search Feature Routes
 *
 * Defines routing for the Search feature.
 * The search page supports optional ?q= query parameter for deep links.
 *
 * Route: /search        → Search page (empty state / recent searches)
 * Route: /search?q=term → Search page with pre-filled query
 */

import { type Routes } from '@angular/router';

export const searchRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/search-page/search-page.component').then(m => m.SearchPageComponent)
  }
];
