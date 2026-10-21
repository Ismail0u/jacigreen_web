from django.db import IntegrityError, transaction
from django.test import TestCase
from rest_framework.test import APITestCase

from apps.projects.models import Project


class ProjectApiTests(APITestCase):
    def setUp(self):
        Project.objects.create(
            slug="ne", title="Niger", summary="r", country="NE", status="published"
        )
        Project.objects.create(
            slug="bf", title="Burkina", summary="r", country="BF", status="published"
        )
        Project.objects.create(slug="td", title="Tchad", summary="r", country="TD")

    def test_filter_by_country_and_hide_drafts(self):
        everything = self.client.get("/api/v1/projects/").json()
        self.assertEqual(everything["count"], 2)
        niger = self.client.get("/api/v1/projects/?country=NE").json()
        self.assertEqual([r["slug"] for r in niger["results"]], ["ne"])

    def test_unknown_country_is_rejected(self):
        self.assertEqual(self.client.get("/api/v1/projects/?country=ZZ").status_code, 400)


class ProjectConstraintTests(TestCase):
    def test_end_year_cannot_precede_start_year(self):
        with self.assertRaises(IntegrityError), transaction.atomic():
            Project.objects.create(
                slug="x", title="X", summary="r", country="NE", year_start=2022, year_end=2020
            )
