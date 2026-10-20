# JACIGREEN — socle de démarrage (Phase 1)

Site institutionnel de JACIGREEN : React + TypeScript (frontend, pré-rendu statique) et Django REST + PostgreSQL (API, administration de contenu), avec Docker Compose.

## 1. Présentation de JACIGREEN
Entreprise africaine spécialisée dans la valorisation des ressources naturelles, des déchets organiques et des espèces végétales envahissantes (jacinthe d'eau) : solutions environnementales, énergétiques et agricoles (source : document institutionnel v1.0, publication à confirmer).

## 2. Objectifs du socle
Fournir une base maintenable, testée et documentée pour développer la Phase 1 (vitrine) puis la Phase 2 (transactionnel) sans réécriture : architecture claire, design system implémenté, SEO vérifié, sécurité de base, CI, et instructions persistantes pour GitHub Copilot.

## 3. Fonctionnalités déjà implémentées
- API publique en lecture seule : solutions, services, réalisations, actualités ; dépôt de demandes de contact (consentement, honeypot, limitation de débit).
- Django Admin : publication/brouillon, publication planifiée, filtres, recherche.
- Frontend : accueil, à propos, solutions (liste, fiche), services, réalisations (filtre par pays), actualités (liste, article), contact/devis, mentions légales (substitution), page introuvable.
- Pré-rendu HTML complet, métadonnées SEO, sitemap, robots.txt, Deploy Hook de reconstruction.
- Design system (tokens, contrastes testés), accessibilité de base, responsive.
- Tests (backend,frontend), lint, types, CI, Dependabot, instructions Copilot, 5 agents.

## 4. Fonctionnalités encore à développer
Partiellement implémenté : page « à propos » (contenu validé manquant), solutions et services (contenus réels à saisir), pages légales (substitution).
À faire : page Formations, fiche de réalisation, textes légaux, logo et photos réels, notification email des demandes, stockage des médias en production, CSP, double authentification de l'admin, tests de bout en bout en CI, anglais. Phase 2 : commandes, comptes, paiement, rachat de biodigesteur avec pièces jointes, inscriptions. Détail : `docs/project/audit-initial.md` et `docs/adr/0003`.

## 5. Stack technique
React 19.3, TypeScript 6 (strict), Vite 8, React Router 8 (pré-rendu), Tailwind CSS 4, React Hook Form + Zod, Vitest + Testing Library · Python 3.12, Django 5.2 LTS, Django REST Framework 3.18, drf-spectacular, django-filter, PostgreSQL 16, Gunicorn, WhiteNoise · Docker Compose, GitHub Actions, Ruff, ESLint, Prettier. Versions et raisons : `docs/adr/0004`.

## 6. Architecture générale
Deux applications distinctes reliées par une API REST (`/api/v1/`). Frontend statique pré-rendu (Vercel), API Django (Render), PostgreSQL. Voir `docs/architecture/overview.md` et les ADR 0001 et 0002.

## 7. Arborescence du dépôt
```
backend/         API Django (config/, apps/, requirements/, docker/, Dockerfile)
frontend/        Site React (src/, scripts/, Dockerfile, vercel.json)
docs/            architecture/, adr/, development/, quality/, operations/, content/, project/
tools/           browser_smoke.py (vérifications navigateur manuelles)
.github/         workflows/ci.yml, copilot-instructions.md, instructions/, agents/, dependabot.yml
compose.yaml     environnement de développement
.env.example     variables de Docker Compose
```

## 8. Prérequis
Docker et Docker Compose v2 ; Git ; VS Code (recommandé). Pour travailler sans Docker : Python 3.12, Node.js ≥ 22.22 et PostgreSQL 16.

## 9. Installation de Docker
Suivre la documentation officielle : https://docs.docker.com/get-docker/ . Vérifier : `docker --version` et `docker compose version`.

## 10. Configuration des variables d'environnement
```bash
cp .env.example .env
```
Renseigner `POSTGRES_PASSWORD` (caractères sûrs dans une URL) et `DJANGO_SECRET_KEY` (`python3 -c "import secrets; print(secrets.token_urlsafe(50))"`). Ne jamais versionner `.env`. Hors Docker : `backend/.env.example` et `frontend/.env.example`. Les variables `VITE_*` sont publiques.

## 11. Démarrage du projet
```bash
docker compose up --build -d
docker compose ps
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py seed_demo
```
Les journaux : `docker compose logs -f`. Arrêt : `docker compose down`.

## 12. Accès au frontend
http://localhost:5173

## 13. Accès au backend
API : http://localhost:8000/api/v1/ · documentation : http://localhost:8000/api/docs/ · santé : http://localhost:8000/api/v1/health/

## 14. Accès à Django Admin
http://localhost:8000/admin/ (après la création du compte, section 16).

## 15. Exécution des migrations
```bash
docker compose exec backend python manage.py migrate
```
Jamais automatique. Après une modification de modèle : `docker compose exec backend python manage.py makemigrations`,

## 16. Création du compte administrateur
```bash
docker compose exec backend python manage.py createsuperuser
```

## 17. Exécution des tests frontend
```bash
docker compose exec frontend npm test
docker compose exec frontend npm run test:coverage
```

## 18. Exécution des tests backend
```bash
docker compose exec -e DJANGO_SETTINGS_MODULE=config.settings.test backend python manage.py test
```

## 19. Contrôles de qualité
```bash
docker compose exec backend ruff check . && docker compose exec backend ruff format --check .
docker compose exec backend python manage.py makemigrations --check --dry-run
docker compose exec backend python manage.py spectacular --validate --fail-on-warn --file /tmp/schema.yml
docker compose exec frontend npm run lint
docker compose exec frontend npm run format:check
docker compose exec frontend npm run typecheck
docker compose exec frontend npm run build && docker compose exec frontend npm run check:prerender
```
La CI (`.github/workflows/ci.yml`) exécute ces contrôles. Rapport de validation : `docs/quality/testing.md`.

## 20. Commandes Docker utiles
`docker compose ps` · `docker compose logs -f backend` · `docker compose exec backend bash` · `docker compose exec db sh -c 'psql -U $POSTGRES_USER $POSTGRES_DB'` · `docker compose build --no-cache` · `docker compose restart frontend`.

## 21. Réinitialisation de l'environnement local
```bash
docker compose down -v          # supprime la base et node_modules
docker compose up --build -d
docker compose exec backend python manage.py migrate
```

## 22. Fonctionnement de l'API
Lecture seule publique (solutions, services, réalisations, articles), pagination, filtres, erreurs au format `{"error": {...}}`, dépôt de contact limité à 5 par heure et par IP. Détail : `docs/architecture/api.md`.

## 23. Stratégie SEO
Pré-rendu statique au build (React Router `ssr: false` + `prerender`), métadonnées par page, sitemap, robots.txt, vérification automatisée, reconstruction à chaque publication (Deploy Hook). Détail et limites (soft 404) : `docs/architecture/seo.md`.

## 24. Gestion des contenus
Les éditeurs saisissent les contenus dans Django Admin : statut « Publié » (ou date future pour planifier). La publication relance le build du site. Les contenus de démonstration (`is_demo`) ne doivent jamais être publiés : `npm run check:prerender -- --forbid-demo` échoue s'il en reste. Informations à valider : `docs/content/content-register.md`.

## 25. Règles de sécurité
Aucun secret dans le code ni dans `VITE_*` ; permissions DRF explicites ; validation serveur ; CORS restreint ; limitation de débit ; honeypot ; `DEBUG=False` en production. Points ouverts (CSP, 2FA admin, cache partagé) : `docs/architecture/security.md`.

## 26. Préparation au déploiement
Vercel (frontend) + Render (API et PostgreSQL), domaine chez Hostinger. Variables, commande de démarrage et différences avec le développement : `docs/operations/docker.md`. **Ne pas déployer avant** validation des contenus, de la sécurité et des tests, et vérification des conditions actuelles des offres choisies.