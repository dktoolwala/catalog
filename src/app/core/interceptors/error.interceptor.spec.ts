import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors, HttpClient, HttpErrorResponse } from '@angular/common/http';

import { errorInterceptor } from './error.interceptor';
import { ErrorService } from '../error/error.service';

describe('errorInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  let errorService: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting()
      ]
    });
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    errorService = TestBed.inject(ErrorService);
  });

  afterEach(() => httpMock.verify());

  it('should pass successful requests through', () => {
    http.get('/api').subscribe(data => {
      expect(data).toEqual({ ok: true });
    });
    httpMock.expectOne('/api').flush({ ok: true });
  });

  it('should classify network errors', () => {
    http.get('/api').subscribe({ error: () => {} });
    httpMock.expectOne('/api').error(new ProgressEvent('error'), { status: 0 });

    expect(errorService.error()?.code).toBe('NETWORK_ERROR');
  });

  it('should classify timeout errors', () => {
    http.get('/api').subscribe({ error: () => {} });
    httpMock.expectOne('/api').flush(null, { status: 408, statusText: 'Timeout' });

    expect(errorService.error()?.code).toBe('TIMEOUT_ERROR');
  });

  it('should classify HTTP errors by status code', () => {
    http.get('/api').subscribe({ error: () => {} });
    httpMock.expectOne('/api').flush(null, { status: 500, statusText: 'Server Error' });

    expect(errorService.error()?.code).toBe('HTTP_500');
  });

  it('should re-throw error for upstream handling', (done: DoneFn) => {
    http.get('/api').subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(HttpErrorResponse);
        done();
      }
    });
    httpMock.expectOne('/api').flush(null, { status: 404, statusText: 'Not Found' });
  });
});
