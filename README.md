# Portfolio

Sito statico in [Astro](https://astro.build). Deploy su Vercel senza configurazione.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build
```

## Modificare i dati

- **Nome e contatti**: `src/data/site.ts` (se `email`/`whatsapp` sono vuoti i bottoni non compaiono)
- **Progetti**: `src/data/projects.ts`, l'ordine dell'array è l'ordine sul sito

## Aggiungere un progetto

1. Aggiungi un oggetto in `src/data/projects.ts` con uno `slug` nuovo
2. Metti in `public/shots/<slug>/` tre immagini:
   - `desktop.webp`: 1280×800, prima schermata desktop
   - `mobile.webp`: 585 di larghezza, prima schermata da smartphone
   - `page.webp`: 960 di larghezza, pagina intera (scorre al passaggio del mouse)

La pagina `/progetti/<slug>` viene generata automaticamente.

## Modulo contatti

Il form chiama `/api/lead` (funzione Vercel) che invia un'email con Resend.

| Variabile | Cosa |
|---|---|
| `RESEND_API_KEY` | Chiave Resend (dall'integrazione Marketplace) |
| `LEAD_TO_EMAIL` | Dove arrivano le richieste (più indirizzi separati da virgola) |
| `RESEND_FROM` | Facoltativa. Senza dominio verificato resta `onboarding@resend.dev`, che consegna solo all'email del proprietario dell'account Resend |

Senza `RESEND_API_KEY` o `LEAD_TO_EMAIL` il form mostra un errore e propone WhatsApp: nessuna richiesta finisce persa in silenzio.

## Link personalizzati (outbound)

- `/?a=Pizzeria%20Mario` mostra un saluto personalizzato in alto e precompila il nome dell'attività nel form
- `ref`, `utm_source`, `utm_campaign` vengono riportati nell'email della richiesta (es. `/?a=Pizzeria%20Mario&utm_source=bot&utm_campaign=ristoranti-roma`)

## SEO e contenuti

- `content/settori/*.md`: landing verticali (`/settori/<slug>/`)
- `content/guide/*.md`: guide sui problemi dei titolari (`/guide/<slug>/`)
- `content-engine/WRITING.md`: regole di scrittura (le segue la routine)
- `content-engine/topics.json`: backlog degli argomenti
- `content-engine/check-content.mjs`: controlli obbligatori (`node content-engine/check-content.mjs`)
- `content-engine/ROUTINE.md`: prompt della routine giornaliera

Sono generati in automatico: `sitemap-index.xml`, `robots.txt` (crawler AI consentiti), `llms.txt`, canonical, Open Graph e dati strutturati JSON-LD (Person, ProfessionalService, WebSite, FAQPage, Article, Service, BreadcrumbList, CreativeWork).
