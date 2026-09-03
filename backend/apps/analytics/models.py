from django.db import models


class Event(models.Model):
    """One visitor action, stored without cookies and without an IP address.

    Deliberately first-party: the traffic of an arbitral institution's site
    reveals who is shopping for a forum and in which language, which is
    commercially sensitive to the parties. Handing that to a third-party
    analytics network would be careless, and it would force a consent banner
    on the very visitors we are trying to reassure.
    """

    class Kind(models.TextChoices):
        PAGEVIEW = "pageview", "Page view"
        SECTION = "section", "Section reached"
        LANG_SWITCH = "lang_switch", "Language switched"
        DOC_OPEN = "doc_open", "Document reader opened"
        DOC_DOWNLOAD = "doc_download", "PDF downloaded"
        CLAUSE_COPY = "clause_copy", "Model clause copied"
        INQUIRY_START = "inquiry_start", "Inquiry form started"
        INQUIRY_SUBMIT = "inquiry_submit", "Inquiry submitted"
        CTA = "cta", "Call to action clicked"

    kind = models.CharField(max_length=20, choices=Kind.choices)
    # Free-form discriminator: the document key, the clause seat, the CTA name.
    label = models.CharField(max_length=100, blank=True)
    lang = models.CharField(max_length=5, blank=True)
    path = models.CharField(max_length=200, blank=True)

    # Salted daily digest of IP + user agent. It lets us count distinct
    # visitors per day; it cannot be reversed to an IP and it stops
    # correlating a visitor across days, so it is not personal data we hold.
    visitor = models.CharField(max_length=32, blank=True, db_index=True)
    # Set by the CDN (Cloudflare's CF-IPCountry) when present. Country only —
    # never a city or a coordinate.
    country = models.CharField(max_length=2, blank=True)
    referrer_host = models.CharField(max_length=120, blank=True)

    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [models.Index(fields=["kind", "created_at"])]

    def __str__(self) -> str:
        return f"{self.get_kind_display()} {self.label}".strip()
