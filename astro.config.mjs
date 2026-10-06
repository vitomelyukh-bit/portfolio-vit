import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://vitastrategy.it',
  trailingSlash: 'ignore',
  // Pagine statiche; solo /api/lead gira come funzione (prerender = false)
  output: 'static',
  adapter: vercel(),
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/api/') && !page.endsWith('/privacy/'),
    }),
  ],
});
