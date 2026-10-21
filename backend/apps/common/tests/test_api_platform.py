import io
import tempfile

from django.contrib.auth import get_user_model
from django.core.management import CommandError, call_command
from django.test import TestCase, override_settings
from rest_framework.settings import api_settings
from rest_framework.test import APITestCase

from apps.catalog.models import Solution
from apps.contact.models import ContactRequest


class PlatformTests(APITestCase):
    def test_health_endpoint(self):
        response = self.client.get("/api/v1/health/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok"})

    def test_unknown_route_uses_uniform_error_format(self):
        response = self.client.get("/api/v1/solutions/inexistant/")
        self.assertEqual(response.status_code, 404)
        body = response.json()
        self.assertEqual(set(body["error"]), {"code", "message", "details"})

    def test_default_permission_is_deny(self):
        self.assertEqual(
            [p.__name__ for p in api_settings.DEFAULT_PERMISSION_CLASSES], ["IsAuthenticated"]
        )

    def test_schema_is_served_and_lists_public_routes(self):
        response = self.client.get("/api/schema/?format=json")
        self.assertEqual(response.status_code, 200)
        paths = response.json()["paths"]
        for expected in ("/api/v1/solutions/", "/api/v1/articles/", "/api/v1/contact-requests/"):
            self.assertIn(expected, paths)

    def test_schema_has_no_warnings(self):
        with tempfile.TemporaryDirectory() as tmp:
            target = f"{tmp}/schema.yml"
            call_command("spectacular", "--validate", "--fail-on-warn", file=target)


class AdminTests(TestCase):
    def setUp(self):
        user = get_user_model().objects.create_superuser(
            "admin", "admin@example.test", "motdepasse-test-1"
        )
        self.client.force_login(user)

    def test_changelists_load(self):
        for model in (
            "catalog/solution",
            "catalog/service",
            "projects/project",
            "news/article",
            "contact/contactrequest",
        ):
            with self.subTest(model=model):
                self.assertEqual(self.client.get(f"/admin/{model}/").status_code, 200)

    def test_contact_requests_cannot_be_created_in_admin(self):
        self.assertEqual(self.client.get("/admin/contact/contactrequest/add/").status_code, 403)

    def test_contact_content_is_read_only(self):
        request = ContactRequest.objects.create(
            subject="general", name="Test", email="t@example.test", message="x" * 25, consent=True
        )
        response = self.client.get(f"/admin/contact/contactrequest/{request.pk}/change/")
        self.assertNotContains(response, 'name="message"')


class SeedDemoTests(TestCase):
    @override_settings(DEBUG=True)
    def test_seed_marks_everything_as_demo(self):
        call_command("seed_demo", stdout=io.StringIO())
        self.assertTrue(Solution.objects.exists())
        self.assertFalse(Solution.objects.filter(is_demo=False).exists())
        self.assertTrue(all(s.name.startswith("[DÉMO]") for s in Solution.objects.all()))

    @override_settings(DEBUG=False)
    def test_seed_refuses_outside_debug(self):
        with self.assertRaises(CommandError):
            call_command("seed_demo", stdout=io.StringIO())
