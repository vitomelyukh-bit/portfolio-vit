import { site } from '../data/site';

export const SITE_URL = 'https://vitastrategy.it';
export const abs = (path: string) => new URL(path, SITE_URL).toString();
const personId = abs('/#vitaliy');
const businessId = abs('/#servizio');

export const personLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': personId,
  name: site.name,
  jobTitle: site.role,
  url: SITE_URL,
  address: { '@type': 'PostalAddress', addressLocality: site.city, addressCountry: 'IT' },
  sameAs: [site.github],
});

export const businessLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': businessId,
  name: `${site.name} · Siti web per attività locali`,
  url: SITE_URL,
  image: abs('/og.webp'),
  founder: { '@id': personId },
  address: { '@type': 'PostalAddress', addressLocality: site.city, addressCountry: 'IT' },
  areaServed: { '@type': 'Country', name: 'Italia' },
  ...(site.whatsapp ? { telephone: `+${site.whatsapp}` } : {}),
  knowsAbout: ['Siti web', 'E-commerce', 'Prenotazioni online', 'SEO locale', 'Google Maps', 'Automazioni con AI'],
});

export const websiteLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  url: SITE_URL,
  inLanguage: 'it-IT',
  publisher: { '@id': personId },
});

export const breadcrumbLd = (items: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(path) })),
});

export const faqLd = (faq: { domanda: string; risposta: string }[] | { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((f: any) => ({
    '@type': 'Question',
    name: f.domanda ?? f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.risposta ?? f.a },
  })),
});

export const articleLd = (a: { h1: string; description: string; path: string; datePublished: string; dateModified: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: a.h1,
  description: a.description,
  mainEntityOfPage: abs(a.path),
  datePublished: a.datePublished,
  dateModified: a.dateModified,
  inLanguage: 'it-IT',
  author: { '@type': 'Person', '@id': personId, name: site.name },
  publisher: { '@type': 'Person', '@id': personId, name: site.name },
  image: abs('/og.webp'),
});

export const serviceLd = (s: { name: string; description: string; path: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: s.name,
  description: s.description,
  url: abs(s.path),
  provider: { '@id': businessId },
  areaServed: { '@type': 'Country', name: 'Italia' },
});

export const projectLd = (p: { name: string; description: string; url: string; path: string }) => ({
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: p.name,
  description: p.description,
  url: abs(p.path),
  sameAs: p.url,
  creator: { '@id': personId },
  inLanguage: 'it-IT',
});
