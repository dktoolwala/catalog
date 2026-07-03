/**
 * URL Utility
 *
 * Pure functions for URL construction and query parameter building.
 * No Angular imports — works with plain strings.
 */

/**
 * Builds a query string from a key-value record.
 * Keys with undefined or null values are omitted.
 *
 * @param params - Record of parameter names to values
 * @returns Query string without leading "?" (e.g., "action=getProducts&slug=abc")
 */
export function buildQueryString(params: Record<string, string | number | boolean | null | undefined>): string {
  return Object.entries(params)
    .filter(([, value]) => value != null)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');
}

/**
 * Appends query parameters to a base URL.
 * Handles URLs that already contain a query string.
 *
 * @param baseUrl - The base URL
 * @param params - Record of parameter names to values
 * @returns Complete URL with query parameters
 */
export function appendQueryParams(
  baseUrl: string,
  params: Record<string, string | number | boolean | null | undefined>
): string {
  const queryString = buildQueryString(params);
  if (!queryString) {
    return baseUrl;
  }
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}${queryString}`;
}

/**
 * Replaces a named path parameter in a URL template.
 *
 * @param template - URL template with :param placeholders (e.g., "/products/:slug")
 * @param param - Parameter name without colon (e.g., "slug")
 * @param value - Replacement value
 * @returns URL with the parameter replaced
 */
export function replacePathParam(template: string, param: string, value: string): string {
  return template.replace(`:${param}`, encodeURIComponent(value));
}
