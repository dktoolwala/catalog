/**
 * Shell Component
 *
 * Application layout frame that wraps all feature routes.
 * Provides: header, responsive navigation (sidenav), main content area,
 * footer, loading overlay, and global error banner.
 *
 * Loaded as a parent route — child routes render in its <router-outlet>.
 * Knows NOTHING about specific features (Products, Categories, etc.).
 */

import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';

import { LoadingSpinnerComponent, ErrorStateComponent } from '../../shared/components';
import { HeaderComponent } from '../header/header.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    LoadingSpinnerComponent,
    ErrorStateComponent,
    HeaderComponent,
    NavigationComponent,
    FooterComponent
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent {
  protected readonly sidenavOpen = signal(false);

  protected toggleSidenav(): void {
    this.sidenavOpen.update(open => !open);
  }

  protected closeSidenav(): void {
    this.sidenavOpen.set(false);
  }
}
