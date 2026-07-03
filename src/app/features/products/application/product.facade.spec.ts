import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { ProductFacade } from './product.facade';
import { ProductStateService } from '../state';
import { createMockProducts } from '../../../testing';
import { MockRuntimeConfigService } from '../../../testing';
import { RuntimeConfigService } from '../../../platform/services/runtime-config.service';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('ProductFacade', () => {
  let facade: ProductFacade;
  let stateService: ProductStateService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductFacade,
        ProductStateService,
        ProductService,
        CategoryService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: RuntimeConfigService, useClass: MockRuntimeConfigService }
      ]
    });
    facade = TestBed.inject(ProductFacade);
    stateService = TestBed.inject(ProductStateService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should expose readonly products signal', () => {
    const mockProducts = createMockProducts();
    stateService['_products'].set(mockProducts);

    expect(facade.products()).toEqual(mockProducts);
  });

  it('should expose readonly selectedProduct signal', () => {
    const mockProducts = createMockProducts();
    stateService['_selectedProduct'].set(mockProducts[0]);

    expect(facade.selectedProduct()).toEqual(mockProducts[0]);
  });

  it('should load products', () => {
    spyOn(stateService, 'loadProducts');

    facade.loadProducts();

    expect(stateService.loadProducts).toHaveBeenCalled();
  });

  it('should set search term', () => {
    spyOn(stateService, 'setSearchTerm');

    facade.setSearchTerm('laptop');

    expect(stateService.setSearchTerm).toHaveBeenCalledWith('laptop');
  });

  it('should set selected category', () => {
    spyOn(stateService, 'setSelectedCategory');

    facade.setSelectedCategory('category-1');

    expect(stateService.setSelectedCategory).toHaveBeenCalledWith('category-1');
  });

  it('should clear search term independently', () => {
    spyOn(stateService, 'setSearchTerm');

    facade.setSearchTerm('');

    expect(stateService.setSearchTerm).toHaveBeenCalledWith('');
  });

  it('should clear category selection independently', () => {
    spyOn(stateService, 'setSelectedCategory');

    facade.setSelectedCategory(null);

    expect(stateService.setSelectedCategory).toHaveBeenCalledWith(null);
  });

  it('should refresh products', () => {
    spyOn(stateService, 'refresh');

    facade.refresh();

    expect(stateService.refresh).toHaveBeenCalled();
  });

  it('should navigate to product detail', () => {
    const mockProducts = createMockProducts();
    spyOn(router, 'navigateByUrl');

    facade.navigateToProduct(mockProducts[0]);

    expect(router.navigateByUrl).toHaveBeenCalled();
  });

  it('should expose productCount computed signal', () => {
    const mockProducts = createMockProducts();
    stateService['_products'].set(mockProducts);

    expect(facade.productCount()).toBe(mockProducts.length);
  });

  it('should expose error signal', () => {
    stateService['_error'].set('Test error');

    expect(facade.error()).toBe('Test error');
  });

  it('should expose searchTerm signal', () => {
    stateService['_searchTerm'].set('laptop');

    expect(facade.searchTerm()).toBe('laptop');
  });
});
