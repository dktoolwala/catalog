/**
 * Browser Meta Service
 *
 * Wraps Angular's Meta service.
 * No page should inject Angular Meta directly — use this instead.
 * Handles OpenGraph, Twitter Card, and standard meta tags.
 */

import { Injectable, inject } from '@angular/core';
import { Meta, MetaDefinition } from '@angular/platform-browser';

import { RuntimeConfigService } from './runtime-config.service';

export interface PageMeta {
  readonly title?: string;
  readonly description?: string;
  readonly image?: string;
  readonly url?: string;
  readonly type?: string;
  readonly keywords?: string;
  readonly author?: string;
}

@Injectable({ providedIn: 'root' })
export class BrowserMetaService {
  private readonly meta = inject(Meta);
  private readonly config = inject(RuntimeConfigService);

  /** Set all meta tags for a page */
  update(page: PageMeta): void {
    const title = page.title || this.config.appTitle;
    const description = page.description || this.config.config().appDescription;
    const url = page.url || this.config.baseUrl;
    const image = page.image || '';
    const type = page.type || 'website';

    // Standard meta
    this.setTag('description', description);
    if (page.keywords) this.setTag('keywords', page.keywords);
    if (page.author) this.setTag('author', page.author);

    // OpenGraph
    this.setProperty('og:title', title);
    this.setProperty('og:description', description);
    this.setProperty('og:url', url);
    this.setProperty('og:type', type);
    this.setProperty('og:site_name', this.config.appTitle);
    if (image) this.setProperty('og:image', image);

    // Twitter Card
    this.setTag('twitter:card', image ? 'summary_large_image' : 'summary');
    this.setTag('twitter:title', title);
    this.setTag('twitter:description', description);
    if (image) this.setTag('twitter:image', image);
  }

  /** Set defaults (called once on init) */
  setDefaults(): void {
    this.update({});
    this.setTag('robots', 'index, follow');
    this.setProperty('og:locale', 'en_IN');
  }

  /** Remove all dynamic meta tags */
  clear(): void {
    const selectors = [
      'name="description"', 'name="keywords"', 'name="author"',
      'property="og:title"', 'property="og:description"',
      'property="og:url"', 'property="og:type"',
      'property="og:image"', 'property="og:site_name"',
      'name="twitter:card"', 'name="twitter:title"',
      'name="twitter:description"', 'name="twitter:image"'
    ];
    selectors.forEach(sel => this.meta.removeTag(sel));
  }

  private setTag(name: string, content: string): void {
    const tag: MetaDefinition = { name, content };
    this.meta.updateTag(tag);
  }

  private setProperty(property: string, content: string): void {
    const tag: MetaDefinition = { property, content };
    this.meta.updateTag(tag);
  }
}
