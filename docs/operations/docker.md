# Docker et environnements

## Services (`compose.yaml`, développement)
| Service | Image / cible | Port local | Rôle |
|---|---|---|---|
| `db` | `postgres:16-bookworm`, volume `db_data`, healthcheck `pg_isready` | 5433 (127.0.0.1) | PostgreSQL |
| `backend` | `backend/Dockerfile`, cible `dev` | 8000 | Django (`runserver`), code monté en volume |
| `frontend` | `frontend/Dockerfile`, cible `dev` | 5173 | `react-router dev`, volume `frontend_node_modules` |

Réseaux : `backend_net` (db, backend) et `frontend_net` (backend, frontend) : le frontend ne voit pas la base. `backend` attend `db` en bonne santé (`service_healthy`) **et** `entrypoint.sh` vérifie réellement la connexion. `frontend` attend `backend` en bonne santé.

## Commandes
```bash
cp .env.example .env                           # puis renseigner les valeurs
docker compose up --build -d                   # construire et démarrer
docker compose ps                              # état et santé
docker compose logs -f                         # journaux (ajouter un nom de service pour filtrer)
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py createsuperuser
docker compose exec backend python manage.py seed_demo      # contenus fictifs (développement)
docker compose exec -e DJANGO_SETTINGS_MODULE=config.settings.test backend python manage.py test
docker compose exec frontend npm test
docker compose down                            # arrêter (les données restent)
```
Reconstruire sans cache : `docker compose build --no-cache`. Réinitialiser TOUTES les données locales : `docker compose down -v` (supprime la base et `node_modules`) puis `docker compose up --build -d` et `migrate`.

Accès : frontend http://localhost:5173 · API http://localhost:8000/api/v1/ · documentation http://localhost:8000/api/docs/ · admin http://localhost:8000/admin/.

## Migrations
Jamais automatiques. Exécuter `migrate` explicitement après un `up` ou une mise à jour. Après une modification de modèle : `docker compose exec backend python manage.py makemigrations` puis relire et commiter le fichier.

## Développement vs production
| | Développement (Compose) | Production (prévue) |
|---|---|---|
| Frontend | `react-router dev` | Build statique pré-rendu hébergé par **Vercel** (pas d'image Docker) |
| Backend | `runserver`, `DEBUG=true` | Image `production` : Gunicorn, `DEBUG=False`, HTTPS forcé, WhiteNoise (statiques compressés) |
| Base | Conteneur PostgreSQL local | PostgreSQL managé (Render) avec sauvegardes |
| Secrets | `.env` local | Variables du fournisseur, jamais dans l'image |
| Médias | Disque local | Stockage objet (à faire : disque Render éphémère) |
| Migrations | Manuelles | Commande de pré-déploiement ou étape manuelle contrôlée |

## Variables de production
**Render (API)** : `DJANGO_SECRET_KEY`, `DJANGO_ALLOWED_HOSTS` (nom d’hôte
public de l’API, sans schéma), `DATABASE_URL`, `CORS_ALLOWED_ORIGINS` (origine
HTTPS exacte du site, sans joker), `CSRF_TRUSTED_ORIGINS` (origine HTTPS exacte
de l’API), `DRF_NUM_PROXIES=1`, `FRONTEND_DEPLOY_HOOK_URL`, `CACHE_URL` (cache
partagé recommandé en multi-workers). Les listes CORS/CSRF restent vides par
défaut et échouent donc de manière restrictive si elles ne sont pas configurées.
Commande de démarrage : celle de l'image (`gunicorn`). Vérifier les
caractéristiques et limites actuelles du plan choisi (mise en veille, durée de
vie de la base gratuite) avant de s'y engager.

**Vercel (site)** : `VITE_API_URL` (URL HTTPS publique de l'API),
`VITE_SITE_URL` (URL HTTPS publique définitive du site),
`API_INTERNAL_URL` (identique à `VITE_API_URL` : le build doit joindre l'API
publique). Définir ces valeurs explicitement dans l’environnement de production ;
ne pas réutiliser `localhost` des exemples Compose. Le domaine définitif n’étant
pas fourni, aucune URL n’est préremplie ici. Créer un Deploy Hook et le
renseigner côté Render. Contrôler
`npm run check:prerender -- --production --forbid-demo` avant la bascule.