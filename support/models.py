from django.db import models

OPEN = "OPEN"
RESOLVED = "RESOLVED"

TICKET_STATUS_CHOICES = (
    (OPEN, "Open"),
    (RESOLVED, "Resolved"),
)


class Ticket(models.Model):
    """
    This models represents a support ticket.
    """
    OPEN_STATUS = OPEN
    RESOLVED_STATUS = RESOLVED
    TICKET_STATUS_CHOICES = TICKET_STATUS_CHOICES

    title = models.CharField(max_length=100, help_text="Title of the ticket.")
    description = models.TextField(help_text="Description of the ticket.")
    status = models.CharField(
        max_length=10,
        choices=TICKET_STATUS_CHOICES,
        help_text="Status of the ticket.",
        default=OPEN_STATUS
    )
    created = models.DateTimeField(auto_now_add=True, help_text="Created date and time of the ticket.")

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-created']
