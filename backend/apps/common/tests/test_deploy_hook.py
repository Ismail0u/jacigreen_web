import urllib.error
from unittest import mock

from django.core.cache import cache
from django.test import TestCase, override_settings

from apps.catalog.models import Solution
from apps.common.deploy_hook import trigger_frontend_rebuild

HOOK = "https://api.example.test/hooks/abc"


def _response(status=200):
    response = mock.MagicMock()
    response.__enter__.return_value.status = status
    return response


@override_settings(FRONTEND_DEPLOY_HOOK_URL=HOOK)
class DeployHookSignalTests(TestCase):
    def setUp(self):
        cache.clear()

    def _create(self, **extra):
        return Solution.objects.create(
            slug="s", name="S", category="energy", summary="r", description="d", **extra
        )

    @mock.patch("apps.common.deploy_hook.urllib.request.urlopen")
    def test_publishing_triggers_rebuild(self, urlopen):
        urlopen.return_value = _response()
        with self.captureOnCommitCallbacks(execute=True):
            self._create(status="published")
        self.assertEqual(urlopen.call_count, 1)

    @mock.patch("apps.common.deploy_hook.urllib.request.urlopen")
    def test_draft_does_not_trigger_rebuild(self, urlopen):
        with self.captureOnCommitCallbacks(execute=True):
            self._create()
        urlopen.assert_not_called()

    @mock.patch("apps.common.deploy_hook.urllib.request.urlopen")
    def test_unpublishing_triggers_rebuild(self, urlopen):
        urlopen.return_value = _response()
        solution = self._create(status="published")
        urlopen.reset_mock()
        solution.status = "draft"
        with self.captureOnCommitCallbacks(execute=True):
            solution.save()
        self.assertEqual(urlopen.call_count, 1)

    @mock.patch("apps.common.deploy_hook.urllib.request.urlopen")
    def test_failure_never_breaks_saving(self, urlopen):
        urlopen.side_effect = urllib.error.URLError("réseau indisponible")
        with self.captureOnCommitCallbacks(execute=True):
            solution = self._create(status="published")
        self.assertTrue(Solution.objects.filter(pk=solution.pk).exists())

    @override_settings(FRONTEND_DEPLOY_HOOK_COOLDOWN_SECONDS=60)
    @mock.patch("apps.common.deploy_hook.urllib.request.urlopen")
    def test_cooldown_limits_calls(self, urlopen):
        urlopen.return_value = _response()
        self.assertTrue(trigger_frontend_rebuild("un"))
        self.assertFalse(trigger_frontend_rebuild("deux"))
        self.assertEqual(urlopen.call_count, 1)


class DeployHookConfigurationTests(TestCase):
    @override_settings(FRONTEND_DEPLOY_HOOK_URL="")
    def test_disabled_without_url(self):
        self.assertFalse(trigger_frontend_rebuild("x"))

    @override_settings(FRONTEND_DEPLOY_HOOK_URL="http://insecure.test/hook")
    def test_https_is_required(self):
        self.assertFalse(trigger_frontend_rebuild("x"))
