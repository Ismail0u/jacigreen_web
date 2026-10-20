# ADR 0004 — Versions et outillage

**Statut :** Accepté (versions fixées le 15 octobre 2026).

## Décision
| Composant | Version | Raison |
|---|---|---|
| Python | 3.12 | Version de l'image Docker et de la CI |
| Django | 5.2 LTS (5.2.18) | Support de sécurité jusqu'en avril 2028 ; la série 6.x existe mais n'apporte pas de besoin immédiat |
| Django REST Framework / drf-spectacular / django-filter | 3.18.3 / 0.30.0 / 26.2 | Versions courantes compatibles avec Django 5.2 (tests verts) |
| Node.js | ≥ 22.22 | Exigé par `@react-router/dev` 8.4 |
| React / React Router | 19.3.1 / 8.4.0 | React Router 8 exige React ≥ 19.2.7 |
| Vite / Vitest / Tailwind CSS | 8.3.4 / 5.0.4 / 4.3.3 | Versions courantes, tokens via `@theme` |
| TypeScript | 6.0.3 | `typescript-eslint` ne déclare pas encore TypeScript 7 |
| ESLint | 9.39 | `eslint-plugin-jsx-a11y` ne déclare pas encore ESLint 10 |

## Conséquences
Tout est fixé exactement (`package-lock.json`, `requirements/*.txt`). Dependabot propose les mises à jour. À réévaluer : ESLint 10 et TypeScript 7 quand l'écosystème les supportera.
