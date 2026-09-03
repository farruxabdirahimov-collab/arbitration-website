import logging

from django.apps import AppConfig

logger = logging.getLogger(__name__)


class InquiriesConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.inquiries"

    def ready(self):
        """Print, once, the two settings a browser has to satisfy.

        Every public call the site makes — the inquiry form, the traffic
        beacon — is gated by CORS_ALLOWED_ORIGINS and ALLOWED_HOSTS, and both
        fail silently from the visitor's side: the form just says something
        went wrong. Having the effective values in the deploy log turns
        "it doesn't work" into a comparison anyone can make.
        """
        from django.conf import settings

        logger.info("Accepting browser requests from: %s", settings.CORS_ALLOWED_ORIGINS or "(none)")
        logger.info("Serving these hosts: %s", settings.ALLOWED_HOSTS)
