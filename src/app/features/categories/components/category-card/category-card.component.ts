/**
 * Category Card Component
 *
 * Presentation-only card for displaying a category in the grid.
 * Uses Material Card with category name and product count.
 * Emits selected when the user activates the card.
 *
 * No router logic — parent handles navigation.
 * No service injection.
 */

import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { type Category } from '../../../../core/models';

const CATEGORY_COLORS = [
  '#DCFCE7',
  '#DBEAFE',
  '#FEF3C7',
  '#FCE7F3',
  '#E0E7FF',
  '#D1FAE5',
  '#FEE2E2',
  '#F3E8FF',
  '#CFFAFE',
  '#FEF9C3'
];

const CATEGORY_TEXT_COLORS = [
  '#166534',
  '#1E40AF',
  '#92400E',
  '#9D174D',
  '#3730A3',
  '#065F46',
  '#991B1B',
  '#6B21A8',
  '#155E75',
  '#854D0E'
];

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryCardComponent {
  readonly category = input.required<Category>();
  readonly productCount = input<number>(0);
  readonly selected = output<Category>();

  protected getCardColor(): string {
    const idx = Math.abs(this.hashCode(this.category().name)) % CATEGORY_COLORS.length;
    return CATEGORY_COLORS[idx];
  }

  protected getCategoryImage(): string {
    const idx = Math.abs(this.hashCode(this.category().name)) % CATEGORY_COLORS.length;
    const bg = CATEGORY_COLORS[idx].replace('#', '');
    const fg = CATEGORY_TEXT_COLORS[idx].replace('#', '');
    const name = encodeURIComponent(this.category().name);
    return `https://placehold.co/400x250/${bg}/${fg}?font=montserrat&text=${name}`;
  }

  protected onActivate(): void {
    this.selected.emit(this.category());
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.onActivate();
    }
  }

  private hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  }
}
