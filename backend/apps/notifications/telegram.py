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

API = "https://api.telegram.org/bot{token}/{method}"
TIMEOUT = 5


def configured() -> bool:
    return bool(getattr(settings, "TELEGRAM_BOT_TOKEN", "") and getattr(settings, "TELEGRAM_CHAT_ID", ""))


def call(method: str, payload: dict | None = None) -> tuple[bool, str | dict]:
    """Raw Bot API call. Returns (ok, result) on success, (False, reason) on
    failure — the reason being Telegram's own description, which names the
    actual problem ("chat not found", "bot was kicked") far better than any
    message we could invent. Used by the check_telegram command; callers in
    the request path should use send().
    """
    token = getattr(settings, "TELEGRAM_BOT_TOKEN", "")
    if not token:
        return False, "TELEGRAM_BOT_TOKEN is not set"
    try:
        response = requests.post(API.format(token=token, method=method), json=payload or {}, timeout=TIMEOUT)
    except requests.RequestException as exc:
        return False, f"could not reach api.telegram.org: {exc}"

    try:
        body = response.json()
    except ValueError:
        return False, f"HTTP {response.status_code}, unreadable body: {response.text[:200]}"

    if not body.get("ok"):
        return False, f"HTTP {response.status_code}: {body.get('description', 'no description')}"
    return True, body.get("result", {})


def send(text: str) -> bool:
    if not configured():
        logger.debug("Telegram not configured; skipping notification")
        return False

    ok, result = call(
        "sendMessage",
        {
            "chat_id": settings.TELEGRAM_CHAT_ID,
            "text": text,
            "parse_mode": "HTML",
            "disable_web_page_preview": True,
        },
    )
    if not ok:
        logger.error("Telegram rejected the message — %s", result)
    return ok
