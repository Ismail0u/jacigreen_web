# Tests et contrôles de qualité

## Commandes du projet

Depuis la racine, avec Docker Compose :

| Domaine | Commande |
|---|---|
| Backend lint/format | `docker compose exec backend ruff check .` puis `docker compose exec backend ruff format --check .` |
| Backend configuration | `docker compose exec backend python manage.py check` |
| Backend migrations | `docker compose exec backend python manage.py makemigrations --check --dry-run` |
| Backend OpenAPI | `docker compose exec backend python manage.py spectacular --validate --fail-on-warn --file /tmp/schema.yml` |
| Backend tests | `docker compose exec -T backend sh -c 'DJANGO_SETTINGS_MODULE=config.settings.test python manage.py test'` |
| Frontend format/types/lint/tests | `docker compose exec frontend npm run format:check`, `npm run typecheck`, `npm run lint`, `npm test` |
| Build/pré-rendu local | `docker compose exec frontend npm run build` puis `npm run check:prerender` |
| Contrôle strict production | `docker compose exec frontend npm run check:prerender -- --production --forbid-demo` |

`VITE_SITE_URL` doit être explicitement défini. Les URL locales configurées par
Compose et dans `frontend/.env.example` sont réservées au développement. Le mode
`--production` exige une URL HTTPS non locale ; `--forbid-demo` refuse les fiches
`is_demo=true` et les marqueurs de démonstration rendus.

## Résultats vérifiés le 24 octobre 2026

| Contrôle | Résultat |
|---|---|
| Frontend `format:check` | Réussi |
| Frontend `typecheck` | Réussi |
| Frontend `lint` | Réussi, aucune règle désactivée |
| Frontend `npm test` | 12 fichiers, 64 tests réussis |
| Frontend `build` | Réussi dans le conteneur frontend déjà présent |
| `check:prerender` | Réussi ; 13 URL de sitemap, HTML, métadonnées, canoniques locales de développement, `robots.txt` et fallback vérifiés |
| `check:prerender -- --production --forbid-demo` | Échec strict sur 46 problèmes : URL publique HTTPS absente, 14 canoniques locales, 20 fiches `is_demo=true`, 11 pages avec marqueur visible. Ces blocages ne sont pas masqués. |
| Backend Ruff lint/format | Réussi ; 60 fichiers déjà formatés |
| `manage.py check` | Réussi, aucun problème |
| `makemigrations --check --dry-run` | Réussi, aucune migration manquante |
| Schéma OpenAPI | Réussi avec `--fail-on-warn` |
| Backend Django tests | 47 tests réussis |
| `DJANGO_SETTINGS_MODULE=config.settings.production python manage.py check --deploy` | Code de sortie 0 ; avertissement `security.W021` car HSTS preload est désactivé en attendant la validation du domaine. La commande utilisait les variables Compose de développement, pas des valeurs de production réelles. |
| Vérification base de démonstration | 20/20 fiches publiées ont `is_demo=true` ; 0 fiche non-démo |
| Navigateur | 14 routes × 5 largeurs = 70 vérifications : pas de débordement horizontal, exactement un `<h1>`, canonique et aucun lien vide |
| Liens internes | 15 destinations uniques vérifiées, toutes HTTP 200 |
| Console navigateur | Aucune erreur JavaScript ou console observée |
| Menu mobile | Ouverture et fermeture par Échap vérifiées à 360 px après hydratation |
| `git diff --check` | Réussi |

Revalidation frontend effectuée le 25 octobre 2026 après la dernière réduction
éditoriale : `format:check`, `typecheck`, `lint`, 12 fichiers/64 tests,
`build` et `check:prerender` local ont tous réussi. `docker compose config
--quiet` et un nouveau `git diff --check` ont également réussi.

Le 25 octobre 2026, les routes de détail ont été imbriquées sous des routes de
catalogue avec `loader` et `clientLoader` parent afin que le pré-rendu fonctionne
même lorsque l'API ne publie encore aucune fiche. Validation après ce
changement : format, typecheck, lint et 12 fichiers/64 tests réussis ; build et
`check:prerender` réussis avec les contenus de l'API locale (13 URL de sitemap,
dont 3 solutions et 3 articles). Un build et un contrôle de pré-rendu ont aussi
réussi avec un serveur API simulé renvoyant des catalogues vides (7 URL de
sitemap, aucune route de détail). Le test vide valide le build/pré-rendu, pas
l'expérience navigateur avec une API de production vide.

Les messages Django de type 404, 403, 429 et échec réseau apparus pendant les
tests proviennent des scénarios négatifs attendus ; aucune suite n’a échoué.
L’avertissement `security.W021` est distinct d’un échec de test. Le domaine
réel n’étant pas confirmé, HSTS preload reste désactivé.

## Reconstruction Docker

`docker compose up -d --build` a été relancé, mais **n’a pas réussi**. Pendant
`pip install -r requirements/dev.txt`, Docker n’a pas pu résoudre l’hôte du
dépôt de paquets (`Temporary failure in name resolution`) après cinq
réessais ; pip a terminé par `Could not find a version that satisfies the
requirement Django==5.2.18`. Le build backend a échoué, puis le build frontend a
été annulé.

Les commandes de validation ont utilisé les conteneurs déjà existants, toujours
en fonctionnement après l’échec ; elles ne certifient pas une image Docker
fraîchement reconstruite. Le build frontend Vite exécuté dans ce conteneur
existant a, lui, réussi.

## Non exécuté ou non certifié

- Le domaine de production étant inconnu et les données étant encore des
  démonstrations, le contrôle strict n’est pas passé : le site n’est pas prêt
  pour la production.
- L’API n’a pas été vidée pour tester les états vides en navigateur. Les pages
  contiennent des branches `ContentPending` pour ces cas.
- La comparaison pixel à pixel par route avec les captures Stitch n’a pas été
  effectuée.
- Aucune migration, modification de modèle, de serializer ou d’endpoint backend
  n’a été nécessaire.
- Aucun formulaire n’a été envoyé pendant les contrôles navigateur.
