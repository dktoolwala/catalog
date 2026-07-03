/**
 * Footer Component
 *
 * Application footer displaying business information
 * fetched from the Settings sheet via SettingsService.
 */

import { Component, ChangeDetectionStrategy, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

import { APP_INFO } from '../../core/constants';
import { Settings } from '../../core/models';
import { SettingsService } from '../../core/services';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, MatIcon],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
  private readonly settingsService = inject(SettingsService);

  protected readonly appVersion = APP_INFO.VERSION;
  protected readonly currentYear = new Date().getFullYear();
  protected readonly settings = signal<Settings | null>(null);

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe(s => this.settings.set(s));
  }

  protected getMapUrl(): string | null {
    const s = this.settings();
    if (s?.mapLink) return s.mapLink;
    if (s?.address) return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(s.address);
    return null;
  }
}
