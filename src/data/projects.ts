export type Category = 'ecommerce' | 'prenotazioni' | 'professionisti' | 'local';

export const categories: Record<Category, string> = {
  ecommerce: 'E-commerce',
  prenotazioni: 'Prenotazioni & pagamenti',
  professionisti: 'Studi professionali',
  local: 'Locali & servizi',
};

export interface Project {
  slug: string;
  name: string;
  url: string;
  category: Category;
  sector: string;
  location: string;
  /** Una riga, mostrata nella card */
  tagline: string;
  /** Paragrafo introduttivo per la pagina del progetto */
  intro: string;
  /** Funzionalità principali */
  features: string[];
  /** Colore del brand, usato come accento */
  accent: string;
  /** Lingue del sito */
  languages?: string[];
}

export const projects: Project[] = [
  {
    slug: 'mimaelulu',
    name: 'Mima&Lulù⁷',
    url: 'https://mimaelulu7.com',
    category: 'ecommerce',
    sector: 'Merch ricamato K-pop',
    location: 'Roma',
    tagline: 'E-commerce bilingue per un brand di ricami ispirati ai BTS, con una community fedele da oltre 1.300 recensioni.',
    intro:
      'Un negozio online costruito attorno ai fan: si entra scegliendo il proprio membro preferito, si scoprono i best seller del mese e si ordina con spedizione in Italia ed Europa. Catalogo, carrello, account cliente e blog, tutto in italiano e in inglese.',
    features: [
      'Catalogo filtrabile per membro ("Pick your bias")',
      'Carrello, checkout e area cliente',
      'Sito bilingue IT / EN',
      'Best seller del mese e prodotti in evidenza',
      'Soglie di spedizione gratuita Italia / Europa',
      'Blog e pagine di brand',
    ],
    accent: '#9b4dca',
    languages: ['IT', 'EN'],
  },
  {
    slug: 'rare',
    name: 'RAЯE',
    url: 'https://raresushicocktail.it',
    category: 'local',
    sector: 'Sushi & cocktail bar',
    location: 'Reggio Calabria',
    tagline: 'Sito d’atmosfera per un sushi e cocktail bar: luce bassa, neon e prenotazioni in un tap.',
    intro:
      'Un sito che fa venire voglia di sedersi al tavolo. Racconta il locale, il banco sushi e il cocktail bar con un’estetica scura e curata, e porta l’utente dritto alla prenotazione via telefono o WhatsApp.',
    features: [
      'Menù consultabile online',
      'Sezioni promo del momento e senza glutine',
      'Asporto e delivery',
      'Pagina feste ed eventi privati',
      'Prenotazione via telefono e WhatsApp',
      'SEO locale su Reggio Calabria',
    ],
    accent: '#c9a13b',
  },
  {
    slug: 'malcusa',
    name: 'Malcusa',
    url: 'https://malcusa.it',
    category: 'ecommerce',
    sector: 'Tappeti di lusso fatti a mano',
    location: 'Milano',
    tagline: 'Vetrina e shop per un atelier milanese di tappeti artigianali di radice sarda.',
    intro:
      'Un brand di lusso ha bisogno di silenzio visivo: immagini grandi, tipografia essenziale, nessun rumore. Il sito presenta l’atelier e le collezioni e porta allo shop, pensato per un pubblico internazionale.',
    features: [
      'Shop della collezione',
      'Pagine Atelier e About sul saper fare artigiano',
      'Sezione News',
      'Design editoriale, pensato per il lusso',
      'Interamente in inglese per il mercato estero',
    ],
    accent: '#c48e7f',
    languages: ['EN'],
  },
  {
    slug: 'olizen',
    name: 'Olizen',
    url: 'https://olizen.it',
    category: 'prenotazioni',
    sector: 'Centro massaggi',
    location: 'Roma · Jonio – Talenti',
    tagline: 'Prenotazione online con orari liberi in tempo reale, gift card e pagamento online o in centro.',
    intro:
      'Per un centro massaggi il sito deve fare una cosa: far prenotare. Si tocca un trattamento, si sceglie giorno e orario tra quelli realmente liberi e si conferma in pochi tap, pagando online o in sede.',
    features: [
      'Prenotazione con disponibilità in tempo reale',
      'Listino trattamenti cliccabile',
      'Pagamento online o in centro',
      'Gift card regalabili',
      'Area personale cliente',
      'Recensioni, FAQ e mappa',
    ],
    accent: '#3d5a47',
  },
  {
    slug: 'evoos',
    name: 'EVOOS',
    url: 'https://evoos.it',
    category: 'ecommerce',
    sector: 'Olio extravergine di oliva',
    location: 'Calabria',
    tagline: 'Storytelling e shop per un olio EVO calabrese da uliveti secolari.',
    intro:
      'Un prodotto agricolo di qualità si vende raccontandolo. Il sito accompagna dal blend alle tre cultivar autoctone, dal territorio al profilo sensoriale e agli abbinamenti, fino allo shop.',
    features: [
      'Shop online con carrello',
      'Racconto di blend, cultivar e territorio',
      'Profilo sensoriale e abbinamenti',
      'Galleria fotografica',
      'Blog',
    ],
    accent: '#c6a34f',
  },
  {
    slug: 'ricci',
    name: 'Studio Legale Ricci',
    url: 'https://riccistudiolegale.it',
    category: 'professionisti',
    sector: 'Studio legale',
    location: 'Roma',
    tagline: 'Consulenza legale online: richiesta di un parere scritto, prezzi chiari e risposta in 2–5 giorni.',
    intro:
      'Lo studio offre pareri legali a distanza, e il sito è costruito per trasformare i visitatori in richieste. Prezzo e tempi sono dichiarati subito, la richiesta parte da un modulo guidato e i contenuti rispondono ai dubbi più comuni prima ancora della consulenza.',
    features: [
      'Modulo di richiesta consulenza online',
      'Prezzi e tempi di risposta trasparenti',
      'Sezione sui termini per agire',
      'Aree di intervento per privati e PMI',
      'News, FAQ e newsletter',
      'Contatto rapido via WhatsApp',
    ],
    accent: '#9e2b2b',
  },
  {
    slug: 'white-garden',
    name: 'White Garden Tattoo',
    url: 'https://whitegardentattoo.it',
    category: 'prenotazioni',
    sector: 'Studio di tatuaggi',
    location: 'Roma · Colli Aniene',
    tagline: 'Si sceglie lo stile, si trova l’artista giusto. Con tatuaggi da regalare pagabili online.',
    intro:
      'Otto stili e altrettanti specialisti: il sito parte dallo stile che cerchi e ti porta al tatuatore che lo fa meglio. Chi vuole fare un regalo può acquistare un tatuaggio direttamente online.',
    features: [
      '8 stili, ognuno con il suo artista',
      'Regala un tatuaggio: acquisto online con Stripe',
      'Richiesta informazioni per artista',
      'Recensioni e indicazioni stradali',
    ],
    accent: '#14b886',
  },
  {
    slug: 'iamundo-candido',
    name: 'Studio Iamundo & Candido',
    url: 'https://studioiamundocandido.it',
    category: 'professionisti',
    sector: 'Commercialisti e consulenti del lavoro',
    location: 'Roma Nord',
    tagline: 'Sito istituzionale con area clienti e scadenzario fiscale per uno studio con 30 anni di storia.',
    intro:
      'Uno studio storico che voleva un’immagine all’altezza della sua esperienza. Il sito presenta team e servizi, tiene i clienti aggiornati con news e scadenze fiscali e dà accesso a un’area riservata.',
    features: [
      'Area clienti riservata',
      'Scadenzario fiscale',
      'Pagine team e servizi',
      'News e aggiornamenti normativi',
      'Richiesta di consulenza gratuita',
    ],
    accent: '#1f5a96',
  },
  {
    slug: 'workadvizee',
    name: 'WorkAdvizee',
    url: 'https://workadvizee.com',
    category: 'professionisti',
    sector: 'Consulenza per imprese',
    location: 'Italia',
    tagline: 'Identità forte e monospaziata per una rete di consulenti per imprese e professionisti.',
    intro:
      'Consulenza del lavoro, fisco, legale e networking sotto un unico marchio. Il sito ha un tono deciso e riconoscibile e mette in chiaro servizi, livelli di servizio garantiti e motivi per sceglierli.',
    features: [
      'Presentazione servizi multi-area',
      'Service Level Agreement dichiarati',
      'Mission e chi siamo',
      'FAQ e contatti',
      'Hero con slider',
    ],
    accent: '#2e6b52',
  },
  {
    slug: 'galletti',
    name: 'Galletti Solutions',
    url: 'https://galletti-problem-solvers.lovable.app',
    category: 'local',
    sector: 'Disinfestazione',
    location: 'Roma e provincia',
    tagline: 'Landing pensata per generare chiamate: prezzi chiari, CTA sempre a portata e WhatsApp.',
    intro:
      'Chi ha le blatte in casa non vuole leggere: vuole chiamare. La pagina mette prezzi, servizi e contatti in primo piano, con pulsanti per chiamata, WhatsApp e preventivo sempre a portata di pollice.',
    features: [
      'CTA chiama, WhatsApp e preventivo',
      'Prezzi trasparenti per servizio',
      'Pacchetto stagionale zanzare',
      'Pagine servizi e chi siamo',
      'FAQ e copertura su tutta la provincia',
    ],
    accent: '#f26a1b',
  },
];
