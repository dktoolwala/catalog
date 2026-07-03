/**
 * Category List Page (Smart Component)
 *
 * Orchestrates the category listing experience:
 *   - Loads categories and products on init
 *   - Displays CategoryGrid with product counts
 *   - Shows loading, empty, and error states
 *   - Navigates to category-products page on card click
 *
 * Injects CategoryFacade as the single entry point.
 * Presentation is delegated to child components.
 */

import { Component, ChangeDetectionStrategy, inject, type OnInit } from '@angular/core';

import { type Category } from '../../../../core/models';
import {
  PageHeaderComponent,
  LoadingSpinnerComponent,
  EmptyStateComponent,
  ErrorStateComponent
} from '../../../../shared/components';
import { CategoryFacade } from '../../application';
import { CategoryGridComponent } from '../../components/category-grid/category-grid.component';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    PageHeaderComponent,
    LoadingSpinnerComponent,
    EmptyStateComponent,
    ErrorStateComponent,
    CategoryGridComponent
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListComponent implements OnInit {
  protected readonly state = inject(CategoryFacade);

  ngOnInit(): void {
    this.state.loadCategories();
    this.state.loadProducts(); // Needed for category count computation
  }

  protected onCategorySelected(category: Category): void {
    this.state.navigateToCategory(category);
  }

  protected onRetry(): void {
    this.state.refresh();
  }
}
