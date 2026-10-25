# Registre éditorial et sources de publication

## Autorisation institutionnelle

Le propriétaire a autorisé le 24 octobre 2026 la publication du document
[`jacigreen-institutionnel.md`](./jacigreen-institutionnel.md). Cette autorisation
couvre les faits rapportés dans ce document, avec les réserves qui y figurent.
Elle ne constitue pas une validation indépendante de données éditoriales
reformulées ou ajoutées dans les fiches de démonstration de l’API.

## Sources de vérité par catégorie

| Catégorie | Source de vérité | État de publication | Règle |
|---|---|---|---|
| Présentation, histoire, mission, vision, valeurs, fondatrice, distinctions, culture et perspectives | Document institutionnel autorisé ; textes centralisés dans `frontend/src/content/institutional.ts` | Publiables, avec les réserves originales | Présenter les formulations de mission, vision et valeurs comme proposées. Les chiffres d’impact restent historiques et non actualisés. |
| Solutions | API Django `/api/v1/solutions/` | 3 fiches présentes ; toutes `is_demo=true` | Ne pas recopier les fiches en statique ni changer leur statut. Les rendre uniquement comme démonstrations jusqu’à validation éditoriale explicite. |
| Services | API Django `/api/v1/services/` | 8 fiches présentes ; toutes `is_demo=true` | Ne pas recopier les prestations en statique. Aucun tarif, format ou programme de formation ne peut être déduit. |
| Réalisations | API Django `/api/v1/projects/` | 6 fiches présentes ; toutes `is_demo=true` | Ne pas présenter les fiches comme références confirmées. La source autorisée peut étayer les faits qu’elle rapporte, mais ne confirme pas les ajouts, dates ou formulations absents de la source. |
| Actualités et ressources | API Django `/api/v1/articles/` | 3 fiches présentes ; toutes `is_demo=true` | Ne pas présenter les fiches comme articles éditoriaux publiés. Une donnée de projet de l’API ne devient pas authentique du seul fait qu’elle reprend le document. |
| Publics | Document institutionnel, sans endpoint de catalogue | Catégories d’acteurs autorisées | Ne pas les transformer en liste de clients, bénéficiaires nommés ou partenaires établis. |
| Contact et identité juridique | Formulaire existant et informations disponibles dans la source | Coordonnées publiques et mentions juridiques incomplètes | N’inventer ni adresse, téléphone, email, raison sociale enregistrée, responsable de publication ni hébergeur. |
| Logo et médias | Logo `frontend/public/brand/jacigreen.png` ; registre `frontend/src/content/media.ts` | Logo disponible ; photographies éditoriales à fournir | Conserver les placeholders jusqu’à fourniture de visuels validés. |

## Comparaison des 20 fiches de démonstration

L’état de la base locale a été vérifié le 24 octobre 2026 : 3 solutions, 8
services, 6 réalisations et 3 articles, soit 20 enregistrements au total ; les 20
ont `is_demo=true` et aucun n’a `is_demo=false`.

Chaque ligne ci-dessous a `status=published`, `is_demo=true` et une date
`published_at` générée lors de l’exécution du seed (20 octobre 2026 dans la base
locale vérifiée). Cette date technique ne prouve pas une date de publication
éditoriale.

| Type | Slug | Correspondance avec la source | Décision |
|---|---|---|---|
| Solution | `jacibiogaz` | §11 : biodigestion et co-substrats | Démo ; le statut de catalogue `available` n’est pas une validation éditoriale. |
| Solution | `jacigrow` | §11 : biofertilisation et propriétés rapportées historiquement | Démo ; les propriétés et le statut `available` ne sont pas confirmés séparément dans l’API. |
| Solution | `jacipuro` | §11 : prototype et absence de spécifications techniques | Démo ; conserver le statut prototype, pas de publication de fiche produit confirmée. |
| Service | `kits-mix-energetiques` | §12 : kits biogaz et photovoltaïque | Démo ; aucune modalité commerciale validée. |
| Service | `biodigesteurs-conception` | §12 : dimensionnement, conception et construction | Démo ; aucune modalité commerciale validée. |
| Service | `formation` | §12 : formation dans les domaines cités | Démo ; aucun cursus, calendrier ni format validé. |
| Service | `etudes-ingenierie` | §12 : études et ingénierie environnementale et sociale | Démo ; description de seed non confirmée comme fiche publiée. |
| Service | `strategie-rse` | §12 : stratégie RSE | Démo ; aucune modalité commerciale validée. |
| Service | `recherche-developpement` | §12 : R&D et éco-conception | Démo ; description de seed non confirmée comme fiche publiée. |
| Service | `conseil-assistance-technique` | §12 : appui, conseil et assistance | Démo ; aucune modalité commerciale validée. |
| Service | `equipements-biogaz-irrigation` | §12 : équipements biogaz et irrigation | Démo ; aucune modalité commerciale validée. |
| Réalisation | `burkina-faso-methanisation-2ie` | §14 : unité à 2iE et circuit JaciGrow™ | Démo ; la date 2018 est reprise de la chronologie (§22), mais l’enregistrement n’a pas été validé en tant que fiche. |
| Réalisation | `niger-biodigesteurs-jacibiogaz` | §14 : régions et période 2020–2022 | Démo ; faits rapportés par la source, fiche API non approuvée. |
| Réalisation | `niger-zinder-etude-valorisation-dechets` | §14 : étude et centre envisagé à Zinder | Démo ; l’étude doit rester distincte d’un centre effectivement réalisé. |
| Réalisation | `nigeria-ondo-state-etude-jacinthe` | §14 : étude de faisabilité et capacités projetées | Démo ; les projections ne sont pas des réalisations. |
| Réalisation | `burundi-bujumbura-etude-biomethanisation` | §14 : étude de faisabilité autour du lac Tanganyika | Démo ; fiche API non approuvée. |
| Réalisation | `tchad-ellesadapt-compostage` | §15 : ELLESadAPt et unités de compostage | Démo ; fiche API non approuvée. |
| Article | `une-nuisance-peut-devenir-une-ressource` | §6 : nuance écologique et logique de valorisation | Démo ; le texte rédigé par le seed n’est pas un article approuvé. |
| Article | `ellesadapt-tchad-compostage-jacinthe` | §15 : ELLESadAPt et activité au Tchad | Démo ; la date technique de seed n’est pas une date d’article approuvée. |
| Article | `jacipuro-prototype` | §11 : prototype JaciPur’O™ | Démo ; le texte rédigé par le seed n’est pas un article approuvé. |

**Décision :** ne pas promouvoir ces fiches. L’autorisation de publier le
document ne confirme pas séparément l’exactitude de chaque valeur de base, la
date éditoriale, le statut de service disponible ou le statut de publication.
Garder `is_demo=true` et le contrôle strict jusqu’à validation explicite dans
Django Admin par le responsable du contenu.

## Informations à obtenir

- Validation éditoriale des 20 fiches une par une, ou saisie de fiches corrigées
  dans Django Admin ; ne pas utiliser une commande de promotion globale.
- URL publique définitive du frontend et URL de l’API.
- Coordonnées publiques, mentions légales, politique de confidentialité et
  conditions d’utilisation.
- Photographies institutionnelles et médias associés aux fiches.
