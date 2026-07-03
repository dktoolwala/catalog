/**
 * Request ID Interceptor
 *
 * Position: 1st in the chain (outermost).
 * Generates a UUID v4 and attaches it as the X-Request-ID header.
 * This ID correlates frontend requests with backend logs (which also
 * generate a requestId via Utilities.getUuid() in Main.gs).
 *
 * Stateless — each request gets a unique ID.
 * Preserves all existing headers.
 */

import { HttpContextToken, type HttpInterceptorFn } from '@angular/common/http';

import { generateUuid } from '../utils';

/** Token to carry the frontend request ID via HttpContext (no custom header sent). */
export const REQUEST_ID_TOKEN = new HttpContextToken<string>(() => '');

export const requestIdInterceptor: HttpInterceptorFn = (req, next) => {
  // Note: Custom headers (X-Request-ID) trigger CORS preflight (OPTIONS request).
  // GAS Web Apps do not handle OPTIONS, so adding custom headers causes requests to fail.
  // The backend generates its own requestId via Utilities.getUuid() in Main.gs.
  // We generate a local ID for frontend logging/tracing only (not sent to server).
  const requestId = generateUuid();
  const cloned = req.clone({
    context: req.context.set(REQUEST_ID_TOKEN, requestId)
  });
  return next(cloned);
};
