/**
 * Loading Spinner Component
 *
 * Displays an Angular Material progress spinner when HTTP requests are in flight.
 * Reads the LoadingService.loading signal directly.
 *
 * Modes:
 *   - inline: spinner within document flow
 *   - overlay: fixed full-screen backdrop with centered spinner
 */

import { Component, ChangeDetectionStrategy, inject, input } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

import { LoadingService } from '../../../core/state';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [MatProgressSpinner],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingSpinnerComponent {
  /** Spinner diameter in pixels */
  readonly diameter = input<number>(48);

  /** Whether to show as a full-screen overlay */
  readonly overlay = input<boolean>(false);

  protected readonly loadingService = inject(LoadingService);
}
