/**
 * App Component
 *
 * Root component of the application.
 * Contains the router outlet plus global overlays:
 *   - Route loading indicator (top bar)
 *   - Offline banner (bottom bar)
 *
 * The ShellComponent (loaded as a parent route) provides all layout structure.
 */

import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { RouteLoadingIndicatorComponent } from './performance/components/route-loading-indicator/route-loading-indicator.component';
import { OfflineBannerComponent } from './performance/components/offline-banner/offline-banner.component';
import { PwaUpdateBannerComponent } from './performance/components/pwa-update-banner/pwa-update-banner.component';
import { PwaUpdateService, PwaInstallService } from './platform';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouteLoadingIndicatorComponent,
    OfflineBannerComponent,
    PwaUpdateBannerComponent
  ],
  template: `
    <app-route-loading-indicator />
    <router-outlet />
    <app-pwa-update-banner />
    <app-offline-banner />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  private readonly pwaUpdate = inject(PwaUpdateService);
  private readonly pwaInstall = inject(PwaInstallService);

  ngOnInit(): void {
    this.pwaUpdate.initialize();
    this.pwaInstall.initialize();
  }
}
