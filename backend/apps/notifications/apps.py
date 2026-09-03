import logging

from django.apps import AppConfig

logger = logging.getLogger(__name__)


class NotificationsConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.notifications"

    def ready(self):
        """Say once, at start-up, whether the bot is wired.

        A misconfigured bot is invisible: the group is silent, and so is
        everything else. This puts the answer in the platform's deploy log,
        which is reachable when a shell is not. Configuration only — no
        network call, so a slow Telegram cannot delay a boot.
        """
        from django.conf import settings

        chat_id = str(getattr(settings, "TELEGRAM_CHAT_ID", ""))
        if getattr(settings, "TELEGRAM_BOT_TOKEN", "") and chat_id:
            logger.info("Telegram signalling is configured for chat %s", chat_id)
        else:
            logger.warning(
                "Telegram signalling is OFF — TELEGRAM_BOT_TOKEN and/or TELEGRAM_CHAT_ID "
                "are not set on this service. Inquiries are still saved and visible in the admin."
            )
