import { Component, OnInit } from '@angular/core';
import {Ticket, TicketService} from '../services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
})
export class TicketListComponent implements OnInit {
  tickets: Ticket[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.getTickets(this.currentPage);
  }

  getTickets(page: number): void {
    this.ticketService.getTickets(page).subscribe(response => {
      this.tickets = response.results;
      this.currentPage = page;
      this.totalPages = Math.ceil(response.count / response.per_page);
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.getTickets(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.getTickets(this.currentPage - 1);
    }
  }

  markResolved(ticketId: number|undefined): void {
    if(!ticketId){
      return
    }
    // Update the ticket status to resolved
    this.ticketService.resolveTicket(ticketId).subscribe(() => {
      this.getTickets(this.currentPage); // Refresh the list after update
    });
  }

  deleteTicket(ticketId: number|undefined): void {
    if(!ticketId){
      return
    }
    // Delete the ticket
    this.ticketService.deleteTicket(ticketId).subscribe(() => {
      this.getTickets(this.currentPage); // Refresh the list after deletion
    });
  }
}
