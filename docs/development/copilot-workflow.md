# Développer avec GitHub Copilot (VS Code)

## Mise en place
1. Ouvrir le dossier racine du dépôt dans VS Code ; installer les extensions recommandées (`.vscode/extensions.json`), dont GitHub Copilot et Copilot Chat.
2. Les instructions persistantes sont lues automatiquement : `.github/copilot-instructions.md` (tout le dépôt) et `.github/instructions/*.instructions.md` (selon `applyTo`). Le réglage `github.copilot.chat.codeGeneration.useInstructionFiles` est activé dans `.vscode/settings.json`.
3. Les cinq agents spécialisés sont dans `.github/agents/*.agent.md` : ils apparaissent dans le sélecteur de mode du Chat si votre version de VS Code et de Copilot prend en charge les agents personnalisés (fonction récente, à vérifier dans votre installation). Sans elle, les instructions générales s'appliquent quand même.
4. Les agents ne restreignent pas leurs outils (champ `tools` omis) : la restriction de périmètre repose sur leurs instructions. Ajouter un champ `tools` selon la documentation de votre version si vous voulez la durcir.

## Le cycle de travail à demander à Copilot
| Étape | Demande type |
|---|---|
| 1. Comprendre le contexte | « Lis `.github/copilot-instructions.md`, `docs/architecture/overview.md` et les ADR, puis résume l'architecture et les interdits. » |
| 2. Analyser la tâche | « Voici la tâche : … Reformule-la, liste les hypothèses et les informations manquantes. Ne code rien. » |
| 3. Identifier les fichiers | « Quels fichiers sont concernés (code, tests, docs, migrations) ? Existe-t-il déjà un composant ou un service réutilisable ? » |
| 4. Proposer une approche | « Propose le plus petit changement possible, avec les risques et les alternatives écartées. J'attends ma validation. » |
| 5. Implémenter | « Implémente l'approche validée, uniquement dans le périmètre convenu. » |
| 6. Ajouter les tests | « Ajoute les tests (cas nominal, cas limites, permissions, erreurs). N'affaiblis aucun test existant. » |
| 7. Exécuter les contrôles | « Exécute lint, types, tests et, si pertinent, `build` + `check:prerender`. Donne les résultats réels. » |
| 8. Documentation | « Mets à jour README, `docs/` et crée un ADR si la décision est structurante. » |
| 9. Régressions | « Relis le diff : qu'est-ce qui pourrait casser (API, SEO, accessibilité, migrations) ? » |
| 10. Synthèse | « Liste les fichiers modifiés, les contrôles exécutés ou non, et les risques résiduels. » |

## Exemples de prompts pour JACIGREEN
- **Page Formations** : « Agent Software Architect : propose un ADR pour ajouter un catalogue de formations (titre, description, durée, public cible, sans inscription en ligne), en cohérence avec l'ADR-0003. Ne code pas. »
- **Backend** : « Agent Backend Specialist : ajoute un modèle `Training` publiable avec admin, endpoint `/api/v1/trainings/`, migration, tests de permissions et de nombre de requêtes. Aucune donnée institutionnelle inventée. »
- **Frontend** : « Agent Frontend Specialist : crée la route `/formations` avec `loader`, `meta`, états vide/erreur, tests Vitest, et ajoute-la à `prerender`. Utilise uniquement les tokens et `components/ui`. »
- **Contenu** : « Ajoute au registre des contenus la liste des champs que JaciGreen doit fournir pour la page Formations, sans rédiger de contenu. »
- **Accessibilité** : « Agent QA Engineer : audite `/contact` (clavier, lecteur d'écran, contrastes, messages d'erreur) et écris les tests manquants. »
- **Déploiement** : « Agent DevOps Engineer : vérifie que `docs/operations/docker.md` correspond à `compose.yaml` et aux Dockerfiles ; liste ce qui n'est pas vérifiable localement. »
- **Revue** : « Relis ce diff selon la liste de contrôle de `docs/development/contributing.md` et signale toute violation des interdits. »

## Bonnes pratiques
Donner une tâche à la fois ; demander une proposition avant le code ; relire chaque diff ; exiger les résultats réels des commandes ; ne jamais accepter un correctif qui désactive un test ; renvoyer vers les ADR plutôt que de rediscuter l'architecture.
