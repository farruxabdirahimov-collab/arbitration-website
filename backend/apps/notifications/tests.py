from unittest.mock import patch

from django.test import TestCase, override_settings

from apps.inquiries.models import Inquiry

from . import telegram

from .messages import admin_link, new_inquiry


@override_settings(SITE_ADMIN_URL="https://admin.example.uz")
class InquirySignalTests(TestCase):
    def setUp(self):
        self.inquiry = Inquiry.objects.create(
            name="Karin Weber",
            contact="k.weber@example.de",
            subject="Supply contract dispute",
            message="Our counterparty in Tashkent has not paid EUR 2.4m since March.",
        )

    def test_message_carries_no_dispute_content(self):
        """The whole point of the signal-only design: confidential facts must
        stay behind the admin login, not sit in a group chat."""
        text = new_inquiry(self.inquiry)
        for secret in ("Karin Weber", "k.weber@example.de", "Supply contract", "2.4m"):
            self.assertNotIn(secret, text)

    def test_message_points_at_the_admin_record(self):
        text = new_inquiry(self.inquiry)
        self.assertIn(f"#{self.inquiry.pk}", text)
        self.assertIn(f"https://admin.example.uz/admin/inquiries/inquiry/{self.inquiry.pk}/change/", text)


class AdminLinkTests(TestCase):
    @override_settings(SITE_ADMIN_URL="")
    def test_link_degrades_to_a_path_when_the_base_url_is_unknown(self):
        """Still useful pasted after the site's own domain, and never a
        message that says "https:///admin/..."."""
        self.assertEqual(admin_link("/admin/x/"), "/admin/x/")

    @override_settings(SITE_ADMIN_URL="https://api.example.uz/")
    def test_trailing_slash_does_not_double_up(self):
        self.assertEqual(admin_link("/admin/x/"), "https://api.example.uz/admin/x/")


class InquirySubmissionTests(TestCase):
    payload = {
        "name": "A. Party",
        "contact": "a@example.com",
        "subject": "Contract dispute",
        "message": "We would like to know how to start arbitration proceedings.",
    }

    @patch("apps.inquiries.views.telegram.send")
    def test_submission_signals_telegram(self, send):
        self.assertEqual(self.client.post("/api/inquiries/", self.payload).status_code, 201)
        send.assert_called_once()

    @patch("apps.inquiries.views.telegram.send", side_effect=RuntimeError("bot is down"))
    def test_inquiry_survives_a_telegram_outage(self, _send):
        with self.assertRaises(RuntimeError):
            self.client.post("/api/inquiries/", self.payload)
        # The row is committed before the notification is attempted.
        self.assertEqual(Inquiry.objects.count(), 1)


class TelegramDiagnosticsTests(TestCase):
    """The check_telegram command exists to turn Telegram's terse refusals
    into something a non-developer can act on, so the mapping is worth a test."""

    def test_hints_cover_the_failures_that_look_identical_from_the_group(self):
        from apps.notifications.management.commands.check_telegram import hint_for

        self.assertIn("@BotFather", hint_for("HTTP 401: Unauthorized"))
        self.assertIn("minus", hint_for("HTTP 400: Bad Request: chat not found"))
        self.assertIn("administrator", hint_for("HTTP 400: Bad Request: not enough rights"))
        self.assertIsNone(hint_for("HTTP 500: Internal Server Error"))

    @override_settings(TELEGRAM_BOT_TOKEN="", TELEGRAM_CHAT_ID="")
    def test_call_reports_a_missing_token_rather_than_raising(self):
        ok, reason = telegram.call("getMe")
        self.assertFalse(ok)
        self.assertIn("TELEGRAM_BOT_TOKEN", reason)

    @override_settings(TELEGRAM_BOT_TOKEN="", TELEGRAM_CHAT_ID="")
    def test_send_is_a_no_op_when_unconfigured(self):
        self.assertFalse(telegram.send("anything"))
