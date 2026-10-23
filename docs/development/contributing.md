# Contribuer

## Flux de travail
1. Une branche par sujet : `feat/…`, `fix/…`, `docs/…`, `chore/…`.
2. Commits : Conventional Commits (`feat(api): …`, `fix(frontend): …`).
3. Avant d'ouvrir une pull request : lancer les contrôles de `docs/quality/testing.md` (identiques à la CI).
4. Pull request relue ; CI verte (backend, frontend, pré-rendu, Docker) obligatoire.
5. Toute décision structurante : ADR dans `docs/adr/` (nouveau fichier numéroté ; ne pas réécrire un ADR accepté).

## Règles
- Pas de dépendance sans justification dans la PR (nom, raison, alternative native écartée).
- Toute commande modifiée est répercutée dans `README.md` et `.github/workflows/ci.yml`.
- Modifier un modèle : migration relue et commitée. Modifier l'API : docs + types TypeScript + tests.
- Modifier les tokens : justification dans la PR, contrastes verts (`tokens.test.ts`).