# Plan de finalisation JACIGREEN

État établi par l'audit en lecture seule du 22 octobre 2026. Les statuts décrivent
le code observé, pas la validation éditoriale ou la préparation à la production.
Les contenus de l'API restent soumis à validation avant toute publication.

## 1. État des pages

| Page | Route | Maquette | État du code | Écarts principaux observés | Source des données |
|---|---|---|---|---|---|
| Accueil | `/` | `jacigreen_accueil_institutional` | incomplet | Hero avec média de remplacement, chaîne de valeur, Solutions, Réalisations et Actualités ; fidélité détaillée et contenus institutionnels à valider. | `src/content/site-copy.ts` et API (`solutions`, `projects`, `articles`) |
| À propos | `/a-propos` | `jacigreen_propos_notre_histoire` | incomplet | Introduction, chaîne de valeur et média de remplacement ; histoire et autres contenus de la maquette volontairement omis car non validés. | `src/content/site-copy.ts` ; document institutionnel interne |
| Solutions | `/solutions` | `jacigreen_nos_solutions` | incomplet | Liste API et état vide présents ; média de remplacement intégré ; sections éditoriales non validées omises. | API `GET /api/v1/solutions/` |
| Fiche solution | `/solutions/:slug` | `jacigreen_jacibiogaz_fiche_solution` | incomplet | Chargement API, contenu brut, SEO et média de remplacement présents ; composition plus simple que la maquette. | API `GET /api/v1/solutions/{slug}/` |
| Services (+ Formations) | `/services` | pas de maquette Services ; écran Formations destiné à une section | incomplet | Liste API présente ; section Formations affichée uniquement si une entrée publiée correspond. Aucun catalogue ni modèle `Training` ajouté. | API `GET /api/v1/services/` |
| Réalisations | `/realisations` | `jacigreen_exp_riences_r_alisations` | incomplet | Liste, filtre pays via `?pays=` et média de remplacement présents ; aucune fiche de réalisation dans le frontend (hors périmètre courant). | API `GET /api/v1/projects/` |
| Actualités | `/actualites` | `jacigreen_actualit_s_ressources` | incomplet | Liste, état vide et médias de remplacement présents ; statistiques, contenu non validé et newsletter de la maquette omis. | API `GET /api/v1/articles/` |
| Article | `/actualites/:slug` | aucune maquette | incomplet | Loader, SEO, rendu texte et média de remplacement présents ; présentation à harmoniser avec la maquette générale. | API `GET /api/v1/articles/{slug}/` |
| Contact | `/contact` | `jacigreen_contact` | incomplet | Formulaire avec validation Zod, erreurs serveur, succès et limite API ; coordonnées et liens annexes de la maquette non repris, car non documentés. | Formulaire vers `POST /api/v1/contact-requests/` |
| Mentions légales | `/mentions-legales` | `jacigreen_politiques_mentions_l_gales` | incomplet | Page neutre `noindex` sans texte juridique inventé ; structure détaillée différée jusqu'à validation juridique. | Texte statique neutre |
| Page introuvable | `*` | aucune maquette | existe | Page fonctionnelle avec lien d'accueil et `noindex` ; aucun changement fonctionnel requis. | Texte statique |

### Composants et socle

| Élément | État du code | Fichiers / constat |
|---|---|---|
| Navigation et pied de page | incomplet | `frontend/src/components/layout/Header.tsx`, `Footer.tsx` ; navigation mobile et Échap présents, mais logo officiel absent et présentation à harmoniser. |
| Composants UI partagés | existe | `frontend/src/components/ui/` : `Button`, `Badge`, `Container`, `DemoNotice`, `EmptyState`, `FormField`, `PageHeader`, `Prose`. |
| Média de remplacement | incomplet | `MediaFrame`, le registre `frontend/src/content/media.ts` et `frontend/public/images/README.md` existent ; aucun visuel réel n'est encore fourni. |
| API et loaders | existe | Services centralisés dans `frontend/src/services/api/`; le pré-rendu découvre les slugs d'articles et de solutions. |
| SEO et pré-rendu | existe | `buildMeta`, routes statiques/dynamiques, sitemap et contrôle `check-prerender` présents. |
| État du contenu | incomplet | `docs/content/content-register.md` existe désormais ; les validations éditoriales et les décisions de publication restent à obtenir. |
| Tests frontend | incomplet | Tests de composants, API, SEO et tokens présents ; test de non-référence d'images externes ajouté ; couverture de rendu des pages reste limitée. |
| Backend / données | existe | API versionnée, modèles éditoriaux, permissions explicites, seeds de brouillon/démo et tests présents. Aucune modification backend justifiée à ce stade. |
| Déploiement / CI | existe | Compose, CI et scripts de contrôle présents ; l'exécution des commandes reste à vérifier dans l'environnement de travail. |

## 2. Ordre d'exécution

Les cases cochées signalent un travail réalisé. « Existe », « incomplet » et
« manquant » qualifient l'état initial relevé pendant l'audit.

### Phase 1 — Audit

- [x] Lire les instructions, ADR, architecture, contenus, scripts, composants, routes, API et tests.
- [x] Relever la correspondance route / maquette / source de données.
- [x] Vérifier les médias locaux : aucun média de site fourni ; logo à fournir.

### Phase 2 — Plan

- [x] Consigner l'état des pages, composants, sources et écarts dans ce document.
- [x] Créer `docs/content/content-register.md` sans transformer un document interne en validation publique.

### Phase 3 — Conception et composants communs

- [x] Réutiliser les tokens, `buildMeta`, les services API, les loaders et les composants UI existants.
- [x] Créer `MediaFrame`, centraliser les emplacements dans `frontend/src/content/media.ts` et documenter les visuels à fournir dans `frontend/public/images/README.md`.
- [x] Remplacer les images conditionnelles des cartes et fiches par le composant média, sans URL externe ni emplacement cassé.
- [x] Ajouter un test Vitest interdisant les sources d'images externes dans les composants TSX.

### Phase 4 — Pages et cohérence

- [ ] Accueil — incomplet : rapprocher les sections de la maquette en conservant uniquement les contenus vérifiables.
- [ ] À propos — incomplet : harmoniser la structure ; ne pas publier mission, vision, valeurs ou histoire sans validation.
- [ ] Solutions et fiche — incomplet : intégrer les médias de remplacement et améliorer la hiérarchie visuelle sans inventer de données.
- [ ] Services et section Formations — incomplet : utiliser les contenus API validés ; ne créer ni catalogue fictif ni modèle `Training`.
- [ ] Réalisations — incomplet : conserver le filtre pays et améliorer la présentation sans publier d'exemples inventés.
- [ ] Actualités et article — incomplet : conserver les données API ; exclure chiffres, études, newsletter et contenus fictifs.
- [ ] Contact — incomplet : conserver les champs API, validation, honeypot, erreurs et confirmation ; omettre les coordonnées non documentées.
- [ ] Mentions légales, page introuvable et états vides/erreurs — incomplet / existe : vérifier les balises, le `noindex`, la navigation et la cohérence visuelle.
- [ ] Passe globale — vérifier accessibilité, navigation clavier, responsive, contraste, liens et absence de débordement.

### Phases 5–6 — Vérification et correction

- [x] Lint, format, types et tests frontend exécutés avec succès (8 fichiers, 57 tests).
- [ ] Build et `check:prerender` : bundles compilés, pré-rendu bloqué sur `/_.data` (ECONNREFUSED) ; contrôle HTML échoue faute de sortie pré-rendue.
- [ ] Si le backend change : exécuter Ruff, `makemigrations --check`, OpenAPI et les tests backend.
- [x] Rechercher les contenus et URL d'images interdits dans `frontend/src` ; seuls le test de garde et des pourcentages CSS génériques correspondent à la recherche textuelle.
- [x] Vérifier en navigateur 11 routes aux cinq largeurs demandées, le menu mobile/Échap et la validation locale du formulaire ; le build pré-rendu reste en échec.

### Phase 7 — Rapport

- [x] Rédiger `docs/project/rapport-finalisation.md` avec les pages, écarts, médias à fournir, décisions humaines, tests et limites constatés.

## 3. Décisions humaines et limites relevées

- Le document institutionnel est interne et sa publication est à confirmer ; son registre de validation référencé est absent.
- Décisions encore proposées dans `docs/adr/0003` : Formations en section Services, taxonomie Solutions/Produits et traitement du rachat informatif.
- La palette et le logo restent à valider (`docs/adr/0005`) ; aucun fichier logo exploitable n'est présent.
- Les textes juridiques, coordonnées publiques, date de mise en production et autorisation de publier le document institutionnel restent à fournir/valider.
- Les coordonnées, certifications, brevets, rendements, chiffres d'impact, études, noms de clients et contenus des visuels de maquettes ne sont pas des sources publiables.
- Le dépôt contient des modifications préexistantes dans `docs/adr/0005-palette-et-tokens.md`, `docs/architecture/api.md`, `docs/architecture/security.md`, `docs/development/contributing.md` et un fichier `COPILOT_START.md` non suivi ; ils n'ont pas été modifiés pendant l'audit.
