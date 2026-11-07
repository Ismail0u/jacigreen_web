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

## Résilience API et chargement

Le client centralisé applique un délai maximal de 20 secondes aux GET et de
10 secondes aux POST, configurable par requête. Les GET peuvent être retentés
une seule fois après une erreur réseau ou HTTP 502, 503 ou 504 ; les timeouts,
les autres statuts et les POST ne sont pas rejoués. L'annulation du demandeur
est préservée. Les réponses JSON illisibles sont signalées comme erreurs et ne
sont pas converties en listes ou objets vides. Les pages DRF et leurs liens
sont validés ; un cycle de pagination échoue explicitement.

Pendant une navigation API, le layout annonce le chargement. En cas d'échec, il
conserve l'en-tête et le pied de page, distingue une ressource introuvable d'une
panne temporaire et propose une reprise pour les erreurs réessayables. Un état
squelette accessible accompagne la nouvelle tentative. Un catalogue vide reste
distinct d'une erreur de chargement.

## Résultats vérifiés le 7 novembre 2026

| Contrôle | Résultat |
|---|---|
| Frontend `format:check` | Réussi |
| Frontend `typecheck` | Réussi |
| Frontend `lint` | Réussi, aucune règle désactivée |
| Frontend `npm test` | 15 fichiers, 83 tests réussis |
| Frontend `build` | Réussi dans le conteneur frontend existant avec `API_INTERNAL_URL=http://backend:8000`, `VITE_SITE_URL=https://jacigreen-web-rho.vercel.app` et `VITE_API_URL=https://jacigreen-web.onrender.com` |
| `check:prerender` | Réussi ; HTML, métadonnées, canoniques, sitemap, `robots.txt` et fallback contrôlés |
| `check:prerender -- --production --forbid-demo` | Réussi avec `VITE_SITE_URL=https://jacigreen-web-rho.vercel.app`, `VITE_API_URL=https://jacigreen-web.onrender.com` et l’API locale correspondante |
| Backend Ruff lint/format | Réussi ; 60 fichiers déjà formatés |
| `manage.py check` | Réussi, aucun problème |
| `makemigrations --check --dry-run` | Réussi, aucune migration manquante |
| Schéma OpenAPI | Réussi avec `--fail-on-warn` |
| Backend Django tests | 47 tests réussis |
| `DJANGO_SETTINGS_MODULE=config.settings.production python manage.py check --deploy` | Code de sortie 0 ; avertissement `security.W021` car HSTS preload est désactivé. La commande utilisait les variables Compose de développement, pas des valeurs de production réelles. |
| Vérification des listes API locale et distante | 20 fiches et slugs concordants ; toutes `is_demo=false` dans les deux API |
| Navigateur responsive | 11 routes × 10 largeurs (320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920 px), soit 110 vérifications sans débordement horizontal, avec un `<h1>` par route et sans erreur JavaScript |
| Détail inexistant | Les routes solution/article affichent l’état « Contenu introuvable » et ne proposent pas de retry pour un 404 |
| Interactions | Menu mobile s’ouvre et ferme avec Échap ; filtre Niger réduit le catalogue à ses 2 projets ; validation contact signale les champs invalides et ne déclenche aucun POST |
| Carrousel | Contrôles restent visibles à 320 px ; les trois images se chargent ; réduction des animations et contrôles clavier couverts par tests |
| Mentions légales | Page de travail rendue dans le navigateur à 320, 390, 768 et 1440 px : un seul `<h1>`, aucun débordement horizontal ; `noindex` confirmé par le contrôle de pré-rendu |
| Formulaire de contact — sécurité | Revue de sécurité dédiée : aucune vulnérabilité identifiée dans le périmètre revu. Tests frontend/backend couvrent validation, consentement, honeypot, rate limiting, écriture seule et erreurs |
| Mesure de bundle | `entry.client` : 403,47 kB (122,57 kB gzip) ; formulaire : 121,94 kB (37,81 kB gzip) ; police Material Symbols : 1 138,40 kB. Aucun audit Lighthouse/Core Web Vitals n’a été exécuté |
| Build distant Render | Connexion sortante vers Render expirée depuis le conteneur ; les vérifications faites depuis l’hôte répondent HTTP 200. Pré-rendu et build ont été validés sur l’API locale dont les slugs et statuts correspondent à ceux de l’API distante |
| Liens internes | 15 destinations uniques ont été vérifiées historiquement, toutes HTTP 200 |
| `git diff --check` | Réussi |

Le 7 novembre 2026, `format:check`, `typecheck`, `lint`, 15 fichiers/83 tests,
`build`, `check:prerender` et le contrôle strict ont réussi dans les conteneurs
existants. `git diff --check` passe également.

Les routes de détail sont imbriquées sous des routes de catalogue avec `loader`
et `clientLoader` parent afin que le pré-rendu reste viable avec des catalogues
vides. Les changements de slug invalident le contexte parent ; des tests ciblés
et des parcours navigateur liste → fiche → liste → autre fiche vérifient ce
comportement.

Les messages Django de type 404, 403, 429 et échec réseau apparus pendant les
tests proviennent des scénarios négatifs attendus ; aucune suite n’a échoué.
L’avertissement `security.W021` est distinct d’un échec de test. HSTS preload
reste désactivé ; confirmer la couverture des sous-domaines et la configuration
HTTPS de production avant de l’activer.

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

- La configuration réelle Vercel/Render (origines CORS/CSRF, hôtes et variables)
  n’a pas été inspectée.
- L’API n’a pas été vidée pour tester les états vides en navigateur. Les pages
  contiennent des branches `ContentPending` pour ces cas.
- La comparaison pixel à pixel par route avec les captures Stitch n’a pas été
  effectuée.
- Aucun formulaire valide n’a été envoyé en navigateur ; seul le refus de
  données invalides sans requête POST a été testé.
