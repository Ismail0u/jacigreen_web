# Design system

**Source unique de vérité : `frontend/src/styles/tokens.css`** (bloc `@theme` de Tailwind CSS 4). Les classes (`bg-brand`, `text-ink-muted`, `text-small`…) en découlent ; aucune valeur n'est écrite en dur dans les composants (un test l'interdit). Statut de la palette : **proposée, à valider par JaciGreen** (ADR-0005).

## Typographie
| Famille | Rôle | Chargement |
|---|---|---|
| DM Sans (variable) | Titres, navigation, boutons, étiquettes (`font-display`) | `@fontsource-variable/dm-sans`, auto-hébergée (licence OFL) |
| Inter (variable) | Texte courant, formulaires (`font-sans`) | `@fontsource-variable/inter` |
| Source Serif 4 (variable) | Texte éditorial long (`font-serif`, composant `Prose`) | `@fontsource-variable/source-serif-4` |

| Token | Taille / interligne | Usage |
|---|---|---|
| `text-display` | 52 px / 1,1 | Titre d'accueil (≥ 768 px) |
| `text-h1` … `text-h3` | 40, 30, 22 px | Titres de page, section, carte |
| `text-lead` | 19 px / 1,65 | Introductions |
| `text-body` | 16 px / 1,65 | Texte courant (maquettes : 15 px) |
| `text-small` | 14 px | Métadonnées, boutons |
| `text-label` | 13 px, capitales, espacement 0,08 em | Étiquettes (maquettes : 12 px) |

## Couleurs et contrastes (WCAG 2.2 AA, calculés)
| Texte / élément | Fond | Ratio | Minimum | Usage |
|---|---|---|---|---|
| `ink` #202522 | `surface` #f5f3ec | 14.02:1 | 4.5:1 | Texte courant |
| `ink` #202522 | `surface-alt` #e9e4d8 | 12.27:1 | 4.5:1 | Texte sur bandeau sable |
| `ink-muted` #5a635d | `surface` #f5f3ec | 5.60:1 | 4.5:1 | Texte secondaire |
| `ink-muted` #5a635d | `surface-alt` #e9e4d8 | 4.90:1 | 4.5:1 | Texte secondaire sur sable |
| `brand` #173a2c | `surface` #f5f3ec | 11.27:1 | 4.5:1 | Titres |
| `on-brand` #f5f3ec | `brand` #173a2c | 11.27:1 | 4.5:1 | Texte sur fond vert forêt |
| `accent` #3f6b45 | `surface` #f5f3ec | 5.56:1 | 4.5:1 | Liens et actions |
| `ochre-text` #7f5c20 | `surface` #f5f3ec | 5.48:1 | 4.5:1 | Étiquettes ocre sur ivoire |
| `ochre-text` #7f5c20 | `surface-alt` #e9e4d8 | 4.79:1 | 4.5:1 | Étiquettes ocre sur sable |
| `on-ochre-strong` #ffffff | `ochre-strong` #8a6427 | 5.34:1 | 4.5:1 | Bouton d'accent |
| `magenta-text` #8f3f77 | `surface` #f5f3ec | 6.01:1 | 4.5:1 | Magenta en texte |
| `danger` #a8231b | `surface-raised` #ffffff | 7.19:1 | 4.5:1 | Erreurs |
| `surface-raised` #ffffff | `danger` #a8231b | 7.19:1 | 4.5:1 | Badge démonstration |
| `success` #2e6b3a | `surface-raised` #ffffff | 6.40:1 | 4.5:1 | Succès |
| `border-strong` #6b746e | `surface-raised` #ffffff | 4.83:1 | 3:1 | Bordure de champ |
| `focus` #173a2c | `surface` #f5f3ec | 11.27:1 | 3:1 | Anneau de focus |
| `focus-on-dark` #f5f3ec | `brand` #173a2c | 11.27:1 | 3:1 | Focus sur fond sombre |

Couleurs **décoratives, interdites en texte** (échouent volontairement) :

| Couleur | Fond | Ratio |
|---|---|---|
| `ochre` #b78a4a | `surface` #f5f3ec | 2.80:1 |
| `logo-green` #3fa244 | `surface` #f5f3ec | 2.93:1 |
| `logo-magenta` #b55c98 | `surface` #f5f3ec | 3.82:1 |
| `logo-grey` #878381 | `surface` #f5f3ec | 3.38:1 |

Règles : l'ocre `#B78A4A` et les couleurs du logo servent aux filets et aplats sans texte ; en texte, utiliser `ochre-text`, `magenta-text`. Couleurs du logo extraites d'un JPEG 400×400 (approximatives).

## Autres tokens
Rayons 0 / 2 / 4 px ; ombres `shadow-hairline` et `shadow-raised` (quasi absentes) ; largeurs `max-w-page` (80 rem) et `max-w-reading` (44 rem) ; points de rupture 40, 48, 64, 80 rem ; transitions 150 / 220 ms avec `ease-standard`.

## Règles visuelles
Sobre et institutionnel : pas de dégradés décoratifs, pas d'ombres lourdes, animations minimales (désactivées si `prefers-reduced-motion`), cartes non uniformes (listes à filets, bandeaux, cartes), icônes cohérentes (aucune pour l'instant). Les contenus fictifs sont signalés par un bandeau rouge et un badge « Démonstration ».
