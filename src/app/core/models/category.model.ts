/**
 * Category Model
 *
 * Matches the output of Mapper.gs → mapCategory(row).
 * Backend endpoint: ?action=getCategories
 *
 * All fields are always present in the backend response.
 * Categories are sorted by sortOrder on the backend.
 */

export interface Category {
  readonly id: string;
  readonly name: string;
  readonly sortOrder: number;
}
