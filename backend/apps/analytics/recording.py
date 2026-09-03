"""Recording helper shared by the events endpoint and the PDF download view."""

import hashlib
import logging
from datetime import date
from urllib.parse import urlsplit

from django.conf import settings

from .models import Event

logger = logging.getLogger(__name__)

MAX_LABEL = 100


def _client_ip(request) -> str:
    # Railway and Cloudflare both put the real client first in X-Forwarded-For.
    forwarded = request.META.get("HTTP_X_FORWARDED_FOR", "")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.META.get("REMOTE_ADDR", "")


def visitor_hash(request) -> str:
    """A per-day pseudonym. The date is inside the digest on purpose: the
    hash changes at midnight, so nobody — us included — can follow a visitor
    across days."""
    raw = "|".join(
        [
            str(date.today()),
            settings.SECRET_KEY,
            _client_ip(request),
            request.META.get("HTTP_USER_AGENT", "")[:200],
        ]
    )
    return hashlib.sha256(raw.encode()).hexdigest()[:32]


def referrer_host(request) -> str:
    host = urlsplit(request.META.get("HTTP_REFERER", "")).hostname or ""
    # Our own pages are not a traffic source.
    return "" if host in settings.ALLOWED_HOSTS else host[:120]


def record(request, kind: str, *, label: str = "", lang: str = "", path: str = "") -> None:
    """Never let analytics break the request it is measuring."""
    try:
        Event.objects.create(
            kind=kind,
            label=label[:MAX_LABEL],
            lang=lang[:5],
            path=path[:200],
            visitor=visitor_hash(request),
            country=request.META.get("HTTP_CF_IPCOUNTRY", "")[:2].upper(),
            referrer_host=referrer_host(request),
        )
    except Exception:
        logger.exception("Failed to record %s event", kind)
