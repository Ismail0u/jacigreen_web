from drf_spectacular.utils import extend_schema
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle, ScopedRateThrottle

from .serializers import ContactAcknowledgementSerializer, ContactRequestCreateSerializer

ACK = {"detail": "Votre message a bien été transmis."}


@extend_schema(
    tags=["contact"],
    request=ContactRequestCreateSerializer,
    responses={201: ContactAcknowledgementSerializer},
)
class ContactRequestCreateView(CreateAPIView):
    """Dépôt d'une demande de contact ou de devis (écriture seule, limitée en débit)."""

    permission_classes = [AllowAny]
    serializer_class = ContactRequestCreateSerializer
    throttle_classes = [ScopedRateThrottle, AnonRateThrottle]
    throttle_scope = "contact"

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        if serializer.validated_data.pop("website", ""):
            # Robot détecté : réponse identique, rien n'est enregistré.
            return Response(ACK, status=status.HTTP_201_CREATED)
        serializer.save()
        return Response(ACK, status=status.HTTP_201_CREATED)
