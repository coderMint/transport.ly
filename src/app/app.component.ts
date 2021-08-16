import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { DataServiceService } from './services/data-service.service';
import { FlightElement } from './model/flight';

/**
 * @title Fetching flight data from a json file
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  displayedColumns: string[] = ['flight_number', 'departure_city', 'arrival_city', 'day'];
  dataSource: any[] = [];

  ELEMENT_DATA: FlightElement[] = [];

  @ViewChild(MatTable) table: MatTable<FlightElement> | any;

  constructor(private data: DataServiceService) {}

  ngOnInit(): void {
    this.data.getFlightData().subscribe((_flightData: FlightElement[]) => {
      this.ELEMENT_DATA = _flightData;
      this.dataSource = this.ELEMENT_DATA;
      console.warn(this.ELEMENT_DATA);
    });
  }

  expandFlightDetails(flightNumber: number): void {
    console.warn('flight #', flightNumber);
  }
}