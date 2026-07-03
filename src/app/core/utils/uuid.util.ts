/**
 * UUID Utility
 *
 * Generates RFC 4122 v4 UUIDs for request correlation.
 * Uses crypto.randomUUID() (supported in all modern browsers and Node 19+).
 * Pure function — no Angular imports.
 */

/**
 * Generates a cryptographically random UUID v4.
 *
 * @returns A string in the format "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
 */
export function generateUuid(): string {
  return crypto.randomUUID();
}
