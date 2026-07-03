/**
 * SEO Service
 *
 * High-level orchestrator for all SEO concerns.
 * Pages call this one service to update title, meta, canonical, and structured data.
 * Delegates to BrowserTitleService, BrowserMetaService, CanonicalUrlService,
 * and StructuredDataService internally.
 *
 * No page should inject Angular Meta, Title, or lower-level SEO services directly.
 */

import { Injectable, inject } from '@angular/core';

import { BrowserTitleService } from './browser-title.service';
import { BrowserMetaService, type PageMeta } from './browser-meta.service';
import { CanonicalUrlService } from './canonical-url.service';
import { StructuredDataService } from './structured-data.service';
import { RuntimeConfigService } from './runtime-config.service';

export interface SeoPageConfig {
  readonly title?: string;
  readonly description?: string;
  readonly image?: string;
  readonly url?: string;
  readonly type?: string;
  readonly keywords?: string;
  readonly noIndex?: boolean;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleService = inject(BrowserTitleService);
  private readonly metaService = inject(BrowserMetaService);
  private readonly canonical = inject(CanonicalUrlService);
  private readonly structuredData = inject(StructuredDataService);
  private readonly config = inject(RuntimeConfigService);

  /** Set defaults during initialization */
  setDefaults(): void {
    this.metaService.setDefaults();
    this.structuredData.setWebSite();
    this.structuredData.setOrganization();
  }

  /** Update SEO metadata for a page */
  updatePage(config: SeoPageConfig): void {
    if (config.title) {
      this.titleService.set(config.title);
    }

    const meta: PageMeta = {
      title: config.title,
      description: config.description,
      image: config.image,
      url: config.url,
      type: config.type,
      keywords: config.keywords
    };
    this.metaService.update(meta);

    if (config.url) {
      this.canonical.setUrl(config.url);
    }
  }

  /** Update SEO for a product detail page */
  updateProductPage(product: {
    name: string;
    description: string;
    sku: string;
    price: number;
    image?: string;
    category?: string;
    slug: string;
  }): void {
    this.updatePage({
      title: product.name,
      description: product.description,
      image: product.image,
      type: 'product',
      url: `${this.config.baseUrl}/products/${product.slug}`
    });
    this.structuredData.clear();
    this.structuredData.setProduct(product);
  }

  /** Update SEO for a category page */
  updateCategoryPage(categoryName: string, categoryId: string): void {
    this.updatePage({
      title: categoryName,
      description: `Browse ${categoryName} products in our catalog`,
      type: 'website',
      url: `${this.config.baseUrl}/categories/${categoryId}`
    });
  }

  /** Update SEO for the search page */
  updateSearchPage(query?: string): void {
    const title = query ? `Search: ${query}` : 'Search Products';
    this.updatePage({
      title,
      description: query ? `Search results for "${query}"` : 'Search our complete product catalog',
      type: 'website'
    });
  }

  /** Reset to defaults (e.g. on home page) */
  reset(): void {
    this.titleService.reset();
    this.metaService.setDefaults();
    this.structuredData.clear();
    this.structuredData.setWebSite();
    this.structuredData.setOrganization();
  }
}
