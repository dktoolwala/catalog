/**
 * Post-build script for GitHub Pages deployment.
 *
 * Copies index.html to 404.html in the build output so that
 * GitHub Pages serves the Angular app for all unknown routes.
 * This enables deep linking with PathLocationStrategy.
 */

const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '..', 'dist', 'product-catalog', 'browser');
const indexPath = path.join(distDir, 'index.html');
const notFoundPath = path.join(distDir, '404.html');

if (!fs.existsSync(indexPath)) {
  console.error('ERROR: index.html not found at', indexPath);
  process.exit(1);
}

fs.copyFileSync(indexPath, notFoundPath);
console.log('✓ Copied index.html → 404.html for GitHub Pages SPA routing');
