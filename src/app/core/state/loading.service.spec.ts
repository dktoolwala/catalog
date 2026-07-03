import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not be loading initially', () => {
    expect(service.loading()).toBe(false);
  });

  it('should be loading after begin()', () => {
    service.begin();
    expect(service.loading()).toBe(true);
  });

  it('should not be loading after begin() + end()', () => {
    service.begin();
    service.end();
    expect(service.loading()).toBe(false);
  });

  it('should track multiple concurrent requests', () => {
    service.begin();
    service.begin();
    service.end();
    expect(service.loading()).toBe(true);
    service.end();
    expect(service.loading()).toBe(false);
  });

  it('should reset to zero', () => {
    service.begin();
    service.begin();
    service.reset();
    expect(service.loading()).toBe(false);
  });

  it('should not go below zero', () => {
    service.end();
    service.end();
    expect(service.loading()).toBe(false);
  });
});
