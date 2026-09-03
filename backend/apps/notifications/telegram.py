"""Telegram signalling.

Deliberately a *signal* channel, not a content channel. An inquiry can name
the parties, the contract and the amount in dispute; a Telegram group is a
place where members are added and removed, phones are lost and history is
searchable forever. Confidentiality is the product this institution sells, so
the message says only that something arrived and where to read it. The
content stays behind the admin login.

Never raise: the inquiry is already committed to the database by the time we
get here, and a messenger outage must not turn into a lost claim.
"""

import logging

import requests
from django.conf import settings

logger = logging.getLogger(__name__)

API = "https://api.telegram.org/bot{token}/sendMessage"
TIMEOUT = 5


def configured() -> bool:
    return bool(getattr(settings, "TELEGRAM_BOT_TOKEN", "") and getattr(settings, "TELEGRAM_CHAT_ID", ""))


def send(text: str) -> bool:
    if not configured():
        logger.debug("Telegram not configured; skipping notification")
        return False
    try:
        response = requests.post(
            API.format(token=settings.TELEGRAM_BOT_TOKEN),
            json={
                "chat_id": settings.TELEGRAM_CHAT_ID,
                "text": text,
                "parse_mode": "HTML",
                "disable_web_page_preview": True,
            },
            timeout=TIMEOUT,
        )
        if not response.ok:
            logger.error("Telegram rejected the message: %s %s", response.status_code, response.text[:300])
            return False
        return True
    except requests.RequestException:
        logger.exception("Could not reach Telegram")
        return False
