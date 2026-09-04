/**
 * Home Placeholder Component
 *
 * Temporary landing page shown at the root route.
 * Will be replaced with a proper home/hero page when that feature is built.
 * Uses EmptyStateComponent for consistent styling.
 *
 * No HTTP calls. No business logic.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  type OnInit
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

import { ROUTE_URLS } from '../../core/constants';
import { type Category, type Product } from '../../core/models';
import { CategoryService } from '../../core/services/category.service';
import { ProductService } from '../../core/services/product.service';
import { SettingsStateService } from '../../core/state';
import { CategoryCardComponent } from '../../features/categories/components/category-card/category-card.component';
import { SafeImagePipe } from '../../shared/pipes';

/** Max number of categories to feature on the home page */
const FEATURED_CATEGORY_LIMIT = 4;

@Component({
  selector: 'app-home-placeholder',
  standalone: true,
  imports: [RouterLink, MatIcon, SafeImagePipe, CategoryCardComponent],
  templateUrl: './home-placeholder.component.html',
  styleUrl: './home-placeholder.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePlaceholderComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly categoryService = inject(CategoryService);
  private readonly productService = inject(ProductService);
  private readonly settingsState = inject(SettingsStateService);

  private readonly products = signal<Product[]>([]);

  protected readonly categories = signal<Category[]>([]);

  /** Hero title accent (second line, gradient text) from Settings, falls back to the default copy if not configured */
  protected readonly heroTitle = computed<string>(
    () => this.settingsState.settings()?.heroTitle || 'Premium Collection'
  );

  /** Hero subtitle from Settings, falls back to the default copy if not configured */
  protected readonly heroSubtitle = computed<string>(
    () =>
      this.settingsState.settings()?.heroSubtitle ||
      'Curated products with quality you can trust. Browse our catalog and find exactly what you need.'
  );

  /** Hero image: prefers a featured product's photo, falls back to any product */
  protected readonly heroImageUrl = computed<string | null>(() => {
    const products = this.products();
    const featured = products.find(p => p.featured);
    return featured?.imageUrls[0] ?? products[0]?.imageUrls[0] ?? null;
  });

  ngOnInit(): void {
    this.settingsState.loadSettings();

    this.categoryService.getCategories().subscribe(categories => {
      this.categories.set(categories.slice(0, FEATURED_CATEGORY_LIMIT));
    });

    this.productService.getProducts().subscribe(products => {
      this.products.set(products);
    });
  }

  protected browseProducts(): void {
    this.router.navigateByUrl(ROUTE_URLS.PRODUCTS);
  }

  protected browseCategories(): void {
    this.router.navigateByUrl(ROUTE_URLS.CATEGORIES);
  }

  protected onCategorySelected(category: Category): void {
    this.router.navigate([ROUTE_URLS.CATEGORIES, category.id]);
  }

  protected goToSearch(): void {
    this.router.navigateByUrl(ROUTE_URLS.SEARCH);
  }
}
