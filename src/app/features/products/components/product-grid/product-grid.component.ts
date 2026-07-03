/**
 * Product Grid Component
 *
 * Responsive CSS Grid layout for product cards.
 * Receives a readonly array of Products and renders ProductCardComponents.
 * Uses @for with track by product.id for optimal DOM reconciliation.
 *
 * Presentation only — no services, no HTTP.
 */

import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';

import { Product } from '../../../../core/models';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-grid.component.html',
  styleUrl: './product-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductGridComponent {
  /** Array of products to display */
  readonly products = input.required<readonly Product[]>();

  /** Emitted when a product card is clicked */
  readonly productSelected = output<Product>();
}
