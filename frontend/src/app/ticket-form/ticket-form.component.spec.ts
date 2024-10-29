import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketFormComponent } from './ticket-form.component';
import {of} from 'rxjs';
import {TicketService} from '../services/ticket.service';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('TicketFormComponent', () => {
  let component: TicketFormComponent;
  let fixture: ComponentFixture<TicketFormComponent>;
  let ticketService: TicketService;

  beforeEach(async () => {
    const ticketServiceMock = {
      createTicket: jasmine.createSpy('createTicket').and.returnValue(of({}))
    };
    await TestBed.configureTestingModule({
      declarations: [TicketFormComponent],
      providers: [provideHttpClient(withInterceptorsFromDi()), { provide: TicketService, useValue: ticketServiceMock }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketFormComponent);
    component = fixture.componentInstance;
    ticketService = TestBed.inject(TicketService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create a ticket', () => {
    component.ticket ={
      title: 'New Issue',
      description: 'Issue description'
    };
    component.createTicket();
    expect(ticketService.createTicket).toHaveBeenCalledWith({
      title: 'New Issue',
      description: 'Issue description'
    });
  });
});
