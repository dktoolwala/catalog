/**
 * Safe Image Pipe
 *
 * Returns the image URL if it appears valid, otherwise returns the
 * placeholder image path. Prevents broken image icons in the UI.
 * Pure pipe — only recalculates when input changes.
 */

import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'safeImage',
  standalone: true,
  pure: true
})
export class SafeImagePipe implements PipeTransform {
  private readonly placeholder = 'assets/images/placeholder.svg';

  transform(url: string | null | undefined): string {
    if (!url || !url.trim()) {
      return this.placeholder;
    }

    // Basic URL validation — must start with http(s) or relative path
    if (
      url.startsWith('http://') ||
      url.startsWith('https://') ||
      url.startsWith('/') ||
      url.startsWith('assets/')
    ) {
      return url;
    }

    return this.placeholder;
  }
}
