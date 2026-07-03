/**
 * Mock Data Factories
 *
 * Factory functions for generating mock domain objects.
 * Uses sensible defaults with optional overrides.
 */

import { type Product, type Category, type Settings } from '../core/models';

export function createMockProduct(overrides?: Partial<Product>): Product {
  return {
    id: '1',
    sku: 'DKT-001',
    slug: 'test-product',
    name: 'Test Product',
    categoryId: 'cat-1',
    categoryName: 'Test Category',
    description: 'A test product description',
    price: 999,
    imageUrls: ['https://example.com/image1.jpg'],
    featured: false,
    whatsappNumber: '919876543210',
    sortOrder: 1,
    ...overrides
  };
}

export function createMockProducts(count = 3): Product[] {
  return Array.from({ length: count }, (_, i) =>
    createMockProduct({
      id: `${i + 1}`,
      sku: `DKT-${String(i + 1).padStart(3, '0')}`,
      slug: `product-${i + 1}`,
      name: `Product ${i + 1}`,
      sortOrder: i + 1
    })
  );
}

export function createMockCategory(overrides?: Partial<Category>): Category {
  return {
    id: 'cat-1',
    name: 'Test Category',
    sortOrder: 1,
    ...overrides
  };
}

export function createMockCategories(count = 3): Category[] {
  return Array.from({ length: count }, (_, i) =>
    createMockCategory({
      id: `cat-${i + 1}`,
      name: `Category ${i + 1}`,
      sortOrder: i + 1
    })
  );
}

export function createMockSettings(overrides?: Partial<Settings>): Settings {
  return {
    companyName: 'DK Tools',
    companyPhone: '9876543210',
    companyCurrency: 'INR',
    ...overrides
  } as Settings;
}
