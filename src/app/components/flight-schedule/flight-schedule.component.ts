import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { FlightElement } from 'src/app/model/flight';
import { OrderElement } from 'src/app/model/order';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'flight-schedule',
  templateUrl: './flight-schedule.component.html',
  styleUrls: ['./flight-schedule.component.scss']
})
export class FlightScheduleComponent {

  @Input() source: FlightElement[] = [];
  @Output() orderSpecificToFlightEvent = new EventEmitter<OrderElement[]>();
  @ViewChild(MatTable) table: MatTable<FlightElement> | any;
  
  displayedColumns: string[] = ['flight_number', 'departure_city', 'arrival_city', 'day'];
  dataSource: any[] = [];

  ORDERS_FOR_THIS_FLIGHT: OrderElement[] = [];

  constructor(private data: DataServiceService) {}

  ngOnChanges(): void {
    this.dataSource = this.source;
  }

  expandFlightDetails(flightNumber: number): void {
    this.ORDERS_FOR_THIS_FLIGHT = this.data.returnOrdersRelatedToThisFlight(flightNumber);
    console.warn('expanflightdetails', this.ORDERS_FOR_THIS_FLIGHT)
    this.orderSpecificToFlightEvent.emit(this.ORDERS_FOR_THIS_FLIGHT);
  }
}
