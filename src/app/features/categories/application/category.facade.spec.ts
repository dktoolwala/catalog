import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { CategoryFacade } from './category.facade';
import { CategoryStateService } from '../state';
import { createMockCategories, createMockProducts } from '../../../testing';
import { MockRuntimeConfigService } from '../../../testing';
import { RuntimeConfigService } from '../../../platform/services/runtime-config.service';
import { CategoryService } from '../../../core/services/category.service';
import { ProductStateService } from '../../products/state';
import { ProductService } from '../../../core/services/product.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CategoryFacade', () => {
  let facade: CategoryFacade;
  let stateService: CategoryStateService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoryFacade,
        CategoryStateService,
        ProductStateService,
        CategoryService,
        ProductService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: RuntimeConfigService, useClass: MockRuntimeConfigService }
      ]
    });
    facade = TestBed.inject(CategoryFacade);
    stateService = TestBed.inject(CategoryStateService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should expose readonly categories signal', () => {
    const mockCategories = createMockCategories();
    stateService['_categories'].set(mockCategories);

    expect(facade.categories()).toEqual(mockCategories);
  });

  it('should expose readonly selectedCategory computed signal', () => {
    const mockCategories = createMockCategories();
    stateService['_categories'].set(mockCategories);
    stateService['_selectedCategoryId'].set(mockCategories[0].id);

    expect(facade.selectedCategory()).toEqual(mockCategories[0]);
  });

  it('should load categories', () => {
    spyOn(stateService, 'loadCategories');

    facade.loadCategories();

    expect(stateService.loadCategories).toHaveBeenCalled();
  });

  it('should load products', () => {
    spyOn(stateService, 'loadProducts');

    facade.loadProducts();

    expect(stateService.loadProducts).toHaveBeenCalled();
  });

  it('should select a category', () => {
    spyOn(stateService, 'selectCategory');

    facade.selectCategory('category-1');

    expect(stateService.selectCategory).toHaveBeenCalledWith('category-1');
  });

  it('should clear selection', () => {
    spyOn(stateService, 'clearSelection');

    facade.clearSelection();

    expect(stateService.clearSelection).toHaveBeenCalled();
  });

  it('should refresh categories', () => {
    spyOn(stateService, 'refresh');

    facade.refresh();

    expect(stateService.refresh).toHaveBeenCalled();
  });

  it('should retry products', () => {
    spyOn(stateService, 'retryProducts');

    facade.retryProducts();

    expect(stateService.retryProducts).toHaveBeenCalled();
  });

  it('should navigate to category', () => {
    const mockCategories = createMockCategories();
    spyOn(router, 'navigate');

    facade.navigateToCategory(mockCategories[0]);

    expect(router.navigate).toHaveBeenCalled();
  });

  it('should navigate to product detail', () => {
    const mockProducts = createMockProducts();
    spyOn(router, 'navigateByUrl');

    facade.navigateToProduct(mockProducts[0]);

    expect(router.navigateByUrl).toHaveBeenCalled();
  });

  it('should expose categoryCount computed signal', () => {
    const mockCategories = createMockCategories();
    stateService['_categories'].set(mockCategories);

    expect(facade.categoryCount()).toBe(mockCategories.length);
  });

  it('should expose error signal', () => {
    stateService['_error'].set('Test error');

    expect(facade.error()).toBe('Test error');
  });
});
