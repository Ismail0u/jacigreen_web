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


### A. Derniers résultats consignés
| Contrôle | Résultat |
|---|---|
| Backend : Ruff (lint + format), `check`, `makemigrations --check`, `spectacular --validate --fail-on-warn`, tests PostgreSQL | Résultats historiques : lint/configuration réussis ; 41/41 tests, couverture 93 %. Non relancés pour la reconstruction UI. |
| Frontend : `npm run typecheck`, `npm run lint`, `npm run format:check` | Réussi, 0 erreur |
| Frontend : `npm test` | 62/62 tests Vitest réussis, y compris les garde-fous de palette et de contraste. |
| `npm run build` | Réussi après configuration explicite du host Preview en IPv4 (`127.0.0.1`), ce qui corrige le décalage entre `::1` et la résolution de `localhost` du pré-rendu. |
| `npm run check:prerender` | Réussi : HTML, canoniques locales, métadonnées, sitemap, robots et fallback vérifiés. |
| `npm run check:prerender -- --forbid-demo` | Échoue sur 31 problèmes : 20 ressources API marquées `is_demo=true` et 11 avertissements rendus. |
| `npm run check:prerender -- --production --forbid-demo` | Échoue sur 45 problèmes : 14 canoniques locales, 20 entrées API avec `is_demo=true` et 11 avertissements de démonstration rendus. Définir l'URL publique et remplacer les données par du contenu validé avant le contrôle final. |
| Navigateur local : 11 routes, cinq largeurs (360, 390, 768, 1 024, 1 440 px) | Aucune barre de défilement horizontale après stabilisation ; liens d'ancrage Solutions/Actualités et menu mobile contrôlés. Aucun formulaire envoyé. Pas de comparaison pixel à pixel par route. |
| Navigateur historique (`tools/browser_smoke.py`) | Ancien bilan : 22/22 contrôles ; la soumission de formulaire et les tests à 375 px ne sont pas des contrôles exécutés dans la reconstruction UI. |
| Script `entrypoint.sh`, `react-router dev` et syntaxe YAML | Résultats historiques consignés ; non relancés dans cette reconstruction. |
