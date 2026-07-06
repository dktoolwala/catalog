import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors, HttpClient } from '@angular/common/http';

import { retryInterceptor } from './retry.interceptor';

describe('retryInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([retryInterceptor])),
        provideHttpClientTesting()
      ]
    });
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
  });

  afterEach(() => httpMock.verify());

  it('should pass successful requests through without retry', () => {
    http.get('/api').subscribe(data => {
      expect(data).toEqual({ ok: true });
    });
    httpMock.expectOne('/api').flush({ ok: true });
  });

  it('should not retry 4xx errors', (done: DoneFn) => {
    http.get('/api').subscribe({
      error: err => {
        expect(err.status).toBe(404);
        done();
      }
    });
    httpMock.expectOne('/api').flush(null, { status: 404, statusText: 'Not Found' });
  });

  it('should not retry 500 errors', (done: DoneFn) => {
    http.get('/api').subscribe({
      error: err => {
        expect(err.status).toBe(500);
        done();
      }
    });
    httpMock.expectOne('/api').flush(null, { status: 500, statusText: 'Internal Server Error' });
  });
});
