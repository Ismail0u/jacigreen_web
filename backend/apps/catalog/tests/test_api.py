from django.db import connection
from django.test.utils import CaptureQueriesContext
from rest_framework.test import APITestCase

from apps.catalog.models import Service, Solution


def make(slug, **extra):
    data = {"name": slug, "category": "energy", "summary": "r", "description": "d"}
    return Solution.objects.create(slug=slug, **{**data, **extra})


class SolutionApiTests(APITestCase):
    def test_lists_only_published_with_pagination_envelope(self):
        make("visible", status="published")
        make("cache")
        body = self.client.get("/api/v1/solutions/").json()
        self.assertEqual(set(body), {"count", "next", "previous", "results"})
        self.assertEqual([r["slug"] for r in body["results"]], ["visible"])

    def test_draft_detail_is_not_found(self):
        make("cache")
        self.assertEqual(self.client.get("/api/v1/solutions/cache/").status_code, 404)

    def test_detail_exposes_description_but_list_does_not(self):
        make("a", status="published")
        self.assertNotIn("description", self.client.get("/api/v1/solutions/").json()["results"][0])
        self.assertIn("description", self.client.get("/api/v1/solutions/a/").json())

    def test_filter_by_category(self):
        make("e", status="published", category="energy")
        make("f", status="published", category="fertilizer")
        body = self.client.get("/api/v1/solutions/?category=fertilizer").json()
        self.assertEqual([r["slug"] for r in body["results"]], ["f"])

    def test_page_size_is_capped(self):
        for i in range(3):
            make(f"s{i}", status="published")
        body = self.client.get("/api/v1/solutions/?page_size=1000").json()
        self.assertEqual(len(body["results"]), 3)

    def test_query_count_does_not_grow_with_data(self):
        make("un", status="published")
        with CaptureQueriesContext(connection) as one:
            self.client.get("/api/v1/solutions/")
        for i in range(5):
            make(f"plus-{i}", status="published")
        with CaptureQueriesContext(connection) as many:
            self.client.get("/api/v1/solutions/")
        self.assertEqual(len(one), len(many))

    def test_write_methods_are_rejected(self):
        make("a", status="published")
        for method in ("post", "put", "patch", "delete"):
            with self.subTest(method=method):
                url = "/api/v1/solutions/" if method == "post" else "/api/v1/solutions/a/"
                self.assertEqual(
                    getattr(self.client, method)(url, {}, format="json").status_code, 405
                )


class ServiceApiTests(APITestCase):
    def test_lists_published_services(self):
        Service.objects.create(slug="s", title="S", summary="r", status="published")
        Service.objects.create(slug="d", title="D", summary="r")
        body = self.client.get("/api/v1/services/").json()
        self.assertEqual([r["slug"] for r in body["results"]], ["s"])
