# Instructions GitHub Copilot — JACIGREEN

Lis ce fichier en entier avant toute tâche, puis les fichiers de `.github/instructions/` qui correspondent aux fichiers que tu modifies. Pour une tâche non triviale, commence par lire `docs/architecture/overview.md` et `docs/adr/`.

## Contexte
JACIGREEN est une entreprise africaine de valorisation des ressources naturelles et des déchets (jacinthe d'eau, biogaz, biofertilisants). Ce dépôt contient son site institutionnel (Phase 1 : vitrine, solutions, services, réalisations, actualités, contact et devis). La Phase 2 (commandes, comptes, rachat de biodigesteurs, paiement) viendra après validation et NE DOIT PAS être anticipée.

## Architecture (décision actée : voir `docs/adr/0001`)
- `frontend/` : React 19 + TypeScript strict + Vite + React Router (mode framework, `ssr: false` + `prerender`) + Tailwind CSS 4.
- `backend/` : Django 5.2 LTS + Django REST Framework + PostgreSQL. API versionnée `/api/v1/`, documentée (OpenAPI).
- Deux applications distinctes, reliées uniquement par l'API REST. Le frontend n'accède jamais à la base.
- Le contenu est édité dans Django Admin ; la publication déclenche un Deploy Hook qui reconstruit (pré-rend) le frontend.

## Commandes
```bash
docker compose up --build -d                  # démarrer
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py seed_demo           # données FICTIVES
docker compose exec -e DJANGO_SETTINGS_MODULE=config.settings.test backend python manage.py test
docker compose exec backend ruff check . && docker compose exec backend ruff format --check .
docker compose exec frontend npm run lint
docker compose exec frontend npm run format:check
docker compose exec frontend npm run typecheck
docker compose exec frontend npm test
docker compose exec frontend npm run build && docker compose exec frontend npm run check:prerender
```

## Procédure avant de modifier un fichier
1. Lis le fichier et ses tests. 2. Cherche un composant, un hook ou un service existant avant d'en créer un. 3. Vérifie les ADR concernés. 4. Fais le plus petit changement qui répond au besoin. 5. Ajoute ou adapte les tests. 6. Lance les contrôles ci-dessus. 7. Mets à jour la documentation concernée.

## Principes de conception
SOLID, KISS, DRY, YAGNI, séparation des responsabilités, composition plutôt qu'héritage, échec rapide, explicite plutôt qu'implicite, moindre privilège, défense en profondeur. Un design pattern n'est introduit que pour un problème identifiable ; explique en une phrase le problème, la solution, le bénéfice et le coût de maintenance. Pas de repository systématique, pas de CQRS, pas de microservices, pas de Redux/Zustand tant que les besoins ne les justifient pas.

## Conventions
- Python : Ruff (voir `backend/pyproject.toml`), noms explicites, un domaine fonctionnel par app Django dans `backend/apps/`.
- TypeScript : mode strict, jamais de `any`, imports de types avec `import type`, alias `~/` pour `frontend/src/`.
- Noms de fichiers React : composants en PascalCase (`SolutionCard.tsx`), routes en kebab-case (`solution-detail.tsx`).
- Commits : Conventional Commits en français ou anglais (`feat(api): ajoute le filtre par pays`). Une branche par sujet, pull request relue, CI verte avant fusion.

## Sécurité (non négociable)
Aucun secret dans le code, les images ou les variables `VITE_*` (publiques). Permissions DRF explicites (le défaut refuse tout). Validation serveur systématique. CORS restreint. Limitation de débit sur les endpoints publics en écriture. Pas de HTML utilisateur rendu sans échappement. `DEBUG=False` en production. Détail : `docs/architecture/security.md`.

## Intégrité des contenus (non négociable)
N'invente JAMAIS d'information institutionnelle : certifications, normes, brevets, performances, chiffres d'impact, statistiques, coordonnées, emails, adresses, dates, références d'études, témoignages, résultats, textes juridiques. Si une information manque, laisse un emplacement vide, documente-la dans `docs/content/content-register.md` et signale-la. Les données fictives portent `is_demo=True` et le préfixe « [DÉMO] » ; elles ne doivent jamais atteindre la production (`npm run check:prerender -- --forbid-demo`).

## Design system
La source unique est `frontend/src/styles/tokens.css`. N'écris aucune couleur, taille ou espacement en dur dans un composant ; n'utilise pas `text-ochre` (décoratif) mais `text-ochre-text`. Contrastes WCAG 2.2 AA vérifiés par `tokens.test.ts`. Style sobre et institutionnel : rayons faibles, pas d'ombres lourdes, pas de dégradés décoratifs, animations minimales (respecter `prefers-reduced-motion`). Détail : `docs/architecture/design-system.md`.

## Reproduire les maquettes Stitch
Les maquettes sont dans `design/stitch/*/code.html` (code Tailwind) et `screen.png`. Lis `design/README.md` pour la correspondance écran → page. Le thème Stitch est dans `frontend/src/styles/stitch-theme.css` : les classes du code Stitch fonctionnent telles quelles ; recopie la structure et les classes plutôt que de réinventer le style. Les textes viennent de `docs/content/jacigreen-institutionnel.md` ou de l'API ; n'inclus jamais ISO, brevets, chiffres, coordonnées ou références d'études des maquettes. Prompts prêts à l'emploi : `COPILOT_START.md`.

## Qualité
Tout changement de comportement a un test. N'affaiblis jamais un test et ne contourne jamais la CI. Accessibilité : HTML sémantique, labels, focus visible, navigation clavier, états de chargement/erreur/vide.

## Interdictions
- Réécrire l'architecture ou changer de framework sans ADR validé (Next.js, Django Templates pour le frontend, etc. sont exclus).
- Ajouter une dépendance sans justification écrite dans la pull request.
- Désactiver, supprimer ou assouplir un test, un lint, une règle de type ou une protection pour faire passer la CI.
- Introduire des secrets, inventer des données institutionnelles, dupliquer un composant existant.
- Modifier les tokens graphiques sans raison documentée.
- Supprimer une fonctionnalité existante sans validation.
- Intégrer la reprise de biodigesteur ou toute fonctionnalité de Phase 2.

## Documentation
Toute décision structurante crée un ADR dans `docs/adr/`. Toute commande modifiée est répercutée dans `README.md`. Distingue toujours « implémenté », « partiellement implémenté » et « à faire ».
