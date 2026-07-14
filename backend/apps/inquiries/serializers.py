from rest_framework import serializers

from .models import Inquiry


class InquiryCreateSerializer(serializers.ModelSerializer):
    """Public write-only serializer.

    Status and internal notes are deliberately not exposed — the public form
    may only create a record, never set its triage state.
    """

    class Meta:
        model = Inquiry
        fields = ["name", "contact", "subject", "message"]

    def validate_message(self, value: str) -> str:
        if len(value.strip()) < 10:
            raise serializers.ValidationError("Please describe your situation in a little more detail.")
        return value
