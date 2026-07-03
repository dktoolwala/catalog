/**
 * Performance Module Barrel Export
 *
 * Performance infrastructure: preloading, caching, lazy loading utilities.
 */

export { SelectivePreloadingStrategy } from './strategies/selective-preloading.strategy';
export { ImagePreloadService } from './services/image-preload.service';
export { HttpCacheInterceptorFn } from './interceptors/http-cache.interceptor';
export { DeduplicateInterceptorFn } from './interceptors/deduplicate.interceptor';
export { SkeletonComponent } from './components/skeleton/skeleton.component';
export { RouteLoadingIndicatorComponent } from './components/route-loading-indicator/route-loading-indicator.component';
export { OfflineBannerComponent } from './components/offline-banner/offline-banner.component';
export { PwaUpdateBannerComponent } from './components/pwa-update-banner/pwa-update-banner.component';
