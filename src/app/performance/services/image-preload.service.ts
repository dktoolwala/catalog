/**
 * Image Preload Service
 *
 * Preloads images for perceived performance improvement.
 * Prioritizes above-the-fold images and product hero images.
 * Uses requestIdleCallback when available for non-critical preloads.
 */

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ImagePreloadService {
  private readonly preloadedUrls = new Set<string>();

  /** Preload a single image (high priority) */
  preload(url: string): Promise<void> {
    if (!url || this.preloadedUrls.has(url)) return Promise.resolve();

    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => {
        this.preloadedUrls.add(url);
        resolve();
      };
      img.onerror = () => resolve(); // Non-critical
      img.src = url;
    });
  }

  /** Preload multiple images with idle scheduling */
  preloadBatch(urls: string[]): void {
    const unique = urls.filter(u => u && !this.preloadedUrls.has(u));
    if (unique.length === 0) return;

    if ('requestIdleCallback' in window) {
      (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(
        () => {
          unique.forEach(url => this.preload(url));
        }
      );
    } else {
      setTimeout(() => {
        unique.forEach(url => this.preload(url));
      }, 100);
    }
  }

  /** Check if an image has been preloaded */
  isPreloaded(url: string): boolean {
    return this.preloadedUrls.has(url);
  }
}
