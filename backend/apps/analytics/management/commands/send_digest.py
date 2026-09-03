"""Daily traffic digest for Telegram.

Silent by design when nothing happened. A digest that arrives every morning
whether or not there is news trains its readers to stop opening it; one that
only arrives when there was activity keeps meaning something.

Schedule it on Railway (cron service) at, say, 04:00 UTC ≈ 09:00 Tashkent:

    python manage.py send_digest
"""

from datetime import timedelta

from django.core.management.base import BaseCommand
from django.utils import timezone

from apps.analytics.stats import summary
from apps.notifications import telegram
from apps.notifications.messages import daily_digest


class Command(BaseCommand):
    help = "Send yesterday's traffic digest to Telegram, unless there was no activity."

    def add_arguments(self, parser):
        parser.add_argument(
            "--day",
            help="ISO date to report on (default: yesterday).",
        )
        parser.add_argument(
            "--force",
            action="store_true",
            help="Send even when there was no activity.",
        )
        parser.add_argument(
            "--dry-run",
            action="store_true",
            help="Print the message instead of sending it.",
        )

    def handle(self, *args, **options):
        if options["day"]:
            day = timezone.datetime.fromisoformat(options["day"]).date()
        else:
            day = timezone.localdate() - timedelta(days=1)

        stats = summary(day)
        if not stats["has_activity"] and not options["force"]:
            self.stdout.write(f"No activity on {day} — staying quiet.")
            return

        text = daily_digest(stats)
        if options["dry_run"]:
            self.stdout.write(text)
            return

        if telegram.send(text):
            self.stdout.write(self.style.SUCCESS(f"Digest for {day} sent."))
        else:
            self.stderr.write("Digest was not delivered — see the log.")
