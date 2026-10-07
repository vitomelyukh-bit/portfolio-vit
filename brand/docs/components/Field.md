Un campo di modulo con etichetta, input e riga di aiuto.

- Struttura: `div.vs-field` con dentro `label.vs-field__label`, `input.vs-input` (o `textarea.vs-input`) e, se serve, `span.vs-field__help`. Tu fornisci `id`, `for` e i testi.
- L'etichetta è minuscola, nello stile `label`. Il segnaposto è un esempio vero, non la ripetizione dell'etichetta.
- Errore: aggiungi `vs-field--error`. Il bordo diventa `ink` e più spesso, e la riga di aiuto dice cosa è successo e cosa fare. Il brand non usa il rosso.
- Bordo a riposo in `muted`, fondo `surface`, angoli `radius-sm`.
