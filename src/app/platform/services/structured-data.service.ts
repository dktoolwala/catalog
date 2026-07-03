/**
 * Structured Data Service
 *
 * Manages JSON-LD structured data in the document head.
 * Supports Schema.org types for SEO:
 *   - Product
 *   - Organization
 *   - BreadcrumbList
 *   - WebSite
 *   - ItemList
 *
 * Inserts/removes <script type="application/ld+json"> elements.
 */

import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { RuntimeConfigService } from './runtime-config.service';

@Injectable({ providedIn: 'root' })
export class StructuredDataService {
  private readonly document = inject(DOCUMENT);
  private readonly config = inject(RuntimeConfigService);
  private activeScripts: HTMLScriptElement[] = [];

  /** Set organization structured data (typically on home page) */
  setOrganization(): void {
    this.insertJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: this.config.appTitle,
      url: this.config.baseUrl,
      description: this.config.config().appDescription
    });
  }

  /** Set website structured data with search action */
  setWebSite(): void {
    this.insertJsonLd({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: this.config.appTitle,
      url: this.config.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${this.config.baseUrl}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    });
  }

  /** Set product structured data */
  setProduct(product: {
    name: string;
    description: string;
    sku: string;
    price: number;
    image?: string;
    category?: string;
  }): void {
    this.insertJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      sku: product.sku,
      image: product.image || undefined,
      category: product.category || undefined,
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock'
      }
    });
  }

  /** Set breadcrumb structured data */
  setBreadcrumbs(items: { name: string; url: string }[]): void {
    this.insertJsonLd({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    });
  }

  /** Set item list (for category pages) */
  setItemList(items: { name: string; url: string }[]): void {
    this.insertJsonLd({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: item.url
      }))
    });
  }

  /** Remove all active structured data scripts */
  clear(): void {
    this.activeScripts.forEach(script => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    });
    this.activeScripts = [];
  }

  private insertJsonLd(data: object): void {
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    this.document.head.appendChild(script);
    this.activeScripts.push(script);
  }
}
