# Registre éditorial et sources de publication

## Autorisation institutionnelle

Le propriétaire a autorisé le 24 octobre 2026 la publication du document
[`jacigreen-institutionnel.md`](./jacigreen-institutionnel.md). Cette autorisation
couvre les faits rapportés dans ce document, avec les réserves qui y figurent.
Le cahier des charges autorise également l’utilisation des contenus issus des
seeds présents dans l’API locale. Cette autorisation couvre les fiches API
recensées ci-dessous ; elle ne permet pas d’ajouter des faits ou des
performances qui n’y figurent pas.

## Sources de vérité par catégorie

| Catégorie | Source de vérité | État de publication | Règle |
|---|---|---|---|
| Présentation, histoire, mission, vision, valeurs, fondatrice, distinctions, culture et perspectives | Document institutionnel autorisé ; textes centralisés dans `frontend/src/content/institutional.ts` | Publiables, avec les réserves originales | Présenter les formulations de mission, vision et valeurs comme proposées. Les chiffres d’impact restent historiques et non actualisés. |
| Solutions | API Django `/api/v1/solutions/` | 3 fiches présentes ; toutes `is_demo=false` | Contenus issus du seed autorisés à la publication. Ne pas ajouter de spécifications ou de performances absentes des fiches et conserver la mention de prototype pour JaciPur’O™. |
| Services | API Django `/api/v1/services/` | 8 fiches présentes ; toutes `is_demo=false` | Contenus issus du seed autorisés à la publication. Aucun tarif, format ou programme de formation ne peut être déduit s’il n’est pas indiqué dans la fiche. |
| Réalisations | API Django `/api/v1/projects/` | 6 fiches présentes ; toutes `is_demo=false` | Contenus issus du seed autorisés à la publication. Distinguer une étude d’une réalisation achevée et une projection d’un résultat constaté. |
| Actualités et ressources | API Django `/api/v1/articles/` | 3 fiches présentes ; toutes `is_demo=false` | Contenus issus du seed autorisés à la publication. Ne pas traiter une date technique de seed comme une date éditoriale confirmée. |
| Publics | Document institutionnel, sans endpoint de catalogue | Catégories d’acteurs autorisées | Ne pas les transformer en liste de clients, bénéficiaires nommés ou partenaires établis. |
| Contact et identité juridique | Formulaire existant et informations disponibles dans la source | Coordonnées publiques et mentions juridiques incomplètes | N’inventer ni adresse, téléphone, email, raison sociale enregistrée, responsable de publication ni hébergeur. |
| Logo et médias | Logo `frontend/public/brand/jacigreen.png` ; registre `frontend/src/content/media.ts` | Logo et photos locales de hero présents ; provenance des photos à confirmer | Les fiches catalogue gardent leurs placeholders tant que des visuels associés validés ne sont pas fournis. |

## Inventaire des 20 fiches issues du seed

L’état de la base locale avait été vérifié le 24 octobre 2026 : 3 solutions, 8
services, 6 réalisations et 3 articles, soit 20 enregistrements. Une vérification
actuelle des listes API retrouve ces 20 fiches et confirme `is_demo=false` pour
chacune.

Les fiches sont accessibles depuis les endpoints publics documentés. Les dates
`published_at` créées lors de l’exécution du seed restent des dates techniques ;
elles ne doivent pas être présentées comme des dates éditoriales confirmées.

| Type | Slug | Correspondance avec la source | Décision |
|---|---|---|---|
| Solution | `jacibiogaz` | §11 : biodigestion et co-substrats | Publication autorisée ; ne pas ajouter de spécifications absentes de la fiche. |
| Solution | `jacigrow` | §11 : biofertilisation et propriétés rapportées historiquement | Publication autorisée ; conserver les réserves attachées aux propriétés rapportées. |
| Solution | `jacipuro` | §11 : prototype et absence de spécifications techniques | Publication autorisée ; conserver le statut prototype et l’absence de spécifications confirmées. |
| Service | `kits-mix-energetiques` | §12 : kits biogaz et photovoltaïque | Publication autorisée ; ne pas inventer de prix ou de modalités commerciales. |
| Service | `biodigesteurs-conception` | §12 : dimensionnement, conception et construction | Publication autorisée ; ne pas inventer de prix ou de modalités commerciales. |
| Service | `formation` | §12 : formation dans les domaines cités | Publication autorisée ; ne pas inventer de cursus, calendrier ou format. |
| Service | `etudes-ingenierie` | §12 : études et ingénierie environnementale et sociale | Publication autorisée ; ne pas étendre le descriptif au-delà de la fiche. |
| Service | `strategie-rse` | §12 : stratégie RSE | Publication autorisée ; ne pas inventer de prix ou de modalités commerciales. |
| Service | `recherche-developpement` | §12 : R&D et éco-conception | Publication autorisée ; ne pas étendre le descriptif au-delà de la fiche. |
| Service | `conseil-assistance-technique` | §12 : appui, conseil et assistance | Publication autorisée ; ne pas inventer de prix ou de modalités commerciales. |
| Service | `equipements-biogaz-irrigation` | §12 : équipements biogaz et irrigation | Publication autorisée ; ne pas inventer de prix ou de modalités commerciales. |
| Réalisation | `burkina-faso-methanisation-2ie` | §14 : unité à 2iE et circuit JaciGrow™ | Publication autorisée ; la date 2018 est rapportée dans la chronologie (§22). |
| Réalisation | `niger-biodigesteurs-jacibiogaz` | §14 : régions et période 2020–2022 | Publication autorisée ; conserver les régions et périodes rapportées sans extrapolation. |
| Réalisation | `niger-zinder-etude-valorisation-dechets` | §14 : étude et centre envisagé à Zinder | Publication autorisée ; distinguer l’étude du centre envisagé d’un centre réalisé. |
| Réalisation | `nigeria-ondo-state-etude-jacinthe` | §14 : étude de faisabilité et capacités projetées | Publication autorisée ; présenter les capacités comme des projections. |
| Réalisation | `burundi-bujumbura-etude-biomethanisation` | §14 : étude de faisabilité autour du lac Tanganyika | Publication autorisée ; présenter le contenu comme une étude de faisabilité. |
| Réalisation | `tchad-ellesadapt-compostage` | §15 : ELLESadAPt et unités de compostage | Publication autorisée ; ne pas ajouter de résultats non rapportés. |
| Article | `une-nuisance-peut-devenir-une-ressource` | §6 : nuance écologique et logique de valorisation | Publication autorisée ; conserver la nuance écologique du texte. |
| Article | `ellesadapt-tchad-compostage-jacinthe` | §15 : ELLESadAPt et activité au Tchad | Publication autorisée ; la date de seed n’est pas une date éditoriale confirmée. |
| Article | `jacipuro-prototype` | §11 : prototype JaciPur’O™ | Publication autorisée ; conserver la mention de prototype et la réserve technique. |

**Décision :** l’autorisation du propriétaire couvre la publication des fiches
issues du seed recensées ici ; elles sont déjà exposées par l’API avec
`is_demo=false`. Ne pas modifier ce statut ni étendre les fiches sans
instruction. Les réserves sur les dates techniques, les études, les projections
et les performances restent applicables.

## Informations à obtenir

- Coordonnées publiques, mentions légales, politique de confidentialité et
  conditions d’utilisation.
- Photographies institutionnelles et médias associés aux fiches.
- Confirmation des dates et résultats de projets lorsqu’ils sont présentés
  comme des faits observés plutôt que comme des éléments issus du seed.
