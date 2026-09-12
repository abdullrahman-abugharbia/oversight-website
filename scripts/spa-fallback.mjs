/*
 * Write dist/404.html as a copy of dist/index.html.
 *
 * GitHub Pages is a static file server with no rewrite rules. It resolves
 * /contact by looking for a file at that path, finds none, and serves its 404.
 * Only "/" works; every deep link and every refresh away from the home page
 * breaks — including the /contact link now used by every CTA on the site.
 *
 * Pages serves 404.html for any unmatched path, so making it the app shell lets
 * React Router read the URL and render the right page.
 */
import { copyFileSync, existsSync } from 'node:fs';

const shell = 'dist/index.html';
const fallback = 'dist/404.html';

if (!existsSync(shell)) {
  console.error(`[spa-fallback] ${shell} is missing — did vite build run?`);
  process.exit(1);
}

copyFileSync(shell, fallback);
console.log(`[spa-fallback] wrote ${fallback}`);
