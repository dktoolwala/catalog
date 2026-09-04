/**
 * Loading Spinner Component
 *
 * Displays a custom circular spinner when HTTP requests are in flight.
 * Reads the LoadingService.loading signal directly.
 *
 * Modes:
 *   - inline: spinner within document flow
 *   - overlay: fixed full-screen backdrop with centered spinner
 */

import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { LoadingService } from '../../../core/state';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingSpinnerComponent {
  /** Spinner diameter in pixels */
  readonly diameter = input<number>(48);

  /** Spinner stroke width in pixels (thicker looks bolder/more visible) */
  readonly strokeWidth = input<number>(4);

  /** Whether to show as a full-screen overlay */
  readonly overlay = input<boolean>(false);

  protected readonly loadingService = inject(LoadingService);
}
