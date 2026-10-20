# ADR 0006 — Intégrité des contenus et données de démonstration

**Statut :** Accepté.

## Contexte
Les maquettes générées contenaient des certifications, brevets, chiffres et coordonnées inventés. Les publier serait une fausse déclaration.

## Décision
1. Aucune information institutionnelle non validée n'est écrite dans le code ou les données. Ce qui vient du document institutionnel est listé dans `docs/content/content-register.md` avec son statut.
2. Les données fictives portent `is_demo=True` et le préfixe « [DÉMO] ». L'API expose `is_demo` ; le frontend affiche un bandeau et un badge.
3. `seed_demo` refuse de s'exécuter hors `DEBUG`. `npm run check:prerender -- --forbid-demo` fait échouer un build qui contiendrait du contenu de démonstration ; à utiliser pour la production.
4. Les textes juridiques ne sont pas rédigés : page de substitution `noindex`.

## Conséquences
Le site de démonstration est volontairement incomplet. La mise en production exige la saisie de contenus réels dans Django Admin.

