import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// angular material stuff
import { MatTableModule } from '@angular/material/table'
import {MatButtonModule} from '@angular/material/button';

import { HttpClientModule } from '@angular/common/http';
import { FlightScheduleComponent } from './components/flight-schedule/flight-schedule.component';
import { OrderScheduleComponent } from './components/order-schedule/order-schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightScheduleComponent,
    OrderScheduleComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatTableModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
