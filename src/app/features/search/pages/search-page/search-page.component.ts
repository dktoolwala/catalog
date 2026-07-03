/**
 * Search Page Component (Smart Component)
 *
 * Orchestrates the search experience:
 *   - Reads ?q= query parameter from the URL on init
 *   - Populates SearchBox with current term
 *   - Updates URL when search changes (without reload)
 *   - Supports deep links and browser Back/Forward
 *   - Shows loading, empty, error, and results states
 *   - Displays recent searches when no active query
 *
 * Architecture:
 *   Reads URL → SearchFacade → SearchStateService → ProductStateService → filteredProducts
 *
 * Reuses:
 *   - SearchBoxComponent (shared)
 *   - ProductGridComponent (products feature)
 *   - LoadingSpinnerComponent (shared)
 *   - EmptyStateComponent (shared)
 *   - ErrorStateComponent (shared)
 *   - PageHeaderComponent (shared)
 */

import {
  Component,
  ChangeDetectionStrategy,
  DestroyRef,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, map } from 'rxjs';

import { Product } from '../../../../core/models';
import { ROUTE_QUERY_PARAMS } from '../../../../core/constants';
import { PageHeaderComponent } from '../../../../shared/components';
import { LoadingSpinnerComponent } from '../../../../shared/components';
import { EmptyStateComponent } from '../../../../shared/components';
import { ErrorStateComponent } from '../../../../shared/components';
import { SearchBoxComponent } from '../../../../shared/components';
import { ProductGridComponent } from '../../../products/components/product-grid/product-grid.component';
import { SearchFacade } from '../../application';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [
    PageHeaderComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    SearchBoxComponent,
    ProductGridComponent
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPageComponent implements OnInit {
  protected readonly state = inject(SearchFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  /** Initial term from URL, used to populate SearchBox on load */
  protected readonly initialTerm = signal('');

  ngOnInit(): void {
    // Subscribe to query param changes (supports Back/Forward navigation)
    this.route.queryParamMap.pipe(
      map(params => params.get(ROUTE_QUERY_PARAMS.SEARCH) ?? ''),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(term => {
      this.initialTerm.set(term);
      this.state.search(term);
    });
  }

  /** Handle search input changes — update URL and state */
  protected onSearchChange(term: string): void {
    this.state.updateSearchUrl(term, this.route);
    this.state.search(term);
  }

  /** Navigate to product detail on card click */
  protected onProductSelected(product: Product): void {
    this.state.navigateToProduct(product);
  }

  /** Re-run a recent search */
  protected onRecentSearchClick(term: string): void {
    this.initialTerm.set(term);
    this.state.updateSearchUrl(term, this.route);
    this.state.search(term);
  }

  /** Remove a single recent search */
  protected onRemoveRecentSearch(term: string): void {
    this.state.removeRecentSearch(term);
  }

  /** Clear all recent searches */
  protected onClearRecentSearches(): void {
    this.state.clearRecentSearches();
  }

  /** Retry loading products after error */
  protected onRetry(): void {
    this.state.retry();
  }
}
