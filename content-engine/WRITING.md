# Come scrivere una guida di vitastrategy.it

Queste istruzioni le segue la routine automatica che pubblica le guide su vitastrategy.it. Vanno seguite per intero, ogni volta.

## Chi è e cosa vende il sito

**VitaStrategy** è un'agenzia web con base a Roma (fondatore: Vitaliy Omelyukh). Progetta e sviluppa siti web, e-commerce, prenotazioni online, pannelli di gestione e automazioni con AI per **attività locali italiane**: ristoranti, centri estetici, studi professionali, artigiani, imprese di servizi, in tutta Italia. Il cliente ha un unico referente, senza commerciali in mezzo.

**Voce: sempre al plurale** ("ti prepariamo", "abbiamo realizzato", "raccontaci"). Mai la prima persona singolare.

L'obiettivo delle guide è portare titolari con un **problema concreto** (il sito non porta clienti, le prenotazioni sono un caos, non si trovano su Google...) a richiedere una **proposta gratuita** dal form della home (`/#contatti`).

Chi legge è un titolare, non un tecnico. Cerca su Google il suo problema nel momento in cui gli brucia. La guida deve **aiutarlo davvero**, anche se poi decide di fare da solo. Solo alla fine ricorda, senza enfasi, che se non ha tempo può affidarlo a VitaStrategy.

## Tre temi, e quale scrivere oggi

Ogni guida ha nel frontmatter `tema`:

- `"sito"`: problemi del sito (non porta clienti, lento, brutto da telefono, rifarlo o no, costi, dominio e hosting, chi lo aggiorna, cosa deve contenere).
- `"clienti"`: come un'attività trova e gestisce clienti online (prenotazioni, WhatsApp, preventivi, Google Maps, recensioni, gift card, vendere online).
- `"settore"`: guide **verticali** per un settore preciso di `content/settori/` (es. "Il sito del tuo ristorante: cosa deve avere per far prenotare").

**Ogni giorno due guide: una `settore` e una generale.** Per la generale alterna `sito` e `clienti`: guarda la guida generale più recente e scrivi l'altro tema. Per decidere cosa manca oggi, guarda le guide con `datePublished` di oggi.

Poi prendi dal backlog (`content-engine/topics.json`) il primo argomento `"da-fare"` **di quel tema** che non si sovrappone a una guida esistente.

## Regole che non si violano mai

Se una regola non si può rispettare, la guida non si pubblica.

1. **Niente numeri inventati.** Nessuna statistica, percentuale o "studio" senza una fonte verificata e linkata. Se non trovi la fonte, non scriverlo.
2. **Niente clienti, testimonianze o risultati inventati.** Niente "un mio cliente ha raddoppiato...", "i miei clienti ottengono...". Puoi citare **solo i progetti reali** del portfolio (`src/data/projects.ts`) e solo per quello che fanno davvero (es. "il sito di Olizen mostra solo gli orari liberi"), linkando `/progetti/<slug>`. Mai inventare risultati di quei progetti.
3. **Mai promettere risultati**: né clienti, né vendite, né posizioni su Google. Nessuno decide al posto di Google chi compare per primo.
4. **Niente prezzi dei servizi di VitaStrategy.** Si può spiegare da cosa dipende il costo di un sito, non quanto costa da noi. I costi di terzi (dominio, piattaforme) solo con fonte e data.
5. **Niente pagine "settore × città"** ("Sito web per ristoranti a Milano"). Le città compaiono solo come esempio nel testo, mai nello slug o nel titolo.
6. **Mai parlare male di concorrenti con nome**, né di agenzie o piattaforme specifiche. Si possono descrivere i limiti di un tipo di soluzione (es. "le piattaforme di prenotazione trattengono una commissione") senza numeri non verificati.
7. **Mai copiare** testo da altri siti.
8. Fatti tecnici o regole (privacy, cookie, Google, pagamenti) vanno **verificati con una ricerca web** su fonti ufficiali e linkati.

## Stile

- Italiano diretto, frasi corte, paragrafi di 2-4 frasi. Dai del "tu".
- Parti dal **dolore con le parole del titolare** ("il telefono non squilla", "passo le serate su WhatsApp"), poi la soluzione.
- Niente gergo: se serve un termine tecnico (SEO, hosting, dominio), spiegalo in una frase.
- Esempi concreti dai settori del sito, con nomi di fantasia e dettagli realistici. Testi pronti da copiare (messaggi, frasi per il sito) in blocchi `>`.
- Tono calmo e onesto. Niente allarmismo, niente entusiasmo da venditore.
- Niente frasi riempitive: "In questo articolo vedremo", "In conclusione", "Nel mondo di oggi", "Al giorno d'oggi".

## Struttura obbligatoria

1. **Titolo**: una domanda o un problema reale del titolare, come lo scriverebbe su Google.
2. **Risposta breve** (`rispostaBreve`): 2-3 frasi che rispondono subito e davvero. È la parte che Google e gli assistenti AI riprendono più spesso.
3. **Corpo** in Markdown: da 600 a 1.300 parole. Sezioni con `##` e, se servono, `###`. **Mai `#`** (l'H1 lo mette la pagina). Niente tabelle.
4. **Una checklist pratica** (lista puntata) che il titolare può usare subito sul suo sito o sulla sua attività.
5. Almeno **un link interno** a un'altra guida (`/guide/<slug>`) o a un settore (`/settori/<slug>`), e quando ha senso a un progetto (`/progetti/<slug>`).
6. **Chiusura**: un paragrafo breve, senza enfasi, che invita a [richiedere una proposta gratuita](/#contatti) se non ha tempo di farlo da solo.
7. **FAQ** facoltative (2-3), solo se aggiungono qualcosa. Finiscono anche nei dati strutturati.

### Guide verticali (tema "settore")

- Il settore va nel titolo e in `settoriCorrelati` (solo quello).
- Linka la pagina del settore (`/settori/<slug>`) nel testo.
- Deve essere **davvero diversa** dalle altre: problemi, esempi e consigli specifici di quel settore. Se potrebbe valere per qualsiasi attività cambiando il nome del settore, non è verticale: riscrivila.
- Se nel portfolio c'è un progetto di quel settore, usalo come esempio concreto (cosa fa, non risultati).

## Frontmatter

File: `content/guide/<slug>.md`. Slug in minuscolo, parole separate da trattini, massimo 60 caratteri, senza nomi di città.

```yaml
---
title: "Titolo per Google · VitaStrategy"   # max 70 caratteri, finisce con " · VitaStrategy"
description: "Descrizione per Google, 120-170 caratteri, concreta, senza promesse."
h1: "Titolo visibile, di solito una domanda"
rispostaBreve: "Due o tre frasi che rispondono subito."
tema: "sito"                  # "sito", "clienti" oppure "settore"
datePublished: "AAAA-MM-GG"   # data di oggi (Europe/Rome)
dateModified: "AAAA-MM-GG"    # uguale a datePublished
settoriCorrelati:             # slug di content/settori (obbligatorio per tema settore)
  - "ristoranti"
guideCorrelate:               # 1-3 slug esistenti in content/guide (facoltativo)
  - "perche-sito-non-porta-clienti"
progettiCorrelati:            # slug di src/data/projects.ts (facoltativo)
  - "rare"
faq:                          # facoltativo
  - domanda: "…?"
    risposta: "…"
---
```

Settori esistenti: i file in `content/settori/`. Non creare nuovi settori senza che lo chieda il titolare.

## Procedura

1. Leggi questo file, `content-engine/topics.json`, i titoli e le risposte brevi di **tutte** le guide in `content/guide/` e l'elenco dei progetti in `src/data/projects.ts`.
2. Decidi il tema (vedi sopra) e scegli dal backlog il primo argomento `"da-fare"` di quel tema che non si sovrappone a una guida esistente. Se non ce ne sono, aggiungi nuovi argomenti al backlog (vedi sotto) e usa il primo.
3. Se servono fatti (regole di Google, privacy, pagamenti, piattaforme), verificali con una ricerca web su fonti ufficiali e tieni i link.
4. Scrivi la guida seguendo struttura, stile e regole.
5. Rileggila **da critico**: togli ogni frase che promette, che vende, che contiene numeri senza fonte, che ripete un'altra guida o che non servirebbe a un titolare.
6. In `content-engine/topics.json` segna l'argomento `"stato": "fatto"` con `"slug"` e `"data"`.
7. Esegui i controlli. Se falliscono, correggi e riprova. Poi commit e push su `main`.

## Nuovi argomenti per il backlog

Quando un tema finisce, aggiungi problemi reali che un titolare cerca su Google, scritti come li scriverebbe lui. Per `settore`, alterna i settori esistenti, uno alla volta.

Non vanno bene: notizie che invecchiano in fretta, argomenti tecnici per sviluppatori, varianti della stessa guida, pagine per città, confronti tra marchi.

## Controlli obbligatori prima del push

```bash
npm ci || npm install
node content-engine/check-content.mjs
npm run build
```

Tutti devono passare. Il controllo blocca: numeri senza fonte, prezzi, linguaggio da vendita, titoli troppo lunghi, `#` nel corpo, tabelle, link interni rotti, testi troppo corti o lunghi, slug con città, guide verticali senza link al settore.
