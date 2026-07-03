/**
 * Category Feature Models
 *
 * Types specific to the Categories feature's presentation layer.
 * The core Category model lives in core/models.
 * These are view-specific projections used by components and pages.
 */

import { type Category } from '../../../core/models';

/** Category with a computed product count for display */
export interface CategoryWithCount {
  readonly category: Category;
  readonly productCount: number;
}
