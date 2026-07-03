/**
 * Mock API Responses
 *
 * Factory functions for generating mock API response envelopes.
 * Used across all test suites to avoid hardcoded response fixtures.
 */

import { type ApiResponse, type ApiSuccessResponse, type ApiErrorResponse } from '../core/models';

export function createSuccessResponse<T>(
  data: T,
  overrides?: Partial<ApiSuccessResponse<T>>
): ApiResponse<T> {
  return {
    success: true,
    data,
    apiVersion: '1.0.0',
    catalogVersion: '2024.01',
    requestId: 'test-request-id-001',
    timestamp: new Date().toISOString(),
    ...overrides
  } as ApiSuccessResponse<T>;
}

export function createErrorResponse(code: string, message: string): ApiResponse<never> {
  return {
    success: false,
    error: { code, message },
    apiVersion: '1.0.0',
    requestId: 'test-request-id-err',
    timestamp: new Date().toISOString()
  } as ApiErrorResponse;
}
