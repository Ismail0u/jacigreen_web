---
applyTo: "**/*.test.ts,**/*.test.tsx,**/tests/**/*.py"
---
# Tests

- Un test vérifie un comportement observable, pas l'implémentation. Nom du test = phrase en français décrivant le comportement attendu.
- Frontend (Vitest + Testing Library) : requête par rôle et libellé (`getByRole`, `getByLabelText`), jamais par classe CSS. Simule l'API en mockant `fetch` ou `~/services/api/*`, pas le composant testé.
- Backend (Django `TestCase` / DRF `APITestCase`) : une base PostgreSQL réelle ; teste les permissions, les cas limites, les erreurs au format uniforme et le nombre de requêtes.
- Ne désactive jamais un test (`skip`, `xfail`, commentaire) pour faire passer la CI et n'augmente pas un seuil de tolérance pour masquer une régression. Corrige la cause.
- Pas de dépendance à l'heure, au réseau externe ou à l'ordre d'exécution.
- Parcours critiques à couvrir par des tests de bout en bout (à compléter) : navigation, formulaire de contact, pré-rendu des pages dynamiques.
