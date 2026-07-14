import logging

from django.conf import settings
from django.core.mail import send_mail
from django.http import JsonResponse
from rest_framework import generics

from .models import Inquiry
from .serializers import InquiryCreateSerializer

logger = logging.getLogger(__name__)


def health(_request):
    return JsonResponse({"status": "ok"})


class InquiryCreateView(generics.CreateAPIView):
    """POST /api/inquiries/ — public, throttled (see REST_FRAMEWORK settings)."""

    queryset = Inquiry.objects.all()
    serializer_class = InquiryCreateSerializer

    def perform_create(self, serializer):
        inquiry = serializer.save()
        self._notify(inquiry)

    def _notify(self, inquiry: Inquiry) -> None:
        """Email the registry. Never let a mail failure lose the inquiry —
        it is already safely in the database by this point."""
        recipient = getattr(settings, "INQUIRY_NOTIFY_EMAIL", "")
        if not recipient:
            return
        try:
            send_mail(
                subject=f"New inquiry: {inquiry.subject or inquiry.name}",
                message=(
                    f"Name: {inquiry.name}\n"
                    f"Contact: {inquiry.contact}\n"
                    f"Subject: {inquiry.subject}\n\n"
                    f"{inquiry.message}\n"
                ),
                from_email=None,
                recipient_list=[recipient],
                fail_silently=False,
            )
        except Exception:
            logger.exception("Failed to send inquiry notification for #%s", inquiry.pk)
