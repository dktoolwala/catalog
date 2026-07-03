/**
 * Header Component
 *
 * Application toolbar with:
 *   - Mobile menu toggle button
 *   - Application title
 *   - Desktop navigation links
 *   - Search entry point (navigates to /search)
 *   - Theme toggle placeholder
 *
 * No business logic, no ProductService, no HTTP calls.
 */

import { Component, ChangeDetectionStrategy, inject, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

import { APP_TITLE } from '../../shared/tokens';
import { ROUTE_URLS } from '../../core/constants';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatIcon
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  /** Emitted when the mobile menu button is clicked */
  readonly menuToggle = output<void>();

  protected readonly appTitle = inject(APP_TITLE);
  protected readonly routes = ROUTE_URLS;
}
