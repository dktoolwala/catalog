/**
 * Platform Module Barrel Export
 *
 * All platform services are re-exported from here.
 * Platform services handle cross-cutting infrastructure:
 * SEO, configuration, browser APIs, structured data.
 */

export { RuntimeConfigService } from './services/runtime-config.service';
export { AppInitializerService } from './services/app-initializer.service';
export { SeoService } from './services/seo.service';
export { BrowserTitleService } from './services/browser-title.service';
export { BrowserMetaService } from './services/browser-meta.service';
export { CanonicalUrlService } from './services/canonical-url.service';
export { StructuredDataService } from './services/structured-data.service';
export { PwaUpdateService } from './services/pwa-update.service';
export { PwaInstallService } from './services/pwa-install.service';
