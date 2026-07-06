import { TestBed } from '@angular/core/testing';

import { SearchFacade } from './search.facade';
import { SearchStateService } from '../state';
import { ProductStateService } from '../../products/state';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { MockRuntimeConfigService } from '../../../testing';
import { RuntimeConfigService } from '../../../platform/services/runtime-config.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('SearchFacade', () => {
  let facade: SearchFacade;
  let stateService: SearchStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchFacade,
        SearchStateService,
        ProductStateService,
        ProductService,
        CategoryService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: RuntimeConfigService, useClass: MockRuntimeConfigService }
      ]
    });
    facade = TestBed.inject(SearchFacade);
    stateService = TestBed.inject(SearchStateService);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should expose readonly searchTerm signal', () => {
    stateService['_searchTerm'].set('laptop');

    expect(facade.searchTerm()).toBe('laptop');
  });

  it('should expose readonly results signal', () => {
    stateService['_searchTerm'].set('test');

    expect(facade.results().length).toBeGreaterThanOrEqual(0);
  });

  it('should expose readonly recentSearches signal', () => {
    stateService['_recentSearches'].set([{ term: 'laptop', timestamp: Date.now() }]);

    expect(facade.recentSearches().length).toBe(1);
  });

  it('should perform search', () => {
    spyOn(stateService, 'search');

    facade.search('laptop');

    expect(stateService.search).toHaveBeenCalledWith('laptop');
  });

  it('should clear search', () => {
    spyOn(stateService, 'clearSearch');

    facade.clearSearch();

    expect(stateService.clearSearch).toHaveBeenCalled();
  });

  it('should remove recent search', () => {
    spyOn(stateService, 'removeRecentSearch');

    facade.removeRecentSearch('laptop');

    expect(stateService.removeRecentSearch).toHaveBeenCalledWith('laptop');
  });

  it('should clear recent searches', () => {
    spyOn(stateService, 'clearRecentSearches');

    facade.clearRecentSearches();

    expect(stateService.clearRecentSearches).toHaveBeenCalled();
  });

  it('should expose resultCount computed signal', () => {
    stateService['_searchTerm'].set('test');

    expect(facade.resultCount()).toBeGreaterThanOrEqual(0);
  });

  it('should expose hasResults computed signal', () => {
    stateService['_searchTerm'].set('test');

    expect(typeof facade.hasResults()).toBe('boolean');
  });

  it('should expose hasActiveTerm computed signal', () => {
    stateService['_searchTerm'].set('');
    expect(facade.hasActiveTerm()).toBe(false);

    stateService['_searchTerm'].set('laptop');
    expect(facade.hasActiveTerm()).toBe(true);
  });

  it('should expose loading computed signal', () => {
    expect(typeof facade.loading()).toBe('boolean');
  });

  it('should expose error computed signal', () => {
    expect(facade.error()).toBeNull();
  });
});
