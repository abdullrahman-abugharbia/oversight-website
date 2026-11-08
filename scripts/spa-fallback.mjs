/*
 * Give every route a real file in dist/, and make dist/404.html the app shell.
 *
 * GitHub Pages is a static file server with no rewrite rules. It resolves
 * /contact by looking for a file at that path, finds none, and serves its 404.
 * Only "/" works; every deep link and every refresh away from the home page
 * breaks — including the /contact link now used by every CTA on the site.
 *
 * Pages serves 404.html for any unmatched path, so making it the app shell lets
 * React Router read the URL and render the right page. That alone still answers
 * with HTTP status 404, though: visitors never notice, but Google treats the
 * page as missing and Search Console reports it as "Not found (404)".
 *
 * Pages also serves /about from about.html with status 200, so each known route
 * gets its own copy of the shell. Keep ROUTES in step with the <Route> paths in
 * src/App.tsx; unknown paths still fall through to 404.html and its 404 status.
 *
 * dist/sitemap.xml is built from the same list, so a route added here is also
 * submitted to search engines. public/robots.txt points crawlers at it.
 */
import { copyFileSync, existsSync, writeFileSync } from 'node:fs';

const SITE = 'https://oversight-sa.com';
const ROUTES = ['about', 'services', 'work', 'contact'];

const shell = 'dist/index.html';

if (!existsSync(shell)) {
  console.error(`[spa-fallback] ${shell} is missing — did vite build run?`);
  process.exit(1);
}

for (const target of ['404', ...ROUTES]) {
  copyFileSync(shell, `dist/${target}.html`);
  console.log(`[spa-fallback] wrote dist/${target}.html`);
}

const urls = ['', ...ROUTES].map((route) => `  <url><loc>${SITE}/${route}</loc></url>`);
writeFileSync(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`,
);
console.log('[spa-fallback] wrote dist/sitemap.xml');
