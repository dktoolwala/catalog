# Product Catalog

A production-ready Angular 20 product catalog application with PWA support, powered by a Google Apps Script backend.

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│  Angular 20 Frontend (Standalone APIs, Signals, OnPush)      │
├──────────────────────────────────────────────────────────────┤
│  Layout   │  Features         │  Shared Components           │
│  Shell    │  Products         │  LoadingSpinner              │
│  Header   │  Categories       │  EmptyState / ErrorState     │
│  Footer   │  Search           │  PageHeader / SearchBox      │
│  Nav      │                   │  Pipes / Directives          │
├──────────────────────────────────────────────────────────────┤
│  Application Layer (Facades)                                 │
│  ProductFacade │ CategoryFacade │ SearchFacade               │
├──────────────────────────────────────────────────────────────┤
│  State Layer (Signal-based Services)                         │
│  ProductStateService │ CategoryStateService │ SearchState    │
├──────────────────────────────────────────────────────────────┤
│  Core Services                                               │
│  ApiService │ ProductService │ CategoryService │ Health      │
├──────────────────────────────────────────────────────────────┤
│  Platform & Performance                                      │
│  SEO │ PWA │ Caching │ Preloading │ Security Headers         │
├──────────────────────────────────────────────────────────────┤
│  HTTP Layer (Interceptors)                                   │
│  Error │ Loading │ Logging │ RequestId │ Retry │ Cache │ Dedup│
├──────────────────────────────────────────────────────────────┤
│  Google Apps Script Backend (REST API)                       │
└──────────────────────────────────────────────────────────────┘
```

## Tech Stack

| Layer        | Technology                        |
| ------------ | --------------------------------- |
| Framework    | Angular 20                        |
| Language     | TypeScript 5.8                    |
| UI Library   | Angular Material 20               |
| State        | Signals (built-in)                |
| Styling      | SCSS + CSS Variables              |
| HTTP         | Angular HttpClient + Interceptors |
| PWA          | @angular/service-worker           |
| Backend      | Google Apps Script                |
| Linting      | ESLint (flat config) + Prettier   |
| Testing      | Karma + Jasmine                   |
| Node         | >= 20.x                           |
| npm          | >= 10.x                           |

## Prerequisites

- **Node.js** >= 20.x
- **npm** >= 10.x
- Angular CLI: `npm install -g @angular/cli@20`

## Getting Started

```bash
# Clone the repository
git clone <repository-url>
cd product-catalog

# Install dependencies
npm install

# Start development server
ng serve

# Open browser
# http://localhost:4200
```

## Available Scripts

| Command                     | Description                              |
| --------------------------- | ---------------------------------------- |
| `ng serve`                  | Development server (port 4200)           |
| `ng build`                  | Development build                        |
| `ng build -c production`    | Production build with AOT & tree-shaking |
| `ng build -c staging`       | Staging build                            |
| `npm run build:ghpages`     | Build for GitHub Pages deployment        |
| `npm run deploy:ghpages`    | Build and deploy to GitHub Pages         |
| `ng test`                   | Run unit tests (watch mode)              |
| `npm run test:ci`           | CI test run with coverage (headless)     |
| `npm run test:coverage`     | Run tests with coverage report           |
| `ng lint`                   | Lint TypeScript and templates            |
| `ng lint --fix`             | Auto-fix lint errors                     |
| `npm run lint:strict`       | Zero-warning lint pass                   |
| `npm run format`            | Format code with Prettier                |
| `npm run format:check`      | Check formatting (CI)                    |
| `npm run bundle:stats`      | Build with stats JSON                    |
| `npm run bundle:analyze`    | Visual bundle analysis (webpack)         |
| `npm run bundle:size`       | Source-map-explorer analysis             |
| `npm run lighthouse`        | Lighthouse CI (performance audit)        |
| `npm run lighthouse:report` | Generate Lighthouse HTML report          |
| `npm run audit`             | npm security audit                       |
| `npm run audit:fix`         | Auto-fix audit vulnerabilities           |
| `npm run deps`              | Check outdated dependencies              |
| `npm run deps:update`       | Update dependencies to latest            |
| `npm run deps:licenses`     | Check dependency licenses                |

## Project Structure

```
src/
├── app/
│   ├── core/              # Singleton services, interceptors, models, config
│   │   ├── config/        # App configuration & providers
│   │   ├── constants/     # Application constants
│   │   ├── error/         # Error handling (GlobalErrorHandler, ErrorService)
│   │   ├── interceptors/  # HTTP interceptors (7)
│   │   ├── models/        # Domain interfaces (AppConfig, Product, Category)
│   │   ├── services/      # Core API services
│   │   ├── state/         # Global state (loading)
│   │   ├── types/         # Utility types
│   │   └── utils/         # Pure utility functions
│   ├── features/          # Lazy-loaded feature modules
│   │   ├── products/      # Product list, detail, filters
│   │   ├── categories/    # Category list, products-by-category
│   │   └── search/        # Search page, recent searches
│   ├── layout/            # Shell, header, footer, navigation
│   ├── pages/             # Standalone pages
│   │   ├── home-placeholder/   # Home page
│   │   ├── not-found/          # 404 page
│   │   ├── server-error/       # 500 page
│   │   ├── offline/            # Offline page
│   │   └── api-unavailable/    # Service unavailable page
│   ├── performance/       # Caching, preloading, skeletons
│   ├── platform/          # SEO, PWA, runtime config
│   ├── shared/            # Reusable components, pipes, directives
│   └── testing/           # Test utilities, mocks, factories
├── assets/
│   ├── config.json        # Runtime configuration
│   └── icons/             # PWA icons
├── environments/          # Environment files (dev, staging, prod)
├── index.html             # App entry HTML
├── main.ts                # Bootstrap entry point
├── styles.scss            # Global styles
├── manifest.webmanifest   # PWA manifest
├── robots.txt             # Search engine directives
└── sitemap.xml            # Sitemap for SEO
```

## Environment Configuration

| File                          | Purpose              | Key Differences                         |
| ----------------------------- | -------------------- | --------------------------------------- |
| `environment.ts`              | Production (default) | Logging off, analytics on, debug off    |
| `environment.development.ts`  | Local development    | Logging on, analytics off, debug on     |
| `environment.staging.ts`      | Staging / QA         | Logging on, analytics on, debug off     |
| `environment.production.ts`   | Production (explicit)| Identical to default, for CI clarity    |

### AppConfig Interface

All environments implement the `AppConfig` interface:

```typescript
interface AppConfig {
  production: boolean;
  apiBaseUrl: string;
  imageBaseUrl: string;
  appName: string;
  appVersion: string;
  enableLogging: boolean;
  enableAnalytics: boolean;
  enableDebugTools: boolean;
  requestTimeout: number;
  retryCount: number;
}
```

Runtime configuration is also loaded from `assets/config.json` at app startup via `APP_INITIALIZER`.

## Build Pipeline

```bash
# 1. Install dependencies
npm ci

# 2. Lint
ng lint

# 3. Test with coverage
npm run test:ci

# 4. Build for production
ng build --configuration=production

# 5. Bundle analysis
npm run bundle:analyze

# 6. Lighthouse audit
npm run lighthouse

# 7. Dependency audit
npm audit

# 8. Artifacts in dist/product-catalog/browser/
```

### Bundle Budgets

| Type    | Warning | Error |
| ------- | ------- | ----- |
| Initial | 700 kB  | 1 MB  |
| Component Style | 8 kB | 16 kB |

## Testing

```bash
# Watch mode (development)
ng test

# CI mode (headless Chrome, single run, with coverage)
npm run test:ci

# Coverage report
npm run test:coverage
```

### Coverage Target: 80%+

Test utilities are in `src/app/testing/`:
- `test-utils.ts` — Signal helpers, fixture utilities, DOM queries
- `mock-data.ts` — Factory functions for Products, Categories, Settings
- `mock-api-responses.ts` — API response envelope factories
- `mock-services.ts` — Spy-based service stubs

### What's Tested

- **Core utilities**: string, date, UUID, URL
- **Services**: ApiService, ErrorService, LoadingService
- **Interceptors**: error, loading, retry, request-id
- **GlobalErrorHandler**: error classification and navigation
- **Pipes**: CurrencyFormat, Truncate
- **Directives**: Autofocus, LazyImage

## Linting

```bash
# Standard lint
ng lint

# Auto-fix
ng lint --fix

# Strict mode (zero warnings allowed, for CI)
npm run lint:strict
```

### ESLint Rules

- **TypeScript**: no-explicit-any (error), consistent-type-imports, prefer-const, no-shadow
- **Angular**: prefer-standalone (error), prefer-on-push (error), no-lifecycle-call
- **Templates**: accessibility (alt-text, aria, label associations), no-negated-async
- **Test files**: relaxed no-any and no-console

## Bundle Analysis

```bash
# Generate stats.json
npm run bundle:stats

# Visual webpack bundle analyzer (opens browser)
npm run bundle:analyze

# Source-map-explorer (per-file analysis)
npm run bundle:size
```

## Lighthouse Performance

```bash
# Run Lighthouse CI (uses lighthouserc.json)
npm run lighthouse

# Generate standalone HTML report
npm run lighthouse:report
```

### Thresholds (configurable in lighthouserc.json)

| Category       | Min Score |
| -------------- | --------- |
| Performance    | 80        |
| Accessibility  | 90        |
| Best Practices | 85        |
| SEO            | 90        |
| PWA            | 70        |

## Dependency Audit

```bash
# Security audit
npm run audit

# Auto-fix known vulnerabilities
npm run audit:fix

# Check for outdated packages
npm run deps

# Update to latest versions
npm run deps:update

# License compliance check
npm run deps:licenses
```

## Error Pages

| Route                  | Component              | Trigger                            |
| ---------------------- | ---------------------- | ---------------------------------- |
| `/not-found`           | NotFoundComponent      | Unknown routes, wildcard redirect  |
| `/error`               | ServerErrorComponent   | Unhandled exceptions (500)         |
| `/offline`             | OfflineComponent       | Browser loses connectivity         |
| `/service-unavailable` | ApiUnavailableComponent| 5xx, network timeout, unreachable  |

### Features
- **Auto-recovery**: Offline page detects reconnection and redirects
- **Exponential backoff**: API Unavailable retries with increasing delay
- **Navigation safety**: GlobalErrorHandler routes to correct page
- **Accessible**: All pages work with screen readers and keyboard

## CI/CD

### GitHub Actions Workflows

| Workflow | File | Trigger |
| -------- | ---- | ------- |
| CI Pipeline | `.github/workflows/ci.yml` | PRs + push to main/develop |
| Deploy | `.github/workflows/deploy.yml` | Push to main |

### CI Pipeline Steps

1. **Install** — `npm ci` with caching
2. **Lint** — ESLint + Prettier format check
3. **Test** — Headless Chrome with coverage upload
4. **Build** — Production build
5. **Bundle Check** — Budget enforcement
6. **Dependency Audit** — Security scan
7. **Lighthouse** — Performance/accessibility scoring

## Development Workflow

### Feature Development

1. Create feature branch from `main`
2. Implement feature following facade pattern
3. Run `ng lint --fix` and `npm run format`
4. Write unit tests (target: 80%+ coverage)
5. Commit (Husky pre-commit runs lint-staged)
6. Push (Husky pre-push runs type-check)
7. Create pull request

## Production Deployment

### GitHub Pages (Recommended)

The project includes full GitHub Pages deployment support with a GitHub Actions workflow.

```bash
# Build for GitHub Pages (with base href and 404.html fallback)
npm run build:ghpages

# Or build and deploy in one command (uses angular-cli-ghpages)
npm run deploy:ghpages
```

**Automatic deployment via GitHub Actions:**

1. Push to GitHub
2. Go to Settings → Pages → Source → select "GitHub Actions"
3. Every push to `main` triggers automatic build and deploy

**Key details:**
- Uses **PathLocationStrategy** (clean URLs)
- Deep links work via `404.html` fallback (copy of `index.html`)
- API URL is configurable at runtime via `assets/config.json` (no rebuild needed)
- Service worker provides offline access after first visit

See [DEPLOYMENT-GHPAGES.md](DEPLOYMENT-GHPAGES.md) for the complete deployment guide.

### Static Hosting (Firebase / Netlify / Vercel)

```bash
# Build
ng build --configuration=production

# Deploy (Firebase example)
firebase deploy --only hosting
```

### Docker

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx ng build --configuration=production

FROM nginx:alpine
COPY --from=build /app/dist/product-catalog/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
```

## PWA Features

- **Offline support**: App shell cached for offline access
- **Install prompt**: Users can install to home screen
- **Background updates**: Automatic update checks with user notification
- **API caching**: Freshness strategy with network-first fallback

## Path Aliases

| Alias          | Maps To                   |
| -------------- | ------------------------- |
| `@app/*`       | `src/app/*`               |
| `@core/*`      | `src/app/core/*`          |
| `@shared/*`    | `src/app/shared/*`        |
| `@features/*`  | `src/app/features/*`      |
| `@platform/*`  | `src/app/platform/*`      |
| `@performance/*` | `src/app/performance/*` |
| `@env`         | `src/environments/environment` |

## Dependency Versions

| Package                   | Version |
| ------------------------- | ------- |
| @angular/core             | ^20.0.0 |
| @angular/material         | ^20.0.0 |
| @angular/service-worker   | ^20.0.0 |
| rxjs                      | ~7.8.0  |
| typescript                | ~5.8.0  |
| zone.js                   | ~0.15.0 |

## Remaining Work

After workspace setup, the only remaining work is:

- [ ] Unit testing (services, facades, state)
- [ ] Component testing (shared, feature components)
- [ ] Integration testing (interceptors, routing)
- [ ] E2E testing (Playwright or Cypress)
- [x] CI/CD pipeline (GitHub Actions — `.github/workflows/deploy.yml`)

## License

[MIT](LICENSE)
