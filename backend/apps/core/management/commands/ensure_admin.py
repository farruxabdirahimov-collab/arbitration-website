"""Create the first admin account at deploy time, if asked to.

Nothing can be read out of this system without an admin login — not an
inquiry, not the traffic table — and a deploy deliberately does not create
one. That leaves `createsuperuser` in a console, which turns out to be a
genuinely awkward place to stand: the shell does not always inherit the
build's virtualenv, so `python manage.py` fails with "No module named
'django'" on a service whose deploys are perfectly healthy.

So this runs on boot instead, and does nothing at all unless
DJANGO_SUPERUSER_USERNAME and DJANGO_SUPERUSER_PASSWORD are both set. It
never touches an account that already exists, so a password changed in the
admin is never silently reset, and re-deploying is harmless.

The password does sit in an environment variable while this is enabled.
That is a real cost, so the command says so every time it runs: create the
account, sign in, change the password, then delete both variables.
"""

import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Create a superuser from DJANGO_SUPERUSER_* env vars, if it does not exist yet."

    def handle(self, *args, **options):
        username = os.getenv("DJANGO_SUPERUSER_USERNAME", "").strip()
        password = os.getenv("DJANGO_SUPERUSER_PASSWORD", "")

        if not username or not password:
            return

        User = get_user_model()
        if User.objects.filter(**{User.USERNAME_FIELD: username}).exists():
            self.stdout.write(
                f"Admin '{username}' already exists — leaving it alone. "
                "You can now delete DJANGO_SUPERUSER_USERNAME and DJANGO_SUPERUSER_PASSWORD."
            )
            return

        User.objects.create_superuser(
            username=username,
            email=os.getenv("DJANGO_SUPERUSER_EMAIL", ""),
            password=password,
        )
        self.stdout.write(self.style.SUCCESS(f"Created admin '{username}'."))
        self.stdout.write(
            self.style.WARNING(
                "The password is in an environment variable. Sign in, change it, "
                "then delete DJANGO_SUPERUSER_USERNAME and DJANGO_SUPERUSER_PASSWORD."
            )
        )
