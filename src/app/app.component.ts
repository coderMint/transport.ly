import { Component } from '@angular/core';
import { FlightElement } from './model/flight';
import { OrderElement } from './model/order';
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

  FLIGHT_DATA: FlightElement[] = [];
  ORDER_DATA: any[] = [];

  source_one: FlightElement[] = [];
  source_two: FlightElement[] = [];

  flightScheduleActive: boolean = true;  

  button_literature: string = 'View order schedule';

  ngOnInit(): void {
    this.data.getFlightData().subscribe((_flightData: FlightElement[]) => {
      this.FLIGHT_DATA = _flightData;
      this.source_one = this.FLIGHT_DATA.filter((flightSchedule: FlightElement) => flightSchedule.day == 1);
      this.source_two = this.FLIGHT_DATA.filter((flightSchedule: FlightElement) => flightSchedule.day == 2);
    });

    // generate normalized order data for the orders table
    this.ORDER_DATA = this.data.normalizeOrderDataAndAssignFlightPerOrder();
    console.warn('app component', this.ORDER_DATA);
  }

  ngOnChanges(): void {
    // this.data.normalizeOrderDataAndAssignFlightPerOrder().subscribe((result: OrderElement[]) => {
    //   console.warn(result);
    //   this.ORDER_DATA = result;
    // });
  }

  toggleOrderSchedule(): void {
    this.flightScheduleActive = !this.flightScheduleActive;
    
    if (this.flightScheduleActive == true) {
      this.button_literature = 'View order schedule';
    } else {
      this.button_literature = 'View flight schedule';
    }
  }

}



// for (var i = 0; i <= this.ORDER_DATA.length; i++) {
    //   for (let flightCapacity = 1; flightCapacity <= 20; flightCapacity++) {
    //     if (this.ORDER_DATA[flightCapacity].order.order.destination === )
    //   }
    // }

    // this.ORDER_DATA.forEach((order: OrderElement, index) => {
    //   for ()
    // });