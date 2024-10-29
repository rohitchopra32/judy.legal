import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Ticket {
    id?: number;
    title: string;
    description: string;
    status?: string;
    created?: string;
}
export interface GetTicketResponse {
  count: number;
  per_page: number;
  has_next: boolean;
  has_other_pages: boolean;
  has_previous: boolean;
  links: any;
  results: Ticket[];
}

@Injectable({
    providedIn: 'root'
})
export class TicketService {
    private apiUrl: string = 'http://localhost:8000/api/tickets/';

    constructor(private http: HttpClient) {}

    getTickets(page: number = 1): Observable<GetTicketResponse> {
    let params: HttpParams = new HttpParams().set('page', page.toString());
    return this.http.get<GetTicketResponse>(this.apiUrl, { params });
  }

    createTicket(ticket: Ticket): Observable<Ticket> {
        return this.http.post<Ticket>(this.apiUrl, ticket);
    }

    resolveTicket(id: number): Observable<Ticket> {
        return this.http.patch<Ticket>(`${this.apiUrl}${id}/resolve/`, {});
    }

    deleteTicket(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}${id}/`);
    }
}
