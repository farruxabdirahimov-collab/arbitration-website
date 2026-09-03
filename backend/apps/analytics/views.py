from rest_framework import status
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.views import APIView

from .models import Event
from .recording import referrer_host, visitor_hash
from .serializers import EventCreateSerializer


class EventThrottle(AnonRateThrottle):
    """Events are far more frequent than inquiries, so they get their own,
    looser bucket — sharing the 20/hour inquiry rate would silently drop a
    normal visitor's clicks."""

    scope = "events"


class EventCreateView(APIView):
    """POST /api/events/ — public, cookie-free, write-only."""

    throttle_classes = [EventThrottle]

    def post(self, request):
        serializer = EventCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        Event.objects.create(
            **serializer.validated_data,
            visitor=visitor_hash(request),
            country=request.META.get("HTTP_CF_IPCOUNTRY", "")[:2].upper(),
            referrer_host=referrer_host(request),
        )
        # No body: the browser has nothing to do with the answer, and an empty
        # 204 keeps the beacon cheap.
        return Response(status=status.HTTP_204_NO_CONTENT)
