/**
 * Skeleton Loading Component
 *
 * Lightweight placeholder shown while content loads.
 * Configurable shape: line, circle, card, grid.
 * Uses CSS animation (no JS) for optimal performance.
 */

import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  template: `
    <div
      class="skeleton"
      [class.skeleton--line]="variant() === 'line'"
      [class.skeleton--circle]="variant() === 'circle'"
      [class.skeleton--card]="variant() === 'card'"
      [class.skeleton--rect]="variant() === 'rect'"
      [style.width]="width()"
      [style.height]="height()"
      [attr.aria-hidden]="true"
      role="presentation"
    ></div>
  `,
  styles: [
    `
      .skeleton {
        background: linear-gradient(
          90deg,
          var(--mat-sys-surface-variant, #e0e0e0) 25%,
          var(--mat-sys-surface, #f5f5f5) 50%,
          var(--mat-sys-surface-variant, #e0e0e0) 75%
        );
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite ease-in-out;
        border-radius: 4px;

        &--line {
          height: 1rem;
          width: 100%;
        }

        &--circle {
          border-radius: 50%;
        }

        &--card {
          height: 200px;
          border-radius: 8px;
        }

        &--rect {
          border-radius: 4px;
        }
      }

      @keyframes shimmer {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkeletonComponent {
  readonly variant = input<'line' | 'circle' | 'card' | 'rect'>('line');
  readonly width = input<string>('100%');
  readonly height = input<string>('');
}
