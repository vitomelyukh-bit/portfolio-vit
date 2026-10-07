# vitastrategy — pacchetto brand per il sito

Tutto quello che serve per applicare il nuovo brand a vitastrategy.it.

## Cosa c'è

- `BRAND.md`: le regole del brand (logo, colori, tipografia, tono di voce). Da leggere per prima.
- `tokens.css`: colori, spazi, raggi e font come variabili CSS, tema scuro (principale) e chiaro.
- `tokens.json`: gli stessi valori come dati.
- `components.css`: stili di Button, Field, Card, Tag e Header (classi `vs-`).
- `docs/components/`: una guida per componente.
- `public/`: logo, segno, favicon (`.svg`, `.ico`, `.png`), icona Apple e immagine di anteprima social (`og-image.png`). Va copiato nella cartella `public/` del sito.
- `head-snippet.html`: i tag da mettere nell'`<head>` (favicon, font, colore del tema, immagine social).
- `preview.html`: apri questo file nel browser per vedere il brand applicato.

## Prompt per Claude Code

Copia la cartella `vitastrategy-brand/` nella radice del repository del sito, poi incolla questo:

> Nella cartella `vitastrategy-brand/` c'è il nuovo brand del sito. Leggi prima `vitastrategy-brand/BRAND.md` e `vitastrategy-brand/README.md`, poi:
> 1. Copia il contenuto di `vitastrategy-brand/public/` nella cartella `public/` del progetto e sostituisci favicon, icona Apple e immagine Open Graph attuali usando i tag di `head-snippet.html` (adattali al framework del progetto: se è Next.js usa l'oggetto `metadata` e `next/font` per JetBrains Mono e Space Grotesk).
> 2. Porta i valori di `tokens.css` nel sistema di stile del progetto (variabili CSS globali, oppure il tema di Tailwind se il progetto lo usa) mantenendo gli stessi nomi.
> 3. Sostituisci il logo "VO" in header e footer con `logo-on-dark.svg`, e ovunque il nome con `vitastrategy` minuscolo.
> 4. Aggiorna pulsanti, card, campi dei moduli, tag e header seguendo `components.css` e le guide in `docs/components/`. Angoli vivi, un solo pulsante lime pieno per schermata, nessuna ombra né sfumatura.
> 5. Titoli, pulsanti ed etichette in JetBrains Mono; testo corrente in Space Grotesk. Nei titoli la parte in evidenza usa `--accent` al posto del corsivo attuale.
> 6. Non cambiare testi, struttura delle pagine, SEO, modulo contatti o logica: solo l'aspetto. Mostrami un riepilogo dei file toccati prima di fare commit.
