# vitastrategy — brand book

vitastrategy è il marchio di Vitaliy Omelyukh: siti, e-commerce e prenotazioni online per attività locali, a Roma e in tutta Italia. L'idea del brand è il battito che sale: "vita" è una linea viva che, dopo la V, non torna piatta ma punta in alto. Un sito vivo che porta clienti.

## Logo

- Scrivi sempre `vitastrategy`, minuscolo, una parola. Mai "Vita Strategy", mai "VO".
- Il logo completo è "vita", il segno, "strategy". Usa i file in `public/`, non ricomporlo con il font.
- Su fondo `bg` scuro usa `logo-on-dark.svg`. Su fondo chiaro usa `logo-on-light.svg`. Su fondo `lime` o in stampa a un colore usa `logo-mono-ink.svg`.
- Dove il nome non ci sta (avatar, icona app, timbro) usa solo il segno: `mark-lime.svg` su scuro, `mark-ink.svg` su chiaro o su lime.
- Lascia attorno al logo uno spazio libero pari all'altezza della "v". Altezza minima del logo completo: 20px.
- Non ruotare il segno, non cambiarne il colore fuori da `accent`, `lime` e `ink`, non metterlo su foto.

## Favicon

- `favicon.svg` è la favicon: segno `on-lime` su quadrato `lime`, angoli vivi.
- `favicon-32.png` è il ripiego per i browser senza SVG; `apple-touch-icon.png` (180px) è per la schermata Home di iPhone.

## Colore

- Il tema scuro è quello del brand. Il tema chiaro serve per documenti, preventivi e stampa.
- Fondo `bg`, testo `ink`, testo secondario `muted`, card `surface`, filetti `line`.
- `lime` è un fondo, non un colore di testo: pulsante principale, favicon, un blocco pieno per schermata. Sopra ci va solo `on-lime`.
- Per una parola in evidenza o un segno colorato sul fondo usa `accent`, che nel tema chiaro diventa lime scuro.
- Un solo elemento `lime` pieno per schermata. Se tutto è lime, niente lo è.
- Niente sfumature, niente ombre, niente secondo colore d'accento.

## Tipografia

- Titoli, pulsanti ed etichette in `mono` (JetBrains Mono): stili `display`, `h1`, `h2`, `button`, `label`.
- Testo corrente in `sans` (Space Grotesk): stili `body` e `small`.
- Nei titoli evidenzia in `accent` solo la parte che conta: "Un sito che porta clienti, **non solo complimenti.**"
- Le etichette `label` sono minuscole e possono aprirsi con un segno: `↗`, `●`, `>`.

## Forma e spazio

- Angoli vivi: pulsanti e blocchi usano `radius-none`. `radius-md` solo per card grandi e cornici di screenshot.
- Bordi da 1px in `line`, mai ombre.
- Spazi dalla scala `space-1` … `space-6`: `space-3` dentro i pulsanti, `space-4` dentro le card, `space-6` tra le sezioni.

## Componenti

- Gli stili stanno in `components.css`, classi con prefisso `vs-`: `Button`, `Field`, `Card`, `Tag`, `Header`. Sono HTML e CSS semplici, senza libreria.
- Prima di usarne uno leggi la sua guida in `docs/components/<Nome>.md`.
- Anello di focus: 2px pieno in `accent`, staccato di 2px, su tutti gli elementi interattivi.

## Voce

- Dai del tu. Frasi corte, concrete, da persona e non da agenzia: "Ti suona familiare?", "Lavori veri, online adesso".
- Parla di clienti, richieste e prenotazioni, non di "soluzioni digitali".
- Pulsanti con verbo e risultato: "Richiedi la proposta gratuita →", "Guarda i lavori", "Scrivimi su WhatsApp".
- Niente emoji, niente punti esclamativi.

## Iconografia

- Il brand non ha ancora un set di icone. Usa frecce e segni tipografici del font `mono` (`→`, `↗`, `●`) e, se serve un'icona, una a tratto semplice, spessore costante, angoli vivi, colore `ink` o `accent`.
