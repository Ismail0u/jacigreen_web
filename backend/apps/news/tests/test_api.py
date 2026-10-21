from datetime import timedelta

from django.utils import timezone
from rest_framework.test import APITestCase

from apps.news.models import Article


def article(slug, **extra):
    return Article.objects.create(slug=slug, title=slug, excerpt="e", body="b", **extra)


class ArticleApiTests(APITestCase):
    def test_scheduled_article_is_hidden_until_its_date(self):
        article("futur", status="published", published_at=timezone.now() + timedelta(days=1))
        article("passe", status="published")
        body = self.client.get("/api/v1/articles/").json()
        self.assertEqual([r["slug"] for r in body["results"]], ["passe"])
        self.assertEqual(self.client.get("/api/v1/articles/futur/").status_code, 404)

    def test_most_recent_first(self):
        now = timezone.now()
        article("ancien", status="published", published_at=now - timedelta(days=3))
        article("recent", status="published", published_at=now - timedelta(days=1))
        slugs = [r["slug"] for r in self.client.get("/api/v1/articles/").json()["results"]]
        self.assertEqual(slugs, ["recent", "ancien"])

    def test_detail_contains_body(self):
        article("a", status="published")
        self.assertEqual(self.client.get("/api/v1/articles/a/").json()["body"], "b")
