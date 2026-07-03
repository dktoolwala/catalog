/**
 * Search Box Component
 *
 * Standalone reusable search input with:
 *   - Debounced output (configurable delay)
 *   - Clear button
 *   - Configurable placeholder and maxlength
 *
 * No HTTP calls — emits the debounced search term for the parent to act on.
 * Uses RxJS debounceTime with toObservable() from rxjs-interop.
 */

import {
  Component,
  ChangeDetectionStrategy,
  DestroyRef,
  effect,
  inject,
  input,
  output,
  signal
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, skip } from 'rxjs';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

import { SEARCH } from '../../../core/constants';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [MatFormField, MatLabel, MatSuffix, MatInput, MatIcon, MatIconButton],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBoxComponent {
  /** Placeholder text for the input */
  readonly placeholder = input<string>('Search...');

  /** Maximum input length */
  readonly maxlength = input<number>(100);

  /** Debounce delay in milliseconds */
  readonly debounceMs = input<number>(SEARCH.DEBOUNCE_MS);

  /** Initial value to populate the input (e.g. from URL query param) */
  readonly initialValue = input<string>('');

  /** Emitted after debounce with the current search term */
  readonly searchChange = output<string>();

  /** Internal search term state */
  protected readonly searchTerm = signal('');

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    // Sync initialValue input to internal state (for deep links)
    effect(() => {
      const value = this.initialValue();
      if (value !== this.searchTerm()) {
        this.searchTerm.set(value);
      }
    });

    toObservable(this.searchTerm).pipe(
      skip(1),
      debounceTime(this.debounceMs()),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(term => this.searchChange.emit(term));
  }

  protected onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }

  protected clear(): void {
    this.searchTerm.set('');
    this.searchChange.emit('');
  }
}
