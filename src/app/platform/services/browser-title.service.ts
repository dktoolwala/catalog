/**
 * Browser Title Service
 *
 * Wraps Angular's Title service.
 * No page should inject Angular Title directly — use this instead.
 * Appends app name suffix automatically.
 */

import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { RuntimeConfigService } from './runtime-config.service';

@Injectable({ providedIn: 'root' })
export class BrowserTitleService {
  private readonly title = inject(Title);
  private readonly config = inject(RuntimeConfigService);

  /** Set page title with app name suffix */
  set(pageTitle: string): void {
    const appName = this.config.appTitle;
    const fullTitle = pageTitle ? `${pageTitle} | ${appName}` : appName;
    this.title.setTitle(fullTitle);
  }

  /** Get the current title */
  get(): string {
    return this.title.getTitle();
  }

  /** Set title to app name only */
  reset(): void {
    this.title.setTitle(this.config.appTitle);
  }
}
