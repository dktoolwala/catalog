/**
 * Product Model
 *
 * Matches the output of Mapper.gs → mapProduct(row, categoryLookup).
 * Backend endpoint: ?action=getProducts | ?action=getProduct&slug=x | ?action=searchProducts&q=x
 *
 * All fields are always present in the backend response.
 * imageUrls is parsed from pipe-separated string by Helpers.gs → parseImageUrls().
 */

export interface Product {
  readonly id: string;
  readonly sku: string;
  readonly slug: string;
  readonly name: string;
  readonly categoryId: string;
  readonly categoryName: string;
  readonly description: string;
  readonly price: number;
  readonly imageUrls: readonly string[];
  readonly featured: boolean;
  readonly whatsappNumber: string;
  readonly sortOrder: number;
}
