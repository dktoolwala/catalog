/**
 * Empty State Component
 *
 * Reusable placeholder shown when there is no data to display.
 * Used for: no products found, no search results, empty categories.
 *
 * Provides an optional action button that emits an event to the parent.
 */

import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [MatIcon, MatButton],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyStateComponent {
  /** Heading text */
  readonly title = input.required<string>();

  /** Descriptive message */
  readonly message = input<string>('');

  /** Material icon name */
  readonly icon = input<string>('inbox');

  /** Optional action button label — button hidden when empty */
  readonly actionLabel = input<string>('');

  /** Emitted when the action button is clicked */
  readonly actionClick = output<void>();
}
