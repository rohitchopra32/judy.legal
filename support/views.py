from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from support.models import Ticket
from support.pagination import TicketCustomPagination
from support.serializers import TicketSerializer


class TicketViewSet(ModelViewSet):
    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()
    pagination_class = TicketCustomPagination

    @action(detail=True, methods=['patch'])
    def resolve(self, request, pk=None):
        ticket = self.get_object()
        ticket.status = Ticket.RESOLVED_STATUS
        ticket.save()
        return Response(self.get_serializer(ticket).data)
