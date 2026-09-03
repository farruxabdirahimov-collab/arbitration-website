"""
Django settings for the AIACU backend.

Deployment target is Railway (Postgres via DATABASE_URL). Locally, with no
DATABASE_URL set, it falls back to SQLite so `python manage.py runserver`
works with zero setup.
"""

import os
import sys
from pathlib import Path

import dj_database_url
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")


def env_list(name: str, default: str = "") -> list[str]:
    raw = os.getenv(name, default)
    return [item.strip() for item in raw.split(",") if item.strip()]


SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", "insecure-dev-key-change-me")
DEBUG = os.getenv("DJANGO_DEBUG", "False").lower() == "true"

ALLOWED_HOSTS = env_list("DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1")
# Railway injects the public domain here.
if railway_host := os.getenv("RAILWAY_PUBLIC_DOMAIN"):
    ALLOWED_HOSTS.append(railway_host)

CSRF_TRUSTED_ORIGINS = [f"https://{h}" for h in ALLOWED_HOSTS if not h.startswith("localhost")]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # third-party
    "rest_framework",
    "corsheaders",
    # local
    "apps.analytics",
    "apps.core",
    "apps.inquiries",
    "apps.notifications",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

# --- Database -------------------------------------------------------------
# SQLite locally, Postgres on Railway (DATABASE_URL).
DATABASES = {
    "default": dj_database_url.config(
        default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}",
        conn_max_age=600,
        ssl_require=bool(os.getenv("DATABASE_URL")),
    )
}

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "Asia/Tashkent"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STORAGES = {
    "default": {"BACKEND": "django.core.files.storage.FileSystemStorage"},
    "staticfiles": {"BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage"},
}

MEDIA_URL = "media/"
MEDIA_ROOT = BASE_DIR / "media"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# --- API ------------------------------------------------------------------
REST_FRAMEWORK = {
    "DEFAULT_RENDERER_CLASSES": ["rest_framework.renderers.JSONRenderer"],
    "DEFAULT_THROTTLE_CLASSES": ["rest_framework.throttling.AnonRateThrottle"],
    # The inquiry form is public and unauthenticated — rate-limit it so the
    # registry inbox can't be flooded.
    # Events are one beacon per click, so they get a far looser bucket than
    # the inquiry form — see apps.analytics.views.EventThrottle.
    "DEFAULT_THROTTLE_RATES": {"anon": "20/hour", "events": "240/hour"},
}


def with_www_siblings(origins: list[str]) -> list[str]:
    """Allow both www. and the bare domain once either is configured.

    A site answers on both, visitors arrive at both, and listing only one
    breaks the inquiry form for half of them — silently, because a blocked
    CORS response looks to the form exactly like a server outage. The pair is
    the same site by definition, so there is nothing to gain by making
    somebody notice the difference at 2am.
    """
    allowed = list(origins)
    for origin in origins:
        scheme, _, host = origin.partition("://")
        if not host:
            continue
        sibling = f"{scheme}://{host[4:]}" if host.startswith("www.") else f"{scheme}://www.{host}"
        if sibling not in allowed:
            allowed.append(sibling)
    return allowed


CORS_ALLOWED_ORIGINS = with_www_siblings(env_list("CORS_ALLOWED_ORIGINS", "http://localhost:5173"))

# --- Inquiries ------------------------------------------------------------
INQUIRY_NOTIFY_EMAIL = os.getenv("INQUIRY_NOTIFY_EMAIL", "")
EMAIL_BACKEND = os.getenv(
    "DJANGO_EMAIL_BACKEND", "django.core.mail.backends.console.EmailBackend"
)

# --- Telegram -------------------------------------------------------------
# The bot is a signal channel only: it is told that an inquiry arrived, never
# what it says. See apps/notifications/telegram.py.
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "")
# Absolute base URL used to build the "open in admin" link in notifications.
# Defaults to this service's own Railway domain, because that is always where
# the admin lives — nobody should have to look a URL up to make the bot work.
# Set it explicitly only when the admin is reached through a custom domain.
SITE_ADMIN_URL = os.getenv("SITE_ADMIN_URL", "")
if not SITE_ADMIN_URL and railway_host:
    SITE_ADMIN_URL = f"https://{railway_host}"

# --- Logging --------------------------------------------------------------
# Without this, an app logger's error reaches the platform log only through
# Python's last-resort handler — which is enough to lose the reason a Telegram
# notification failed, exactly when someone is trying to find out.
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {"plain": {"format": "{levelname} {name}: {message}", "style": "{"}},
    "handlers": {"console": {"class": "logging.StreamHandler", "formatter": "plain"}},
    "loggers": {
        "apps": {"handlers": ["console"], "level": os.getenv("DJANGO_LOG_LEVEL", "INFO")},
        "django": {"handlers": ["console"], "level": "INFO"},
    },
}

# --- Security (production) -----------------------------------------------
if not DEBUG:
    SECURE_SSL_REDIRECT = True
    SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True

    # The test client speaks http, so the redirect above would turn every
    # request in the suite into a 301 and make the results depend on whether
    # DJANGO_DEBUG happened to be exported.
    if "test" in sys.argv:
        SECURE_SSL_REDIRECT = False
