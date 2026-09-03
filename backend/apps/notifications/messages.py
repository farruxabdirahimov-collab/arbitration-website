"""Message bodies. Kept apart from transport so it stays obvious, in one
short file, exactly what leaves the building."""

from django.conf import settings
from django.utils import timezone


def admin_link(path: str) -> str:
    base = getattr(settings, "SITE_ADMIN_URL", "").rstrip("/")
    return f"{base}{path}" if base else path


def new_inquiry(inquiry) -> str:
    """Signal only — no name, no contact, no message body. Whoever needs the
    substance opens the admin, which is authenticated and audited."""
    when = timezone.localtime(inquiry.created_at).strftime("%d.%m.%Y %H:%M")
    lines = [
        f"🔔 <b>New inquiry #{inquiry.pk}</b>",
        f"{when}",
        "",
        f"Open in admin: {admin_link(f'/admin/inquiries/inquiry/{inquiry.pk}/change/')}",
    ]
    return "\n".join(lines)


def _row(title: str, pairs) -> str | None:
    if not pairs:
        return None
    body = " · ".join(f"{key} {n}" for key, n in pairs)
    return f"{title}: {body}"


def daily_digest(stats: dict) -> str:
    from apps.analytics.models import Event

    labels = {
        Event.Kind.CLAUSE_COPY: "Clause copied",
        Event.Kind.DOC_DOWNLOAD: "PDF downloaded",
        Event.Kind.DOC_OPEN: "Document opened",
        Event.Kind.INQUIRY_SUBMIT: "Inquiries",
    }
    actions = [(text, stats["by_kind"][kind]) for kind, text in labels.items() if stats["by_kind"].get(kind)]

    lines = [
        f"📊 <b>{stats['day'].strftime('%d.%m.%Y')}</b>",
        f"{stats['views']} views · {stats['visitors']} visitors",
    ]
    for row in (
        _row("Countries", stats["countries"]),
        _row("Languages", stats["langs"]),
        _row("Actions", actions),
        _row("Referrers", stats["referrers"]),
    ):
        if row:
            lines.append(row)
    return "\n".join(lines)
