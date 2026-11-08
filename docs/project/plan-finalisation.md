# Plan de finalisation JACIGREEN

Mis à jour le 7 novembre 2026 après l’exécution des phases 4 à 6 de la
finalisation du socle. Aucun commit, push ni déploiement n’a été effectué.

## Avancement des phases

| Phase | État | Résultat |
|---|---|---|
| 1 — Diagnostic | Terminée | Contrats API, routes, contenu, UI et informations juridiques examinés. |
| 2 — Stabilisation API et React Router | Terminée | Timeouts différenciés, retries GET limités, pagination validée, erreurs explicites, revalidation des routes Solutions/Actualités et parcours SPA contrôlés. |
| 3 — Refonte UI/UX | Terminée pour le périmètre de la vitrine | Cartes compactées, hero responsive unifié, carrousel mobile contrôlable, palette/contrastes testés, interactions et 11 routes vérifiées à 10 largeurs. Les captures Stitch n’ont pas été comparées pixel à pixel. |
| 4 — Nettoyage | Terminée pour les contrôles statiques | ESLint/TypeScript strict et Ruff ne signalent aucun import/local inutilisé ; aucune suppression de composant, style ou dépendance n’a pu être justifiée par des usages vérifiables. Les fichiers sources ne contiennent pas de marqueurs TODO/FIXME ni d’appels de debug repérés. |
| 5 — Mentions légales et sécurité | Projet rédigé, validation propriétaire requise | Page structurée et `noindex`, sans identité juridique inventée ; liste des pièces administratives ajoutée au registre. Le formulaire de contact est testé et la revue dédiée n’a trouvé aucune vulnérabilité dans son périmètre. |
| 6 — QA et validation finale | Contrôles locaux terminés ; production non certifiée | ESLint, format, TypeScript, 83 tests frontend, build, pré-rendu strict, Ruff, contrôles Django/OpenAPI et 47 tests backend passent. Restent la reconstruction Docker fraîche, la vérification des variables hébergées, la revue juridique et l’évaluation de performance réelle. |

La « phase 2 » ci-dessus est la phase de stabilisation technique du mandat.
Elle n’implémente pas les fonctionnalités transactionnelles de la Phase 2
produit (commandes, comptes, paiement ou rachat avec pièces jointes), qui restent
hors périmètre selon les instructions du dépôt.

## État vérifié

| Sujet | État |
|---|---|
| Catalogues et contrats API | Les 20 fiches (3 solutions, 8 services, 6 réalisations, 3 articles) renvoyées localement et à distance ont des slugs et valeurs `is_demo` concordants ; toutes sont `is_demo=false`. Les contrôles `published` et `published_at` relèvent des filtres côté API. |
| Client API | GET : délai par défaut 20 s et une nouvelle tentative au maximum sur erreur réseau ou HTTP 502/503/504 ; timeout non rejoué. POST : 10 s, jamais rejoué. Schémas paginés, liens API et cycles validés. |
| Routes Solutions/Actualités | Le loader parent recharge ses données quand le slug change ; tests unitaires et navigation SPA liste/détail/retour/autre fiche passent. |
| Responsive | 11 routes vérifiées à 320, 360, 375, 390, 430, 768, 1024, 1280, 1440 et 1920 px : 110 contrôles sans débordement horizontal ni erreur JavaScript. |
| Interactions | Menu mobile et Échap, filtre des réalisations, erreurs de validation du contact et route de détail inexistante vérifiés. Aucun POST n’a été envoyé pendant le contrôle navigateur. |
| Pré-rendu | Contrôle local réussi. Contrôle strict de production réussi avec les URL communiquées et l’API locale, dont les slugs/statuts correspondent à l’API distante. |
| URL communiquées | Frontend `https://jacigreen-web-rho.vercel.app/`, API `https://jacigreen-web.onrender.com/api/v1/`; les sondes navigateur/API exécutées depuis l’hôte répondent HTTP 200. |
| Build Vite | Réussi avec `API_INTERNAL_URL=http://backend:8000`. Le build lançant Render directement depuis le conteneur a échoué sur un délai de connexion réseau. |
| Tests | Frontend : 83 tests ; backend : 47 tests, lors des derniers contrôles consignés dans le rapport. |
| Reconstruction Docker | `docker compose up -d --build` avait échoué sur la résolution DNS du dépôt Python ; l’image fraîche reste à reconstruire et vérifier. |
| Prêt pour production | Non certifié : configuration réelle Vercel/Render à vérifier, informations légales et politique de confidentialité à compléter, reconstruction d’image fraîche et revue juridique non réalisées. |

Les commandes et résultats détaillés sont consignés dans
[`rapport-finalisation.md`](./rapport-finalisation.md) et
[`quality/testing.md`](../quality/testing.md). Ne pas confondre les conteneurs
existants utilisés pour les validations avec une image fraîchement reconstruite.

## Actions restantes

1. Rétablir l’accès DNS/réseau depuis Docker au dépôt Python et réussir
   `docker compose up -d --build`.
2. Vérifier les variables réellement configurées dans Vercel/Render :
   `VITE_SITE_URL=https://jacigreen-web-rho.vercel.app`,
   `VITE_API_URL=https://jacigreen-web.onrender.com` (sans `/api/v1`),
   `API_INTERNAL_URL`, `DJANGO_ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS` et
   `CSRF_TRUSTED_ORIGINS`.
3. Obtenir l’identité juridique enregistrée, l’adresse, le responsable de
   publication, les coordonnées publiques, l’hébergeur et les informations
   nécessaires à la politique de confidentialité. Ne rien compléter par
   supposition.
4. Fournir et approuver les photographies institutionnelles et les médias
   associés aux fiches ; la provenance et les textes alternatifs doivent être
   confirmés.
5. Effectuer une revue visuelle humaine des pages comparée aux captures Stitch ;
   la QA responsive ne constitue pas une comparaison pixel à pixel.
6. Après vérification des variables hébergées, exécuter
   `npm run check:prerender -- --production --forbid-demo` et une vérification
   de préproduction avec la reconstruction fraîche.
7. Évaluer le budget frontend sur un environnement représentatif : le build
   actuel émet notamment une police Material Symbols de 1 138,40 kB ; aucun
   audit Lighthouse/Core Web Vitals n’a encore été effectué.
