# Audit qualité du site JACIGREEN

## Périmètre et méthode

Audit en lecture seule du code existant, des contrats et décisions du dépôt, du
registre éditorial, du document institutionnel complet (sections 1 à 24 et fiche
d'identité), des dix fichiers `code.html` Stitch et de leurs dix aperçus
`screen.png`. La maquette de système institutionnel `DESIGN.md` et les captures
de référence ont également été consultées. Un contrôle navigateur local a
parcouru les routes à 1 440 px de large ; la comparaison reste structurelle et
éditoriale, pas une mesure pixel à pixel. Les scores expriment la fidélité de la
composition observée, pas la qualité intrinsèque du code.

Les maquettes sont des références de composition, non des sources factuelles.
Le dépôt demande explicitement de ne pas reprendre leurs certifications,
brevets, rendements, coordonnées, études ni autres données inventées
([`design/README.md`](../../design/README.md)). Les informations internes du
document institutionnel ne sont pas automatiquement autorisées à la
publication.

## Mise à jour après reconstruction de l'interface

Le frontend conserve React, TypeScript, React Router et les contrats existants
de l'API. L'en-tête et le pied de page utilisent maintenant le PNG
`frontend/public/brand/jacigreen.png`, et les pages reprennent les utilitaires
typographiques, les couleurs et les espacements nommés de `stitch-theme.css`.
Les compositions sont plus proches des sections Stitch ; les données
institutionnelles manquantes sont signalées avec des blocs d'attente explicites,
pas remplacées par des affirmations des maquettes. Aucun visuel éditorial externe
n'a été ajouté.

La vérification navigateur a parcouru 11 routes (dont une fiche Solution et un
article) aux largeurs 360, 390, 768, 1 024 et 1 440 px : aucun débordement
horizontal n'a été observé après stabilisation du rendu. Le menu mobile a été
ouvert puis fermé par Échap ; les liens de catégories Solutions/Actualités
pointent vers des sections existantes. Une capture de l'accueil mobile a été
inspectée. Cela ne constitue pas une comparaison pixel à pixel de chaque route.
Les notes ci-dessous reflètent le code, les références HTML et ces contrôles
partiels.

Validation frontend au dernier contrôle : tests, types, lint et format passent.
Le build et le pré-rendu passent après configuration de Vite Preview sur
`127.0.0.1` ; la cause était un bind IPv6 `::1` alors que le client HTTP de
pré-rendu résolvait `localhost` vers IPv4. `check:prerender` valide les sorties
locales. Le contrôle strict de production détecte 45 problèmes : 14 canoniques
locales, 20 enregistrements API de démonstration et 11 pages avec leur
avertissement rendu. La véritable valeur de `VITE_SITE_URL` et des données
éditoriales approuvées sont requises avant publication.

## 1. État des lieux

- **Architecture conservée :** frontend React 19, TypeScript, Vite, React Router
  en mode framework avec pré-rendu statique ; backend Django 5.2 / DRF et
  PostgreSQL 16 ; déploiement séparé selon Docker Compose. Les décisions
  d'architecture sont décrites dans les [ADR](../adr/README.md). L'ADR 0003
  (périmètre Phase 1) reste à confirmer ; l'ADR 0005 enregistre désormais la
  palette exacte fournie et ses limites de contraste.
- **Frontend :** 11 déclarations de routes couvrant l'accueil, À propos,
  Solutions et fiches, Services, Réalisations, Actualités et articles, Contact,
  Mentions légales et le fallback 404. Les pages consomment les listes et fiches
  publiées de l'API au build ; le formulaire de contact est l'appel API
  interactif principal. Le layout partagé possède un lien d'évitement, un
  en-tête sticky, un menu mobile accessible et un pied de page.
- **Backend :** modèles Solutions, Services, Réalisations, Articles et demandes
  de contact ; l'API publique est versionnée sous `/api/v1/`. Les contenus sont
  publiés depuis Django Admin et les endpoints de lecture ne retournent que les
  éléments publiés dont la date de publication est atteinte. Les seeds
  `seed_demo` et `seed_institutional_draft` servent au développement ; le second
  marque explicitement tous ses éléments `is_demo=True`.
- **État éditorial :** le document de référence est
  [`docs/content/jacigreen-institutionnel.md`](../content/jacigreen-institutionnel.md),
  document interne v1.0 (2026), et non une autorisation de publication. Le
  [registre de validation](../content/content-register.md) ne présente aucun
  contenu comme « validé » : il distingue les éléments à confirmer, à valider,
  historiques, brouillons ou non publiables.
- **Rendu et blocage de livraison :** le build et le pré-rendu sont désormais
  réussis après la configuration IPv4 du Preview. Le contrôle local passe ;
  le contrôle strict de production bloque sur les canoniques Compose en
  `localhost` et sur les enregistrements de démonstration non validés.
- **Git au moment de l'audit :** branche
  `feature/core-backend-frontend`, alignée sur
  `origin/feature/core-backend-frontend`. Aucun changement suivi n'est présent ;
  `COPILOT_START.md` est le seul fichier non suivi observé. Il a été laissé
  intact. Le logo PNG est suivi par Git.

## 2. Routes et comparaison maquette / code

| Route | Maquette de référence | Code observé et écarts concrets | Fidélité |
|---|---|---|---:|
| `/` | [`accueil/code.html`](../../design/stitch/jacigreen_accueil_institutional/code.html) et [`screen.png`](../../design/stitch/jacigreen_accueil_institutional/screen.png) | Hero en deux colonnes, chaîne de valeur en cinq étapes, cartes API de solutions/projets/articles, appel au contact et bloc réservé aux indicateurs à confirmer. Le logo est intégré et la hiérarchie reprend les utilitaires Stitch. La référence comporte encore davantage de séquences éditoriales, une photo, un portrait et des projets détaillés, impossibles à publier sans sources validées ; le bandeau démo reste visible avec les seeds. | **5/10** |
| `/a-propos` | [`propos/code.html`](../../design/stitch/jacigreen_propos_notre_histoire/code.html) et [`screen.png`](../../design/stitch/jacigreen_propos_notre_histoire/screen.png) | En-tête, média placeholder et chaîne de valeur structurée ; des sections Histoire/Parcours et Mission/Vision/Valeurs gardent la composition de la référence mais affichent explicitement leur statut à confirmer. La chronologie, le portrait, les valeurs et distinctions de la maquette restent absents car non validés. | **4/10** |
| `/solutions` | [`solutions/code.html`](../../design/stitch/jacigreen_nos_solutions/code.html) et [`screen.png`](../../design/stitch/jacigreen_nos_solutions/screen.png) | En-tête, navigation par catégories fonctionnelle et sections groupées depuis les catégories API ; les cartes conservent les statuts démo/prototype. Il manque la composition éditoriale avec grande photo et fiches développées ; aucun bénéfice technique de la maquette n'est repris. | **4/10** |
| `/solutions/:slug` | [`jacibiogaz/code.html`](../../design/stitch/jacigreen_jacibiogaz_fiche_solution/code.html) et [`screen.png`](../../design/stitch/jacigreen_jacibiogaz_fiche_solution/screen.png) | Hero avec catégorie/maturité, média, description API, CTA devis/retour et zone de documentation technique en attente de validation. La fiche Stitch contient plusieurs tableaux et affirmations de procédés/performance qui restent à vérifier avant publication ; ces détails ne sont pas inventés. | **4/10** |
| `/services` | La maquette [`formations/code.html`](../../design/stitch/jacigreen_formations_transfert_d_expertise/code.html) est explicitement une référence pour la section Formations de Services, pas une page distincte. | Les services API sont organisés en lignes éditoriales ; le bloc Formations reste présent même sans données et expose un état d'attente. Le programme, les formats, publics et CTA détaillés ne sont pas créés faute de validation et de modèle `Training` approuvé (ADR 0003). | **3/10** |
| `/realisations` | [`realisations/code.html`](../../design/stitch/jacigreen_exp_riences_r_alisations/code.html) et [`screen.png`](../../design/stitch/jacigreen_exp_riences_r_alisations/screen.png) | Titre, filtre de pays fonctionnel lorsque plusieurs pays sont publiés et cartes avec couvertures/alt API. Les récits, résultats, chiffres et médias des sections Stitch ne sont pas disponibles ; les cartes gardent le badge démo quand nécessaire. | **3/10** |
| `/actualites` | [`actualites/code.html`](../../design/stitch/jacigreen_actualit_s_ressources/code.html) et [`screen.png`](../../design/stitch/jacigreen_actualit_s_ressources/screen.png) | Les articles sont groupés par catégories API ; des liens d'ancrage fonctionnels remplacent les filtres décoratifs de la référence. La publication phare, la newsletter et les longs extraits ne sont pas ajoutés faute de fonction/contenu validé. | **4/10** |
| `/actualites/:slug` | Aucune fiche d'article n'est maquettée. | Mise en page éditoriale plus hiérarchisée avec date/auteur, titre, extrait, média 16:9, corps via `Prose` et retour à la liste. Cohérence de thème uniquement, pas de comparaison de référence directe. | **5/10*** |
| `/contact` | [`contact/code.html`](../../design/stitch/jacigreen_contact/code.html) et [`screen.png`](../../design/stitch/jacigreen_contact/screen.png) | Grille formulaire/coordonnées ; le formulaire conserve ses validations, envoi API et états, et l'autre colonne signale précisément les coordonnées manquantes. Les régions, cartes, adresses, délais et certifications de la maquette restent absents car non vérifiés. | **4/10** |
| `/mentions-legales` | [`legal/code.html`](../../design/stitch/jacigreen_politiques_mentions_l_gales/code.html) et [`screen.png`](../../design/stitch/jacigreen_politiques_mentions_l_gales/screen.png) | Page neutre `noindex` avec bloc de validation, sans texte juridique inventé. L'écart de densité persiste jusqu'à rédaction et validation juridiques. | **3/10** |
| `*` (404) | Aucune maquette dédiée. | Mise en page centrée avec repère 404, explication et lien d'accueil ; cohérence avec les styles et interaction fonctionnelle. Aucune référence dédiée ; statut HTTP/soft 404 reste une limite technique connue. | **6/10*** |

**Notes sans référence directe :** `*` signifie que le score évalue seulement la
cohérence avec le système visuel partagé. Le détail d'article, la 404 et une page
Services complète n'ont pas de maquette dédiée. La maquette « demande de reprise
de biodigesteur » est une fonctionnalité de Phase 2 :
[`code.html`](../../design/stitch/jacigreen_demande_de_reprise_de_biodigesteur/code.html)
et ne correspond à aucune route actuelle.

### Éléments communs observés

- L'en-tête utilise désormais le logo fourni, un CTA « Nous contacter » et une
  navigation desktop avec menu mobile ; le pied de page est multi-colonnes.
  L'écart résiduel concerne surtout la densité/largeur de la navigation et les
  séquences spécifiques à chaque maquette.
- La référence utilise des photos de terrain, ratios et recadrages éditoriaux.
  Le site réserve les bons emplacements mais les rend en blocs neutres
  (`MediaFrame` sans source dans `MEDIA` et sans couvertures API). C'est un
  placeholder honnête, mais un manque visuel majeur.
- Les fontes DM Sans, Inter et Source Serif 4, les couleurs forêt/ivoire/sable,
  les bordures fines, les boutons fonctionnels, les contrastes et les états de
  focus sont globalement repris dans les tokens. Les espacements, tailles de
  titres et proportions sont simplifiés dans les pages existantes.
- Les `code.html` Stitch comportent de nombreux liens `href="#"` (149 occurrences
  comptées) : ce sont des maquettes, pas des comportements prêts à livrer. Les
  formulaires et CTA correspondants ne doivent pas être considérés comme
  fonctionnels.
- Les écrans Stitch montrent aussi des éléments factuels fictifs : certifications
  ISO 14001/27001, brevets, performances et impacts chiffrés, projets/études,
  coordonnées et services détaillés. Les détails de la page légale et du
  formulaire de reprise sont particulièrement risqués. L'inventaire de
  [`design/README.md`](../../design/README.md) prime sur ces exemples.

## 3. Inventaire des contenus institutionnels

Source intégralement consultée :
[`jacigreen-institutionnel.md`](../content/jacigreen-institutionnel.md).
Le statut ci-dessous reprend le
[`content-register.md`](../content/content-register.md) ; « présent dans une
source » ne signifie pas « validé pour le public ». Aucun statut « validé » n'y
est attribué.

| Source exacte | Destination pertinente | Statut | Présence actuelle et manque |
|---|---|---|---|
| Sections 2, 21, 24 : identité, phrase de présentation, conclusion | Accueil, À propos, pied de page | **À confirmer avant publication** | La copie issue du document interne a été retirée de l'accueil, d'À propos et des métadonnées SEO. Le site affiche un bloc d'attente jusqu'à validation par JACIGREEN. |
| Sections 6 et 10 : philosophie et chaîne de valeur | Accueil, À propos, Solutions | **À confirmer** | La chaîne de valeur et la signature ne sont plus affichées ; les sections conservent leur structure et signalent la validation requise. Le modèle source comporte six étapes, à confirmer avant intégration. |
| Sections 3–5 et 22 : origine, fondation et chronologie | À propos | **À confirmer** | Absentes du site. Validation des dates, du récit et de la formulation avant intégration. |
| Sections 7–9 : mission, vision et six valeurs | À propos | **À valider par la direction** | Volontairement absentes. Ce sont des formulations institutionnelles proposées dans le document, pas des positions déjà approuvées. |
| Section 11 : JaciBiogaz™, JaciGrow™, JaciPur'O™ et filières | Solutions et fiches | **Brouillon éditorial** | API et seeds de démonstration prévoient les fiches ; chaque nom, résumé, maturité, détail technique et image doit être validé avant publication. |
| Sections 12–13 : services, formation, publics et partenaires | Services, Contact | **À confirmer** | La page Services affiche les descriptions complètes des entrées API publiées. Confirmer les offres, publics et vocabulaire ; ne pas inventer durée, cursus, session ou certification. |
| Sections 14–15 : expériences au Burkina Faso, Niger, Nigeria, Burundi et projet ELLESadAPt au Tchad | Réalisations, Actualités | **Non validées pour publication** | Aucun récit institutionnel validé n'est présent dans le site ; les exemples de seed restent des démos. Vérifier partenaires, lieux, résultats, périodes, financement et droits d'image avant toute publication. |
| Section 16 : agriculteurs, fertilisants évités, biofertilisants et biomasse valorisée | Réalisations / impact | **À actualiser et documenter** | Omission appropriée dans le site. Chiffres historiques : actualisation, date, méthode et pièces justificatives nécessaires. |
| Sections 17–18 : distinctions et biographie de Mariama Mamane | À propos | **À confirmer** | Absentes. Vérifier dates, intitulés, preuves et autorisation de publier les éléments biographiques. |
| Sections 19–20 : culture interne et règles de communication | Pas de page publique automatique | **Contenu interne** | À conserver comme guide éditorial ; sélectionner et valider séparément tout extrait destiné au public. |
| Section 23 : trajectoire et objectifs futurs | À propos / institutionnel | **À confirmer** | Absente. C'est une orientation stratégique, pas une réalisation acquise ; validation direction requise. |
| Actualités et ressources éditoriales | Actualités / articles | **Non vérifiables dans les maquettes** | L'API sait les publier, mais les articles, études et références doivent venir de sources vérifiées et d'une validation éditoriale. |
| Coordonnées et informations légales | Contact / Mentions légales | **Absentes des sources validées / validation juridique requise** | Le formulaire de Contact est en place ; aucun email, téléphone, adresse publique ni texte juridique n'est affiché. Les coordonnées fictives des maquettes ne sont pas une source. |

## 4. Logo et médias locaux

| Ressource | Constat |
|---|---|
| [`frontend/public/brand/jacigreen.png`](../../frontend/public/brand/jacigreen.png) | Fichier présent et suivi par Git ; PNG RGB **400 × 400**, fond blanc opaque. Le logo est intégré dans Header et Footer via `BrandLogo`, sans slogan ni icône substitutive. Le fond blanc est conservé ; aucun fichier transparent/vectoriel n'est fourni. |
| Photos utilisables dans `frontend/public/images/` | Aucune. Le dossier contient seulement son README. |
| Emplacements média | `MEDIA.homeHero.src` et `MEDIA.aboutStory.src` sont absents ; `MediaFrame` produit un placeholder. Les couvertures API sont facultatives et aucune photographie de contenu validée n'est recensée. |
| Références Stitch | Dix fichiers `screen.png` (aperçus d'environ 220 à 704 px de large sur 1 600 px de haut) accompagnent dix `code.html` de 362 à 681 lignes ; un `DESIGN.md` de système visuel complète l'ensemble. Ces captures sont des références, pas des médias à publier. Les images générées/distantes des maquettes ne doivent pas être hotlinkées. |
| Documentation de marque | [`brand/README.md`](../../frontend/public/brand/README.md) et le registre distinguent maintenant le logo présent des photographies éditoriales absentes. |

## 5. Défauts visuels, fonctionnels et techniques

### Visuels et contenu

1. **Écart de structure restant.** Les sections partagées et principales ont été
   étoffées, mais les pages ne reprennent pas encore toutes les compositions
   éditoriales des maquettes (récits détaillés, portrait, publication phare,
   données d'impact). Les contenus correspondants doivent être confirmés avant
   d'être renseignés.
2. **Absence de photographie approuvée.** Le hero d'accueil et les cartes sont
   occupés par des aplats placeholders ; le rapport d'aspect est fixé, mais le
   signal visuel de terrain des maquettes manque.
3. **Le bandeau de démonstration apparaît sur les données de seed.** Il est
   explicitement visible dans le navigateur local et protège correctement
   l'utilisateur contre les contenus fictifs ; il ne doit pas être présent sur
   une production.
4. **Contrastes du thème Stitch à surveiller.** Les étiquettes utilisent
   désormais `text-ochre-text` sur fonds clairs plutôt que la couleur décorative
   `on-tertiary-container`. Les tests vérifient les paires de texte et les teintes
   décoratives de la palette de marque ; une vérification visuelle WCAG par page
   reste nécessaire.
5. **Documentation des contrastes mise à jour.** Les ratios de
   [`design-system.md`](../architecture/design-system.md) ont été recalculés sur
   les surfaces actuelles `#F6FBF5` et `#EBEFEA`. Le fichier Stitch
   [`DESIGN.md`](../../design/stitch/ecological_engineering_institutional_system/DESIGN.md)
   expose déjà ces surfaces dans ses tokens YAML.

### Fonctionnement et livraison

1. **Pré-rendu corrigé, domaine de production manquant :** Vite Preview utilise
   désormais `127.0.0.1`, ce qui corrige l'échec `/_.data` causé par le bind
   `::1` et la résolution IPv4 de `localhost`. Le build et le contrôle local
   passent. Le contrôle strict de production échoue sur 14 canoniques locales,
   20 contenus API démo et les avertissements rendus sur 11 pages.
2. **Navigation de détail partielle :** Solutions et Articles disposent de liens
   vers leurs fiches. Les cartes Réalisations ne sont pas des liens, bien que
   l'API offre un endpoint détail ; les services n'ont pas de page de détail
   frontend alors que l'API en offre une. L'ADR 0003 exclut actuellement la fiche
   de réalisation : décider le périmètre plutôt que d'ajouter silencieusement
   des routes.
3. **Formations conditionnelles et fragiles :** la séparation de Services dépend
   du mot « formation » dans le titre ; il n'existe ni modèle dédié ni décision
   produit confirmée. Conserver cette limite tant que le périmètre n'est pas
   tranché.
4. **Page légale provisoire :** les mentions, politique et CGU sont absentes. La
   page neutre `noindex` est préférable à la maquette inventée, mais doit être
   remplacée par des textes validés avant ouverture publique.
5. **SEO :** les mentions légales et la 404 sont `noindex`, mais une URL inconnue
   reçoit un statut 200 (soft 404). Aucune image `og:image` par défaut n'est
   publiée. Ces limites sont documentées dans
   [`seo.md`](../architecture/seo.md).
6. **Contact :** le formulaire envoie réellement les données et gère les états
   d'erreur/succès, mais aucune notification email n'est implémentée ; le
   traitement se fait via Django Admin. Ne pas reproduire les coordonnées ni
   l'engagement de délai du mockup.
7. **Sécurité préproduction :** CSP non définie, URL Admin à modifier et
   authentification renforcée à prévoir ; le throttling multi-worker/proxy
   nécessite une configuration de cache et `DRF_NUM_PROXIES`. Ce sont des
   points documentés dans [`security.md`](../architecture/security.md), à fermer
   avant exposition publique selon le déploiement retenu.
8. **Contrôle de production à terminer :** le domaine canonique n'est pas fourni ;
   le pré-rendu valide localement, mais la configuration Compose ne peut pas
   valider une URL de production.

## 6. Plan de correction priorisé

### P0 — Bloque la mise en production

- Renseigner l'URL canonique officielle dans `VITE_SITE_URL`, remplacer les
  données de démo par du contenu réel et validé, reconstruire et faire passer
  `check:prerender -- --production --forbid-demo`. Ne pas désactiver
  `is_demo` sans confirmation factuelle.
- Faire valider les textes institutionnels proposés (présentation générale,
  signature et chaîne de valeur), les noms/descriptions publiés via Admin et chaque
  contenu de démonstration. Aucun contenu `is_demo` ne doit franchir le contrôle
  de production.
- Bloquer toute reprise des affirmations, coordonnées, métriques, références,
  photos ou garanties fictives repérées dans les maquettes.
- Fournir et faire valider les informations légales avant lancement ; à défaut,
  conserver la page neutre `noindex` et différer la publication.

### P1 — Écarts majeurs de crédibilité et d'expérience

- Fournir les photos locales/API avec leurs textes alternatifs validés. La
  palette exacte est enregistrée dans les tokens ; le PNG existant est documenté
  et utilisé sans modifier son fond blanc.
- Après validation éditoriale, rétablir les structures à valeur informative des
  pages (récit et chronologie À propos ; hiérarchie Solutions ; récits de
  Réalisations ; publication phare Actualités ; contacts publics vérifiés).
  Construire ces sections avec les composants déjà présents, sans reprendre le
  contenu factuel inventé des maquettes.
- Rendre explicite le périmètre Services/Formations et déterminer si les détails
  Service/Réalisation sont des routes de Phase 1 ; les boutons/liens retenus
  doivent mener à un comportement réellement pris en charge.

### P2 — Qualité documentaire et technique

- Vérifier que toute documentation de design restante reste alignée sur les
  tokens et leurs ratios WCAG recalculés.
- Ajouter une couverture ciblée des pages, actuellement peu testées unitairement,
  et maintenir une séparation claire entre les résultats récents, historiques
  et les contrôles non exécutés.
- Traiter le soft 404, l'absence d'image Open Graph, la CSP, la sécurisation de
  l'Admin, la limitation de débit distribuée et les notifications de contact en
  fonction des exigences de mise en production.

### P3 — Finition visuelle

- Une fois les tokens et contenus validés, rapprocher les largeurs, respirations,
  tailles de titres, compositions asymétriques, états des boutons et pieds de
  page des écrans Stitch ; vérifier d'abord desktop puis les points de rupture.
- Ajouter des tests de rendu par page et des captures de comparaison visuelle
  approuvées. Les captures Stitch disponibles sont étroites/basse résolution ;
  utiliser, si utile, `design/render-screens.mjs` pour générer des références
  nettes, sans les prendre pour des sources de contenu.

## 7. Tests disponibles et contrôles nécessaires

### Couverture présente

- **Frontend :** les tests Vitest (62 tests réussis) couvrent notamment tokens,
  accessibilité/états du Header, boutons, `MediaFrame`, formulaire, formatage,
  SEO, client API et état de contenu à valider. La dernière exécution a réussi
  **62 tests après le dernier changement** ; les pages restent peu couvertes par les tests unitaires.
- **Backend :** huit modules de tests Django couvrent modèles, API, contact,
  publication, seeds, Deploy Hook et plateforme. `quality/testing.md` consigne
  historiquement **41/41 tests** et 93 % de couverture.
- **Navigateur :** 11 routes ont été vérifiées à 360, 390, 768, 1 024 et
  1 440 px, sans débordement horizontal après stabilisation. Le menu, Échap et
  les liens d'ancrage de catégories ont été contrôlés ; aucun envoi de formulaire
  n'a été effectué. Aucune comparaison pixel à pixel par route n'a été effectuée.
- **CI/préproduction :** lint, format, types, tests, build et contrôle local du
  pré-rendu réussissent. Le contrôle strict de production bloque sur la
  configuration canonique locale et les données marquées démo. Les contrôles
  Django n'ont pas été relancés.

### Contrôles restant avant livraison

1. Relancer dans l'environnement Compose les contrôles backend (Ruff, `check`,
   migrations, OpenAPI et tests Django) ; ils ne faisaient pas partie de cette
   reconstruction frontend.
2. Fournir `VITE_SITE_URL` de production, reconstruire, puis relancer
   `npm run check:prerender -- --production --forbid-demo` ; inspecter les
   routes, métadonnées, slugs, sitemap, `robots.txt` et fallback générés.
3. Compléter les contrôles navigateur par une comparaison visuelle par route et
   viewport, vérifier les liens/CTA, le menu/clavier, les images/alt et les états
   d'erreur/réussite du formulaire sans créer de fausse demande en base.
4. Revue éditoriale et juridique de chaque contenu et média effectivement publié.
