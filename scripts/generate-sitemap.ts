/**
 * Sitemap Generator
 *
 * Generates sitemap.xml content for the application.
 * Can be run as a build step or served dynamically.
 *
 * Usage (build-time):
 *   npx ts-node scripts/generate-sitemap.ts > src/sitemap.xml
 *
 * Usage (runtime):
 *   import { generateSitemap } from './sitemap-generator';
 *   const xml = generateSitemap(baseUrl, routes);
 */

interface SitemapEntry {
  loc: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  lastmod?: string;
}

const STATIC_ROUTES: SitemapEntry[] = [
  { loc: '/', changefreq: 'daily', priority: 1.0 },
  { loc: '/products', changefreq: 'daily', priority: 0.9 },
  { loc: '/categories', changefreq: 'weekly', priority: 0.8 },
  { loc: '/search', changefreq: 'weekly', priority: 0.7 }
];

export function generateSitemap(
  baseUrl: string,
  dynamicEntries: SitemapEntry[] = []
): string {
  const today = new Date().toISOString().split('T')[0];
  const allEntries = [...STATIC_ROUTES, ...dynamicEntries];

  const urls = allEntries.map(entry => `
  <url>
    <loc>${baseUrl}${entry.loc}</loc>
    <lastmod>${entry.lastmod || today}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;
}

// Default static sitemap for build output
export function generateStaticSitemap(baseUrl: string): string {
  return generateSitemap(baseUrl);
}
