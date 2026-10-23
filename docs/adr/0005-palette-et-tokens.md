# ADR 0005 — Palette et design tokens

**Statut :** Proposé. À valider par JaciGreen (identité visuelle).

## Contexte
Les maquettes Stitch utilisent vert forêt, ivoire, sable et ocre. Le logo officiel utilise un vert vif, un magenta et un gris (valeurs extraites d'un JPEG 400×400, donc approximatives : vert ≈ `#3FA244`, magenta ≈ `#B55C98`, gris ≈ `#878381`).

## Décision proposée
Conserver la structure sobre des maquettes (surfaces ivoire/sable, vert forêt) et intégrer les couleurs du logo comme **accents décoratifs** (`logo-green`, `logo-magenta`, `logo-grey`) ainsi qu'un magenta de texte assombri (`magenta-text`, 6,0:1). Les contrastes sont calculés et testés (`tokens.test.ts`). Source unique : `frontend/src/styles/tokens.css`.

## Conséquences
Changer de palette revient à modifier un seul fichier. Le logo n'est pas intégré : fournir un fichier vectoriel ou PNG transparent.
