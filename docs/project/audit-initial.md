# Audit initial des documents (15 octobre 2026)

Documents examinés : `CDC_General.md`, `CDC_Fonctionnel.md`, le document institutionnel JACIGREEN v1.0 (2026), le logo (JPEG 400×400), les maquettes Google Stitch (10 écrans desktop + `DESIGN.md`), le cahier des charges technique et les ADR du Notion du projet, ainsi que les décisions prises en conversation.

## 1. Décisions conservées
| Décision | Source |
|---|---|
| Frontend React (Vite) + backend Django REST dès la Phase 1, deux applications distinctes | Décision du développeur (6 oct. 2026), CDC Technique |
| Hébergement : domaine et email Hostinger, API + PostgreSQL sur Render, frontend sur Vercel | CDC Général |
| Django Admin comme outil de gestion de contenu | CDC Technique |
| Phase 1 = vitrine, Phase 2 = transactionnel (commandes, comptes, paiement, inscriptions) | CDC Général |
| Pas d'authentification publique en Phase 1 | CDC Général (comptes exclus) |
| Méthode Scrumban en solo, démos hebdomadaires, validation JaciGreen | Notion |
| Typographies DM Sans, Inter, Source Serif 4 ; structure visuelle ivoire / vert forêt / sable / ocre | Maquettes Stitch |
| Corrections de contraste (`#7F5C20`, `#8A6427`, `#5A635D`) | Revue des maquettes du 13 oct. |
| Aucune information institutionnelle inventée | Document institutionnel (section 20), conversation |

## 2. Décisions à corriger
| Point | Problème | Action |
|---|---|---|
| Notion, pages d'architecture | Plusieurs pages décrivent encore « Django SSR en Phase 1 » (ADR-001 Notion, CDC Technique, page d'accueil du projet), ce qui contredit la décision React + Django | Mettre Notion en cohérence avec `docs/adr/0001` (non fait : la mise à jour n'a pas été approuvée) |
| Contenu des maquettes Stitch | Certifications ISO, brevets, chiffres techniques, coordonnées et études **inventés** | Ne rien reprendre ; régénérer ou corriger les maquettes avant validation JaciGreen |
| Identité visuelle des maquettes | Le logo officiel (vert vif, magenta, gris) n'apparaît pas | Voir ADR-0005 : palette proposée, à valider |
| Numérotation des ADR | Notion : ADR-001/002 ; dépôt : 0001 à 0006 | Les ADR du dépôt font foi pour le code ; référencer les deux |

## 3. Contradictions entre documents
| # | Contradiction | Conséquence | Décision proposée |
|---|---|---|---|
| C1 | **Rachat de biodigesteur** : `CDC_General` et `CDC_Fonctionnel` placent un « formulaire de demande informatif » en **Phase 1** ; la demande de ce socle et l'ADR-002 Notion le placent en **Phase 2** | Risque de livrer trop ou trop peu | Le socle propose un motif « Rachat de biodigesteur (information) » dans le formulaire de contact (texte seul, sans pièces jointes). Le formulaire dédié (photos, justificatifs) reste en Phase 2 |
| C2 | **Formations** : `CDC_Fonctionnel` prévoit un catalogue (titre, description, durée, public) ; la demande suggère de les intégrer à la page Services « si confirmé » | Modèle de données et navigation différents | Non implémenté dans le socle ; à trancher (ADR-0003) |
| C3 | **Produits vs Solutions** : le CDC parle de « Produits » (engrais, biodigesteurs) ; le document institutionnel et la demande parlent de « Solutions » (JaciBiogaz™, JaciGrow™, JaciPur'O™) et de « Services » | Taxonomie incertaine | Le socle utilise `Solution` avec une catégorie (énergie, fertilisation, eau, autre) ; à confirmer (ADR-0003) |
| C4 | **Pages légales** : le CDC prévoit CGU, mentions légales et politique de confidentialité (trois documents) ; le socle a une seule page de substitution | Textes juridiques absents | Page unique `noindex` ; à rédiger avec JaciGreen, sans texte inventé |
| C5 | **Délai** : le CDC fixe 2 mois maximum ; la date visée du 10 novembre 2026 n'est plus tenable avec React + Django (analyse du 13 oct.) | Retard ou coupes | Décision de date en attente (24 novembre proposé) |
| C6 | **Mockups vs document institutionnel** : « Produits » et « Formations » détaillées dans les maquettes ne figurent pas dans le document ; le document exige un langage non technique | Écart de fond et de ton | Contenu réel uniquement ; ton accessible |