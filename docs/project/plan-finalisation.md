# Plan de finalisation JACIGREEN

Mis à jour le 24 octobre 2026 après la séparation des contenus institutionnels
et des catalogues API. Les modifications restent locales ; aucun commit,
push ou déploiement n’a été effectué.

## État actuel

| Sujet | État |
|---|---|
| Contenu éditorial | Accueil et À propos raccourcis ; répétitions réduites. |
| Solutions, Services, Réalisations, Actualités | API Django comme source unique côté frontend ; copies statiques supprimées ; états vides présents. |
| Données locales | 20 fiches publiées mais `is_demo=true` : 3 solutions, 8 services, 6 réalisations, 3 articles. Aucune promotion. |
| URL canonique | URL Compose `localhost` uniquement en développement. Domaine public définitif inconnu ; `VITE_SITE_URL` est obligatoire et le garde-fou production refuse les hôtes locaux. |
| Sécurité API production | Django impose `DEBUG=False` et HTTPS en production ; hôtes, origines CORS/CSRF, secret et URLs réels restent à configurer. |
| Frontend | Format, typecheck, lint, 64 tests, build et pré-rendu local réussis dans le conteneur existant. |
| Backend | Ruff, checks, migrations, OpenAPI et 47 tests réussis dans le conteneur existant. |
| Contrôle strict | Échec sur 46 blocages attendus : domaine, canoniques locales et fiches démo. |
| Reconstruction Docker | Échec DNS lors de `pip install` de Django ; nouvelle image non construite. |
| Navigateur | 70 vérifications responsive sans débordement ni erreur JavaScript ; 15 liens internes HTTP 200 ; menu mobile testé. |
| Maquettes Stitch | Pas de comparaison pixel à pixel effectuée. |

## Ordre des actions restantes

### P0 — Prérequis avant production

1. Rétablir l’accès DNS/réseau depuis Docker au dépôt Python puis rejouer
   `docker compose up -d --build`.
2. Obtenir les URL définitives du site et de l’API. Configurer explicitement
   `VITE_SITE_URL`, `VITE_API_URL`, `API_INTERNAL_URL`,
   `DJANGO_ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS` et
   `CSRF_TRUSTED_ORIGINS`. Ne pas deviner de domaine.
3. Faire valider chaque fiche API existante ou saisir le contenu corrigé dans
   Django Admin. Garder `is_demo=true` jusqu’à confirmation ; ne pas lancer une
   promotion en masse.
4. Après validation des données et des variables, reconstruire puis exécuter
   `npm run check:prerender -- --production --forbid-demo`.
5. Obtenir et vérifier les mentions légales, la politique de confidentialité,
   les conditions d’utilisation et les coordonnées publiques.

### P1 — Contenus et direction artistique

1. Fournir des photographies institutionnelles et les visuels API avec textes
   alternatifs approuvés ; conserver les placeholders jusque-là.
2. Réaliser une comparaison visuelle page par page aux captures Stitch après
   configuration du navigateur et des contenus définitifs.

## Contrôles déjà exécutés

Les commandes et résultats précis sont consignés dans
[`rapport-finalisation.md`](./rapport-finalisation.md) et
[`quality/testing.md`](../quality/testing.md). Les conteneurs testés étaient
ceux déjà présents ; la reconstruction interrompue par DNS ne les a pas
remplacés.
