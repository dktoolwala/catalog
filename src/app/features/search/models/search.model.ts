/**
 * Search Feature Models
 *
 * Types specific to the Search feature's orchestration layer.
 * Product types are NOT duplicated here — they live in core/models.
 */

/** A stored recent search entry */
export interface RecentSearch {
  readonly term: string;
  readonly timestamp: number;
}

/** Configuration for the search feature */
export interface SearchConfig {
  readonly maxRecentSearches: number;
  readonly storageKey: string;
}
