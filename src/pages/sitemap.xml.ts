import type { APIRoute } from 'astro';

// Alias di /sitemap-index.xml: molti strumenti (e Search Console) cercano /sitemap.xml
export const GET: APIRoute = ({ site }) =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${new URL('/sitemap-0.xml', site)}</loc></sitemap></sitemapindex>`,
    { headers: { 'content-type': 'application/xml; charset=utf-8' } },
  );
