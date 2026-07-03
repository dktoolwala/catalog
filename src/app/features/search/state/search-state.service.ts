/**
 * Search State Service
 *
 * Orchestration layer for the Search feature using Angular Signals.
 *
 * Responsibilities:
 *   - Synchronizes the search term with URL query parameters
 *   - Delegates product filtering to ProductStateService (never duplicates logic)
 *   - Manages recent searches (persisted to LocalStorage)
 *   - Exposes reactive state for the Search page
 *
 * Architecture:
 *   SearchPage → SearchStateService → ProductStateService → ProductService → Backend
 *
 * This service NEVER injects ProductService directly.
 */

import { Injectable, computed, inject, signal } from '@angular/core';

import { type Product } from '../../../core/models';
import { SEARCH, STORAGE_KEYS } from '../../../core/constants';
import { ProductStateService } from '../../products/state';
import { type RecentSearch } from '../models';

const RECENT_SEARCHES_KEY = `${STORAGE_KEYS.CACHE_PREFIX}recent-searches`;
const MAX_RECENT_SEARCHES = 10;

@Injectable({ providedIn: 'root' })
export class SearchStateService {
  private readonly productState = inject(ProductStateService);

  // ─── Private State ───────────────────────────────────────────

  private readonly _searchTerm = signal('');
  private readonly _recentSearches = signal<RecentSearch[]>(this.loadRecentSearches());
  private readonly _isSearching = signal(false);

  // ─── Public Readonly Signals ─────────────────────────────────

  readonly searchTerm = this._searchTerm.asReadonly();
  readonly isSearching = this._isSearching.asReadonly();
  readonly recentSearches = this._recentSearches.asReadonly();

  // ─── Computed Signals ────────────────────────────────────────

  /** Filtered products from ProductStateService based on the current search term */
  readonly results = computed<readonly Product[]>(() => {
    return this.productState.filteredProducts();
  });

  /** Whether the current search has produced any results */
  readonly hasResults = computed(() => this.results().length > 0);

  /** The count of search results */
  readonly resultCount = computed(() => this.results().length);

  /** Whether products are still loading from the backend */
  readonly loading = computed(() => this.productState.loading());

  /** Any error from the product state */
  readonly error = computed(() => this.productState.error());

  /** Whether a meaningful search term is active */
  readonly hasActiveTerm = computed(
    () => this._searchTerm().trim().length >= SEARCH.MIN_QUERY_LENGTH
  );

  // ─── Actions ─────────────────────────────────────────────────

  /**
   * Set the search term and delegate filtering to ProductStateService.
   * Ensures products are loaded before searching.
   */
  search(term: string): void {
    const normalizedTerm = term.trim();
    this._searchTerm.set(normalizedTerm);
    this._isSearching.set(true);

    // Delegate filtering to ProductStateService
    this.productState.setSearchTerm(normalizedTerm);

    // Ensure products are loaded (no-op if already cached)
    this.productState.loadProducts();

    this._isSearching.set(false);

    // Persist to recent searches if meaningful
    if (normalizedTerm.length >= SEARCH.MIN_QUERY_LENGTH) {
      this.addToRecentSearches(normalizedTerm);
    }
  }

  /** Clear the current search */
  clearSearch(): void {
    this._searchTerm.set('');
    this.productState.setSearchTerm('');
  }

  /** Remove a single entry from recent searches */
  removeRecentSearch(term: string): void {
    const updated = this._recentSearches().filter(s => s.term !== term);
    this._recentSearches.set(updated);
    this.persistRecentSearches(updated);
  }

  /** Clear all recent searches */
  clearRecentSearches(): void {
    this._recentSearches.set([]);
    this.persistRecentSearches([]);
  }

  /** Retry loading products after an error */
  retry(): void {
    this.productState.clearError();
    this.productState.refresh();
  }

  // ─── Private Helpers ─────────────────────────────────────────

  private addToRecentSearches(term: string): void {
    const current = this._recentSearches();

    // Deduplicate (case-insensitive)
    const filtered = current.filter(s => s.term.toLowerCase() !== term.toLowerCase());

    // Prepend new entry, limit to max
    const updated: RecentSearch[] = [{ term, timestamp: Date.now() }, ...filtered].slice(
      0,
      MAX_RECENT_SEARCHES
    );

    this._recentSearches.set(updated);
    this.persistRecentSearches(updated);
  }

  private loadRecentSearches(): RecentSearch[] {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed.slice(0, MAX_RECENT_SEARCHES) : [];
    } catch {
      return [];
    }
  }

  private persistRecentSearches(searches: RecentSearch[]): void {
    try {
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(searches));
    } catch {
      // Storage full or unavailable — non-critical
    }
  }
}
