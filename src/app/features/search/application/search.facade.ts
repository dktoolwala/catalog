/**
 * Search Facade
 *
 * Application layer entry point for the Search feature.
 * This is the ONLY injectable that the search page should use.
 *
 * Responsibilities:
 *   - Exposes readonly signals from SearchStateService
 *   - Executes search actions (search, clear, recent management)
 *   - Absorbs URL synchronization logic from the page
 *   - Provides a stable API that hides internal state service details
 *   - Prepared for future analytics, caching strategies, and business workflows
 *
 * Architecture:
 *   SearchPage → SearchFacade → SearchStateService → ProductStateService → Core Services
 *
 * Rules:
 *   - Pages inject ONLY this facade
 *   - Presentation components remain unchanged (inputs/outputs)
 *   - State services are never exposed to pages
 */

import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../../../core/models';
import { ROUTE_QUERY_PARAMS, buildProductDetailUrl } from '../../../core/constants';
import { SearchStateService } from '../state';

@Injectable({ providedIn: 'root' })
export class SearchFacade {
  private readonly state = inject(SearchStateService);
  private readonly router = inject(Router);

  // ─── Exposed Signals (readonly) ──────────────────────────────

  readonly searchTerm = this.state.searchTerm;
  readonly results = this.state.results;
  readonly hasResults = this.state.hasResults;
  readonly resultCount = this.state.resultCount;
  readonly loading = this.state.loading;
  readonly error = this.state.error;
  readonly hasActiveTerm = this.state.hasActiveTerm;
  readonly isSearching = this.state.isSearching;
  readonly recentSearches = this.state.recentSearches;

  // ─── Actions ─────────────────────────────────────────────────

  /** Execute a search */
  search(term: string): void {
    this.state.search(term);
  }

  /** Clear the current search */
  clearSearch(): void {
    this.state.clearSearch();
  }

  /** Remove a single recent search entry */
  removeRecentSearch(term: string): void {
    this.state.removeRecentSearch(term);
  }

  /** Clear all recent searches */
  clearRecentSearches(): void {
    this.state.clearRecentSearches();
  }

  /** Retry after error */
  retry(): void {
    this.state.retry();
  }

  /** Navigate to product detail */
  navigateToProduct(product: Product): void {
    this.router.navigateByUrl(buildProductDetailUrl(product.slug));
  }

  /**
   * Update the URL query parameter without triggering navigation.
   * Used by the search page to keep URL in sync with input.
   */
  updateSearchUrl(term: string, route: ActivatedRoute): void {
    const queryParams = term.trim()
      ? { [ROUTE_QUERY_PARAMS.SEARCH]: term.trim() }
      : { [ROUTE_QUERY_PARAMS.SEARCH]: null };

    this.router.navigate([], {
      relativeTo: route,
      queryParams,
      queryParamsHandling: 'merge',
      replaceUrl: false
    });
  }
}
