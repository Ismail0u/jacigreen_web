# ADR 0002 — Rendu : pré-rendu statique et Deploy Hook

**Statut :** Accepté. Vérifié le 15 octobre 2026 par un build local contre l'API réelle (voir `docs/quality/testing.md`).

## Contexte
Une SPA React n'envoie pas de contenu dans son HTML initial : les robots de partage (WhatsApp, LinkedIn) et une partie des moteurs de recherche n'exécutent pas JavaScript.

## Problème
Obtenir un HTML initial complet pour les pages publiques, y compris les pages dynamiques (solutions, actualités), sans serveur Node en production.

## Options
1. SPA pure : rejetée (aperçus de liens vides).
2. Service de prerender externe : dépendance et coût supplémentaires.
3. **React Router v8 en mode framework, `ssr: false` + `prerender`** : génération statique au build, aucun serveur à exploiter.

## Décision
Option 3, avec `react-router.config.ts`. La fonction `prerender` liste les routes statiques et interroge l'API pour les slugs des solutions et des articles. **Le build échoue si l'API est injoignable** (échec rapide). À chaque publication, Django appelle un Deploy Hook Vercel (`apps/common/deploy_hook.py`) qui relance le build. Sitemap et robots.txt sont générés après le build (`scripts/generate-sitemap.mjs`). `npm run check:prerender` contrôle le HTML produit.

## Conséquences
- Une page publiée apparaît après la reconstruction (quelques minutes), pas instantanément.
- Une URL non pré-rendue (nouvel article avant reconstruction) retombe sur `__spa-fallback.html` : le serveur répond 200 avec la page « introuvable » (soft 404, `noindex`). Limite connue.
- Le Deploy Hook peut produire plusieurs builds en rafale ; `FRONTEND_DEPLOY_HOOK_COOLDOWN_SECONDS` permet un délai minimal (au risque de manquer une modification : republier dans ce cas).
