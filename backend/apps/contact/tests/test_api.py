from django.core.cache import cache
from rest_framework.test import APITestCase

from apps.contact.models import ContactRequest

URL = "/api/v1/contact-requests/"
VALID = {
    "subject": "quote",
    "name": "Awa Test",
    "email": "awa@example.test",
    "organization": "Coopérative de test",
    "message": "Bonjour, je souhaite recevoir un devis pour un projet.",
    "consent": True,
}


class ContactApiTests(APITestCase):
    def setUp(self):
        cache.clear()

    def test_valid_request_is_stored(self):
        response = self.client.post(URL, VALID, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(ContactRequest.objects.count(), 1)
        self.assertFalse(ContactRequest.objects.get().handled)

    def test_consent_is_mandatory(self):
        response = self.client.post(URL, {**VALID, "consent": False}, format="json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()["error"]["code"], "validation_error")
        self.assertIn("consent", response.json()["error"]["details"])

    def test_invalid_email_and_short_message_are_rejected(self):
        response = self.client.post(
            URL, {**VALID, "email": "pas-un-email", "message": "court"}, format="json"
        )
        self.assertEqual(response.status_code, 400)
        self.assertEqual(set(response.json()["error"]["details"]), {"email", "message"})

    def test_unknown_subject_is_rejected(self):
        self.assertEqual(
            self.client.post(URL, {**VALID, "subject": "x"}, format="json").status_code, 400
        )

    def test_honeypot_looks_successful_but_stores_nothing(self):
        response = self.client.post(URL, {**VALID, "website": "http://spam.example"}, format="json")
        self.assertEqual(response.status_code, 201)
        self.assertEqual(ContactRequest.objects.count(), 0)

    def test_requests_are_rate_limited(self):
        statuses = [self.client.post(URL, VALID, format="json").status_code for _ in range(6)]
        self.assertEqual(statuses, [201] * 5 + [429])
        self.assertEqual(ContactRequest.objects.count(), 5)

    def test_submitted_data_cannot_be_read_back(self):
        self.client.post(URL, VALID, format="json")
        self.assertEqual(self.client.get(URL).status_code, 405)
