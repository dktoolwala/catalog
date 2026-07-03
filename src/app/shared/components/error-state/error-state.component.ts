/**
 * Error State Component
 *
 * Displays the current application error from ErrorService.
 * Provides a retry button that emits an event — the parent
 * decides what retry means (reload data, navigate, etc.).
 *
 * Reads ErrorService.error signal directly.
 * No retry logic inside this component.
 */

import { Component, ChangeDetectionStrategy, inject, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

import { ErrorService } from '../../../core/error';

@Component({
  selector: 'app-error-state',
  standalone: true,
  imports: [MatIcon, MatButton],
  templateUrl: './error-state.component.html',
  styleUrl: './error-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorStateComponent {
  /** Emitted when the user clicks the retry button */
  readonly retry = output<void>();

  protected readonly errorService = inject(ErrorService);

  protected onRetry(): void {
    this.errorService.clearError();
    this.retry.emit();
  }
}
