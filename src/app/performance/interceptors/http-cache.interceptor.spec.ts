import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors, HttpClient } from '@angular/common/http';

import { HttpCacheInterceptorFn, clearHttpCache, invalidateCache } from './http-cache.interceptor';

describe('HttpCacheInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([HttpCacheInterceptorFn])),
        provideHttpClientTesting()
      ]
    });
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    clearHttpCache();
  });

  afterEach(() => {
    httpMock.verify();
    clearHttpCache();
  });

  it('should cache GET requests', () => {
    http.get('/api/data').subscribe(data => {
      expect(data).toEqual({ id: 1 });
    });

    const req1 = httpMock.expectOne('/api/data');
    req1.flush({ id: 1 });

    http.get('/api/data').subscribe(data => {
      expect(data).toEqual({ id: 1 });
    });

    // Second request should use cache, so no HTTP request expected
    httpMock.expectNone('/api/data');
  });

  it('should not cache non-GET requests', () => {
    http.post('/api/data', { name: 'test' }).subscribe();

    const req1 = httpMock.expectOne('/api/data');
    req1.flush({ id: 1 });

    http.post('/api/data', { name: 'test' }).subscribe();

    // POST should not be cached, so another request is expected
    const req2 = httpMock.expectOne('/api/data');
    req2.flush({ id: 2 });
  });

  it('should skip cache when x-no-cache header is set', () => {
    http.get('/api/data').subscribe();

    const req1 = httpMock.expectOne('/api/data');
    req1.flush({ id: 1 });

    http.get('/api/data', { headers: { 'x-no-cache': 'true' } }).subscribe();

    // With x-no-cache, cache should be bypassed
    const req2 = httpMock.expectOne('/api/data');
    req2.flush({ id: 2 });
  });

  it('should not cache error responses', () => {
    http.get('/api/data').subscribe({
      error: () => {
        /* expected */
      }
    });

    const req1 = httpMock.expectOne('/api/data');
    req1.flush(null, { status: 500, statusText: 'Error' });

    http.get('/api/data').subscribe({
      error: () => {
        /* expected */
      }
    });

    // Error response should not be cached
    const req2 = httpMock.expectOne('/api/data');
    req2.flush(null, { status: 500, statusText: 'Error' });
  });

  it('should not cache non-2xx responses', () => {
    http.get('/api/data').subscribe({
      error: () => {
        /* expected */
      }
    });

    const req1 = httpMock.expectOne('/api/data');
    req1.flush(null, { status: 404, statusText: 'Not Found' });

    http.get('/api/data').subscribe({
      error: () => {
        /* expected */
      }
    });

    // Non-2xx response should not be cached
    const req2 = httpMock.expectOne('/api/data');
    req2.flush(null, { status: 404, statusText: 'Not Found' });
  });

  it('should clear the cache', () => {
    http.get('/api/data').subscribe();

    const req1 = httpMock.expectOne('/api/data');
    req1.flush({ id: 1 });

    clearHttpCache();

    http.get('/api/data').subscribe();

    // After clearing cache, new request is expected
    const req2 = httpMock.expectOne('/api/data');
    req2.flush({ id: 1 });
  });

  it('should invalidate specific cache patterns', () => {
    http.get('/api/data/1').subscribe();
    const req1 = httpMock.expectOne('/api/data/1');
    req1.flush({ id: 1 });

    http.get('/api/users/1').subscribe();
    const req2 = httpMock.expectOne('/api/users/1');
    req2.flush({ id: 1 });

    invalidateCache('data');

    http.get('/api/data/1').subscribe();
    // 'data' pattern was invalidated, so new request expected
    const req3 = httpMock.expectOne('/api/data/1');
    req3.flush({ id: 1 });

    http.get('/api/users/1').subscribe();
    // 'users' pattern was not invalidated, so cache used
    httpMock.expectNone('/api/users/1');
  });
});
