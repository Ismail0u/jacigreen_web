# ADR 0003 — Périmètre Phase 1 du socle

**Statut :** Proposé. À confirmer par JaciGreen (contradictions C1 à C4 de `docs/project/audit-initial.md`).

## Contexte
Les CDC, le Notion et la demande de socle divergent sur le rachat, les formations, la taxonomie produits/solutions et les pages légales.

## Décision proposée
Implémenté dans le socle : accueil, à propos (contenu non contesté seulement), solutions (liste, fiche), services, réalisations (liste filtrable par pays), actualités (liste, article), contact et devis (motifs dont « Rachat de biodigesteur, information »), page légale de substitution.

Non implémenté : page Formations (catalogue, ou section de Services, à trancher), fiche détaillée de réalisation, formulaire de rachat avec pièces jointes (Phase 2), commandes, comptes, paiement, inscription en ligne, version anglaise, newsletter.

## Conséquences
Le modèle `Solution` (catégorie énergie / fertilisation / eau / autre) remplace « Produits » ; renommage possible sans impact sur l'architecture. Ajouter une page Formations demande un modèle `Training` et une route.
