/**
 * Mock Services
 *
 * Stub implementations of core services for isolated unit testing.
 * These mocks expose writable signals so tests can control state.
 */

import { signal } from '@angular/core';
import { of, Observable } from 'rxjs';

import { ApiResponse } from '../core/models';
import { AppError } from '../core/error/error.service';
import { createMockProducts, createMockCategories } from './mock-data';
import { createSuccessResponse } from './mock-api-responses';

/** Mock ErrorService */
export class MockErrorService {
  readonly error = signal<AppError | null>(null);
  handleError = jasmine.createSpy('handleError');
  setError = jasmine.createSpy('setError');
  clearError = jasmine.createSpy('clearError');
  getUserMessage = jasmine.createSpy('getUserMessage').and.returnValue('Mock error message');
}

/** Mock LoadingService */
export class MockLoadingService {
  private readonly _loading = signal(false);
  readonly loading = this._loading.asReadonly();
  begin = jasmine.createSpy('begin').and.callFake(() => this._loading.set(true));
  end = jasmine.createSpy('end').and.callFake(() => this._loading.set(false));
  reset = jasmine.createSpy('reset').and.callFake(() => this._loading.set(false));
}

/** Mock ApiService */
export class MockApiService {
  get = jasmine.createSpy('get').and.callFake(<T>(_action: string): Observable<ApiResponse<T>> =>
    of(createSuccessResponse([] as unknown as T))
  );
}

/** Mock RuntimeConfigService */
export class MockRuntimeConfigService {
  private readonly _config = signal({
    apiUrl: 'http://localhost/api',
    production: false,
    logLevel: 'debug' as const,
    appTitle: 'Test App',
    appDescription: 'Test Description',
    baseUrl: 'http://localhost',
    imageBaseUrl: 'http://localhost/images',
    features: { pwa: false, analytics: false, structuredData: false }
  });
  readonly config = this._config.asReadonly();
  get loaded(): boolean { return true; }
  get apiUrl(): string { return this._config().apiUrl; }
  get production(): boolean { return this._config().production; }
  get logLevel(): string { return this._config().logLevel; }
  get baseUrl(): string { return this._config().baseUrl; }
  get appTitle(): string { return this._config().appTitle; }
  load = jasmine.createSpy('load').and.returnValue(Promise.resolve());
}

/** Mock ProductService */
export class MockProductService {
  getProducts = jasmine.createSpy('getProducts').and.returnValue(of(createMockProducts()));
  getProduct = jasmine.createSpy('getProduct').and.returnValue(of(createMockProducts()[0]));
  searchProducts = jasmine.createSpy('searchProducts').and.returnValue(of(createMockProducts()));
}

/** Mock CategoryService */
export class MockCategoryService {
  getCategories = jasmine.createSpy('getCategories').and.returnValue(of(createMockCategories()));
}

/** Mock Router */
export class MockRouter {
  navigateByUrl = jasmine.createSpy('navigateByUrl').and.returnValue(Promise.resolve(true));
  navigate = jasmine.createSpy('navigate').and.returnValue(Promise.resolve(true));
  readonly events = of();
}
