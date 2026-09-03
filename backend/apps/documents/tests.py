from django.test import TestCase

from apps.analytics.models import Event

from .catalog import available, pdf_path


class DocumentDownloadTests(TestCase):
    def test_manifest_lists_only_published_translations(self):
        data = self.client.get("/api/documents/").json()["available"]
        self.assertEqual(data, available())
        # The signed Statute exists in all three languages.
        self.assertEqual(sorted(data["nizom"]), ["en", "ru", "uz"])

    def test_download_serves_a_pdf(self):
        response = self.client.get("/api/documents/nizom/en/pdf/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response["Content-Type"], "application/pdf")
        self.assertIn("AIACU-Statute-en.pdf", response["Content-Disposition"])
        response.close()

    def test_download_is_recorded(self):
        self.client.get("/api/documents/nizom/ru/pdf/").close()
        event = Event.objects.get()
        self.assertEqual(event.kind, Event.Kind.DOC_DOWNLOAD)
        self.assertEqual(event.label, "nizom:ru")

    def test_unpublished_translation_is_404_not_a_broken_file(self):
        self.assertIsNone(pdf_path("ustav", "en"))
        self.assertEqual(self.client.get("/api/documents/ustav/en/pdf/").status_code, 404)

    def test_unknown_key_cannot_walk_the_filesystem(self):
        self.assertEqual(self.client.get("/api/documents/passwd/en/pdf/").status_code, 404)
        self.assertIsNone(pdf_path("../../config/settings", "en"))
