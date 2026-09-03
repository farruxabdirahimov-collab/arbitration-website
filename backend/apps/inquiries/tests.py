from django.test import TestCase

from config.settings import with_www_siblings

from .models import Inquiry


class CorsOriginTests(TestCase):
    """A blocked CORS response is indistinguishable, from the form's side,
    from the server being down — so the allowlist has to be forgiving about
    the one difference that is never meaningful."""

    def test_bare_domain_is_allowed_alongside_www(self):
        self.assertEqual(
            with_www_siblings(["https://www.example.uz"]),
            ["https://www.example.uz", "https://example.uz"],
        )

    def test_www_is_allowed_alongside_the_bare_domain(self):
        self.assertEqual(
            with_www_siblings(["https://example.uz"]),
            ["https://example.uz", "https://www.example.uz"],
        )

    def test_an_already_complete_pair_is_not_duplicated(self):
        pair = ["https://example.uz", "https://www.example.uz"]
        self.assertEqual(with_www_siblings(pair), pair)

    def test_port_and_scheme_are_preserved(self):
        self.assertIn("http://www.localhost:5173", with_www_siblings(["http://localhost:5173"]))

    def test_a_malformed_entry_is_left_alone(self):
        self.assertEqual(with_www_siblings(["not-an-origin"]), ["not-an-origin"])


class InquiryApiTests(TestCase):
    payload = {
        "name": "A. Party",
        "contact": "a@example.com",
        "subject": "Contract dispute",
        "message": "We would like to know how to start arbitration proceedings.",
    }

    def test_a_valid_inquiry_is_stored(self):
        response = self.client.post("/api/inquiries/", self.payload)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Inquiry.objects.get().name, "A. Party")

    def test_the_response_exposes_no_triage_state(self):
        """The public serializer covers only the four submitted fields. It
        echoes those back, which is the sender's own message; what it must
        never carry is the registry's side of the record."""
        body = self.client.post("/api/inquiries/", self.payload).json()
        self.assertEqual(set(body), set(self.payload))
        for internal in ("status", "internal_note", "id"):
            self.assertNotIn(internal, body)

    def test_status_cannot_be_set_from_outside(self):
        self.client.post("/api/inquiries/", {**self.payload, "status": "closed"})
        self.assertEqual(Inquiry.objects.get().status, Inquiry.Status.NEW)


class MessageLengthTests(TestCase):
    """The 400 that this produces is the one a visitor can actually fix, so
    the frontend has to refuse the same input — see MIN_MESSAGE there."""

    base = {"name": "A. Party", "contact": "a@example.com", "subject": "S"}

    def test_a_too_short_message_is_refused(self):
        response = self.client.post("/api/inquiries/", {**self.base, "message": "test"})
        self.assertEqual(response.status_code, 400)
        self.assertIn("message", response.json())
        self.assertFalse(Inquiry.objects.exists())

    def test_whitespace_does_not_count_towards_the_minimum(self):
        response = self.client.post("/api/inquiries/", {**self.base, "message": "  hi      "})
        self.assertEqual(response.status_code, 400)

    def test_ten_characters_is_enough(self):
        response = self.client.post("/api/inquiries/", {**self.base, "message": "1234567890"})
        self.assertEqual(response.status_code, 201)
