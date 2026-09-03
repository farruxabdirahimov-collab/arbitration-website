from datetime import timedelta

from django.test import TestCase
from django.utils import timezone

from apps.notifications.messages import daily_digest

from .models import Event
from .stats import summary


class EventEndpointTests(TestCase):
    def post(self, payload, **extra):
        return self.client.post("/api/events/", payload, content_type="application/json", **extra)

    def test_records_a_known_event(self):
        self.assertEqual(self.post({"kind": "clause_copy", "label": "Tashkent", "lang": "en"}).status_code, 204)
        event = Event.objects.get()
        self.assertEqual(event.kind, Event.Kind.CLAUSE_COPY)
        self.assertEqual(event.lang, "en")

    def test_rejects_an_unknown_kind(self):
        self.assertEqual(self.post({"kind": "whatever"}).status_code, 400)
        self.assertFalse(Event.objects.exists())

    def test_stores_no_ip_address(self):
        self.post({"kind": "pageview"}, REMOTE_ADDR="203.0.113.9")
        event = Event.objects.get()
        self.assertNotIn("203.0.113.9", str(event.__dict__))
        self.assertEqual(len(event.visitor), 32)

    def test_country_comes_from_the_cdn_header(self):
        self.post({"kind": "pageview"}, HTTP_CF_IPCOUNTRY="de")
        self.assertEqual(Event.objects.get().country, "DE")

    def test_own_host_is_not_counted_as_a_referrer(self):
        self.post({"kind": "pageview"}, HTTP_REFERER="https://testserver/somewhere")
        self.assertEqual(Event.objects.get().referrer_host, "")


class DigestTests(TestCase):
    def test_quiet_day_reports_no_activity(self):
        stats = summary(timezone.localdate() - timedelta(days=1))
        self.assertFalse(stats["has_activity"])

    def test_digest_names_the_actions_that_happened(self):
        Event.objects.create(kind=Event.Kind.PAGEVIEW, lang="en")
        Event.objects.create(kind=Event.Kind.CLAUSE_COPY, lang="en")
        stats = summary()
        self.assertTrue(stats["has_activity"])
        text = daily_digest(stats)
        self.assertIn("Clause copied 1", text)
        self.assertIn("1 views", text)
