/**
 * Product Image Component
 *
 * Reusable product image display.
 * Uses LazyImageDirective for deferred loading and SafeImagePipe for fallback.
 * Presentation only — no service injection.
 */

import { Component, ChangeDetectionStrategy, input } from '@angular/core';

import { LazyImageDirective } from '../../../../shared/directives';
import { SafeImagePipe } from '../../../../shared/pipes';

@Component({
  selector: 'app-product-image',
  standalone: true,
  imports: [LazyImageDirective, SafeImagePipe],
  templateUrl: './product-image.component.html',
  styleUrl: './product-image.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductImageComponent {
  /** Image URL to display */
  readonly src = input.required<string>();

  /** Alt text for accessibility */
  readonly alt = input.required<string>();

  /** CSS aspect ratio (default: 4/3 for cards) */
  readonly aspectRatio = input<string>('4 / 3');
}
