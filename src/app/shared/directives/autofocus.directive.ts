/**
 * Autofocus Directive
 *
 * Automatically focuses the host element after the view initializes.
 * Useful for search inputs, modal forms, etc.
 *
 * Usage:
 *   <input appAutofocus />
 *   <input [appAutofocus]="shouldFocus()" />
 */

import { Directive, ElementRef, type AfterViewInit, inject, input } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
  standalone: true
})
export class AutofocusDirective implements AfterViewInit {
  /** Whether autofocus is enabled (default: true) */
  readonly appAutofocus = input<boolean | ''>(true);

  private readonly el = inject(ElementRef<HTMLElement>);

  ngAfterViewInit(): void {
    const enabled = this.appAutofocus();
    // Treat empty string '' (bare attribute) as true
    if (enabled === '' || enabled === true) {
      // Delay to ensure the element is rendered and focusable
      requestAnimationFrame(() => {
        this.el.nativeElement.focus();
      });
    }
  }
}
