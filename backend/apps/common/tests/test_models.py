from datetime import timedelta

from django.test import TestCase
from django.utils import timezone

from apps.catalog.models import Solution


def make_solution(slug: str, **extra) -> Solution:
    defaults = {
        "name": slug.title(),
        "category": Solution.Category.ENERGY,
        "summary": "Résumé",
        "description": "Description",
    }
    return Solution.objects.create(slug=slug, **{**defaults, **extra})


class PublishableModelTests(TestCase):
    def test_draft_has_no_publication_date(self):
        self.assertIsNone(make_solution("brouillon").published_at)

    def test_publishing_sets_date_once(self):
        solution = make_solution("publie", status="published")
        first_date = solution.published_at
        self.assertIsNotNone(first_date)
        solution.summary = "Modifié"
        solution.save()
        self.assertEqual(solution.published_at, first_date)

    def test_published_queryset_excludes_drafts_and_scheduled(self):
        make_solution("a-brouillon")
        make_solution("b-publie", status="published")
        make_solution(
            "c-planifie", status="published", published_at=timezone.now() + timedelta(days=2)
        )
        slugs = list(Solution.objects.published().values_list("slug", flat=True))
        self.assertEqual(slugs, ["b-publie"])
