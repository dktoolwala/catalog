import { TestBed } from '@angular/core/testing';

import { ErrorService } from './error.service';

describe('ErrorService', () => {
  let service: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorService);
    spyOn(console, 'error');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have null error initially', () => {
    expect(service.error()).toBeNull();
  });

  it('should handle ApiRequestError', () => {
    const error = Object.assign(new Error('Not found'), {
      name: 'ApiRequestError',
      code: 'PRODUCT_NOT_FOUND'
    });

    service.handleError(error);

    const appError = service.error();
    expect(appError).not.toBeNull();
    expect(appError!.code).toBe('PRODUCT_NOT_FOUND');
    expect(appError!.message).toBe('The requested product could not be found.');
  });

  it('should handle standard Error', () => {
    service.handleError(new Error('Something broke'));

    const appError = service.error();
    expect(appError).not.toBeNull();
    expect(appError!.code).toBe('UNKNOWN_ERROR');
    expect(appError!.message).toBe('Something broke');
  });

  it('should handle unknown error types', () => {
    service.handleError('string error');

    const appError = service.error();
    expect(appError).not.toBeNull();
    expect(appError!.code).toBe('UNKNOWN_ERROR');
  });

  it('should set error from code and message', () => {
    service.setError('NETWORK_ERROR', 'Connection failed');

    const appError = service.error();
    expect(appError).not.toBeNull();
    expect(appError!.code).toBe('NETWORK_ERROR');
    expect(appError!.message).toBe('Unable to reach the server. Please check your internet connection.');
  });

  it('should clear error', () => {
    service.setError('NETWORK_ERROR', 'test');
    expect(service.error()).not.toBeNull();

    service.clearError();
    expect(service.error()).toBeNull();
  });

  it('should return user-friendly message for known codes', () => {
    expect(service.getUserMessage('TIMEOUT_ERROR')).toBe('The request took too long. Please try again.');
  });

  it('should return undefined for unknown codes', () => {
    expect(service.getUserMessage('SOME_UNKNOWN_CODE')).toBeUndefined();
  });
});
