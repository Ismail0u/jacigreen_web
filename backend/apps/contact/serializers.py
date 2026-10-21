from rest_framework import serializers

from .models import ContactRequest


class ContactRequestCreateSerializer(serializers.ModelSerializer):
    # Champ piège (honeypot) : invisible pour les humains, rempli par les robots.
    website = serializers.CharField(
        write_only=True, required=False, allow_blank=True, max_length=200
    )
    message = serializers.CharField(min_length=20, max_length=5000)

    class Meta:
        model = ContactRequest
        fields = ("subject", "name", "email", "organization", "message", "consent", "website")

    def validate_consent(self, value: bool) -> bool:
        if value is not True:
            raise serializers.ValidationError("Le consentement est obligatoire.")
        return value

    def validate_name(self, value: str) -> str:
        value = value.strip()
        if len(value) < 2:
            raise serializers.ValidationError("Le nom est trop court.")
        return value


class ContactAcknowledgementSerializer(serializers.Serializer):
    detail = serializers.CharField()
