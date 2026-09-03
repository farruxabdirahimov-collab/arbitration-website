from io import StringIO

from django.contrib.auth import get_user_model
from django.core.management import call_command
from django.test import TestCase, override_settings

User = get_user_model()


class EnsureAdminTests(TestCase):
    """Runs on every boot, so the dangerous cases are the ones where it does
    something it was not asked to."""

    def run_command(self, **env):
        out = StringIO()
        with override_settings():
            import os

            previous = {k: os.environ.get(k) for k in env}
            os.environ.update({k: v for k, v in env.items() if v is not None})
            try:
                call_command("ensure_admin", stdout=out, stderr=out)
            finally:
                for key, value in previous.items():
                    if value is None:
                        os.environ.pop(key, None)
                    else:
                        os.environ[key] = value
        return out.getvalue()

    def test_does_nothing_without_the_variables(self):
        self.assertEqual(self.run_command(), "")
        self.assertFalse(User.objects.exists())

    def test_does_nothing_with_a_username_but_no_password(self):
        self.run_command(DJANGO_SUPERUSER_USERNAME="admin")
        self.assertFalse(User.objects.exists())

    def test_creates_the_admin_when_asked(self):
        output = self.run_command(
            DJANGO_SUPERUSER_USERNAME="registry",
            DJANGO_SUPERUSER_PASSWORD="a-long-enough-password",
            DJANGO_SUPERUSER_EMAIL="registry@example.uz",
        )
        user = User.objects.get()
        self.assertEqual(user.username, "registry")
        self.assertTrue(user.is_superuser and user.is_staff)
        self.assertTrue(user.check_password("a-long-enough-password"))
        self.assertIn("Created admin", output)
        # The reminder to remove the variables is the whole reason this is
        # tolerable at all.
        self.assertIn("delete DJANGO_SUPERUSER", output)

    def test_never_resets_a_password_changed_in_the_admin(self):
        User.objects.create_superuser(username="registry", email="", password="chosen-later")
        self.run_command(
            DJANGO_SUPERUSER_USERNAME="registry",
            DJANGO_SUPERUSER_PASSWORD="the-old-bootstrap-password",
        )
        self.assertTrue(User.objects.get().check_password("chosen-later"))

    def test_a_second_boot_does_not_create_a_duplicate(self):
        for _ in range(2):
            self.run_command(
                DJANGO_SUPERUSER_USERNAME="registry",
                DJANGO_SUPERUSER_PASSWORD="a-long-enough-password",
            )
        self.assertEqual(User.objects.count(), 1)
