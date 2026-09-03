from rest_framework import serializers

from .models import Event


class EventCreateSerializer(serializers.ModelSerializer):
    """Write-only, like the inquiry serializer: the endpoint is public and
    must never become a way to read the traffic of the site back out."""

    class Meta:
        model = Event
        fields = ["kind", "label", "lang", "path"]

    def validate_kind(self, value):
        if value not in Event.Kind.values:
            raise serializers.ValidationError("Unknown event kind.")
        return value
