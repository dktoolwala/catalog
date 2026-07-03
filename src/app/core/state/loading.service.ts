/**
 * Loading Service
 *
 * Tracks the number of active HTTP requests using Angular Signals.
 * The loading interceptor calls begin()/end() for each request.
 * Components read the readonly `loading` signal to show/hide spinners.
 *
 * Concurrency-safe: multiple simultaneous requests each increment/decrement
 * independently. The `loading` computed signal is true when count > 0.
 */

import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private readonly activeRequests = signal(0);

  /** True when one or more HTTP requests are in flight */
  readonly loading = computed(() => this.activeRequests() > 0);

  /** Increment the active request counter */
  begin(): void {
    this.activeRequests.update(n => n + 1);
  }

  /** Decrement the active request counter (never goes below 0) */
  end(): void {
    this.activeRequests.update(n => Math.max(0, n - 1));
  }

  /** Reset the counter to zero (e.g., on navigation or error recovery) */
  reset(): void {
    this.activeRequests.set(0);
  }
}
