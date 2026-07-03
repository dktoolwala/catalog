/**
 * Lazy Image Directive
 *
 * Uses IntersectionObserver to defer image loading until the element
 * enters the viewport. Applies the image `src` only when visible.
 *
 * Usage:
 *   <img [appLazyImage]="imageUrl" alt="..." />
 *
 * The directive sets a placeholder initially and swaps to the real
 * src when the element becomes visible (threshold: 0.1).
 */

import { Directive, ElementRef, type OnDestroy, inject, input, effect } from '@angular/core';

import { IMAGE_PLACEHOLDER } from '../tokens';

@Directive({
  selector: '[appLazyImage]',
  standalone: true
})
export class LazyImageDirective implements OnDestroy {
  /** The image URL to lazy-load */
  readonly appLazyImage = input.required<string>();

  private readonly el = inject(ElementRef<HTMLImageElement>);
  private readonly placeholder = inject(IMAGE_PLACEHOLDER);
  private observer: IntersectionObserver | null = null;

  constructor() {
    const imgEl = this.el.nativeElement;
    imgEl.src = this.placeholder;

    // Fallback to placeholder on load error
    imgEl.onerror = () => {
      imgEl.onerror = null;
      imgEl.src = this.placeholder;
    };

    effect(() => {
      const url = this.appLazyImage();
      this.observe(url);
    });
  }

  ngOnDestroy(): void {
    this.disconnect();
  }

  private observe(url: string): void {
    this.disconnect();

    if (!url) return;

    this.observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          const imgEl = this.el.nativeElement;
          // Re-attach onerror for the real URL
          imgEl.onerror = () => {
            imgEl.onerror = null;
            imgEl.src = this.placeholder;
          };
          imgEl.src = url;
          this.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    this.observer.observe(this.el.nativeElement);
  }

  private disconnect(): void {
    this.observer?.disconnect();
    this.observer = null;
  }
}
