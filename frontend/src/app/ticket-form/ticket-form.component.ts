import { Component } from '@angular/core';
import { TicketService, Ticket } from '../services/ticket.service';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css']
})
export class TicketFormComponent {
  ticket: Ticket = { title: '', description: ''};
  msg: string = "";
  constructor(private ticketService: TicketService) {}

  createTicket(): void {
    if (this.ticket.title && this.ticket.description) {
      this.ticketService.createTicket(this.ticket).subscribe(() => {
        this.ticket = { title: '', description: ''};
        this.msg = "Ticket Created Successfully."
      });
    }
  }
}
