# Rapport de finalisation — état au 22 octobre 2026

## Statut

**Finalisation partielle, livraison non prête pour la production.** Les routes
existantes répondent en développement et les changements frontend passent lint,
types, format et tests. La génération des pages pré-rendues reste bloquée : le
build produit les bundles client et serveur, puis échoue en demandant `/_.data`
au serveur local temporaire (ECONNREFUSED). En conséquence,
`check:prerender` ne trouve ni pages HTML, ni sitemap, ni fallback.

Le contenu éditorial, le logo, les images, les coordonnées et les textes juridiques
nécessitent encore validation ou fourniture par JACIGREEN. La fidélité visuelle
n'a pas été validée par comparaison pixel à pixel.

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

## État des pages et fidélité visuelle

| Page | État / fidélité | Écarts ou contenus omis |
|---|---|---|
| Accueil | Partiellement rapproché de la maquette | Hero à deux colonnes, chaîne de valeur, Solutions, Réalisations et Actualités ; fidélité détaillée non validée. |
| À propos | Partiellement rapproché | Chaîne de valeur et média de remplacement ; histoire, mission, vision et valeurs non publiées faute de validation. |
| Solutions et fiches | Fonctionnelles, améliorées | Données API et visuels de remplacement ; composition de la maquette non reproduite intégralement. |
| Services / Formations | Fonctionnelles, section Formations conditionnelle | Aucun catalogue, durée ou session inventé. |
| Réalisations | Fonctionnelle | Filtre pays conservé et visuels de remplacement ; exemples de la maquette non repris. |
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
| `npm test` dans le conteneur frontend | Réussi : 8 fichiers, 57 tests |
| `npm run format:check` dans le conteneur frontend | Réussi |
| `git diff --check` | Réussi |
| Test spécifique `MediaFrame.test.tsx` | Réussi : 3 tests |
| Santé de l'API et listes Solutions, Services, Réalisations, Actualités depuis le frontend | Réussi : HTTP 200 |
| Navigateur : 11 routes, 5 largeurs (360, 390, 768, 1024, 1440 px) | Réussi : 55 vérifications, aucun débordement horizontal et un seul `<h1>` par route |
| Menu mobile et touche Échap | Réussi : ouverture/fermeture vérifiée à 360 px |
| Formulaire de contact dans le navigateur | Réussi : erreurs locales accessibles vérifiées sans envoyer ni enregistrer de demande |
| `npm run build` | Échec à la phase de pré-rendu. Les bundles client et serveur compilent ; le serveur de prévisualisation local refuse la requête `/_.data` sur `127.0.0.1` avec `ECONNREFUSED`. Reproduit dans le conteneur frontend normal et dans un conteneur isolé. |
| `npm run check:prerender` | Échec consécutif au build interrompu : pages HTML, sitemap, robots et fallback absents. |
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
| Logo | En-tête et pied de page | SVG ou PNG transparent | Fichier officiel fourni par JACIGREEN |

Les images éditoriales viennent des champs `cover_image` et `cover_alt` de l'API ;
le stockage et la diffusion en production restent à configurer. Tout média doit
être fourni ou validé par JACIGREEN ; ne pas publier un placeholder comme s'il
s'agissait d'une photographie.

## Informations et décisions humaines requises

- Autorisation de publier le document institutionnel et validation des textes
  descriptifs déjà utilisés dans `frontend/src/content/site-copy.ts`.
- Validation des noms, descriptions, maturités de Solutions et des Services
  dans l'API avant publication.
- Décisions proposées de l'ADR 0003 : Formations comme section Services, termes
  Solutions/Produits et motif informatif du rachat.
- Palette et identité (ADR 0005), logo officiel et photographies.
- Coordonnées publiques, informations légales, politique de confidentialité,
  CGU et validation juridique.
- Date de mise en production.

Le registre complet et les règles de publication se trouvent dans
`docs/content/content-register.md`. Les fichiers de travail préexistants du dépôt
n'ont pas été inclus dans les changements.
