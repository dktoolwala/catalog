/**
 * Canonical URL Service
 *
 * Manages the <link rel="canonical"> tag in the document head.
 * Subscribes to Router events and updates the canonical URL
 * on every navigation. Prevents duplicate content issues.
 */

import { Injectable, inject, DestroyRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

import { RuntimeConfigService } from './runtime-config.service';

@Injectable({ providedIn: 'root' })
export class CanonicalUrlService {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly config = inject(RuntimeConfigService);
  private readonly destroyRef = inject(DestroyRef);

  private linkElement: HTMLLinkElement | null = null;

  /** Start listening to route changes and updating canonical */
  initialize(): void {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(event => {
        this.setUrl(this.buildCanonicalUrl(event.urlAfterRedirects));
      });
  }

  /** Manually set canonical URL */
  setUrl(url: string): void {
    if (!this.linkElement) {
      this.linkElement = this.document.createElement('link');
      this.linkElement.setAttribute('rel', 'canonical');
      this.document.head.appendChild(this.linkElement);
    }
    this.linkElement.setAttribute('href', url);
  }

  /** Remove the canonical tag */
  remove(): void {
    if (this.linkElement) {
      this.document.head.removeChild(this.linkElement);
      this.linkElement = null;
    }
  }

  private buildCanonicalUrl(path: string): string {
    const base = this.config.baseUrl.replace(/\/$/, '');
    const cleanPath = path.split('?')[0].split('#')[0];
    return `${base}${cleanPath}`;
  }
}
