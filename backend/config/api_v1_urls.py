"""Routes de l'API publique versionnée (/api/v1/)."""

from django.urls import include, path
from rest_framework.routers import DefaultRouter

from apps.catalog.views import ServiceViewSet, SolutionViewSet
from apps.common.views import HealthView
from apps.contact.views import ContactRequestCreateView
from apps.news.views import ArticleViewSet
from apps.projects.views import ProjectViewSet

router = DefaultRouter()
router.register("solutions", SolutionViewSet, basename="solution")
router.register("services", ServiceViewSet, basename="service")
router.register("projects", ProjectViewSet, basename="project")
router.register("articles", ArticleViewSet, basename="article")

urlpatterns = [
    path("health/", HealthView.as_view(), name="health"),
    path("contact-requests/", ContactRequestCreateView.as_view(), name="contact-request-create"),
    path("", include(router.urls)),
]
