from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from support.models import Ticket
from support.pagination import TicketCustomPagination


class TicketAPITestCase(APITestCase):
    """
    This class defines the test suite for the ticket API.
    """
    def setUp(self):
        # Create some initial tickets for testing
        self.ticket1 = Ticket.objects.create(
            title="Issue with login",
            description="Unable to login to account"
        )
        self.ticket2 = Ticket.objects.create(title="Password reset", description="Need to reset password",
                                             status=Ticket.OPEN_STATUS)
        self.PAGE_SIZE = TicketCustomPagination.page_size

    def test_create_ticket(self):
        url = reverse('tickets-list')
        data = {
            "title": "New Support Issue",
            "description": "Details of the issue...",
            "status": Ticket.OPEN_STATUS
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Ticket.objects.count(), 3)
        self.assertEqual(Ticket.objects.latest('id').title, "New Support Issue")

    def test_list_tickets(self):
        url = reverse('tickets-list')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 2)
        self.assertEqual(response.data['results'][0]['title'], "Issue with login")

    def test_resolve_ticket(self):
        url = reverse('tickets-resolve',
                      kwargs={'pk': self.ticket1.id})
        response = self.client.patch(url, {"status": Ticket.RESOLVED_STATUS}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.ticket1.refresh_from_db()
        self.assertEqual(self.ticket1.status, Ticket.RESOLVED_STATUS)

    def test_delete_ticket(self):
        url = reverse('tickets-detail',
                      kwargs={'pk': self.ticket1.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Ticket.objects.count(), 1)
        self.assertFalse(Ticket.objects.filter(id=self.ticket1.id).exists())

    def test_pagination_on_list_tickets(self):
        for i in range(10):
            Ticket.objects.create(title=f"Issue {i}", description="Some description", status=Ticket.OPEN_STATUS)

        url = reverse('tickets-list')
        response = self.client.get(url, {'page': 1}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), self.PAGE_SIZE)  # Should match pagination size
        self.assertTrue('next' in response.data["links"])  # Should have a next page link if pagination is working
