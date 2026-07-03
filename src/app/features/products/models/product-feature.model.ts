/**
 * Product Feature Models
 *
 * Feature-specific types that don't belong in core.
 * The Product interface itself lives in core/models (API contract).
 */

/** Navigation item for product detail actions */
export interface ProductAction {
  readonly label: string;
  readonly icon: string;
  readonly url: string;
}
