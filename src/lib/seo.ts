import { site } from '../data/site';

export const SITE_URL = 'https://vitastrategy.it';
export const abs = (path: string) => new URL(path, SITE_URL).toString();
const personId = abs('/#fondatore');
const orgId = abs('/#organizzazione');
const businessId = orgId;

export const personLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': personId,
  name: site.founder,
  jobTitle: 'Fondatore',
  worksFor: { '@id': orgId },
  sameAs: [site.github],
});

export const businessLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': orgId,
  name: site.name,
  description: site.tagline,
  url: SITE_URL,
  logo: abs('/apple-touch-icon.png'),
  image: abs('/og-image.png'),
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
  publisher: { '@id': orgId },
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
  author: { '@type': 'Organization', '@id': orgId, name: site.name },
  publisher: { '@type': 'Organization', '@id': orgId, name: site.name, logo: { '@type': 'ImageObject', url: abs('/apple-touch-icon.png') } },
  image: abs('/og-image.png'),
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
  creator: { '@id': orgId },
  inLanguage: 'it-IT',
});
