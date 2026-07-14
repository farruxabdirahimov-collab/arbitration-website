from django.db import models


class Inquiry(models.Model):
    """A message left through the public contact form.

    This is the first step of the future case-management flow: today it is a
    lead in an inbox, later it becomes the intake record a Secretariat clerk
    converts into a case file.
    """

    class Status(models.TextChoices):
        NEW = "new", "New"
        IN_PROGRESS = "in_progress", "In progress"
        ANSWERED = "answered", "Answered"
        CLOSED = "closed", "Closed"
        SPAM = "spam", "Spam"

    name = models.CharField(max_length=200)
    # Free-text on purpose: people leave either an email or a phone number.
    contact = models.CharField(max_length=200, help_text="Email or phone supplied by the sender")
    subject = models.CharField(max_length=300, blank=True)
    message = models.TextField()

    status = models.CharField(max_length=20, choices=Status.choices, default=Status.NEW)
    internal_note = models.TextField(blank=True, help_text="Not visible to the sender")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "inquiries"

    def __str__(self) -> str:
        return f"{self.name} — {self.subject or self.message[:40]}"
