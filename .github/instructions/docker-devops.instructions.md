---
applyTo: "**/Dockerfile,compose.yaml,**/.dockerignore,.github/workflows/**,.github/dependabot.yml"
---
# Docker, CI et déploiement

- Compose est un environnement de DÉVELOPPEMENT. Ne le présente jamais comme une configuration de production ; la production diffère (voir `docs/operations/docker.md`).
- Images avec version fixée, utilisateur non privilégié, aucun secret intégré (tout par variables d'environnement), `.dockerignore` à jour.
- `depends_on` seul ne suffit pas : conserve les `healthcheck` et `condition: service_healthy`, ainsi que `backend/docker/entrypoint.sh` (attente réelle de la base).
- Les migrations sont exécutées explicitement (`manage.py migrate`), jamais automatiquement au démarrage.
- La CI exécute uniquement des contrôles qui existent dans le dépôt. Si tu modifies une commande (`package.json`, `pyproject.toml`), répercute-la dans `ci.yml` ET dans `README.md`.
- Vérifie chaque commande documentée contre les fichiers réels avant de la publier. Mets à jour les versions d'actions et d'images via Dependabot, pas à la main au hasard.
- N'expose jamais de secret dans les journaux, les artefacts ou les variables `VITE_*`.
