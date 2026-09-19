# JaciGreen

> **Digital platform for environmental innovation and green solutions.**

JaciGreen est une entreprise dédiée à la valorisation des solutions environnementales et agricoles durables.

La plateforme a pour objectif de présenter les produits et services de JaciGreen, promouvoir ses activités et formations, publier ses actualités et permettre aux utilisateurs de soumettre des demandes, notamment pour le **rachat de biodigesteurs et autres équipements concernés**.

Le projet est développé selon une architecture moderne, modulaire et évolutive afin de permettre l'intégration progressive de nouvelles fonctionnalités.

---

## Objectifs du projet

La Phase 1 vise principalement à construire une plateforme web professionnelle permettant de :

* présenter JaciGreen et ses activités ;
* présenter les produits et solutions disponibles ;
* présenter les formations proposées ;
* publier des actualités et contenus ;
* permettre aux visiteurs de contacter JaciGreen ;
* permettre de soumettre une demande de rachat ;
* centraliser les demandes dans un espace d'administration ;
* améliorer la visibilité de JaciGreen sur les moteurs de recherche ;
* disposer d'une architecture prête à évoluer vers des fonctionnalités commerciales plus avancées.

---

##  Fonctionnalités — Phase 1

### 🌐 Site public

* [ ] Page d'accueil
* [ ] Présentation de JaciGreen
* [ ] Page Produits
* [ ] Détail d'un produit
* [ ] Page Formations
* [ ] Détail d'une formation
* [ ] Page Actualités
* [ ] Détail d'une actualité
* [ ] Formulaire de contact
* [ ] Formulaire de demande de rachat
* [ ] Pages légales
* [ ] Responsive design
* [ ] SEO technique

### 🔐 Administration

* [ ] Authentification administrateur
* [ ] Gestion des produits
* [ ] Gestion des formations
* [ ] Gestion des actualités
* [ ] Gestion des demandes de rachat
* [ ] Gestion des demandes de contact
* [ ] Gestion des statuts
* [ ] Notes internes
* [ ] Consultation des informations soumises par les utilisateurs

### Infrastructure

* [ ] Environnement local Docker
* [ ] PostgreSQL
* [ ] CI avec GitHub Actions
* [ ] Déploiement backend
* [ ] Déploiement frontend
* [ ] Domaine personnalisé
* [ ] HTTPS
* [ ] Monitoring
* [ ] Sauvegardes
* [ ] Procédure de rollback

---

# Architecture

L'application repose sur une architecture séparant le frontend et le backend.

```text
                         INTERNET
                            │
                            ▼
                    ┌───────────────┐
                    │    DOMAIN     │
                    │   Hostinger   │
                    └───────┬───────┘
                            │
                 ┌──────────┴──────────┐
                 │                     │
                 ▼                     ▼
        ┌────────────────┐     ┌────────────────┐
        │     Vercel     │     │     Render     │
        │                │     │                │
        │ React + Vite   │────▶│ Django + DRF   │
        │ TypeScript     │ API │                │
        └────────────────┘     └───────┬────────┘
                                       │
                            ┌──────────┼──────────┐
                            │          │          │
                            ▼          ▼          ▼
                      PostgreSQL   File Storage  Email
```

### Composants

| Composant        | Technologie        | Responsabilité          |
| ---------------- | ------------------ | ----------------------- |
| Frontend         | React + TypeScript | Interface utilisateur   |
| Backend          | Django + DRF       | API et logique métier   |
| Database         | PostgreSQL         | Persistance des données |
| Frontend hosting | Vercel             | Déploiement frontend    |
| Backend hosting  | Render             | Déploiement API         |
| Domain/DNS       | Hostinger          | Domaine et DNS          |
| Version control  | GitHub             | Code source             |
| CI/CD            | GitHub Actions     | Automatisation          |
| Monitoring       | Sentry / logs      | Détection des erreurs   |

---

# Stack technique

## Frontend

* React
* TypeScript
* Vite
* React Router
* Tailwind CSS
* shadcn/ui
* TanStack Query
* React Hook Form
* Zod
* Framer Motion

## Backend

* Python
* Django
* Django REST Framework
* PostgreSQL
* django-filter
* drf-spectacular
* pytest
* pytest-django
* Ruff

## DevOps

* Git
* GitHub
* Docker
* Docker Compose
* GitHub Actions
* Vercel
* Render

---

# Structure du projet

Le projet est organisé en deux repositories principaux.

## Backend

```text
jacigreen-backend/
│
├── config/
│
├── apps/
│   ├── products/
│   ├── trainings/
│   ├── articles/
│   ├── buybacks/
│   └── contact/
│
├── tests/
│
├── docs/
│
├── requirements/
│
├── Dockerfile
├── docker-compose.yml
├── manage.py
├── .env.example
└── README.md
```

## Frontend

```text
jacigreen-frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── features/
│   ├── hooks/
│   ├── services/
│   ├── schemas/
│   ├── types/
│   └── lib/
│
├── public/
├── tests/
├── docs/
│
├── .env.example
└── README.md
```

---

# Installation

## Prérequis

Avant de commencer, installer :

* Git
* Docker
* Docker Compose
* Node.js LTS
* Python 3.x
* PostgreSQL client — optionnel

Vérifier les installations :

```bash
git --version
docker --version
docker compose version
node --version
python --version
```

---

# Backend — développement local

Cloner le repository :

```bash
git clone <BACKEND_REPOSITORY_URL>
cd jacigreen-backend
```

Créer le fichier d'environnement :

```bash
cp .env.example .env
```

Configurer les variables nécessaires dans `.env`.

Lancer les services :

```bash
docker compose up --build
```

Appliquer les migrations :

```bash
docker compose exec backend python manage.py migrate
```

Créer un superutilisateur :

```bash
docker compose exec backend python manage.py createsuperuser
```

Le backend sera disponible sur :

```text
http://localhost:8000
```

L'interface d'administration :

```text
http://localhost:8000/admin/
```

---

# Frontend — développement local

Cloner le repository :

```bash
git clone <FRONTEND_REPOSITORY_URL>
cd jacigreen-frontend
```

Installer les dépendances :

```bash
npm install
```

Créer le fichier d'environnement :

```bash
cp .env.example .env
```

Configurer :

Lancer le serveur :

```bash
npm run dev
```

Le frontend sera disponible sur :

```text
http://localhost:5173
```

---

#  Tests

## Backend

Lancer les tests :

```bash
pytest
```

Avec couverture :

```bash
pytest --cov
```

Lint :

```bash
ruff check .
```

## Frontend

Lancer les tests :

```bash
npm run test
```

Lint :

```bash
npm run lint
```

Build de production :

```bash
npm run build
```

---
# Convention des commits

Les commits suivent une convention inspirée de Conventional Commits.

```text
feat:
fix:
refactor:
docs:
test:
chore:
security:
```
#  Sécurité

La sécurité fait partie intégrante du développement.

Les principes suivants sont appliqués :

* validation systématique des données ;
* contrôle des permissions ;
* protection CSRF ;
* configuration CORS restrictive ;
* limitation des uploads ;
* validation MIME/type des fichiers ;
* limitation de taille des fichiers ;
* protection des secrets via variables d'environnement ;
* absence de secrets dans Git ;
* HTTPS en production ;
* logs applicatifs ;
* monitoring des erreurs ;
* sauvegardes de la base de données ;
* principe du moindre privilège.

#  Déploiement

## Frontend

Le frontend est prévu pour être déployé sur **Vercel**.

```text
GitHub
   │
   ▼
Vercel
   │
   ▼
Production
```

## Backend

Le backend est prévu pour être déployé sur **Render**.

```text
GitHub
   │
   ▼
Render
   │
   ▼
Django API
   │
   ▼
PostgreSQL
```

## Domaine

Le domaine est géré via **Hostinger**.

Le DNS devra être configuré afin de faire pointer les différents sous-domaines vers les services correspondants.

Exemple :

```text
www.jacigreen.com
        │
        ▼
      Vercel

api.jacigreen.com
        │
        ▼
      Render
```

> Les noms de domaine définitifs seront définis lors de la configuration de production.

---

#  Definition of Done

Une fonctionnalité est considérée comme terminée lorsque :

* [ ] le code est implémenté ;
* [ ] le code respecte les conventions du projet ;
* [ ] les tests nécessaires sont présents ;
* [ ] les tests passent ;
* [ ] le lint passe ;
* [ ] la fonctionnalité est documentée ;
* [ ] la sécurité a été vérifiée ;
* [ ] le responsive est vérifié si nécessaire ;
* [ ] la Pull Request est reviewée ;
* [ ] la fonctionnalité est intégrée dans l'environnement prévu.

---

#  Statut du projet

> **En développement — Phase 1 / MVP**

Le projet est actuellement en phase de cadrage et de développement initial.

---

## Vision

JaciGreen ne doit pas être simplement un site vitrine.

L'objectif est de construire progressivement une **plateforme numérique évolutive** capable d'accompagner les activités, les produits, les formations et les futurs services numériques de JaciGreen.

```text
Website
   ↓
Digital Platform
   ↓
Business Services
   ↓
Data & Automation
   ↓
Future Digital Ecosystem
```

