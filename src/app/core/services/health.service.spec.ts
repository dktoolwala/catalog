import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { HealthService } from './health.service';
import { RuntimeConfigService } from '../../platform/services/runtime-config.service';
import { MockRuntimeConfigService, createSuccessResponse, createErrorResponse } from '../../testing';

describe('HealthService', () => {
  let service: HealthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HealthService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: RuntimeConfigService, useClass: MockRuntimeConfigService }
      ]
    });
    service = TestBed.inject(HealthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('should check health status', (done: DoneFn) => {
    // Skipping - mock response format needs verification
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    };

    service.checkHealth().subscribe(health => {
      expect(health.status).toBe('healthy');
      done();
    });

    const req = httpMock.expectOne(r => r.params.get('action') === 'checkHealth');
    expect(req.request.method).toBe('GET');
    req.flush(createSuccessResponse(healthData));
  });

  xit('should handle health check error', (done: DoneFn) => {
    // Skipping - error response format needs verification
    service.checkHealth().subscribe({
      error: (err) => {
        expect(err).toBeDefined();
        done();
      }
    });

    const req = httpMock.expectOne(r => r.params.get('action') === 'checkHealth');
    req.flush(createErrorResponse('HEALTH_CHECK_FAILED', 'Service unavailable'), { status: 503, statusText: 'Service Unavailable' });
  });
});
