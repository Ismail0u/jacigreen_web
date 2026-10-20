# Tests et contrôles de qualité

## Commandes
| Domaine | Commande (depuis la racine, avec Docker Compose) |
|---|---|
| Backend : lint | `docker compose exec backend ruff check .` puis `ruff format --check .` |
| Backend : configuration | `docker compose exec backend python manage.py check` |
| Backend : migrations à jour | `docker compose exec backend python manage.py makemigrations --check --dry-run` |
| Backend : schéma OpenAPI | `docker compose exec backend python manage.py spectacular --validate --fail-on-warn --file /tmp/schema.yml` |
| Backend : tests + couverture | `docker compose exec -e DJANGO_SETTINGS_MODULE=config.settings.test backend sh -c "coverage run manage.py test && coverage report"` |
| Frontend : lint, format, types | `docker compose exec frontend npm run lint`, `npm run format:check`, `npm run typecheck` |
| Frontend : tests | `docker compose exec frontend npm test` (couverture : `npm run test:coverage`) |
| Pré-rendu | `docker compose exec frontend npm run build` puis `npm run check:prerender` (ajouter `-- --production --forbid-demo` avant une mise en production) |


### A. Vérifié (contrôle exécuté avec succès)
| Contrôle | Résultat |
|---|---|
| Backend : Ruff (lint + format), `check`, `makemigrations --check`, `spectacular --validate --fail-on-warn` | Réussi |
| Backend : 41 tests sur PostgreSQL 16 (modèles, API, permissions, limitation de débit, honeypot, Deploy Hook, admin, `seed_demo`, schéma, nombre de requêtes) | 41/41, couverture 93 % |
| Backend : `check --deploy` avec les réglages de production | 1 avertissement (HSTS preload, volontaire) |
| Frontend : `tsc --noEmit`, ESLint (strict + jsx-a11y), Prettier | Réussi, 0 erreur |
| Frontend : 54 tests Vitest (contrastes des tokens, SEO, client API, bouton, en-tête, formulaire de contact) | 54/54 ; couverture globale 51 % (les pages ne sont couvertes que par les contrôles navigateur) |
| `npm run build` : pré-rendu de 14 pages HTML (8 pages statiques + 3 solutions + 3 actualités de démonstration) depuis l'API réelle | Réussi ; `.data` et `__spa-fallback.html` générés |
| `check:prerender` : titre, description, canonique, Open Graph, `<h1>` unique, `noindex`, sitemap, robots.txt, contenu de l'API dans le HTML | Réussi ; avec `--forbid-demo`, **échoue comme prévu** |
| Navigateur (Chromium, `tools/browser_smoke.py`) : 22 contrôles | 22/22 : contenu présent sans JavaScript, navigation client (fichiers `.data`), filtre, 404, aucune erreur console, formulaire de contact enregistré en base PostgreSQL, 10 pages sans débordement horizontal à 375 px, menu mobile (`aria-expanded`, Échap) |
| Script `entrypoint.sh` : attente réelle de PostgreSQL | Cas nominal réussi |
| `react-router dev` avec l'API réelle | Pages rendues (HTTP 200, contenu présent) |
| YAML de `compose.yaml`, `ci.yml`, `dependabot.yml` | Syntaxe valide |
