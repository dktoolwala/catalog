/**
 * Navigation Component
 *
 * Responsive sidebar navigation for mobile.
 * Uses Angular Material nav list with router link active highlighting.
 * Emits linkClicked to allow the shell to close the sidenav.
 *
 * Navigation items are defined as a readonly array — no HTTP calls needed.
 */

import { Component, ChangeDetectionStrategy, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatNavList, MatListItem } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';

import { ROUTE_URLS } from '../../core/constants';

interface NavItem {
  readonly path: string;
  readonly label: string;
  readonly icon: string;
  readonly exact: boolean;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatNavList, MatListItem, MatIcon],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  /** Emitted when any navigation link is clicked (closes sidenav) */
  readonly linkClicked = output<void>();

  protected readonly navItems: readonly NavItem[] = [
    { path: ROUTE_URLS.HOME, label: 'Home', icon: 'home', exact: true },
    { path: ROUTE_URLS.PRODUCTS, label: 'Products', icon: 'inventory_2', exact: false },
    { path: ROUTE_URLS.CATEGORIES, label: 'Categories', icon: 'category', exact: false },
    { path: ROUTE_URLS.SEARCH, label: 'Search', icon: 'search', exact: false }
  ];
}
