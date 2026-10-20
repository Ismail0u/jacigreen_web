# ADR 0001 — React + Django, deux applications distinctes

**Statut :** Accepté (décision du développeur, 6 octobre 2026).

## Contexte
Site institutionnel avec actualités, besoin de SEO et d'aperçus de liens, développeur unique, Phase 2 transactionnelle à prévoir. Le CDC Technique initial prévoyait des templates Django pour les pages publiques ; une proposition Next.js + Django REST avait aussi été étudiée.

## Problème
Choisir une architecture évolutive vers la Phase 2 sans réécriture, avec un référencement correct.

## Options
| Option | Avantages | Inconvénients |
|---|---|---|
| A. Next.js + Django REST | SEO natif | Nouveau framework à orchestrer avec l'API, revalidation du cache |
| B. **React (Vite) + Django REST, pages pré-rendues** | Un seul socle React pour les deux phases, compétences maîtrisées | Deux services, API dès la Phase 1, pré-rendu à mettre en place |
| C. Django templates (Phase 1) puis React (Phase 2) | Moins de pièces en Phase 1 | Deux technologies de rendu à maintenir |

## Décision
Option B : frontend React + TypeScript (Vite, React Router) et backend Django REST Framework + PostgreSQL, deux applications distinctes reliées par une API REST. Pas de Next.js, pas de Django Templates pour le frontend.

## Conséquences
API publique en lecture seule dès la Phase 1 (CORS, pagination, limitation de débit) ; deux déploiements (Vercel, Render) ; le frontend réutilise la même API en Phase 2.

## Limites
Surcoût estimé de 5 à 6 jours par rapport à Django SSR. À reconsidérer uniquement si le pré-rendu échoue (ADR-0002) ou si la Phase 2 exige un rendu serveur dynamique pour le catalogue.
