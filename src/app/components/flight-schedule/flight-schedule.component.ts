import { Component, ViewChild, Input } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { FlightElement } from 'src/app/model/flight';

@Component({
  selector: 'flight-schedule',
  templateUrl: './flight-schedule.component.html',
  styleUrls: ['./flight-schedule.component.scss']
})
export class FlightScheduleComponent {

  @Input() source: FlightElement[] = [];
  @ViewChild(MatTable) table: MatTable<FlightElement> | any;
  
  displayedColumns: string[] = ['flight_number', 'departure_city', 'arrival_city', 'day'];
  dataSource: any[] = [];

  constructor() {}

  ngOnChanges(): void {
    this.dataSource = this.source;
  }

  expandFlightDetails(flightNumber: number): void {
    console.warn('flight #', flightNumber);
  }
}
