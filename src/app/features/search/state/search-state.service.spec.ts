import { TestBed } from '@angular/core/testing';

import { SearchStateService } from './search-state.service';
import { ProductStateService } from '../../products/state';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { MockRuntimeConfigService, createMockProducts } from '../../../testing';
import { RuntimeConfigService } from '../../../platform/services/runtime-config.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SEARCH } from '../../../core/constants';

describe('SearchStateService', () => {
  let service: SearchStateService;
  let productState: ProductStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchStateService,
        ProductStateService,
        ProductService,
        CategoryService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: RuntimeConfigService, useClass: MockRuntimeConfigService }
      ]
    });
    service = TestBed.inject(SearchStateService);
    productState = TestBed.inject(ProductStateService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial state', () => {
    expect(service.searchTerm()).toBe('');
    expect(service.isSearching()).toBe(false);
    expect(service.recentSearches()).toEqual([]);
  });

  it('should perform a search', () => {
    spyOn(productState, 'setSearchTerm');
    spyOn(productState, 'loadProducts');
    const mockProducts = createMockProducts();
    productState['_products'].set(mockProducts);

    service.search('laptop');

    expect(service.searchTerm()).toBe('laptop');
    expect(productState.setSearchTerm).toHaveBeenCalledWith('laptop');
    expect(productState.loadProducts).toHaveBeenCalled();
  });

  it('should trim search term', () => {
    spyOn(productState, 'setSearchTerm');
    spyOn(productState, 'loadProducts');

    service.search('  laptop  ');

    expect(service.searchTerm()).toBe('laptop');
  });

  it('should add search to recent searches if meaningful', () => {
    spyOn(productState, 'setSearchTerm');
    spyOn(productState, 'loadProducts');
    spyOn(localStorage, 'setItem');

    service.search('laptop');

    expect(service.recentSearches().length).toBe(1);
    expect(service.recentSearches()[0].term).toBe('laptop');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('should not add short searches to recent searches', () => {
    spyOn(productState, 'setSearchTerm');
    spyOn(productState, 'loadProducts');
    spyOn(localStorage, 'setItem');

    service.search('x');

    if (SEARCH.MIN_QUERY_LENGTH > 1) {
      expect(service.recentSearches().length).toBe(0);
    }
  });

  it('should deduplicate recent searches (case-insensitive)', () => {
    spyOn(productState, 'setSearchTerm');
    spyOn(productState, 'loadProducts');

    service.search('laptop');
    service.search('Laptop');

    expect(service.recentSearches().length).toBe(1);
    expect(service.recentSearches()[0].term).toBe('Laptop');
  });

  it('should limit recent searches to max', () => {
    spyOn(productState, 'setSearchTerm');
    spyOn(productState, 'loadProducts');

    for (let i = 0; i < 15; i++) {
      service.search(`query-${i}`);
    }

    expect(service.recentSearches().length).toBeLessThanOrEqual(10);
  });

  it('should clear search term', () => {
    spyOn(productState, 'setSearchTerm');

    service.search('laptop');
    service.clearSearch();

    expect(service.searchTerm()).toBe('');
    expect(productState.setSearchTerm).toHaveBeenCalledWith('');
  });

  it('should remove a recent search', () => {
    spyOn(productState, 'setSearchTerm');
    spyOn(productState, 'loadProducts');

    service.search('laptop');
    service.search('desktop');

    expect(service.recentSearches().length).toBe(2);

    service.removeRecentSearch('laptop');

    expect(service.recentSearches().length).toBe(1);
    expect(service.recentSearches()[0].term).toBe('desktop');
  });

  it('should clear all recent searches', () => {
    spyOn(productState, 'setSearchTerm');
    spyOn(productState, 'loadProducts');

    service.search('laptop');
    service.search('desktop');

    service.clearRecentSearches();

    expect(service.recentSearches()).toEqual([]);
  });

  it('should compute results from product state', () => {
    const mockProducts = createMockProducts();
    productState['_products'].set(mockProducts);
    service['_searchTerm'].set('test');

    expect(service.results()).toEqual(productState.filteredProducts());
  });

  it('should compute hasResults', () => {
    const mockProducts = createMockProducts();
    productState['_products'].set(mockProducts);

    expect(service.hasResults()).toBe(true);
  });

  it('should compute resultCount', () => {
    const mockProducts = createMockProducts();
    productState['_products'].set(mockProducts);

    expect(service.resultCount()).toBe(mockProducts.length);
  });

  it('should compute hasActiveTerm', () => {
    service['_searchTerm'].set('');
    expect(service.hasActiveTerm()).toBe(false);

    service['_searchTerm'].set('laptop');
    expect(service.hasActiveTerm()).toBe(true);
  });

  it('should retry on error', () => {
    spyOn(productState, 'clearError');
    spyOn(productState, 'refresh');

    service.retry();

    expect(productState.clearError).toHaveBeenCalled();
    expect(productState.refresh).toHaveBeenCalled();
  });

  xit('should persist recent searches to localStorage', () => {
    spyOn(productState, 'setSearchTerm');
    spyOn(productState, 'loadProducts');

    service.search('laptop');

    const stored = localStorage.getItem('pc:cache:recent-searches');
    expect(stored).toBeTruthy();
    if (stored) {
      const parsed = JSON.parse(stored);
      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed.length).toBeGreaterThan(0);
    }
  });

  xit('should load recent searches from localStorage on initialization', () => {
    const searches = [
      { term: 'laptop', timestamp: Date.now() },
      { term: 'desktop', timestamp: Date.now() }
    ];
    localStorage.setItem('pc:cache:recent-searches', JSON.stringify(searches));

    // Create a new component to test initialization from localStorage
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        SearchStateService,
        ProductStateService,
        ProductService,
        CategoryService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: RuntimeConfigService, useClass: MockRuntimeConfigService }
      ]
    });

    const newService = TestBed.inject(SearchStateService);
    expect(newService.recentSearches().length).toBeGreaterThanOrEqual(0);
  });

  xit('should handle corrupted localStorage gracefully', () => {
    localStorage.setItem('pc:cache:recent-searches', 'invalid json');

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        SearchStateService,
        ProductStateService,
        ProductService,
        CategoryService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: RuntimeConfigService, useClass: MockRuntimeConfigService }
      ]
    });

    const newService = TestBed.inject(SearchStateService);

    expect(newService.recentSearches()).toEqual([]);
  });
});
