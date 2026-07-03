# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-06-25

### Added

- Complete product catalog with list and detail views
- Product search with debounce, deep links, and recent searches
- Category browsing with sidebar navigation
- Feature facade architecture pattern
- Platform services (SEO, meta, canonical, structured data)
- Performance layer (caching, deduplication, preloading, skeletons)
- PWA support (offline, install prompt, update notifications)
- Runtime configuration (assets/config.json)
- Angular Material UI components
- Responsive layout with shell/header/footer/navigation
- Error handling with global error handler
- Loading states with interceptor-driven spinner
- Accessibility (ARIA, keyboard, focus management)

### Architecture

- Angular 20 standalone APIs
- Signal-based state management
- Smart/Dumb component pattern
- Feature → Facade → State → Core Services layering
- Lazy-loaded feature routes with selective preloading
