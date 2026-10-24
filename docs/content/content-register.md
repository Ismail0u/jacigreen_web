# Registre de validation des contenus

Ce registre distingue les sources internes des informations autorisées à être
publiées. La présence d'un contenu dans le document institutionnel ou dans une
maquette ne constitue pas une validation publique. Ne pas promouvoir un élément
au statut « validé » sans confirmation explicite de JACIGREEN et, si pertinent,
une source vérifiable.

| Contenu | Source | Statut | Règle d'affichage |
|---|---|---|---|
| Présentation générale et chaîne de valeur | `jacigreen-institutionnel.md`, sections 2, 6 et 10 | À confirmer avant publication | Formulations descriptives uniquement ; relecture par JACIGREEN requise. |
| Histoire, dates et récit de la fondation | `jacigreen-institutionnel.md`, sections 3–5, 18 et 22 | À confirmer | Ne pas publier de dates ni de récit biographique sans validation. |
| Mission, vision et valeurs | `jacigreen-institutionnel.md`, sections 7–9 | À valider par la direction | Ne pas publier. |
| Solutions, noms commerciaux et descriptions | Document institutionnel et seed `seed_institutional_draft` | Brouillon éditorial | Servir uniquement comme données de développement marquées `is_demo`; valider chaque nom, résumé, maturité et détail avant publication. |
| Services et formations | Document institutionnel, maquette Formations et seed de brouillon | À confirmer | Les services doivent être saisis et validés dans l'API. Ne pas inventer de cursus, durée, session, public ou certification ; aucun modèle `Training` sans décision. |
| Réalisations, pays, partenaires, clients et bénéficiaires | Document institutionnel, maquettes et seed de brouillon | Non validés pour publication | Ne pas publier d'exemple de réalisation, partenaire, client ou bénéficiaire sans validation et preuve. |
| Actualités, études et références | Maquettes Stitch | Non vérifiables | Ne pas publier les titres, chiffres, études ou actualités fictifs des maquettes. Les actualités doivent venir de l'API après validation éditoriale. |
| Chiffres, rendements et impacts | Document institutionnel et maquettes | À actualiser et documenter | Ne pas publier avant vérification, datation et validation. |
| Certifications, normes, brevets et labels | Maquettes | Inventés / interdits | Ne pas publier ni réutiliser. |
| Coordonnées, adresses et contacts publics | Maquettes | Absents des sources validées | Ne rien afficher avant fourniture et validation. |
| Informations légales et textes juridiques | Maquettes et cahiers des charges | À rédiger et valider juridiquement | La page reste une structure neutre `noindex`; ne pas inventer de mentions, politique ou CGU. |
| Logo et photographies | `frontend/public/brand/jacigreen.png` et `frontend/public/images/README.md` | Logo JACIGREEN fourni dans le dépôt ; photographies éditoriales absentes | Le logo carré PNG à fond blanc est intégré dans le Header/Footer. Conserver ses proportions et son fond ; ne pas utiliser les visuels distants des maquettes ni des photographies sans rapport. |
| Palette et identité visuelle | Valeurs exactes fournies dans la mission ; `docs/adr/0005-palette-et-tokens.md` | Palette de marque adoptée comme référence | Les tokens conservent les couleurs exactes ; les teintes insuffisamment contrastées restent décoratives et ne servent pas au texte courant. |
| Objet « Rachat de biodigesteur (information) » | Contradiction C1 de `docs/project/audit-initial.md` | Décision proposée | Conserver uniquement le motif informatif dans le formulaire ; aucun formulaire dédié ni traitement Phase 2. |

## Sources disponibles et limites

- `jacigreen-institutionnel.md` est un document interne version 1.0, pas une
  autorisation de publication.
- `seed_institutional_draft` fournit des données de démonstration ; `seed_demo`
  fournit des données fictives. Elles doivent rester signalées et ne pas être
  publiées.
- Les maquettes Stitch sont des références de composition, pas des sources
  factuelles. Plusieurs contiennent des coordonnées, certifications, chiffres,
  références et projets inventés.
- Le logo JACIGREEN fourni (`frontend/public/brand/jacigreen.png`) est utilisé
  par le site ; aucune photographie éditoriale ni coordonnée publique validée
  n'est recensée dans les ressources du frontend.
