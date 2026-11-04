# Images du site

Les visuels de maquettes ne sont pas publiés. Les images de contenu locales
peuvent être utilisées lorsqu'elles sont contextualisées et adaptées à leur
emplacement. Les autres photos ne doivent pas être réutilisées sans vérification
de leur provenance et de leurs droits.

| Fichier servi                         | Source locale                                                      | Emplacement | Ratio | Taille |
| ------------------------------------- | ------------------------------------------------------------------ | ----------- | ----: | -----: |
| `jacigreen-biofertilisant-niger.webp` | `Logo et Images/Collecte Biofertilisant Site Maraicher Niger.jpeg` | `/`         |   4:3 | 321 Ko |

Le fichier WebP est une version optimisée (1800 × 1350 px) ; l'original fourni
est conservé sans modification. Le texte alternatif décrit la scène visible.
Les images de Solutions, Réalisations et Actualités viennent des champs
`cover_image` et `cover_alt` de l'API ; leur stockage et leur diffusion en
production doivent être configurés.

| Emplacement         | Page                | Ratio | Taille recommandée |
| ------------------- | ------------------- | ----: | -----------------: |
| `homeHero`          | `/`                 |   4:3 |     1600 × 1200 px |
| `aboutStory`        | `/a-propos`         |   4:3 |      1200 × 900 px |
| Cartes Solutions    | `/solutions` et `/` |   4:3 |      1200 × 900 px |
| Fiche Solution      | `/solutions/:slug`  |  16:9 |      1600 × 900 px |
| Cartes Réalisations | `/realisations`     |   4:3 |      1200 × 900 px |
| Cartes Actualités   | `/actualites`       |   4:3 |      1200 × 900 px |
| Article             | `/actualites/:slug` |  16:9 |      1600 × 900 px |
