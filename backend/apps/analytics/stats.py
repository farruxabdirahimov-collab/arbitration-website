"""Daily roll-up shared by the admin dashboard and the Telegram digest."""

from datetime import date, datetime, time, timedelta

from django.db.models import Count
from django.utils import timezone

from .models import Event

# The numbers that actually say whether the site is doing its job. A visit
# count alone does not: a clause copied into a draft contract is a future
# case, a PDF download is a counterparty doing due diligence.
HEADLINE_KINDS = (
    Event.Kind.CLAUSE_COPY,
    Event.Kind.DOC_DOWNLOAD,
    Event.Kind.DOC_OPEN,
    Event.Kind.INQUIRY_SUBMIT,
)


def day_bounds(day: date) -> tuple[datetime, datetime]:
    """Local-time day boundaries — the client reads these numbers in Tashkent,
    so a 'day' has to mean the Tashkent day, not UTC."""
    tz = timezone.get_current_timezone()
    start = timezone.make_aware(datetime.combine(day, time.min), tz)
    return start, start + timedelta(days=1)


def summary(day: date | None = None) -> dict:
    day = day or timezone.localdate()
    start, end = day_bounds(day)
    events = Event.objects.filter(created_at__gte=start, created_at__lt=end)

    by_kind = dict(events.values_list("kind").annotate(n=Count("id")))
    countries = list(
        events.exclude(country="")
        .values_list("country")
        .annotate(n=Count("visitor", distinct=True))
        .order_by("-n")[:6]
    )
    langs = list(events.exclude(lang="").values_list("lang").annotate(n=Count("id")).order_by("-n"))
    referrers = list(
        events.exclude(referrer_host="")
        .values_list("referrer_host")
        .annotate(n=Count("id"))
        .order_by("-n")[:5]
    )

    return {
        "day": day,
        "events": events.count(),
        "views": by_kind.get(Event.Kind.PAGEVIEW, 0),
        "visitors": events.exclude(visitor="").values("visitor").distinct().count(),
        "by_kind": by_kind,
        "countries": countries,
        "langs": langs,
        "referrers": referrers,
        # Drives the "stay silent when nothing happened" rule of the digest.
        "has_activity": events.exists(),
    }
