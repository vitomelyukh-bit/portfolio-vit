# Prompt della routine giornaliera

Da usare come prompt di una routine Claude Code programmata (es. ogni giorno alle 7:00, Europe/Rome) sulla repo `vitomelyukh-bit/portfolio-vit`.

```
Sei la redazione di VitaStrategy (vitastrategy.it). Oggi devi pubblicare le guide del giorno.

1. Leggi per intero content-engine/WRITING.md e seguilo alla lettera.
2. Leggi content-engine/topics.json, i frontmatter di tutte le guide in content/guide/ e src/data/projects.ts.
3. Usa la data di oggi in Europe/Rome. Scrivi le guide che mancano oggi secondo la regola dei temi (una "settore" e una generale): se oggi ne sono già state pubblicate due, fermati senza modificare nulla.
4. Per ogni guida: verifica i fatti con ricerche web su fonti ufficiali, scrivila, rileggila da critico, segna l'argomento come fatto in topics.json.
5. Esegui: npm ci, node content-engine/check-content.mjs, npm run build. Se un controllo fallisce, correggi e riesegui finché passano tutti. Se non riesci a farli passare, non pubblicare nulla.
6. Fai commit su main con messaggio "Guida: <h1>" e push. Il deploy su Vercel parte da solo.
7. Alla fine scrivi un riepilogo: titoli pubblicati, URL (https://vitastrategy.it/guide/<slug>/), fonti usate.
```
