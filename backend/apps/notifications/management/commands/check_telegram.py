"""Diagnose the Telegram wiring end to end.

Written because the failure modes all look identical from the outside — the
group stays silent whether the token is wrong, the chat id is wrong, or the
bot was never added to the group. This asks Telegram directly at each step
and prints its own answer.

    python manage.py check_telegram
"""

from django.conf import settings
from django.core.management.base import BaseCommand

from apps.notifications import telegram

# Telegram's descriptions are accurate but terse about what to actually do.
HINTS = {
    "unauthorized": "The token is wrong or was revoked. Copy it again from @BotFather.",
    "chat not found": (
        "The chat id does not exist for this bot. Two usual causes: the bot was never "
        "added to the group, or the id is missing its leading minus (a group id looks "
        "like -1001234567890)."
    ),
    "bot was kicked": "The bot was removed from the group. Add it back.",
    "not a member": "Add the bot to the group, then make it an administrator.",
    "not enough rights": "The bot is in the group but cannot post. Make it an administrator.",
}


def hint_for(reason: str) -> str | None:
    lowered = reason.lower()
    return next((hint for needle, hint in HINTS.items() if needle in lowered), None)


class Command(BaseCommand):
    help = "Check the Telegram bot token, the chat id, and that a message actually arrives."

    def add_arguments(self, parser):
        parser.add_argument(
            "--no-send",
            action="store_true",
            help="Check the configuration without posting a test message to the group.",
        )

    def fail(self, step: str, reason: str):
        self.stderr.write(self.style.ERROR(f"✗ {step}: {reason}"))
        if hint := hint_for(reason):
            self.stderr.write(f"  → {hint}")
        # Non-zero exit, so this is also usable as a deploy-time smoke check.
        raise SystemExit(1)

    def handle(self, *args, **options):
        token = getattr(settings, "TELEGRAM_BOT_TOKEN", "")
        chat_id = str(getattr(settings, "TELEGRAM_CHAT_ID", ""))

        self.stdout.write("Configuration")
        # Only the tail of the token, so this is safe to paste into a chat
        # when asking for help.
        self.stdout.write(f"  TELEGRAM_BOT_TOKEN  {'…' + token[-6:] if token else 'NOT SET'}")
        self.stdout.write(f"  TELEGRAM_CHAT_ID    {chat_id or 'NOT SET'}")
        self.stdout.write(f"  SITE_ADMIN_URL      {getattr(settings, 'SITE_ADMIN_URL', '') or 'NOT SET'}")
        self.stdout.write("")

        if not token:
            self.fail("token", "TELEGRAM_BOT_TOKEN is not set on this service")
        if not chat_id:
            self.fail("chat id", "TELEGRAM_CHAT_ID is not set on this service")
        if chat_id.lstrip("-").isdigit() and not chat_id.startswith("-"):
            self.stdout.write(
                self.style.WARNING(
                    "  Note: a positive id is a private chat with one person. A group id "
                    "starts with a minus."
                )
            )

        ok, result = telegram.call("getMe")
        if not ok:
            self.fail("token", str(result))
        self.stdout.write(self.style.SUCCESS(f"✓ token belongs to @{result.get('username')}"))

        ok, result = telegram.call("getChat", {"chat_id": chat_id})
        if not ok:
            self.fail("chat", str(result))
        title = result.get("title") or result.get("username") or result.get("first_name", "")
        self.stdout.write(self.style.SUCCESS(f"✓ chat reachable: {result.get('type')} “{title}”"))

        if options["no_send"]:
            self.stdout.write("Skipping the test message (--no-send).")
            return

        ok, result = telegram.call(
            "sendMessage",
            {
                "chat_id": chat_id,
                "text": "✅ AIACU: Telegram wiring checked. Inquiry signals will arrive here.",
            },
        )
        if not ok:
            self.fail("send", str(result))
        self.stdout.write(self.style.SUCCESS("✓ test message sent — check the group"))
