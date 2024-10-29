import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { TicketFormComponent } from './ticket-form/ticket-form.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    TicketListComponent,
    TicketFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient(withInterceptorsFromDi()) ],
  bootstrap: [AppComponent]
})
export class AppModule { }
