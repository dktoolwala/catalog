import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors, HttpClient } from '@angular/common/http';

import { loadingInterceptor } from './loading.interceptor';
import { LoadingService } from '../state/loading.service';

describe('loadingInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;
  let loadingService: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([loadingInterceptor])),
        provideHttpClientTesting()
      ]
    });
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
    loadingService = TestBed.inject(LoadingService);
  });

  afterEach(() => httpMock.verify());

  it('should set loading to true when request starts', () => {
    http.get('/api').subscribe();
    expect(loadingService.loading()).toBe(true);
    httpMock.expectOne('/api').flush({});
  });

  it('should set loading to false when request completes', () => {
    http.get('/api').subscribe();
    httpMock.expectOne('/api').flush({});
    expect(loadingService.loading()).toBe(false);
  });

  it('should set loading to false on error', () => {
    http.get('/api').subscribe({
      error: () => {
        /* expected */
      }
    });
    httpMock.expectOne('/api').flush(null, { status: 500, statusText: 'Error' });
    expect(loadingService.loading()).toBe(false);
  });
});
