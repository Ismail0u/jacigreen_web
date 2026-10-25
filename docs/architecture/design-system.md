# Design system

**Source unique de vérité : `frontend/src/styles/tokens.css`** (bloc `@theme` de Tailwind CSS 4). Les classes (`bg-brand`, `text-ink-muted`, `text-small`…) en découlent ; aucune valeur n'est écrite en dur dans les composants (un test l'interdit). La palette de marque officielle fournie dans la mission y est enregistrée ; les rôles des couleurs UI conservent l'accessibilité WCAG 2.2 AA et la direction des maquettes Stitch (ADR-0005).

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
| `ink` #202522 | `surface` #f6fbf5 | 14.85:1 | 4.5:1 | Texte courant |
| `ink` #202522 | `surface-alt` #ebefea | 13.39:1 | 4.5:1 | Texte sur bandeau secondaire |
| `ink-muted` #5a635d | `surface` #f6fbf5 | 5.93:1 | 4.5:1 | Texte secondaire |
| `ink-muted` #5a635d | `surface-alt` #ebefea | 5.35:1 | 4.5:1 | Texte secondaire sur bandeau |
| `brand` #173a2c | `surface` #f6fbf5 | 11.94:1 | 4.5:1 | Titres |
| `on-brand` #f6fbf5 | `brand` #173a2c | 11.94:1 | 4.5:1 | Texte sur fond vert forêt |
| `accent` #3f6b45 | `surface` #f6fbf5 | 5.89:1 | 4.5:1 | Liens et actions |
| `ochre-text` #7f5c20 | `surface` #f6fbf5 | 5.80:1 | 4.5:1 | Étiquettes ocre sur ivoire |
| `ochre-text` #7f5c20 | `surface-alt` #ebefea | 5.23:1 | 4.5:1 | Étiquettes ocre sur bandeau |
| `on-ochre-strong` #ffffff | `ochre-strong` #8a6427 | 5.34:1 | 4.5:1 | Bouton d'accent |
| `magenta-text` #8f3f77 | `surface` #f6fbf5 | 6.37:1 | 4.5:1 | Variante accessible du magenta en texte |
| `danger` #a8231b | `surface-raised` #ffffff | 7.19:1 | 4.5:1 | Erreurs |
| `surface-raised` #ffffff | `danger` #a8231b | 7.19:1 | 4.5:1 | Badge démonstration |
| `success` #2e6b3a | `surface-raised` #ffffff | 6.40:1 | 4.5:1 | Succès |
| `border-strong` #6b746e | `surface-raised` #ffffff | 4.83:1 | 3:1 | Bordure de champ |
| `focus` #173a2c | `surface` #f6fbf5 | 11.94:1 | 3:1 | Anneau de focus |
| `focus-on-dark` #f6fbf5 | `brand` #173a2c | 11.94:1 | 3:1 | Focus sur fond sombre |

Couleurs **décoratives, interdites en texte** (échouent volontairement) :

| Couleur | Fond | Ratio |
|---|---|---:|
| `ochre` #c29453 | `surface` #f6fbf5 | 2.62:1 |
| `logo-green` #3aa33d | `surface` #f6fbf5 | 3.09:1 |
| `logo-green-secondary` #519152 | `surface` #f6fbf5 | 3.63:1 |
| `logo-green-light` #b8e3b8 | `surface` #f6fbf5 | 1.36:1 |
| `logo-magenta` #b55996 | `surface` #f6fbf5 | 4.14:1 |
| `logo-magenta-light` #e0b5d3 | `surface` #f6fbf5 | 1.71:1 |
| `logo-magenta-dark` #a4648c | `surface` #f6fbf5 | 4.19:1 |
| `logo-grey` #7f7a77 | `surface` #f6fbf5 | 4.05:1 |
| `logo-grey-rose` #b7afb1 | `surface` #f6fbf5 | 2.05:1 |
| `brand-off-white` #f9f8f8 | `surface` #f6fbf5 | 1.01:1 |

La palette de marque complète (dont `brand-white` #ffffff et `brand-black` #000000) est enregistrée dans les tokens et ses valeurs exactes sont testées. Règles : l'ocre et les teintes de marque au contraste insuffisant servent aux filets, repères ou aplats sans texte ; en texte, utiliser `ochre-text`, `magenta-text`, `ink` ou `accent`. Les rapports sont calculés et vérifiés par `tokens.test.ts`.

## Autres tokens
Rayons 0 / 2 / 4 px ; ombres `shadow-hairline` et `shadow-raised` (quasi absentes) ; largeurs `max-w-page` (80 rem) et `max-w-reading` (44 rem) ; points de rupture 40, 48, 64, 80 rem ; transitions 150 / 220 ms avec `ease-standard`.

## Règles visuelles
Sobre et institutionnel : pas de dégradés décoratifs, pas d'ombres lourdes, animations minimales (désactivées si `prefers-reduced-motion`), cartes non uniformes (listes à filets, bandeaux, cartes), icônes cohérentes (aucune pour l'instant). Les contenus fictifs sont signalés par un bandeau rouge et un badge « Démonstration ».
