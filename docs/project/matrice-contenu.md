# Matrice de contenu institutionnel JACIGREEN

## Source et règle de publication

- Source intégrale : [`docs/content/jacigreen-institutionnel.md`](../content/jacigreen-institutionnel.md),
  version 1.0 (2026), avant-propos, 24 sections, tableaux/listes et fiche
  d’identité finale.
- Le propriétaire a autorisé la publication du document le 24 octobre 2026.
  Les contenus des fiches API recensées ont également été autorisés ; leurs
  réserves de source et de date restent applicables.
- Les contenus de catalogue sont servis uniquement par les endpoints API
  existants. Le frontend n’en conserve pas de copie statique.
- La base locale compte 3 solutions, 8 services, 6 réalisations et 3 articles ;
  les 20 enregistrements vérifiés portent `is_demo=false`. Le registre
  [`content-register.md`](../content/content-register.md) détaille leur
  comparaison à la source et les validations manquantes.

## Couverture et destination

| Source | Sujet et statut | Page/composant | Présence et action |
|---|---|---|---|
| Avant-propos | Contexte du référentiel ; mission, vision et valeurs proposées ; chiffres historiques à documenter | Registre éditorial ; À propos | Les formulations proposées sont identifiées ; les chiffres gardent leur réserve. |
| §1 Mot de bienvenue | Conviction de transformer des problèmes environnementaux en opportunités | Accueil, `home.tsx` | Résumé bref dans le positionnement. |
| §2 Qui est JACIGREEN ? | Ressources, déchets, jacinthe d’eau, environnement, énergie et agriculture | Accueil, À propos, pied de page, SEO | Positionnement court et expertise publiés ; pas de répétition de provenance. |
| §§3–5 Genèse, prise de conscience, naissance en 2016 | Parcours de la fondatrice, 2012, études et concours de 2016 | À propos | Parcours résumé dans la biographie. |
| §6 Philosophie | Nuance sur la jacinthe d’eau et logique de valorisation | Accueil, À propos | Présentation concise ; aucun chiffre ou bénéfice technique ajouté. |
| §7 Mission | Formulation proposée et applications | À propos | Mission publiée comme proposition ; liste d’applications retirée car elle répétait la mission. |
| §8 Vision | Formulation proposée et ambition | À propos | Vision publiée comme proposition. |
| §9 Valeurs | Six valeurs et descriptions | À propos | Six valeurs affichées comme propositions. |
| §10 Modèle de création de valeur | Étapes de récupération, transformation, valorisation et usages | Accueil | Le résumé d’approche est publié ; les longues listes d’étapes répétées ont été retirées. |
| §11 Solutions | JaciBiogaz™, JaciGrow™, JaciPur’O™ et voies de valorisation | API `/api/v1/solutions/`, `SolutionCard`, fiche solution | Aucune copie statique. Les 3 fiches autorisées sont publiables avec les réserves du registre ; conserver le statut prototype et les limites techniques. |
| §12 Services | Huit prestations | API `/api/v1/services/`, `ServiceEntry` | Aucune copie statique. Les 8 fiches API sont autorisées à la publication ; ne pas inventer tarifs, calendriers ou modalités. |
| §13 Publics, bénéficiaires et partenaires | Catégories de publics possibles | Contact | Les catégories restent accessibles ; elles ne sont pas présentées comme clients ou partenaires avérés. |
| §14 Expériences et réalisations | Expériences au Burkina Faso, au Niger, au Nigeria et au Burundi ; chiffres historiques | API `/api/v1/projects/`, `ProjectCard` | Les doublons statiques sont retirés. Les 6 fiches sont autorisées à la publication ; préserver les distinctions entre étude, projection et résultat ainsi que les réserves de dates. |
| §15 ELLESadAPt – Tchad | Projet, activité, contexte, financement et suite évoquée | API `/api/v1/projects/` et `/api/v1/articles/` | Les versions statiques du projet/article sont retirées. La fiche API autorisée est publiée sans ajout de résultats non documentés. |
| §16 Impact social et environnemental | Quatre chiffres historiques et demande d’actualisation | À propos | Affichés avec avertissement explicite : non actuels, à dater et documenter. |
| §17 Reconnaissance et visibilité | Distinctions 2016–2018 | À propos | Huit mentions conservées avec les années de la source. |
| §18 Fondatrice | Biographie de Mariama Mamane | À propos | Parcours résumé sans ajout de coordonnées ou de résultats. |
| §§19–20 Culture et guide collaborateurs | Curiosité, initiative, terrain, collaboration, rigueur et confidentialité | À propos | Les principes utiles sont conservés en liste courte ; les consignes spécifiques aux collaborateurs sont omises du site public. |
| §21 JACIGREEN en quelques secondes | Positionnement synthétique | Accueil, pied de page | Repris dans le texte de présentation. |
| §22 Chronologie | Repères historiques et réalisations | À propos / API projets | Repères biographiques gardés dans la biographie ; les projets et actualités ne sont pas dupliqués statiquement. |
| §23 Perspectives | Structuration, documentation, mesure d’impact, partenariats et compétences | À propos | Priorités conservées comme intentions, non comme résultats obtenus. |
| §24 Conclusion | Récapitulatif de l’ambition et nouvelle étape | À propos | Non reprise en bloc : elle répéterait le positionnement et les perspectives déjà affichés. |
| Fiche d’identité finale | Positionnement, ressource historique, territoires, fondatrice | Mentions légales | Informations descriptives affichées ; les territoires ne sont pas une preuve de présence commerciale actuelle. |

## Routes et sources effectives

| Route | Contenu statique institutionnel | Contenu éditorial | État |
|---|---|---|---|
| `/` | Positionnement bref et approche | Solutions, réalisations et trois actualités récentes depuis l’API | États vides accessibles ; bannière uniquement si une réponse contient `is_demo=true`. |
| `/a-propos` | Identité, histoire, mission, vision, valeurs, biographie, distinctions, culture, impacts historiques et perspectives | Aucun catalogue | Sections raccourcies ; réserves originales maintenues. |
| `/solutions` et `/solutions/:slug` | Aucun doublon de fiche | API solutions | 3 fiches vérifiées `is_demo=false`. |
| `/services` | Aucun doublon de prestation | API services | 8 fiches vérifiées `is_demo=false`. |
| `/realisations` | Aucun projet statique | API projets et filtre existant | 6 fiches vérifiées `is_demo=false`. |
| `/actualites` et `/actualites/:slug` | Aucune actualité statique | API articles | 3 articles vérifiés `is_demo=false`. |
| `/contact` | Publics possibles et positionnement | Formulaire API existant | Pas de coordonnées inventées. |
| `/mentions-legales` | Nom affiché uniquement, aucune identité juridique établie | Projet de mentions structuré | Champs manquants suivis dans le registre ; non validé, `noindex`. |

## Décisions restant à obtenir

1. Confirmation des dates des études et des statuts de disponibilité dans les
   fiches concernées.
2. Vérification des URL et variables réellement déployées, bien que les URL
   publiques communiquées aient passé le pré-rendu strict.
3. Coordonnées et informations juridiques listées dans le registre, ainsi que
   médias éditoriaux et droits associés.
