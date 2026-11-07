# Rapport de finalisation — contenu, sources et validation

**État :** corrections frontend réalisées ; non prêt pour production. Les
catalogues sont alimentés par l’API uniquement. L’API locale expose 20 fiches
issues du seed avec `is_demo=false`, conformément à l’autorisation du
propriétaire ; les réserves sur les dates techniques, études et projections
restent documentées. Les URL publiques communiquées répondent en HTTP 200 et
le pré-rendu de production est validé. Plusieurs informations juridiques
restent à fournir.

## Reprise UX/API — changements et contrôles de cette révision

- Le client API distingue les erreurs réseau, les délais dépassés et les
  réponses illisibles. Les GET expirent à 20 s et retentent une seule fois
  après une erreur réseau ou HTTP 502/503/504 ; les délais dépassés ne sont pas
  rejoués. Les POST expirent à 10 s et ne sont jamais rejoués.
- Les réponses paginées et leurs liens sont validés ; les cycles de pagination
  sont détectés.
- Les layouts Solutions et Actualités rechargent leurs données lorsqu’un slug
  enfant change, afin que le contexte transmis aux fiches soit à jour.
- Le hero de l’accueil utilise un seul `<h1>` partagé entre les vues mobile et
  desktop ; le carrousel mobile respecte les préférences de mouvement.
- Les pages conservent le cadre du site en cas d’erreur de chargement, exposent
  une action de reprise et montrent un squelette pendant celle-ci. Les
  chargements de navigation ont un indicateur accessible.
- Les titres principaux et les titres de sections de l’accueil utilisent les
  nouveaux tokens fluides ; les valeurs restent centralisées dans
  `frontend/src/styles/tokens.css`.
- Le hero de l’accueil utilise une photo locale fournie dans le dépôt. Un
  dérivé WebP de 1800 × 1350 px (321 246 octets) a été généré ; le fichier
  source de 6 759 204 octets n’a pas été modifié. Le hero réutilise les photos
  locales du dépôt ; leur provenance individuelle n’a pas été revérifiée dans
  cette reprise et aucun nouveau média n’a été ajouté.
- Fichiers modifiés pour cette reprise : `frontend/src/services/api/client.ts`,
  `frontend/src/services/api/client.test.ts`,
  `frontend/src/components/ui/RouteStatus.tsx`,
  `frontend/src/components/ui/PageHeader.tsx`,
  `frontend/src/layouts/site-layout.tsx`, `frontend/src/root.tsx`,
  `frontend/src/routes/home.tsx`, `frontend/src/routes/solution-detail.tsx`,
  `frontend/src/routes/article-detail.tsx`, `frontend/src/content/media.ts`,
  `frontend/src/styles/app.css`, `frontend/src/styles/tokens.css`,
  `frontend/public/images/README.md`,
  `frontend/public/images/jacigreen-biofertilisant-niger.webp`,
  `docs/architecture/design-system.md`, `docs/quality/testing.md` et le
  présent rapport. Aucun changement backend.

| Contrôle sur cette révision | Résultat |
|---|---|
| `git diff --check` | Réussi |
| `npm run format:check`, `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, `npm run check:prerender` | Rejoués dans le conteneur frontend ; résultats détaillés ci-dessous. |
| Vérification des problèmes de l’éditeur | Non collectée ; le build Vite/Tailwind et les validations TypeScript ont réussi. |
| Vérification navigateur de cette révision | Routes SPA Solutions et Actualités, ainsi que l’accueil mobile/desktop, vérifiés ; détails ci-dessous. |

Le contrôle de production avec `--production --forbid-demo` a été rejoué après
communication des URL publiques ; il passe avec l’API locale, dont les slugs
et valeurs `is_demo` correspondent à ceux de l’API distante.

## Modifications réalisées

- Raccourcissement des pages Accueil et À propos ; suppression des répétitions
  sur l’origine des textes, des formulations passe-partout et des copies
  statiques de solutions, services, projets et actualités.
- Utilisation exclusive de l’API Django pour les listes et détails de
  solutions, services, réalisations et actualités. Les pages affichent un état
  vide quand la liste API est vide. L’accueil présente les sélections API.
- Conservation dans le frontend des contenus institutionnels qui ne sont pas
  gérés par un endpoint catalogue : positionnement, mission et vision proposées,
  valeurs, biographie, distinctions, culture, perspectives, identité et chiffres
  historiques avec réserve.
- Le bandeau de démonstration est réservé aux entrées `is_demo=true` et ne les
  qualifie pas de fausses informations ; il n’apparaît pas pour les 20 fiches
  locales actuelles, toutes `is_demo=false`.
- `VITE_SITE_URL` est obligatoire côté frontend ; le sitemap échoue si cette
  valeur manque. Le contrôle `--production` refuse une URL locale ou non HTTPS.
  Les URL publiques communiquées ont été utilisées pour le contrôle de
  production, sans modifier la configuration de déploiement. `VITE_API_URL`
  doit contenir l’origine de l’API, sans `/api/v1/`. CORS et CSRF restent
  limités aux origines explicitement configurées ; les paramètres production
  Django imposent `DEBUG=False` et HTTPS.
- Mise à jour du registre éditorial, de la matrice, de la documentation SEO et
  déploiement, du README et du présent rapport.
- Aucun champ, serializer, endpoint, modèle, migration ou statut de données
  backend n’a été modifié. Aucun enregistrement n’a été promu.

## Vérification des données API

Commandes de lecture seule exécutées sur l’API locale : liste paginée des
ressources Solutions, Services, Réalisations et Articles.

| Catégorie | Nombre | État observé |
|---|---:|---|
| Solutions | 3 | toutes `is_demo=false` |
| Services | 8 | toutes `is_demo=false` |
| Réalisations | 6 | toutes `is_demo=false` |
| Articles | 3 | toutes `is_demo=false` |
| **Total** | **20** | **20 fiches API non-démo** |

Les slugs et la correspondance individuelle avec les §§6, 11, 12, 14 et 15
sont consignés dans [`../content/content-register.md`](../content/content-register.md).
Le cahier des charges autorise l’utilisation des contenus issus du seed. Les
réserves sur les dates créées automatiquement, les études, projections et
performances restent indiquées dans le registre.

## Résultats des contrôles

| Contrôle | Résultat réel |
|---|---|
| Vercel `Invalid route exports ... loader` | Corrigé dans le code : les loaders de fiches sont portés par les parents toujours pré-rendus ; les `clientLoader` parent servent les chemins de détail non pré-rendus. La correction doit être fusionnée dans la branche suivie par Vercel ; aucun déploiement n’a été déclenché. |
| Frontend `npm run format:check` | Réussi |
| Frontend `npm run typecheck` | Réussi |
| Frontend `npm run lint` | Réussi |
| Frontend `npm test` | Réussi : 15 fichiers, 83 tests |
| Frontend `npm run build` | Réussi dans le conteneur frontend existant ; build client/serveur et pré-rendu produits |
| Frontend `npm run check:prerender` | Réussi : HTML, métadonnées, canoniques de développement, sitemap, robots et fallback contrôlés |
| Frontend `npm run check:prerender -- --production --forbid-demo` | Réussi avec les URL communiquées et l’API locale ; aucune erreur de canonique ou de marqueur démo. Les slugs et valeurs `is_demo` des 20 ressources correspondent à l’API distante. |
| Frontend build utilisant directement l’API Render distante | Échec dans le conteneur par dépassement du délai de connexion à `jacigreen-web.onrender.com:443` ; les appels de vérification effectués depuis l’hôte répondent HTTP 200. Build relancé avec l’API locale équivalente, sans déploiement. |
| Backend `ruff check .` / `ruff format --check .` | Réussis : aucune erreur ; 60 fichiers déjà formatés |
| Backend `python manage.py check` | Réussi : aucun problème |
| Backend `makemigrations --check --dry-run` | Réussi : aucune migration manquante |
| Backend `spectacular --validate --fail-on-warn` | Réussi : aucun avertissement OpenAPI |
| Backend `python manage.py test` | Réussi : 47 tests |
| Django `config.settings.production` avec `manage.py check --deploy` | Code de sortie 0 ; avertissement `security.W021` car HSTS preload est désactivé. La commande a utilisé l’environnement Compose de développement, pas un environnement réel de production ; confirmer la couverture des sous-domaines avant d’activer le preload. |
| Étape antérieure — revalidation frontend après la réduction des mentions légales | À cette étape : format, typecheck, lint, 12 fichiers/64 tests, build et contrôle de pré-rendu local réussis. Les validations les plus récentes sont résumées en tête du rapport. |
| Vercel `Invalid route exports ... loader` (reproduction/correction) | Les routes de détail exportaient un loader et n'étaient valides que si leurs slugs étaient présents dans les chemins pré-rendus. Les loaders ont été déplacés sur les parents toujours pré-rendus, avec un clientLoader pour les chemins dynamiques hors du pré-rendu. Lors de cette correction : typecheck, lint, 64 tests, build et contrôle réussis avec API locale peuplée ; build/contrôle également réussis avec API simulée vide. |
| `docker compose config --quiet` | Réussi |
| Contrôle final `git diff --check` | Réussi |
| Navigateur : SPA Solutions et Actualités | Liste → fiche, fiche → liste et fiche → autre fiche vérifiés ; les titres correspondent aux slugs, aucune erreur JavaScript. |
| Navigateur : accueil (320, 390, 768, 1024 et 1440 px) | Un seul `<h1>` visible ; carrousel seulement sous 1024 px ; aucune largeur avec débordement ; commandes visibles à 320 px ; les trois photos se chargent ; aucune erreur JavaScript. |
| Navigateur : 14 routes × 5 largeurs (360, 390, 768, 1024, 1440 px) | 70 vérifications historiques : canonique présente, aucun débordement horizontal ni lien vide. |
| Navigateur : liens internes | 15 destinations uniques vérifiées ; toutes répondent HTTP 200 |
| Navigateur : erreurs JavaScript/console | Aucune erreur observée sur les 70 ouvertures de pages |
| Navigateur : menu mobile | Ouverture et fermeture par Échap vérifiées après hydratation à 360 px |
| `git diff --check` | Réussi |
| Tests de build catalogue après correction | Réussis avec l’API locale peuplée (3 solutions, 3 articles), et avec une API simulée vide (7 URL de sitemap, aucune route détail) ; `check:prerender` passe dans les deux scénarios. |
| Santé des services existants après l’échec Docker | Frontend HTTP 200 ; backend `/api/v1/health/` HTTP 200 ; les trois conteneurs restent en fonctionnement |
| Comparaison pixel à pixel avec les maquettes Stitch | Non exécutée ; les résultats navigateur ne prouvent pas une fidélité visuelle pixel à pixel |
| États vides avec une API réellement vide | Non exercés dans le navigateur ; l’API locale contient 20 fiches publiées et les branches d’état vide restent présentes dans les pages. |
| Déploiement Vercel | Non exécuté depuis ce workspace ; la correction doit être poussée/fusionnée dans la branche configurée par le projet Vercel avant de pouvoir vérifier le déploiement. |

Les messages 404, 403, 429 et d’échec réseau observés dans les journaux de
tests Django correspondent à des scénarios négatifs testés ; les 47 tests sont
passés.

La configuration de production impose `DEBUG=False`, HTTPS et les cookies
sécurisés. HSTS preload reste désactivé ; confirmer la couverture des
sous-domaines avant activation. Les URL publiques répondent, mais les
paramètres d’hôtes autorisés et les origines CORS/CSRF réels n’ont pas été
inspectés dans Vercel/Render.

## Reconstruction Docker — échec réel

Commande relancée :

```text
docker compose up -d --build
```

Résultat : échec après environ 252 secondes. Pendant
`pip install -r requirements/dev.txt`, pip a réessayé cinq fois de résoudre
`/simple/django/` et a reçu `Temporary failure in name resolution`, puis
`Could not find a version that satisfies the requirement Django==5.2.18`.
L’étape backend `RUN pip install -r requirements/dev.txt` a échoué avec le code
1 ; la construction frontend a été annulée. **La reconstruction d’image et le
redémarrage à partir des nouvelles images n’ont pas réussi.** Les validations
frontend ci-dessus ont utilisé le conteneur existant et son volume de code.

## Fichiers touchés pour cette reprise

- Frontend : `.env.example`, `scripts/check-prerender.mjs`,
  `scripts/generate-sitemap.mjs`, `src/components/ui/DemoNotice.tsx`,
  `src/content/institutional.ts`, `src/lib/env.ts`, `src/lib/env.test.ts`,
  `src/routes/about.tsx`, `contact.tsx`, `home.tsx`, `legal.tsx`, `news.tsx`,
  `projects.tsx`, `services.tsx`, `solutions.tsx`.
- Documentation : `README.md`, `docs/architecture/seo.md`,
  `docs/content/content-register.md`, `docs/operations/docker.md`,
  `docs/project/audit-qualite-site.md`, `matrice-contenu.md`,
  `plan-finalisation.md`, `rapport-finalisation.md`,
  `docs/quality/testing.md`.
- Suivi de cette reprise : `frontend/src/services/api/client.ts`,
  `frontend/src/services/api/client.test.ts`,
  `frontend/src/services/api/content.ts`,
  `frontend/src/components/home/MobileHeroCarousel.tsx`,
  `frontend/src/components/home/MobileHeroCarousel.test.tsx`,
  `frontend/src/features/news/ArticleCard.tsx`,
  `frontend/src/features/projects/ProjectCard.tsx`,
  `frontend/src/features/solutions/SolutionCard.tsx`,
  `frontend/src/routes/home.tsx`,
  `frontend/src/routes/news-layout.tsx`,
  `frontend/src/routes/solutions-layout.tsx`,
  `frontend/src/routes/layout-revalidation.test.ts`,
  `docs/architecture/api.md`, `docs/content/content-register.md` et le
  présent rapport.

Des modifications préexistantes dans le worktree ont été préservées. Aucun
commit, push ni déploiement n’a été effectué.

## Blocages et actions manuelles

1. Rétablir le DNS/réseau Docker permettant d’accéder au dépôt de paquets, puis
   rejouer `docker compose up -d --build`. Ne pas considérer l’image actuelle
   comme reconstruite.
2. Vérifier la configuration réelle des environnements Vercel/Render :
   `VITE_SITE_URL=https://jacigreen-web-rho.vercel.app`,
   `VITE_API_URL=https://jacigreen-web.onrender.com` (sans `/api/v1`),
   `API_INTERNAL_URL`, `DJANGO_ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS` et
   `CSRF_TRUSTED_ORIGINS` en cohérence avec les hôtes réels.
3. Fournir les informations juridiques et les photos éditoriales manquantes.
4. Après vérification des variables de production dans Vercel/Render, relancer
   `npm run check:prerender -- --production --forbid-demo` avec ces valeurs.

La mise en production reste bloquée tant que ces conditions ne sont pas
satisfaites.
