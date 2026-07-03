import { GlobalErrorHandler } from './global-error-handler';
import { ErrorService } from './error.service';
import { TestBed } from '@angular/core/testing';

describe('GlobalErrorHandler', () => {
  let handler: GlobalErrorHandler;
  let errorService: ErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalErrorHandler]
    });
    handler = TestBed.inject(GlobalErrorHandler);
    errorService = TestBed.inject(ErrorService);
  });

  it('should be created', () => {
    expect(handler).toBeTruthy();
  });

  it('should forward errors to ErrorService', () => {
    spyOn(errorService, 'handleError');
    const error = new Error('Test error');

    handler.handleError(error);

    expect(errorService.handleError).toHaveBeenCalledWith(error);
  });

  it('should unwrap promise rejections', () => {
    spyOn(errorService, 'handleError');
    const innerError = new Error('Rejection');
    const wrappedError = { rejection: innerError };

    handler.handleError(wrappedError);

    expect(errorService.handleError).toHaveBeenCalledWith(innerError);
  });

  it('should handle non-Error objects', () => {
    spyOn(errorService, 'handleError');

    handler.handleError('string error');

    expect(errorService.handleError).toHaveBeenCalledWith('string error');
  });
});
