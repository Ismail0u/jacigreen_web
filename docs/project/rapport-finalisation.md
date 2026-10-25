# Rapport de finalisation — contenu, sources et validation

**État :** corrections frontend réalisées ; non prêt pour production. Les
catalogues sont désormais alimentés par l’API uniquement. Les 20 fiches de la
base locale restent des démonstrations non validées. La reconstruction Docker
échoue encore sur la résolution DNS lors de l’installation Python.

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
- Mise à jour du bandeau de démonstration : les fiches sont qualifiées de
  « non validées comme contenu éditorial publiable », sans les qualifier à tort
  de fausses informations.
- `VITE_SITE_URL` est obligatoire côté frontend ; le sitemap échoue si cette
  valeur manque. Le contrôle `--production` refuse une URL locale ou non HTTPS.
  L’URL publique définitive n’étant pas connue, aucune valeur de production
  n’est inventée. CORS et CSRF restent limités aux origines explicitement
  configurées ; les paramètres production Django imposent `DEBUG=False` et
  HTTPS.
- Mise à jour du registre éditorial, de la matrice, de la documentation SEO et
  déploiement, du README et du présent rapport.
- Aucun champ, serializer, endpoint, modèle, migration ou statut de données
  backend n’a été modifié. Aucun enregistrement n’a été promu.

## Vérification des données API

Commande de lecture seule exécutée dans le backend : énumération des modèles
Solution, Service, Project et Article avec `slug`, `status`, `is_demo` et
`published_at`.

| Catégorie | Nombre | État observé |
|---|---:|---|
| Solutions | 3 | toutes `published`, `is_demo=true` |
| Services | 8 | toutes `published`, `is_demo=true` |
| Réalisations | 6 | toutes `published`, `is_demo=true` |
| Articles | 3 | toutes `published`, `is_demo=true` |
| **Total** | **20** | **20 démos, 0 contenu API non-démo** |

Les slugs et la correspondance individuelle avec les §§6, 11, 12, 14 et 15
sont consignés dans [`../content/content-register.md`](../content/content-register.md).
Les faits principaux recoupent le document autorisé, mais cela ne confirme pas
indépendamment l’état « publié », les champs éditoriaux ajoutés, les années de
certaines fiches ou les dates créées automatiquement par le seed. Aucune
commande de promotion n’a donc été exécutée. Le contrôle strict reste actif.

## Résultats des contrôles

| Contrôle | Résultat réel |
|---|---|
| Vercel `Invalid route exports ... loader` | Corrigé dans le code : les loaders de fiches sont portés par les parents toujours pré-rendus ; les `clientLoader` parent servent les chemins de détail non pré-rendus. La correction doit être fusionnée dans la branche suivie par Vercel ; aucun déploiement n’a été déclenché. |
| Frontend `npm run format:check` | Réussi après formatage des modifications |
| Frontend `npm run typecheck` | Réussi |
| Frontend `npm run lint` | Réussi après correction d’une erreur `no-deprecated` dans le nouveau test ; aucune règle désactivée |
| Frontend `npm test` | Réussi : 12 fichiers, 64 tests |
| Frontend `npm run build` | Réussi dans le conteneur frontend déjà présent ; build client/serveur et pré-rendu produits |
| Frontend `npm run check:prerender` | Réussi : 13 URL de sitemap, HTML, métadonnées, canoniques locales de développement, robots et fallback contrôlés |
| Frontend `npm run check:prerender -- --production --forbid-demo` | Échec attendu : 46 problèmes. 1 configuration de domaine public HTTPS, 14 canoniques locales, 20 enregistrements `is_demo=true`, 11 pages contenant le marqueur démo. Protection non contournée. |
| Backend `ruff check .` / `ruff format --check .` | Réussis : aucune erreur ; 60 fichiers déjà formatés |
| Backend `python manage.py check` | Réussi : aucun problème |
| Backend `makemigrations --check --dry-run` | Réussi : aucune migration manquante |
| Backend `spectacular --validate --fail-on-warn` | Réussi : aucun avertissement OpenAPI |
| Backend `DJANGO_SETTINGS_MODULE=config.settings.test python manage.py test` | Réussi : 47 tests |
| Django `config.settings.production` avec `manage.py check --deploy` | Code de sortie 0 ; avertissement `security.W021` car HSTS preload est désactivé. C’est intentionnel tant que le domaine n’est pas validé. La commande a utilisé l’environnement Compose de développement, pas un environnement réel de production. |
| Revalidation frontend après la réduction des mentions légales | Réussie : format, typecheck, lint, 12 fichiers/64 tests, build et contrôle de pré-rendu local |
| Vercel `Invalid route exports ... loader` (reproduction/correction) | Les routes de détail exportaient un loader et n'étaient valides que si leurs slugs étaient présents dans les chemins pré-rendus. Les loaders ont été déplacés sur les parents toujours pré-rendus, avec un clientLoader pour les chemins dynamiques hors du pré-rendu. Typecheck, lint, 64 tests, build et contrôle réussis avec API locale peuplée ; build/contrôle également réussis avec API simulée vide. |
| `docker compose config --quiet` | Réussi |
| Contrôle final `git diff --check` | Réussi |
| Navigateur : 14 routes × 5 largeurs (360, 390, 768, 1024, 1440 px) | 70 vérifications réussies : un `<h1>`, canonique présente, aucun débordement horizontal ni lien vide |
| Navigateur : liens internes | 15 destinations uniques vérifiées ; toutes répondent HTTP 200 |
| Navigateur : erreurs JavaScript/console | Aucune erreur observée sur les 70 ouvertures de pages |
| Navigateur : menu mobile | Ouverture et fermeture par Échap vérifiées après hydratation à 360 px |
| `git diff --check` | Réussi |
| Tests de build catalogue après correction | Réussis avec l’API locale peuplée (3 solutions, 3 articles), et avec une API simulée vide (7 URL de sitemap, aucune route détail) ; `check:prerender` passe dans les deux scénarios. |
| Santé des services existants après l’échec Docker | Frontend HTTP 200 ; backend `/api/v1/health/` HTTP 200 ; les trois conteneurs restent en fonctionnement |
| Comparaison pixel à pixel avec les maquettes Stitch | Non exécutée ; les résultats navigateur ne prouvent pas une fidélité visuelle pixel à pixel |
| États vides avec une API réellement vide | Non exercés dans le navigateur, car l’API locale contient les 20 fiches de démonstration ; les branches d’état vide sont présentes dans les pages |
| Déploiement Vercel | Non exécuté depuis ce workspace ; la correction doit être poussée/fusionnée dans la branche configurée par le projet Vercel avant de pouvoir vérifier le déploiement. |

Les messages 404, 403, 429 et d’échec réseau observés dans les journaux de
tests Django correspondent à des scénarios négatifs testés ; les 47 tests sont
passés.

La configuration de production impose `DEBUG=False`, HTTPS et les cookies
sécurisés. HSTS preload reste désactivé en attendant la confirmation du domaine.
Les noms d’hôtes de production et les origines CORS/CSRF n’ont pas été testés
contre des valeurs réelles, qui ne sont pas encore fournies.

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

Des modifications préexistantes dans le worktree ont été préservées. Aucun
commit, push ni déploiement n’a été effectué.

## Blocages et actions manuelles

1. Rétablir le DNS/réseau Docker permettant d’accéder au dépôt de paquets, puis
   rejouer `docker compose up -d --build`. Ne pas considérer l’image actuelle
   comme reconstruite.
2. Fournir les URL HTTPS définitives du site et de l’API ; définir
   `VITE_SITE_URL`, `VITE_API_URL`, `API_INTERNAL_URL`,
   `DJANGO_ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS` et `CSRF_TRUSTED_ORIGINS` en
   cohérence avec les hôtes réels.
3. Faire valider les 20 fiches une par une dans Django Admin ou les remplacer
   par des fiches éditoriales vérifiées ; ne pas simplement retirer `is_demo`.
4. Fournir les informations juridiques et les photos éditoriales manquantes.
5. Après ces actions, reconstruire et exécuter
   `npm run check:prerender -- --production --forbid-demo`.

La mise en production reste bloquée tant que ces conditions ne sont pas
satisfaites.
