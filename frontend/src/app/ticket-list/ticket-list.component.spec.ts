import {ComponentFixture, TestBed, tick} from '@angular/core/testing';

import { TicketListComponent } from './ticket-list.component';
import {TicketService} from '../services/ticket.service';
import {of} from 'rxjs';
import {HttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

describe('TicketListComponent', () => {
  let component: TicketListComponent;
  let fixture: ComponentFixture<TicketListComponent>;

  beforeEach(async () => {
    const ticketServiceMock = {
      getTickets: jasmine.createSpy('getTickets').and.returnValue(of({
        results: [
          { id: 1, title: 'Issue 1', description: 'Issue description 1', status: 'OPEN', created_at: new Date() },
          { id: 2, title: 'Issue 2', description: 'Issue description 2', status: 'RESOLVED', created_at: new Date() },
        ]
      })),
      resolveTicket: jasmine.createSpy('resolveTicket').and.returnValue(of({}))
    };

    await TestBed.configureTestingModule({
      declarations: [TicketListComponent],
      providers: [provideHttpClient(withInterceptorsFromDi()), { provide: TicketService, useValue: ticketServiceMock }],

    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should load and display tickets', () => {
    component.getTickets(1);
    fixture.detectChanges();
    const ticketElements = fixture.nativeElement.querySelectorAll('tr');
    expect(ticketElements.length).toBe(3); // 2 tickets + 1 header row
    expect(ticketElements[1].textContent).toContain('Issue 1');
    expect(ticketElements[2].textContent).toContain('Issue 2');
  });

  it('should hide resolve button for resolved tickets', () => {
    const resolveButtons = fixture.nativeElement.querySelectorAll('button.resolved');
    expect(resolveButtons.length).toBe(1); // Only one ticket is open
    expect(resolveButtons[0].textContent).toContain('Resolve');
  });
});
