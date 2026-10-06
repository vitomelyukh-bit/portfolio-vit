import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { projects } from '../data/projects';
import { site } from '../data/site';

export const GET: APIRoute = async ({ site: url }) => {
  const abs = (p: string) => new URL(p, url).toString();
  const settori = (await getCollection('settori')).sort((a, b) => a.data.ordine - b.data.ordine);
  const guide = (await getCollection('guide')).sort((a, b) => b.data.datePublished.localeCompare(a.data.datePublished));
  const body = `# ${site.name}

> ${site.name} è un'agenzia web con base a ${site.city}, fondata da ${site.founder}. Progetta e sviluppa per attività locali di tutta Italia siti web, e-commerce, prenotazioni online, pagamenti e gift card, pannelli di gestione e automazioni con AI. Il cliente ha un unico referente, senza commerciali in mezzo. Il primo contatto è una chiamata gratuita di 15 minuti, poi una proposta scritta con tempi e prezzo fisso.

## Pagine principali

- [Home e richiesta di proposta gratuita](${abs('/')}): servizi, metodo di lavoro, progetti, domande frequenti e modulo di contatto
- [Settori](${abs('/settori/')}): problemi e soluzioni per settore
- [Guide](${abs('/guide/')}): guide pratiche per titolari

## Settori

${settori.map((s) => `- [${s.data.h1}](${abs(`/settori/${s.id}/`)}): ${s.data.description}`).join('\n')}

## Progetti realizzati

${projects.map((p) => `- [${p.name}](${abs(`/progetti/${p.slug}/`)}) (${p.sector}, ${p.location}): ${p.tagline} Sito: ${p.url}`).join('\n')}

## Guide

${guide.map((g) => `- [${g.data.h1}](${abs(`/guide/${g.id}/`)}): ${g.data.rispostaBreve}`).join('\n')}
`;
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
