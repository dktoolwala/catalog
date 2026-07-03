/**
 * Selective Preloading Strategy
 *
 * Custom Angular route preloading strategy.
 * Only preloads routes that have `data: { preload: true }` in their route config.
 * Ensures critical routes (Products, Search) are preloaded after initial load,
 * while less-used routes (not-found) remain lazy.
 */

import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, timer, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  /** Tracks which routes have been preloaded (for debugging) */
  readonly preloadedRoutes: string[] = [];

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    if (route.data?.['preload']) {
      const delay = route.data?.['preloadDelay'] ?? 2000;
      this.preloadedRoutes.push(route.path || '');
      // Delay preload to not compete with initial paint
      return timer(delay).pipe(switchMap(() => load()));
    }
    return of(null);
  }
}
