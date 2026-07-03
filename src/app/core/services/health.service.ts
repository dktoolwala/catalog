/**
 * Health Service
 *
 * Checks the GAS backend health status.
 * Backend endpoint: ?action=health
 *
 * The health endpoint does NOT access the spreadsheet,
 * making it a lightweight connectivity check.
 * Returns HealthData (the `data` payload from the envelope).
 */

import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { API_ACTIONS } from '../constants';
import { HealthData } from '../models';
import { ApiService, unwrapResponse } from './api.service';

@Injectable({ providedIn: 'root' })
export class HealthService {
  private readonly api = inject(ApiService);

  /** Check backend health and connectivity */
  checkHealth(): Observable<HealthData> {
    return this.api
      .get<HealthData>(API_ACTIONS.HEALTH)
      .pipe(unwrapResponse());
  }
}
