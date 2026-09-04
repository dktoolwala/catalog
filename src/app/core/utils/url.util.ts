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
export function buildQueryString(
  params: Record<string, string | number | boolean | null | undefined>
): string {
  return Object.entries(params)
    .filter(([, value]) => value !== null && value !== undefined)
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

/**
 * Extracts the file ID from a Google Drive share/view URL.
 * Supports the common share link formats:
 *   - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 *   - https://drive.google.com/open?id=FILE_ID
 *   - https://drive.google.com/uc?id=FILE_ID
 *
 * @param url - A Google Drive URL
 * @returns The extracted file ID, or null if the URL doesn't match a known Drive pattern
 */
export function extractGoogleDriveFileId(url: string): string | null {
  const fileMatch = /\/file\/d\/([a-zA-Z0-9_-]+)/.exec(url);
  if (fileMatch) return fileMatch[1];

  const idParamMatch = /[?&]id=([a-zA-Z0-9_-]+)/.exec(url);
  if (idParamMatch) return idParamMatch[1];

  return null;
}

/**
 * Converts a Google Drive share/view link into a direct-image URL that can be
 * used as an <img> src. Raw share links (.../file/d/ID/view) return an HTML
 * page rather than image bytes, so browsers block them (ORB). Non-Drive URLs
 * are returned unchanged.
 *
 * @param url - Any image URL, possibly a Google Drive share link
 * @param size - Requested thumbnail width in pixels (default 1000)
 * @returns A direct-image URL safe to use as an <img> src
 */
export function resolveImageUrl(url: string, size = 1000): string {
  if (!url.includes('drive.google.com')) {
    return url;
  }

  const fileId = extractGoogleDriveFileId(url);
  if (!fileId) {
    return url;
  }

  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
}
