import type { APIRoute } from 'astro';

// Crawler degli assistenti AI consentiti in modo esplicito
const AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Claude-SearchBot', 'Google-Extended'];

export const GET: APIRoute = ({ site }) => {
  const rules = [...AI_BOTS, '*'].map((ua) => `User-agent: ${ua}\nAllow: /\nDisallow: /api/`).join('\n\n');
  return new Response(`${rules}\n\nSitemap: ${new URL("/sitemap.xml", site)}\n`, {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
};
