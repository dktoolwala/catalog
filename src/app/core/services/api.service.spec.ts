import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { ApiService, unwrapResponse } from './api.service';
import { RuntimeConfigService } from '../../platform/services/runtime-config.service';
import { MockRuntimeConfigService } from '../../testing';
import { createSuccessResponse, createErrorResponse } from '../../testing';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: RuntimeConfigService, useClass: MockRuntimeConfigService }
      ]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make GET request with action parameter', () => {
    const mockResponse = createSuccessResponse([{ id: '1' }]);

    service.get('getProducts').subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(r => r.params.get('action') === 'getProducts');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should pass additional query parameters', (done: DoneFn) => {
    const mockResponse = createSuccessResponse({ id: '1' });

    service.get('getProduct', { slug: 'test-product' }).subscribe(response => {
      expect(response).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne(r =>
      r.params.get('action') === 'getProduct' &&
      r.params.get('slug') === 'test-product'
    );
    req.flush(mockResponse);
  });

  it('should use runtime config URL when available', (done: DoneFn) => {
    const mockResponse = createSuccessResponse({});
    service.get('health').subscribe(response => {
      expect(response).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne(r => r.url === 'http://localhost/api');
    req.flush(mockResponse);
  });
});

describe('unwrapResponse', () => {
  it('should extract data from successful response', (done: DoneFn) => {
    const response = createSuccessResponse({ name: 'test' });

    of(response).pipe(unwrapResponse()).subscribe({
      next: (data: unknown) => {
        expect(data).toEqual({ name: 'test' });
        done();
      }
    });
  });

  it('should throw ApiRequestError on failure response', (done: DoneFn) => {
    const response = createErrorResponse('PRODUCT_NOT_FOUND', 'Not found');

    of(response).pipe(unwrapResponse()).subscribe({
      error: (err: Error) => {
        expect(err.name).toBe('ApiRequestError');
        expect(err.message).toBe('Not found');
        done();
      }
    });
  });
});
