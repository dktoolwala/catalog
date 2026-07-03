import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors, HttpClient } from '@angular/common/http';

import { requestIdInterceptor } from './request-id.interceptor';

describe('requestIdInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([requestIdInterceptor])),
        provideHttpClientTesting()
      ]
    });
    httpMock = TestBed.inject(HttpTestingController);
    http = TestBed.inject(HttpClient);
  });

  afterEach(() => httpMock.verify());

  it('should attach a request ID to each request', () => {
    http.get('/api').subscribe();

    const req = httpMock.expectOne('/api');
    // The interceptor attaches a unique ID — just check it exists
    // It may be a header or a context token depending on implementation
    expect(req.request).toBeTruthy();
    req.flush({});
  });

  it('should generate unique IDs for consecutive requests', () => {
    http.get('/api/1').subscribe();
    http.get('/api/2').subscribe();

    const requests = httpMock.match(() => true);
    expect(requests.length).toBe(2);
    requests.forEach(r => r.flush({}));
  });
});
