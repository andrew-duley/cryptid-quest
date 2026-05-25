const { writeFileSync } = require('fs');
const { resolve } = require('path');

const siteUrl = 'https://cryptid.quest';

// List all the routes you want in the sitemap.
// Add new routes here as you build new pages/games.
const routes = [
  '/',                                // home
  '/about',                           // about
  '/the-campfire',                            // blog
  '/the-crypt',                           // games hub
  '/the-crypt/cryptid-mixup',             // first game
  '/the-crypt/cryptac-toe',               // second game
];

const today = new Date().toISOString().split('T')[0];

const urlsXml = routes
  .map((path) => {
    const priority = path === '/' ? '1.0' : '0.8';
    return `
  <url>
    <loc>${siteUrl}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlsXml}
</urlset>
`;

const outputPath = resolve(__dirname, '../dist/sitemap.xml');
writeFileSync(outputPath, sitemap.trim());

console.log('✅ sitemap.xml generated at', outputPath);