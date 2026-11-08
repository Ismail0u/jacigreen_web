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
document institutionnel ont depuis été autorisées à la publication par le
propriétaire ; les données d’API doivent néanmoins être évaluées séparément.

## État actuel — validation des phases 2 et 3, 6 novembre 2026

Les listes et détails de Solutions, Services, Réalisations et Actualités
restent alimentés exclusivement par l’API ; l’accueil affiche les sélections
API. Le client API utilise des délais distincts selon la méthode, limite les
reprises GET aux erreurs réseau et statuts transitoires, valide la pagination
et signale les erreurs sans les confondre avec un catalogue vide. Les layouts
Solutions et Actualités rechargent le contexte parent lorsqu’un slug change.
Les 20 slugs et valeurs `is_demo=false` de l’API locale correspondent aux
réponses des endpoints distants ; les réserves éditoriales et dates techniques
restent dans le [`content-register.md`](../content/content-register.md).

La refonte UX/visuelle menée sur cette reprise compactifie les cartes et réunit
le contenu du hero dans un seul titre sémantique, avec carrousel mobile
contrôlable. Une matrice navigateur couvre 11 routes à 320, 360, 375, 390, 430,
768, 1024, 1280, 1440 et 1920 px (110 vérifications) sans débordement
horizontal ni erreur JavaScript. Le menu mobile, le filtre pays, les erreurs
de validation du formulaire et les fiches API inexistantes ont aussi été
exercés. Une comparaison pixel à pixel des maquettes Stitch n’a pas été faite.

État de validation dans les conteneurs existants : 83 tests frontend, 47 tests
backend, format, typecheck, lint, build et pré-rendu réussis. Le contrôle strict
de production passe avec les URL communiquées et l’API locale équivalente.
L’URL Render répond depuis l’hôte, mais le build direct depuis le conteneur
échoue sur un délai de connexion externe. La reconstruction Docker fraîche
avait échoué sur la résolution DNS du dépôt Python et reste à refaire. Les URL
publiques répondent HTTP 200 ; la configuration réelle des environnements
hébergés n’a pas été inspectée.

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
- **État éditorial au moment de l'audit initial :** le document de référence est
  [`docs/content/jacigreen-institutionnel.md`](../content/jacigreen-institutionnel.md),
  document v1.0 (2026) ; l’autorisation de publication n’avait pas encore été
  donnée à cette date. Le registre actuel reflète la décision ultérieure du
  propriétaire.
- **Rendu et blocage de livraison :** le build et le pré-rendu sont désormais
  réussis après la configuration IPv4 du Preview. Le contrôle strict de
  production passe avec les URL communiquées et l’API locale correspondante ;
  les variables réellement hébergées restent à inspecter.
- **Git au moment de l'audit :** branche
  `feature/core-backend-frontend`, alignée sur
  `origin/feature/core-backend-frontend`. Aucun changement suivi n'est présent ;
  `COPILOT_START.md` est le seul fichier non suivi observé. Il a été laissé
  intact. Le logo PNG est suivi par Git.

## 2. Routes et comparaison maquette / code

Les notes et descriptions détaillées ci-dessous proviennent de l’audit visuel
antérieur ; elles ne constituent pas une nouvelle notation de fidélité ni un
inventaire complet de l’interface après les reprises UX/API. L’état actuel des
changements et contrôles est résumé ci-dessus et dans le rapport de
finalisation. Aucune comparaison pixel à pixel n’a été menée pour cette reprise.

| Route | Maquette de référence | Code observé et écarts concrets | Fidélité |
|---|---|---|---:|
| `/` | [`accueil/code.html`](../../design/stitch/jacigreen_accueil_institutional/code.html) et [`screen.png`](../../design/stitch/jacigreen_accueil_institutional/screen.png) | Hero responsive : contenu partagé dans un seul `<h1>`, cluster desktop et carrousel mobile ; trois sections catalogue API avec état vide. Il reste des écarts de séquences éditoriales et une comparaison pixel à pixel n’a pas été faite. | **5/10** |
| `/a-propos` | [`propos/code.html`](../../design/stitch/jacigreen_propos_notre_histoire/code.html) et [`screen.png`](../../design/stitch/jacigreen_propos_notre_histoire/screen.png) | Présentation, mission/vision/valeurs proposées, biographie, distinctions, culture, perspectives et chiffres historiques avec réserve. Média de remplacement. Les longs récits et répétitions ont été réduits ; aucune comparaison pixel à pixel récente. | **4/10** |
| `/solutions` | [`solutions/code.html`](../../design/stitch/jacigreen_nos_solutions/code.html) et [`screen.png`](../../design/stitch/jacigreen_nos_solutions/screen.png) | Cartes API compactées, badge démo conditionnel, marqueur prototype et état vide. Les copies statiques institutionnelles ont été retirées. Pas de navigation groupée par catégorie ni de grande photo de la maquette. | **4/10** |
| `/solutions/:slug` | [`jacibiogaz/code.html`](../../design/stitch/jacigreen_jacibiogaz_fiche_solution/code.html) et [`screen.png`](../../design/stitch/jacigreen_jacibiogaz_fiche_solution/screen.png) | Hero avec catégorie/maturité, média, description API, CTA devis/retour et zone de documentation technique en attente de validation. La fiche Stitch contient plusieurs tableaux et affirmations de procédés/performance qui restent à vérifier avant publication ; ces détails ne sont pas inventés. | **4/10** |
| `/services` | La maquette [`formations/code.html`](../../design/stitch/jacigreen_formations_transfert_d_expertise/code.html) est explicitement une référence pour la section Formations de Services, pas une page distincte. | Catalogue API uniquement en lignes éditoriales ; état vide et badge démo conditionnel. Les huit prestations statiques et la section Formation séparée ont été retirées pour éviter une seconde source de vérité. | **3/10** |
| `/realisations` | [`realisations/code.html`](../../design/stitch/jacigreen_exp_riences_r_alisations/code.html) et [`screen.png`](../../design/stitch/jacigreen_exp_riences_r_alisations/screen.png) | Cartes compactées et filtre de pays alimentés par l’API, avec état vide et badges démo conditionnels. Les projets institutionnels statiques ont été retirés ; les images restent placeholders si l’API n’a pas de média. | **3/10** |
| `/actualites` | [`actualites/code.html`](../../design/stitch/jacigreen_actualit_s_ressources/code.html) et [`screen.png`](../../design/stitch/jacigreen_actualit_s_ressources/screen.png) | Articles API groupés par catégorie, cartes compactées et état vide ; badge démo conditionnel. Le projet ELLESadAPt et la chronologie ne sont plus dupliqués ici en statique. | **4/10** |
| `/actualites/:slug` | Aucune fiche d'article n'est maquettée. | Mise en page éditoriale plus hiérarchisée avec date/auteur, titre, extrait, média 16:9, corps via `Prose` et retour à la liste. Cohérence de thème uniquement, pas de comparaison de référence directe. | **5/10*** |
| `/contact` | [`contact/code.html`](../../design/stitch/jacigreen_contact/code.html) et [`screen.png`](../../design/stitch/jacigreen_contact/screen.png) | Grille formulaire/contexte ; formulaire et validation API conservés. Aucune coordonnée publique n’est inventée ; catégories de publics listées sans présumer de clients ou partenaires. | **4/10** |
| `/mentions-legales` | [`legal/code.html`](../../design/stitch/jacigreen_politiques_mentions_l_gales/code.html) et [`screen.png`](../../design/stitch/jacigreen_politiques_mentions_l_gales/screen.png) | Projet de mentions structuré et `noindex` ; l’identité juridique et les informations administratives restent à fournir. Aucun droit national n’est présumé ; validation juridique nécessaire. | **3/10** |
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
Le tableau suivant consigne les lacunes observées lors de l'audit initial,
antérieur à l'autorisation explicite de publication. Il s’agit d’un état
historique, pas du statut éditorial actuel. La couverture après intégration est
décrite dans [`matrice-contenu.md`](./matrice-contenu.md) et le
[`content-register.md`](../content/content-register.md).

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
| Photos dans `frontend/public/images/` | Trois photos WebP locales sont présentes et utilisées par le hero mobile/desktop. Leur provenance individuelle et les droits de publication restent à confirmer ; aucun média associé aux fiches API n’a été validé dans ce contrôle. |
| Emplacements média | `MEDIA.homeHero.src` référence la photo locale du hero ; `MEDIA.aboutStory` n’a pas de source et affiche un placeholder. Les couvertures API restent facultatives. |
| Références Stitch | Dix fichiers `screen.png` (aperçus d'environ 220 à 704 px de large sur 1 600 px de haut) accompagnent dix `code.html` de 362 à 681 lignes ; un `DESIGN.md` de système visuel complète l'ensemble. Ces captures sont des références, pas des médias à publier. Les images générées/distantes des maquettes ne doivent pas être hotlinkées. |
| Documentation de marque | [`brand/README.md`](../../frontend/public/brand/README.md) et le registre distinguent maintenant le logo présent des photographies éditoriales absentes. |

## 5. Défauts visuels, fonctionnels et techniques

### Visuels et contenu

1. **Écart de structure restant.** Les sections partagées et principales ont été
   étoffées, mais les pages ne reprennent pas encore toutes les compositions
   éditoriales des maquettes (récits détaillés, portrait, publication phare,
   données d'impact). Les contenus correspondants doivent être confirmés avant
   d'être renseignés.
2. **Provenance des médias à confirmer.** Le hero utilise trois photos locales
   présentes dans le dépôt et les cartes API gardent des placeholders lorsque
   leur couverture manque. Les droits et la provenance des photos n’ont pas été
   vérifiés dans cette reprise.
3. **Bandeau de démonstration conditionnel.** Il reste affiché pour toute fiche
   reçue avec `is_demo=true`; il n’apparaît pas sur les 20 fiches locales
   contrôlées, toutes `is_demo=false`.
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

1. **Pré-rendu vérifié avec les URL communiquées :** le build et les contrôles
   local et strict passent avec `API_INTERNAL_URL=http://backend:8000`. Le
   build tentant d’interroger Render directement depuis le conteneur expire sur
   la connexion réseau ; les sondes externes exécutées depuis l’hôte répondent.
   Les variables actuellement définies dans les comptes hébergés n’ont pas été
   inspectées.
2. **Navigation de détail ciblée :** Solutions et Articles disposent de liens
   vers leurs fiches ; transitions liste → détail → liste → autre détail et
   réponses de slug inexistant ont été vérifiées. Les cartes Réalisations ne
   sont pas des liens et les services n'ont pas de page de détail frontend ;
   l’ADR 0003 n’inclut pas la fiche de réalisation.
3. **Formations conditionnelles et fragiles :** la séparation de Services dépend
   du mot « formation » dans le titre ; il n'existe ni modèle dédié ni décision
   produit confirmée. Conserver cette limite tant que le périmètre n'est pas
   tranché.
4. **Page légale provisoire :** un projet de mentions structurées est désormais
   présent, mais l’identité de l’éditeur, les informations de confidentialité
   et les conditions d’utilisation restent à compléter et à valider. La page
   demeure `noindex` jusqu’à validation par JACIGREEN et un conseil juridique
   compétent dans le pays d’établissement confirmé.
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
8. **Variables de production à confirmer :** les canoniques sont validées avec
   les URL communiquées, mais la configuration réellement déployée sur
   Vercel/Render (hôtes autorisés, CORS et CSRF) n’a pas été inspectée.

## 6. Plan de correction priorisé

### P0 — Bloque la mise en production

- Rétablir la résolution DNS/réseau de Docker vers le dépôt Python puis réussir
  une nouvelle reconstruction avec `docker compose up -d --build`.
- Vérifier dans Vercel/Render que `VITE_SITE_URL`,
  `VITE_API_URL`, `API_INTERNAL_URL`, `DJANGO_ALLOWED_HOSTS`,
  `CORS_ALLOWED_ORIGINS` et `CSRF_TRUSTED_ORIGINS` sont configurés avec les URL
  communiquées.
- Fournir et faire valider les informations légales avant lancement ; conserver
  la page de travail `noindex` jusqu’à l’approbation et différer la publication
  légale si les éléments manquent.

### P1 — Écarts majeurs de crédibilité et d'expérience

- Confirmer les droits/provenance des photos du hero et fournir les médias
  API manquants avec des textes alternatifs approuvés.
- Après configuration du domaine et des données, comparer visuellement chaque
  route aux références Stitch aux largeurs desktop et mobile.

### P2 — Qualité documentaire et technique

- Étendre l’automatisation navigateur des parcours critiques ; la matrice
  responsive et les parcours principaux ont pour l’instant été exécutés
  manuellement.
- Traiter le soft 404, l'absence d'image Open Graph, la CSP, la sécurisation de
  l'Admin, la limitation de débit distribuée et les notifications de contact en
  fonction des exigences de mise en production.

### P3 — Finition visuelle

- Après comparaison documentée, ajuster uniquement les écarts importants de
  largeur, respiration, typographie et composition. Ne pas traiter les captures
  comme source de faits.

## 7. Tests et contrôles

Les résultats actualisés au 6 novembre 2026 sont consignés dans
[`quality/testing.md`](../quality/testing.md) et
[`rapport-finalisation.md`](./rapport-finalisation.md).

- Frontend : format, typecheck, lint, 83 tests, build et pré-rendu local réussis
  dans le conteneur existant ; contrôle strict passé avec les URL communiquées
  et l’API locale correspondante.
- Backend : Ruff, configuration, migration, OpenAPI et 47 tests réussis dans le
  conteneur existant.
- Build direct vers Render : délai réseau depuis le conteneur.
- Docker : reconstruction échouée sur la résolution DNS des paquets Python.
- Navigateur : 110 vérifications responsive sans débordement/erreur JS, plus
  parcours de navigation, filtre et validation du formulaire ; comparaison
  pixel à pixel non effectuée.
- Avant toute publication, vérifier les variables hébergées, reconstruire les
  images Docker et obtenir les informations légales/médias manquants.
