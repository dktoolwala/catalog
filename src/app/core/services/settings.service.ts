/**
 * Settings Service
 *
 * Provides application settings from the GAS backend.
 * Backend endpoint: ?action=getSettings
 *
 * Settings are key-value pairs from the Settings sheet,
 * coerced to appropriate types by the backend's coerceSettingValue().
 * Returns unwrapped domain model (not raw API envelope).
 */

import { Injectable, inject } from '@angular/core';
import { type Observable } from 'rxjs';

import { API_ACTIONS } from '../constants';
import { type Settings } from '../models';
import { ApiService, unwrapResponse } from './api.service';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly api = inject(ApiService);

  /** Fetch application settings */
  getSettings(): Observable<Settings> {
    return this.api.get<Settings>(API_ACTIONS.GET_SETTINGS).pipe(unwrapResponse());
  }
}
