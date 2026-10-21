"""Données d'affichage réalistes, tirées du document institutionnel JACIGREEN v1.0 (2026).

Objectif : voir le site avec des contenus crédibles pendant le développement, sans attendre la
validation de JaciGreen. Tout est marqué is_demo=True : le bandeau « Contenu de démonstration »
reste affiché et `npm run check:prerender -- --forbid-demo` refuse une mise en production
tant que ces contenus existent.

Règles d'intégrité (ADR-0006) : aucun chiffre d'impact, aucune capacité, aucun financeur,
aucun nom de client, aucune certification, aucun brevet. Seuls des faits décrits dans le
document, formulés sans valeur chiffrée. Pour les remplacer par le contenu validé :
`seed_institutional_draft --clear` puis saisie dans Django Admin.
"""

from django.conf import settings
from django.core.management.base import BaseCommand, CommandError

from apps.catalog.models import Service, Solution
from apps.news.models import Article
from apps.projects.models import Project

SOLUTIONS = [
    {
        "slug": "jacibiogaz",
        "name": "JaciBiogaz™",
        "tagline": "Solution de biodigestion",
        "category": Solution.Category.ENERGY,
        "maturity": Solution.Maturity.AVAILABLE,
        "summary": "Solution historique de biodigestion de JACIGREEN, qui utilise un concentré de jacinthe d’eau comme matière première de base.",
        "description": (
            "Le biodigesteur utilise un concentré de jacinthe d’eau comme matière première de base, "
            "avec d’autres co-substrats possibles : déchets de cuisine, restes alimentaires, "
            "résidus agricoles et déjections animales.\n\n"
            "La technologie permet de produire du biogaz et un produit valorisable en agriculture."
        ),
        "display_order": 1,
    },
    {
        "slug": "jacigrow",
        "name": "JaciGrow™",
        "tagline": "Solution de biofertilisation",
        "category": Solution.Category.FERTILIZER,
        "maturity": Solution.Maturity.AVAILABLE,
        "summary": "Solution de biofertilisation développée par JACIGREEN, présentée comme un engrais organique.",
        "description": (
            "JaciGrow™ est la solution de biofertilisation développée par JACIGREEN. "
            "La documentation historique la présente comme un engrais organique pouvant également "
            "jouer les fonctions de fongicide et d’activateur de fertilité.\n\n"
            "Ces informations sont à confirmer par JACIGREEN avant publication."
        ),
        "display_order": 2,
    },
    {
        "slug": "jacipuro",
        "name": "JaciPur’O™",
        "tagline": "En phase de prototypage",
        "category": Solution.Category.OTHER,
        "maturity": Solution.Maturity.PROTOTYPE,
        "summary": "Nouvelle solution de JACIGREEN, actuellement en phase de prototypage.",
        "description": (
            "JaciPur’O™ est une nouvelle solution en phase de prototypage.\n\n"
            "Sa fonction technique, son protocole, ses utilisateurs cibles et ses performances feront "
            "l’objet d’une fiche produit dédiée avant toute communication technique détaillée."
        ),
        "display_order": 3,
    },
]

AUDIENCE = (
    "Ce service s’adresse aux particuliers, entreprises, collectivités et porteurs de projets "
    "dans les domaines de l’assainissement, de la valorisation des déchets, des énergies "
    "renouvelables et de l’agriculture."
)

SERVICES = [
    (
        "kits-mix-energetiques",
        "Kits mix-énergétiques",
        "Installation de kits mix-énergétiques combinant biogaz et photovoltaïque.",
    ),
    (
        "biodigesteurs-conception",
        "Conception de biodigesteurs",
        "Dimensionnement, conception et construction de biodigesteurs.",
    ),
    (
        "formation",
        "Formation",
        "Formation dans les domaines des énergies renouvelables, de la valorisation des déchets et de l’agriculture intégrée.",
    ),
    (
        "etudes-ingenierie",
        "Études et ingénierie",
        "Études, notamment ingénierie et étude d’impact environnemental et social.",
    ),
    (
        "strategie-rse",
        "Démarche et stratégie RSE",
        "Démarche et stratégie de responsabilité sociétale des entreprises (RSE).",
    ),
    (
        "recherche-developpement",
        "Recherche et développement",
        "Recherche et développement à travers l’éco-conception de solutions basées sur la nature.",
    ),
    (
        "conseil-assistance-technique",
        "Appui, conseil et assistance technique",
        "Appui, conseil et assistance technique.",
    ),
    (
        "equipements-biogaz-irrigation",
        "Vente d’équipements",
        "Vente d’équipements associés aux technologies biogaz et à l’irrigation.",
    ),
]

PROJECTS = [
    {
        "slug": "burkina-faso-methanisation-2ie",
        "title": "Unité de méthanisation à 2iE et biofertilisants JaciGrow™",
        "summary": "Réalisation d’une unité de méthanisation et mise en place d’un circuit de distribution de biofertilisants auprès de sites maraîchers de Ouagadougou.",
        "country": Project.Country.BURKINA_FASO,
        "year_start": 2018,
        "year_end": None,
    },
    {
        "slug": "niger-biodigesteurs-jacibiogaz",
        "title": "Biodigesteurs JaciBiogaz™ dans plusieurs régions du Niger",
        "summary": "Installation de biodigesteurs dans des sites maraîchers et des cantines scolaires, dans les régions de Diffa, Dosso, Maradi, Zinder, Tahoua et Tillabéri.",
        "country": Project.Country.NIGER,
        "year_start": 2020,
        "year_end": 2022,
    },
    {
        "slug": "niger-zinder-etude-valorisation-dechets",
        "title": "Étude de faisabilité d’un centre de valorisation organique des déchets, Zinder",
        "summary": "Étude de faisabilité autour d’un Centre de Valorisation Organique des Déchets à Zinder.",
        "country": Project.Country.NIGER,
        "year_start": 2022,
        "year_end": 2023,
    },
    {
        "slug": "nigeria-ondo-state-etude-jacinthe",
        "title": "Étude de faisabilité d’une unité de valorisation de la jacinthe d’eau, Ondo State",
        "summary": "Étude de faisabilité avec des capacités projetées en biofertilisant, biogaz et charbon écologique.",
        "country": Project.Country.NIGERIA,
        "year_start": 2022,
        "year_end": 2023,
    },
    {
        "slug": "burundi-bujumbura-etude-biomethanisation",
        "title": "Étude de faisabilité d’une unité de bio-méthanisation, Bujumbura",
        "summary": "Étude pour une unité valorisant la jacinthe d’eau, les déchets municipaux et agroalimentaires, autour du lac Tanganyika.",
        "country": Project.Country.BURUNDI,
        "year_start": 2022,
        "year_end": 2023,
    },
    {
        "slug": "tchad-ellesadapt-compostage",
        "title": "Projet ELLESadAPt : compostage à base de jacinthe d’eau",
        "summary": "Installation de petites unités de compostage à base de jacinthe d’eau auprès de trois groupements maraîchers, dans les lacs Léré et Tréné.",
        "country": Project.Country.CHAD,
        "year_start": 2025,
        "year_end": None,
    },
]

ARTICLES = [
    {
        "slug": "une-nuisance-peut-devenir-une-ressource",
        "title": "Une nuisance peut devenir une ressource",
        "excerpt": "La jacinthe d’eau n’est pas intrinsèquement nuisible : tout dépend de l’équilibre du milieu et de ce que l’on fait de la biomasse récupérée.",
        "category": Article.Category.RESOURCE,
        "body": (
            "La jacinthe d’eau n’est pas intrinsèquement nuisible. Dans certaines conditions, elle peut "
            "participer à la purification d’un cours d’eau. Lorsqu’elle prolifère de manière incontrôlée "
            "et atteint une certaine maturité, elle peut cependant étouffer la vie aquatique et contribuer "
            "à la dégradation du milieu.\n\n"
            "JACIGREEN intervient sur cette rupture d’équilibre en cherchant à créer une chaîne de valeur "
            "autour de la biomasse récupérée : récupérer, transformer, valoriser, utiliser, puis mesurer l’impact."
        ),
    },
    {
        "slug": "ellesadapt-tchad-compostage-jacinthe",
        "title": "ELLESadAPt au Tchad : composter la jacinthe d’eau",
        "excerpt": "En 2025, JACIGREEN a participé à un projet consacré à la gestion de la jacinthe d’eau dans les lacs Léré et Tréné.",
        "category": Article.Category.PROJECT,
        "body": (
            "En 2025, JACIGREEN a participé au projet ELLESadAPt au Tchad, consacré à la gestion et à la "
            "valorisation de l’espèce envahissante Eichhornia crassipes dans les lacs Léré et Tréné, "
            "situés dans le Complexe d’Aires Protégées de Binder-Léré.\n\n"
            "JACIGREEN a contribué à l’installation de petites unités de compostage à base de jacinthe "
            "d’eau auprès de trois groupements maraîchers. En 2026, cette dynamique se poursuit autour de "
            "nouvelles filières de valorisation, notamment la vannerie et le biogaz."
        ),
    },
    {
        "slug": "jacipuro-prototype",
        "title": "JaciPur’O™ : un prototype en cours de développement",
        "excerpt": "JACIGREEN développe une nouvelle solution, actuellement en phase de prototypage.",
        "category": Article.Category.NEWS,
        "body": (
            "JACIGREEN développe JaciPur’O™, une nouvelle solution actuellement en phase de prototypage.\n\n"
            "Une fiche produit dédiée précisera sa fonction technique, son protocole, ses utilisateurs "
            "cibles et ses performances avant toute communication technique détaillée."
        ),
    },
]


class Command(BaseCommand):
    help = "Crée des contenus réalistes (issus du document institutionnel), tous marqués is_demo."

    def add_arguments(self, parser):
        parser.add_argument(
            "--clear",
            action="store_true",
            help="Supprime d'abord tous les contenus marqués is_demo (y compris ceux de seed_demo).",
        )

    def handle(self, *args, **options):
        if not settings.DEBUG:
            raise CommandError(
                "seed_institutional_draft est réservé au développement (DJANGO_DEBUG=true)."
            )

        if options["clear"]:
            for model in (Solution, Service, Project, Article):
                model.objects.filter(is_demo=True).delete()

        for data in SOLUTIONS:
            Solution.objects.update_or_create(
                slug=data["slug"], defaults={**data, "status": "published", "is_demo": True}
            )
        for order, (slug, title, summary) in enumerate(SERVICES, start=1):
            Service.objects.update_or_create(
                slug=slug,
                defaults={
                    "title": title,
                    "summary": summary,
                    "description": f"{summary}\n\n{AUDIENCE}",
                    "display_order": order,
                    "status": "published",
                    "is_demo": True,
                },
            )
        for data in PROJECTS:
            Project.objects.update_or_create(
                slug=data["slug"], defaults={**data, "status": "published", "is_demo": True}
            )
        for data in ARTICLES:
            Article.objects.update_or_create(
                slug=data["slug"], defaults={**data, "status": "published", "is_demo": True}
            )
        self.stdout.write(
            self.style.SUCCESS(
                f"Brouillon institutionnel créé : {len(SOLUTIONS)} solutions, {len(SERVICES)} services, "
                f"{len(PROJECTS)} réalisations, {len(ARTICLES)} actualités (tous is_demo)."
            )
        )
