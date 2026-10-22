# Images du site

Aucune image de contenu n'est fournie actuellement. Ne pas réutiliser les visuels
générés des maquettes ni créer de lien vers une image externe. Les images doivent
être reçues de JACIGREEN, validées et placées dans ce dossier ; mettre ensuite à
jour `frontend/src/content/media.ts` et le texte alternatif correspondant.

| Emplacement         | Page                | Ratio | Taille recommandée |
| ------------------- | ------------------- | ----: | -----------------: |
| `homeHero`          | `/`                 |   4:3 |     1600 × 1200 px |
| `aboutStory`        | `/a-propos`         |   4:3 |      1200 × 900 px |
| Cartes Solutions    | `/solutions` et `/` |   4:3 |      1200 × 900 px |
| Fiche Solution      | `/solutions/:slug`  |  16:9 |      1600 × 900 px |
| Cartes Réalisations | `/realisations`     |   4:3 |      1200 × 900 px |
| Cartes Actualités   | `/actualites`       |   4:3 |      1200 × 900 px |
| Article             | `/actualites/:slug` |  16:9 |      1600 × 900 px |

Les images éditoriales des Solutions, Réalisations et Actualités proviennent des
champs `cover_image` et `cover_alt` de l'API. Leur stockage et leur diffusion en
production doivent être configurés ; chaque image doit porter un texte alternatif
renseigné.
