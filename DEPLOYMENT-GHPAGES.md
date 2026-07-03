# GitHub Pages Deployment Guide

## Overview

This guide covers deploying the Product Catalog Angular application to GitHub Pages.

The application uses **PathLocationStrategy** (clean URLs without `#`) and a `404.html` fallback to handle deep linking on GitHub Pages.

---

## Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0
- GitHub repository with Pages enabled
- Repository name: `product-catalog` (or update `baseHref` in `angular.json`)

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│  GitHub Pages (Static Hosting)                  │
│  ┌───────────────────────────────────────────┐  │
│  │  Angular SPA                              │  │
│  │  • index.html (entry point)               │  │
│  │  • 404.html  (copy of index.html)         │  │
│  │  • assets/config.json (runtime config)    │  │
│  │  • ngsw-worker.js (service worker)        │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
                      │
                      │ HTTPS (CORS)
                      ▼
┌─────────────────────────────────────────────────┐
│  Google Apps Script (Backend API)               │
│  • Products, Categories, Search, Settings       │
│  • URL configured in assets/config.json         │
└─────────────────────────────────────────────────┘
```

---

## Deployment Methods

### Method 1: GitHub Actions (Recommended)

The project includes a workflow at `.github/workflows/deploy.yml` that automatically builds and deploys on push to `main`.

**Setup:**

1. Push the repository to GitHub
2. Go to **Settings → Pages**
3. Under **Source**, select **GitHub Actions**
4. Push to `main` branch — deployment is automatic

**Manual trigger:**

Go to **Actions → Deploy to GitHub Pages → Run workflow**

---

### Method 2: Manual Deploy (angular-cli-ghpages)

```bash
# One-command build + deploy
npm run deploy:ghpages
```

This builds with the `github-pages` configuration and publishes to the `gh-pages` branch.

**First-time setup for manual deploy:**

1. Ensure `angular-cli-ghpages` is installed: `npm install`
2. Run: `npm run deploy:ghpages`
3. Go to **Settings → Pages → Source** → select `gh-pages` branch

---

### Method 3: Build Only (deploy elsewhere)

```bash
npm run build:ghpages
```

Output: `dist/product-catalog/browser/`

---

## Configuration

### Base Href

The `github-pages` build configuration sets `baseHref: "/product-catalog/"`.

**If your repository name differs**, update `angular.json`:

```json
"github-pages": {
  ...
  "baseHref": "/YOUR-REPO-NAME/"
}
```

**If using a custom domain** (e.g., `catalog.example.com`), set:

```json
"baseHref": "/"
```

### Runtime Configuration (No Rebuild Required)

The backend API URL and other settings are loaded at runtime from `assets/config.json`:

```json
{
  "apiUrl": "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec",
  "production": true,
  "logLevel": "error",
  "appTitle": "Product Catalog",
  "appDescription": "Browse and discover our complete product catalog",
  "baseUrl": "https://YOUR_USERNAME.github.io/product-catalog",
  "features": {
    "pwa": true,
    "analytics": false,
    "structuredData": true
  }
}
```

**To change the API URL after deployment:**
1. Edit `assets/config.json` in the deployed branch (gh-pages) or repository
2. The next page load will use the new URL — no rebuild needed

### Deep Linking (404.html)

GitHub Pages serves `404.html` for unknown paths. The post-build script copies `index.html` to `404.html`, so Angular's router handles all paths.

**How it works:**
1. User visits `/product-catalog/products/drill-machine`
2. GitHub Pages can't find that file → serves `404.html`
3. `404.html` is the Angular app → Angular router takes over
4. User sees the correct product page

### Service Worker (PWA)

- Enabled in production builds
- Caches the app shell and assets for offline use
- API responses use `freshness` strategy (network-first with fallback)
- After the first visit, deep links work offline via the service worker

### HTTPS

GitHub Pages enforces HTTPS automatically. The service worker requires HTTPS.

---

## Custom Domain (Optional)

1. Go to **Settings → Pages → Custom domain**
2. Enter your domain (e.g., `catalog.example.com`)
3. Add DNS records:
   - CNAME: `catalog.example.com` → `YOUR_USERNAME.github.io`
   - Or A records pointing to GitHub's IPs
4. Check **Enforce HTTPS**
5. Update `baseHref` to `"/"` in `angular.json` `github-pages` config
6. Update `assets/config.json` `baseUrl` to your custom domain
7. Update `robots.txt` and `sitemap.xml` with your domain
8. Create a `CNAME` file in `src/` and add it to assets in `angular.json`

---

## Updating After Deployment

### Change API URL (no rebuild)
Edit `assets/config.json` in the deployed branch.

### Change App Configuration (rebuild required)
1. Make changes in `src/`
2. Push to `main` (auto-deploy) or run `npm run deploy:ghpages`

### Update Google Apps Script Backend
1. Deploy a new version of the GAS web app
2. Update the URL in `assets/config.json`

---

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| Blank page | Wrong `baseHref` | Ensure it matches `/repo-name/` |
| 404 on refresh | `404.html` missing | Verify post-build script ran |
| Assets not loading | Relative path issue | Check browser console for 404s |
| API CORS error | GAS deployment access | Set GAS to "Anyone" access |
| SW not updating | Browser cache | Hard refresh or clear site data |
| PWA not installable | Not HTTPS | GitHub Pages enforces HTTPS |

---

## Build Verification Checklist

After running `npm run build:ghpages`, verify:

```
dist/product-catalog/browser/
├── index.html          ✓ Has <base href="/product-catalog/">
├── 404.html            ✓ Identical to index.html
├── manifest.webmanifest ✓ Relative start_url
├── ngsw-worker.js      ✓ Service worker present
├── ngsw.json           ✓ SW manifest generated
├── favicon.svg         ✓ Favicon present
├── robots.txt          ✓ Correct sitemap URL
├── sitemap.xml         ✓ Correct base URL
├── assets/
│   ├── config.json     ✓ Runtime configuration
│   └── icons/          ✓ PWA icons
├── *.js                ✓ Hashed bundle files
└── *.css               ✓ Hashed style files
```
