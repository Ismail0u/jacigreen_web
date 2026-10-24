# Rapport de finalisation — état au 23 octobre 2026

## Statut

**NON PRÊT — blocage de configuration de production.** Le build et le pré-rendu
complet fonctionnent après fixation du host Vite Preview à `127.0.0.1`. Les
sorties HTML, sitemap, `robots.txt` et fallback sont présents ; le contrôle local
sans mode production ni garde de démo passe. Le contrôle strict échoue sur 45
problèmes : 14 canoniques locales, 20 contenus API marqués `is_demo=true` et 11
pages qui affichent leur avertissement de démonstration. Le domaine public
n'étant pas documenté, il n'est pas remplacé par une URL supposée : renseigner
la vraie URL de déploiement et remplacer les données démo par des contenus
validés avant de refaire le contrôle.

Les textes éditoriaux, images, coordonnées et textes juridiques nécessitent encore
validation ou fourniture par JACIGREEN. Le logo PNG existe ; une variante
transparente peut être fournie si nécessaire. La fidélité visuelle n'a pas été
validée par comparaison pixel à pixel.

## Travaux réalisés

- Ajout de `MediaFrame` avec ratios fixes, dimensions d'image, chargement différé
  et placeholder décoratif accessible lorsque le fichier validé manque.
- Ajout du registre `frontend/src/content/media.ts`, de la liste des visuels
  attendus dans `frontend/public/images/README.md` et du test interdisant les
  sources externes codées en dur dans les balises image TSX.
- Utilisation de `MediaFrame` dans les cartes Solution, Réalisation et Actualité,
  ainsi que dans les fiches Solution et Article.
- Ajout sur l'accueil d'un visuel de remplacement et d'une section Réalisations
  alimentée par l'API. Le bandeau de démonstration tient désormais aussi compte
  des Réalisations présentes sur l'accueil.
- Ajout d'une section « Formations et transfert d'expertise » dans Services,
  affichée uniquement si une entrée publiée de l'API correspond à une formation.
  Aucun modèle `Training` ni contenu de cursus n'a été créé.
- Mise en page À propos rapprochée de la structure éditoriale avec un média de
  remplacement ; aucune mission, vision ou valeur n'a été ajoutée.
- Création du registre de validation des contenus et du plan de finalisation.
- Lecture complète du document institutionnel et création de
  `docs/project/matrice-contenu.md`, qui recense chacune de ses sections et son
  statut, sa destination, sa présence dans le site et ses validations manquantes.
- Retrait des formulations statiques non validées de la présentation, de la chaîne
  de valeur, du pied de page et des métadonnées ; les emplacements concernés
  signalent maintenant l'attente d'une validation institutionnelle.
- Affichage des descriptions complètes des services depuis l'API et des
  descriptions de réalisation lorsqu'elles sont renseignées, sans évolution du
  contrat API.

## État des pages et fidélité visuelle

| Page | État / fidélité | Écarts ou contenus omis |
|---|---|---|
| Accueil | Partiellement rapproché de la maquette | Hero à deux colonnes et sections éditoriales ; présentation et chaîne de valeur en attente de validation ; fidélité détaillée non validée. |
| À propos | Partiellement rapproché | Média de remplacement ; présentation, histoire, mission, vision et valeurs en attente de validation. |
| Solutions et fiches | Fonctionnelles, améliorées | Données API et visuels de remplacement ; composition de la maquette non reproduite intégralement. |
| Services / Formations | Fonctionnelles, section Formations conditionnelle | Description complète des entrées API ; aucun catalogue, durée ou session inventé. |
| Réalisations | Fonctionnelle | Filtre pays conservé, descriptions API accessibles depuis les cartes et visuels de remplacement ; exemples de la maquette non repris. |
| Actualités et articles | Fonctionnelles | Données API, aucun article fictif ou chiffre de la maquette ajouté ; médias de remplacement. |
| Contact | Fonctionnel | Formulaire existant inchangé ; aucune coordonnée ou infrastructure non validée affichée. |
| Mentions légales | Structure neutre `noindex` | Textes juridiques en attente de rédaction et validation. |
| Page introuvable | Fonctionnelle | Aucun écart fonctionnel identifié pendant le contrôle. |

## Interactions et médias volontairement omis

- Aucun visuel de maquette Google, lien `googleusercontent`, photographie sans
  rapport, faux logo ou source externe n'a été utilisé.
- Les emplacements sans fichier affichent un placeholder ; le remplacement
  nécessite un visuel officiel et un texte alternatif validé.
- Coordonnées, adresses, études, certifications, brevets, rendements, chiffres
  d'impact, clients, projets et témoignages non validés sont omis.
- Recherche, connexion, sélecteur de langue, newsletter et boutons sans
  comportement réel ne sont pas ajoutés.
- La page de reprise de biodigesteur, les commandes, comptes, paiements et autres
  fonctions de Phase 2 ne sont pas intégrés.

## Contrôles exécutés et résultats réels

| Contrôle | Résultat |
|---|---|
| `npm run lint` dans le conteneur frontend | Réussi |
| `npm run typecheck` dans le conteneur frontend | Réussi |
| `npm test` dans le conteneur frontend | Réussi : 11 fichiers, 62 tests |
| `npm run format:check` dans le conteneur frontend | Réussi |
| `git diff --check` | Réussi |
| Test spécifique `MediaFrame.test.tsx` | Réussi : 3 tests |
| Santé de l'API et listes Solutions, Services, Réalisations, Actualités depuis le frontend | Réussi : HTTP 200 |
| Navigateur : reconstruction précédente, 11 routes et 5 largeurs (360, 390, 768, 1024, 1440 px) | Réussi antérieurement : 55 vérifications, aucun débordement horizontal et un seul `<h1>` par route. Pour ce lot contenu, l'accueil, À propos et Services ont été vérifiés dans le navigateur ; les 11 routes aux 5 largeurs ne sont pas re-testées. |
| Menu mobile et touche Échap | Réussi : ouverture/fermeture vérifiée à 360 px |
| Formulaire de contact dans le navigateur | Réussi : erreurs locales accessibles vérifiées sans envoyer ni enregistrer de demande |
| `npm run build` | Réussi après ajout de `preview.host: "127.0.0.1"` dans `frontend/vite.config.ts`. Cause initiale : Vite liait le preview à `::1`, alors que le client HTTP du pré-rendu résolvait `localhost` vers `127.0.0.1`. |
| `npm run check:prerender` | Réussi : HTML, canoniques locales, métadonnées, `h1`, sitemap, robots et fallback vérifiés. |
| `npm run check:prerender -- --forbid-demo` | Échoue sur 31 problèmes : 20 ressources API marquées `is_demo=true` et 11 pages avec avertissement de démonstration. |
| `npm run check:prerender -- --production --forbid-demo` | Échec : 45 problèmes — 14 canoniques locales, 20 éléments API avec `is_demo=true` et 11 pages avec avertissement de démonstration. Renseigner la vraie URL publique et remplacer les contenus démo par des contenus validés avant de refaire ce contrôle. |
| Vérifications backend Ruff / migrations / OpenAPI / tests | Non exécutées : aucun fichier backend n'a été modifié. |
| Comparaison visuelle navigateur vs captures Stitch | Non exécutée pixel à pixel ; seules la structure, les routes, le responsive et le débordement ont été contrôlés. |
| Envoi réel du formulaire et vérification de stockage | Non exécutés pour ne pas créer de demande de test en base. |

## Images à fournir

| Emplacement | Page | Ratio | Taille recommandée |
|---|---|---:|---:|
| `homeHero` | `/` | 4:3 | 1600 × 1200 px |
| `aboutStory` | `/a-propos` | 4:3 | 1200 × 900 px |
| Couvertures Solutions | `/solutions` et `/` | 4:3 | 1200 × 900 px |
| Fiche Solution | `/solutions/:slug` | 16:9 | 1600 × 900 px |
| Couvertures Réalisations | `/realisations` | 4:3 | 1200 × 900 px |
| Couvertures Actualités | `/actualites` | 4:3 | 1200 × 900 px |
| Article | `/actualites/:slug` | 16:9 | 1600 × 900 px |
| Logo | En-tête et pied de page | PNG carré 400 × 400, fond blanc opaque | Fichier fourni : `frontend/public/brand/jacigreen.png` |

Les images éditoriales viennent des champs `cover_image` et `cover_alt` de l'API ;
le stockage et la diffusion en production restent à configurer. Tout média doit
être fourni ou validé par JACIGREEN ; ne pas publier un placeholder comme s'il
s'agissait d'une photographie.

## Informations et décisions humaines requises

- Autorisation de publier le document institutionnel et validation des textes
  descriptifs avant leur éventuelle réintégration dans le frontend (la copie
  statique non validée a été retirée).
- Validation des noms, descriptions et maturités de Solutions et Services avant
  publication ; remplacer les enregistrements de démonstration sans désactiver
  leur indicateur tant que leur authenticité n'est pas établie.
- Décisions proposées de l'ADR 0003 : Formations comme section Services, termes
  Solutions/Produits et motif informatif du rachat.
- Photos éditoriales ; coordonnées publiques ; mentions légales, politique de
  confidentialité et CGU à fournir/valider juridiquement.
- URL canonique de production (`VITE_SITE_URL`). La palette exacte fournie dans
  la mission est enregistrée et testée ; les rôles UI restent compatibles avec
  WCAG et les maquettes Stitch.
- Date de mise en production.

Le registre complet et les règles de publication se trouvent dans
`docs/content/content-register.md`. Le worktree reste modifié et contient aussi
des changements préexistants ; ils ont été préservés. Branche :
`feature/core-backend-frontend`, suivie de `origin/feature/core-backend-frontend`.
Aucun commit ni push n'a été effectué.
