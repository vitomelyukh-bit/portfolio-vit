import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://portfolio-vit.vercel.app',
  // Pagine statiche; solo /api/lead gira come funzione (prerender = false)
  output: 'static',
  adapter: vercel(),
});
