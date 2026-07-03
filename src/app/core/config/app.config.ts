import {
  type ApplicationConfig,
  ErrorHandler,
  inject,
  isDevMode,
  provideAppInitializer
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withPreloading,
  withViewTransitions
} from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideServiceWorker } from '@angular/service-worker';

import { routes } from '../../app.routes';
import { GlobalErrorHandler } from '../error/global-error-handler';
import { AppInitializerService } from '../../platform/services/app-initializer.service';
import { requestIdInterceptor } from '../interceptors/request-id.interceptor';
import { loggingInterceptor } from '../interceptors/logging.interceptor';
import { loadingInterceptor } from '../interceptors/loading.interceptor';
import { retryInterceptor } from '../interceptors/retry.interceptor';
import { errorInterceptor } from '../interceptors/error.interceptor';
import { DeduplicateInterceptorFn } from '../../performance/interceptors/deduplicate.interceptor';
import { HttpCacheInterceptorFn } from '../../performance/interceptors/http-cache.interceptor';
import { SelectivePreloadingStrategy } from '../../performance/strategies/selective-preloading.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions(),
      withPreloading(SelectivePreloadingStrategy)
    ),

    provideHttpClient(
      withInterceptors([
        DeduplicateInterceptorFn,
        requestIdInterceptor,
        loggingInterceptor,
        loadingInterceptor,
        retryInterceptor,
        errorInterceptor,
        HttpCacheInterceptorFn
      ])
    ),

    provideAnimationsAsync(),

    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),

    { provide: ErrorHandler, useClass: GlobalErrorHandler },

    provideAppInitializer(() => {
      const initializer = inject(AppInitializerService);
      return initializer.initialize();
    })
  ]
};
