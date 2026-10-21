# Maquettes Stitch : comment les utiliser

Chaque dossier `design/stitch/jacigreen_*/` contient `code.html` (le code Tailwind exact de l'écran) et `screen.png` (aperçu basse résolution). **Pour reproduire un écran, donne à Copilot le `code.html` : c'est la source la plus fidèle.** Le thème Tailwind des maquettes est déjà dans le projet (`frontend/src/styles/stitch-theme.css`, généré par `tools/generate-stitch-theme.mjs`) : les classes du code Stitch (`bg-primary-container`, `text-headline-lg`, `p-space-lg`, `gap-gutter`…) fonctionnent **telles quelles**.

## Correspondance écran → page du projet
| Maquette | Route | Fichier à modifier |
|---|---|---|
| `jacigreen_accueil_institutional` | `/` | `frontend/src/routes/home.tsx` |
| `jacigreen_propos_notre_histoire` | `/a-propos` | `routes/about.tsx` |
| `jacigreen_nos_solutions` | `/solutions` | `routes/solutions.tsx` |
| `jacigreen_jacibiogaz_fiche_solution` | `/solutions/:slug` | `routes/solution-detail.tsx` |
| `jacigreen_exp_riences_r_alisations` | `/realisations` | `routes/projects.tsx` |
| `jacigreen_formations_transfert_d_expertise` | section de `/services` | `routes/services.tsx` |
| `jacigreen_actualit_s_ressources` | `/actualites` | `routes/news.tsx` |
| `jacigreen_contact` | `/contact` | `routes/contact.tsx`, `features/contact/` |
| `jacigreen_politiques_mentions_l_gales` | `/mentions-legales` | `routes/legal.tsx` (structure seulement) |
| `jacigreen_demande_de_reprise_de_biodigesteur` | **Phase 2, ne pas intégrer** | n/a |

L'en-tête et le pied de page sont communs : `components/layout/Header.tsx` et `Footer.tsx`. Pas de maquette pour la page Services, le détail d'une actualité ni la page 404 : s'inspirer du style des autres écrans.

## Images haute définition (facultatif)
`screen.png` fait environ 220 à 700 px de large : trop petit pour juger les détails. Pour des captures nettes (bureau et mobile), avec Internet :
```bash
npx playwright install chromium
node design/render-screens.mjs
```
Ils créent `desktop.png` et `mobile.png` dans chaque dossier.

## À NE PAS reprendre des maquettes (contenu inventé par Stitch)
- « ISO 14001 », « ISO/IEC 27001 », « certifié », « labellisé »
- brevets : « procédés brevetés », « portail Brevets », « transfert de brevet »
- chiffres techniques et d'impact (rendements, pourcentages, tonnes, foyers, bénéficiaires)
- numéros de téléphone, adresses email, adresses postales
- références d'études, noms de laboratoires et de pôles, sessions de formation, « SA »
- la page « Reprise de biodigesteur » (Phase 2)

Les textes viennent de `docs/content/jacigreen-institutionnel.md` ou de l'API. Les images des maquettes sont des visuels générés hébergés chez Google : ne pas les « hotlinker » ; utiliser un bloc de remplacement (`bg-surface-container`, proportions fixes) en attendant les vraies photos.

## Icônes
Les maquettes utilisent Material Symbols : `<span className="material-symbols-outlined">arrow_forward</span>` fonctionne déjà (police auto-hébergée). Pour une icône pleine : `style={{ fontVariationSettings: "'FILL' 1" }}`.
