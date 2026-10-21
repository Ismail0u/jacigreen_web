/**
 * Textes éditoriaux issus du « Document institutionnel & référentiel d'entreprise »
 * (version 1.0, 2026). Statut : repris tels quels de la source interne, publication
 * à CONFIRMER par JaciGreen (voir docs/content/content-register.md).
 * Mission, vision, valeurs, chiffres d'impact, distinctions et financements sont
 * volontairement ABSENTS : ils sont marqués « à valider » dans la source.
 */

export const COMPANY_INTRO =
  "JACIGREEN est une entreprise africaine spécialisée dans la valorisation des ressources naturelles, des déchets organiques et des espèces végétales envahissantes à travers des solutions environnementales, énergétiques et agricoles.";

export const HERO_TITLE = "Une nuisance peut devenir une ressource.";

export interface ValueChainStep {
  label: string;
  description: string;
}

/** Chaîne de valeur (source : sections 6 et 10 du document institutionnel). */
export const VALUE_CHAIN: readonly ValueChainStep[] = [
  {
    label: "Récupérer",
    description: "Collecte et préparation de biomasses et de matières organiques.",
  },
  { label: "Transformer", description: "Procédés adaptés aux usages et aux contextes." },
  {
    label: "Valoriser",
    description: "Biogaz, biofertilisants, compostage et autres voies de valorisation.",
  },
  {
    label: "Utiliser",
    description: "Agriculture, énergie, ménages, communautés, entreprises et collectivités.",
  },
  {
    label: "Mesurer l'impact",
    description:
      "Assainissement, énergie renouvelable, agriculture durable et résilience des communautés.",
  },
];
