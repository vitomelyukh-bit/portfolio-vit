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
