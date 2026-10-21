import io
import re

from django.core.management import CommandError, call_command
from django.test import TestCase, override_settings

from apps.catalog.models import Service, Solution
from apps.news.models import Article
from apps.projects.models import Project

# Éléments à ne JAMAIS retrouver dans le contenu pré-rempli (non validés ou sensibles).
FORBIDDEN = re.compile(
    r"5 000|300 t|250 000|15 000|10 000|4 000|50 000|m³|Catalist|Baastel|Affaires Mondiales|"
    r"ISO|brevet|certifi|Mairie|\+227|@jacigreen",
    re.IGNORECASE,
)


def run(*args):
    call_command("seed_institutional_draft", *args, stdout=io.StringIO())


@override_settings(DEBUG=True)
class SeedInstitutionalDraftTests(TestCase):
    def test_creates_expected_content_all_marked_demo(self):
        run()
        self.assertEqual(Solution.objects.count(), 3)
        self.assertEqual(Service.objects.count(), 8)
        self.assertEqual(Project.objects.count(), 6)
        self.assertEqual(Article.objects.count(), 3)
        for model in (Solution, Service, Project, Article):
            self.assertFalse(model.objects.filter(is_demo=False).exists(), model.__name__)
            self.assertFalse(model.objects.exclude(status="published").exists(), model.__name__)

    def test_prototype_is_presented_without_performance_claims(self):
        run()
        solution = Solution.objects.get(slug="jacipuro")
        self.assertEqual(solution.maturity, Solution.Maturity.PROTOTYPE)
        self.assertIn("fiche produit dédiée", solution.description)

    def test_contains_no_figures_funders_clients_or_certifications(self):
        run()
        texts = []
        for model, fields in (
            (Solution, ("name", "tagline", "summary", "description")),
            (Service, ("title", "summary", "description")),
            (Project, ("title", "summary", "description")),
            (Article, ("title", "excerpt", "body")),
        ):
            for obj in model.objects.all():
                texts.extend(getattr(obj, field) for field in fields)
        offenders = [text for text in texts if FORBIDDEN.search(text)]
        self.assertEqual(offenders, [])

    def test_is_idempotent(self):
        run()
        run()
        self.assertEqual(Solution.objects.count(), 3)
        self.assertEqual(Article.objects.count(), 3)

    def test_clear_removes_previous_demo_content(self):
        run()
        run("--clear")
        self.assertEqual(Solution.objects.count(), 3)

    @override_settings(DEBUG=False)
    def test_refuses_outside_debug(self):
        with self.assertRaises(CommandError):
            run()
