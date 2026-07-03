/**
 * Shared Module Barrel Export
 *
 * Single entry point for all shared UI building blocks.
 * Feature modules import from '@shared' or '../shared'.
 */

// Components
export { LoadingSpinnerComponent } from './components';
export { EmptyStateComponent } from './components';
export { ErrorStateComponent } from './components';
export { PageHeaderComponent } from './components';
export { SearchBoxComponent } from './components';

// Pipes
export { CurrencyFormatPipe } from './pipes';
export { SafeImagePipe } from './pipes';
export { TruncatePipe } from './pipes';

// Directives
export { LazyImageDirective } from './directives';
export { AutofocusDirective } from './directives';

// Tokens
export { APP_TITLE, DEFAULT_PAGE_SIZE, IMAGE_PLACEHOLDER } from './tokens';
