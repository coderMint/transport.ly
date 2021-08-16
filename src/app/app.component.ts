import { Component } from '@angular/core';
import { FlightElement } from './model/flight';
import { DataServiceService } from './services/data-service.service';

/**
 * @title Fetching flight data from a json file
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(private data: DataServiceService) {}

  ELEMENT_DATA: FlightElement[] = [];
  source_one: FlightElement[] = [];
  source_two: FlightElement[] = [];

  ngOnInit(): void {
    this.data.getFlightData().subscribe((_flightData: FlightElement[]) => {
      this.ELEMENT_DATA = _flightData;
      this.source_one = this.ELEMENT_DATA.filter((flightSchedule: FlightElement) => flightSchedule.day == 1);
      this.source_two = this.ELEMENT_DATA.filter((flightSchedule: FlightElement) => flightSchedule.day == 2);
    });
  }

}