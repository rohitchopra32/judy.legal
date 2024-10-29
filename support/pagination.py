from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class TicketCustomPagination(PageNumberPagination):
    """
    Custom Pagination class for the Ticket views.
    """
    page_size = 10

    def get_paginated_response(self, data):
        return Response({
            'links': {
                'next': self.get_next_link(),
                'previous': self.get_previous_link()
            },
            "per_page": self.page.paginator.per_page,
            'has_other_pages': self.page.has_other_pages(),
            'count': self.page.paginator.count,
            'has_next': self.page.has_next(),
            'has_previous': self.page.has_previous(),
            'results': data
        })
