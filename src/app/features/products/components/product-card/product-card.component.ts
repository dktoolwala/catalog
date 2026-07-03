/**
 * Product Card Component
 *
 * Presentation-only card for displaying a product in the grid.
 * Uses Material Card with image, title, category, price.
 * Emits viewClicked when the user activates the card.
 *
 * No router logic — parent handles navigation.
 * No service injection.
 */

import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { Product } from '../../../../core/models';
import { CurrencyFormatPipe } from '../../../../shared/pipes';
import { ProductImageComponent } from '../product-image/product-image.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatIcon, CurrencyFormatPipe, ProductImageComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  /** The product to display */
  readonly product = input.required<Product>();

  /** Emitted when the user clicks/activates the card */
  readonly viewClicked = output<Product>();

  protected onActivate(): void {
    this.viewClicked.emit(this.product());
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onActivate();
    }
  }
}
