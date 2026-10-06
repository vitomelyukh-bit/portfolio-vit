import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faq = z.array(z.object({ domanda: z.string(), risposta: z.string() })).optional();
const data = z.union([z.string(), z.date()]).transform((d) => (typeof d === 'string' ? d : d.toISOString().slice(0, 10)));

// Guide: articoli SEO sui problemi dei titolari (vedi content-engine/WRITING.md)
const guide = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/guide' }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().max(170),
    h1: z.string(),
    rispostaBreve: z.string(),
    tema: z.enum(['sito', 'clienti', 'settore']),
    datePublished: data,
    dateModified: data,
    settoriCorrelati: z.array(z.string()).optional(),
    guideCorrelate: z.array(z.string()).optional(),
    progettiCorrelati: z.array(z.string()).optional(),
    faq,
  }),
});

// Settori: landing verticali ("Sito web per ristoranti"...)
const settori = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/settori' }),
  schema: z.object({
    nome: z.string(),
    ordine: z.number(),
    title: z.string().max(70),
    description: z.string().max(170),
    h1: z.string(),
    intro: z.string(),
    chi: z.string(),
    problemi: z.array(z.object({ titolo: z.string(), testo: z.string() })),
    soluzioni: z.array(z.object({ titolo: z.string(), testo: z.string() })),
    progetti: z.array(z.string()),
    faq,
  }),
});

export const collections = { guide, settori };
