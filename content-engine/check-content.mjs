// Controlli sui contenuti di content/. Esce con codice 1 se trova errori.
// Uso: node content-engine/check-content.mjs
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const dir = (d) => path.join(ROOT, 'content', d);
const read = (d) =>
  fs
    .readdirSync(dir(d))
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir(d), f), 'utf8'));
      return { file: `content/${d}/${f}`, slug: f.replace(/\.md$/, ''), data, body: content };
    });

const settori = read('settori');
const guide = read('guide');
const settoriSlugs = new Set(settori.map((s) => s.slug));
const guideSlugs = new Set(guide.map((g) => g.slug));
const progettiSlugs = new Set(
  [...fs.readFileSync(path.join(ROOT, 'src/data/projects.ts'), 'utf8').matchAll(/slug:\s*'([a-z0-9-]+)'/g)].map((m) => m[1]),
);
const errors = [];
const err = (file, msg) => errors.push(`${file}: ${msg}`);

const PREZZO = /(€\s?\d|\d\s?€|\d+\s?euro\b|\bEUR\b)/i;
const PERCENTUALE = /\d+([.,]\d+)?\s?%|\bper cento\b/i;
const SOSPETTI = /\b(secondo (uno|un) studio|una ricerca (ha|di)|i dati (mostrano|dicono)|statistiche (dicono|mostrano)|studi dimostrano)\b/i;
const VENDITA = /\b(garantisco|garantiamo|risultati garantiti|primo su google|prima pagina garantita|i (miei|nostri) clienti (ottengono|hanno ottenuto)|un (mio|nostro) cliente ha)\b/i;
// Voce del marchio: plurale ("noi"), mai prima persona singolare
const PRIMA_PERSONA = /\b(raccontami|scrivimi|contattami|ti preparo|ti ricontatto|ti rispondo|ho realizzato|ho costruito|ne parlo|lo faccio io)\b/i;
const RIEMPITIVI = /\b(in questo articolo vedremo|in conclusione|nel mondo di oggi|al giorno d'oggi)\b/i;
const CITTA = ['roma', 'milano', 'napoli', 'torino', 'palermo', 'genova', 'bologna', 'firenze', 'bari', 'catania', 'venezia', 'verona', 'messina', 'padova', 'trieste', 'brescia', 'parma', 'taranto', 'prato', 'modena', 'reggio', 'perugia', 'livorno', 'ravenna', 'cagliari', 'foggia', 'rimini', 'salerno', 'ferrara', 'sassari', 'latina', 'monza', 'pescara', 'bergamo', 'vicenza', 'trento', 'bolzano', 'lecce'];
const LINK_FISSI = new Set(['/', '/#contatti', '/#lavori', '/#faq', '/guide', '/settori', '/privacy']);

const testo = (x) =>
  [x.data.title, x.data.description, x.data.h1, x.data.intro, x.data.rispostaBreve, x.body, ...(x.data.faq ?? []).flatMap((f) => [f.domanda, f.risposta])]
    .filter(Boolean)
    .join('\n');
const parole = (s) => s.replace(/[#*_>\-`\[\]()]/g, ' ').split(/\s+/).filter(Boolean).length;

const checkLinks = (x, body) => {
  for (const [, href] of body.matchAll(/\]\((\/[^)\s]*)/g)) {
    const [, tipo, slug] = href.split('#')[0].split('/');
    const ok =
      LINK_FISSI.has(href) ||
      (tipo === 'settori' && settoriSlugs.has(slug)) ||
      (tipo === 'guide' && guideSlugs.has(slug)) ||
      (tipo === 'progetti' && progettiSlugs.has(slug));
    if (!ok) err(x.file, `link interno rotto: ${href}`);
  }
  for (const [, href] of body.matchAll(/\]\((https?:[^)\s]+)/g)) {
    if (!href.startsWith('https://')) err(x.file, `link esterno non https: ${href}`);
  }
};

for (const x of [...settori, ...guide]) {
  const t = testo(x);
  if (VENDITA.test(t)) err(x.file, `linguaggio da vendita: "${t.match(VENDITA)[0]}"`);
  if (PRIMA_PERSONA.test(t)) err(x.file, `prima persona singolare "${t.match(PRIMA_PERSONA)[0]}": il marchio parla al plurale (noi)`);
  if (RIEMPITIVI.test(t)) err(x.file, `frase riempitiva: "${t.match(RIEMPITIVI)[0]}"`);
  if (!x.data.title || x.data.title.length > 70) err(x.file, `title mancante o oltre 70 caratteri (${x.data.title?.length ?? 0})`);
  if (!/ · VitaStrategy$/.test(x.data.title ?? '')) err(x.file, `il title deve finire con " · VitaStrategy"`);
  if (!x.data.description || x.data.description.length > 170) err(x.file, `description mancante o oltre 170 caratteri (${x.data.description?.length ?? 0})`);
  checkLinks(x, x.body);
}

for (const s of settori) {
  for (const p of s.data.progetti ?? []) if (!progettiSlugs.has(p)) err(s.file, `progetti: "${p}" non esiste in src/data/projects.ts`);
}

const titoli = new Map();
for (const g of guide) {
  const d = g.data;
  const t = testo(g);
  if (PREZZO.test(t)) err(g.file, `sembra contenere un prezzo: "${t.match(PREZZO)[0]}"`);
  if (PERCENTUALE.test(t)) err(g.file, `percentuale "${t.match(PERCENTUALE)[0]}": niente numeri senza fonte verificata`);
  if (SOSPETTI.test(t)) err(g.file, `formula da statistica: "${t.match(SOSPETTI)[0]}": serve una fonte linkata o va tolta`);
  if (/^#\s/m.test(g.body)) err(g.file, `titolo "# " nel corpo: parti da "##"`);
  if (/^\s*\|.*\|\s*$/m.test(g.body)) err(g.file, `tabella Markdown non supportata: usa una lista`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(g.slug) || g.slug.length > 60) err(g.file, `slug non valido`);
  const citta = CITTA.find((c) => g.slug.split('-').includes(c));
  if (citta) err(g.file, `slug con nome di città ("${citta}"): niente pagine per città`);
  for (const k of ['h1', 'rispostaBreve', 'datePublished', 'dateModified', 'tema']) if (!d[k]) err(g.file, `manca "${k}"`);
  if (d.tema && !['sito', 'clienti', 'settore'].includes(d.tema)) err(g.file, `tema deve essere "sito", "clienti" o "settore"`);
  const frasi = (d.rispostaBreve ?? '').split(/(?<=[.!?])\s+/).filter(Boolean).length;
  if (frasi < 2 || frasi > 4) err(g.file, `rispostaBreve deve avere 2-3 frasi (ne ha ${frasi})`);
  const n = parole(g.body);
  if (n < 550 || n > 1450) err(g.file, `corpo di ${n} parole: deve stare tra 600 e 1.300 circa`);
  if (!/\]\(\/#contatti\)/.test(g.body)) err(g.file, `manca il link alla [proposta gratuita](/#contatti) in chiusura`);
  if (!/\]\(\/(guide|settori|progetti)\/[a-z0-9-]+\)/.test(g.body)) err(g.file, `serve almeno un link interno a una guida, un settore o un progetto`);
  if (!/^\s*[-*]\s/m.test(g.body)) err(g.file, `serve almeno una lista (la checklist pratica)`);
  for (const s of d.settoriCorrelati ?? []) if (!settoriSlugs.has(s)) err(g.file, `settoriCorrelati: "${s}" non esiste`);
  for (const s of d.guideCorrelate ?? []) if (!guideSlugs.has(s) || s === g.slug) err(g.file, `guideCorrelate: "${s}" non valida`);
  for (const s of d.progettiCorrelati ?? []) if (!progettiSlugs.has(s)) err(g.file, `progettiCorrelati: "${s}" non esiste`);
  if (d.tema === 'settore') {
    const s = d.settoriCorrelati?.[0];
    if (!s) err(g.file, `guida verticale: indica il settore in settoriCorrelati`);
    else if (!g.body.includes(`](/settori/${s})`)) err(g.file, `guida verticale: linka la pagina del settore (/settori/${s})`);
  }
  for (const k of ['title', 'h1']) {
    const v = String(d[k] ?? '').toLowerCase();
    if (titoli.has(v)) err(g.file, `${k} uguale a ${titoli.get(v)}`);
    titoli.set(v, g.file);
  }
  for (const k of ['datePublished', 'dateModified']) {
    if (d[k] && !/^\d{4}-\d{2}-\d{2}$/.test(String(d[k] instanceof Date ? d[k].toISOString().slice(0, 10) : d[k]))) err(g.file, `${k} deve essere AAAA-MM-GG`);
  }
}

const topics = JSON.parse(fs.readFileSync(path.join(ROOT, 'content-engine/topics.json'), 'utf8'));
for (const a of topics.argomenti) {
  if (!['sito', 'clienti', 'settore'].includes(a.tema)) err('content-engine/topics.json', `tema non valido in "${a.titolo}"`);
  if (a.stato === 'fatto' && a.slug && !guideSlugs.has(a.slug)) err('content-engine/topics.json', `argomento "fatto" con slug inesistente: ${a.slug}`);
}

if (errors.length) {
  console.error(`✗ ${errors.length} problemi:\n- ` + errors.join('\n- '));
  process.exit(1);
}
console.log(`✓ Contenuti a posto: ${settori.length} settori, ${guide.length} guide, ${topics.argomenti.filter((a) => a.stato === 'da-fare').length} argomenti in backlog.`);
