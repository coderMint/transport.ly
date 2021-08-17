import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { concatMap, filter, map, max, mergeMap, tap, toArray } from 'rxjs/operators';
import { OrderElement } from '../model/order';
import { FlightElement } from '../model/flight';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  FLIGHTDATA_URL: string = './assets/data/coding-assignment-schedule.json';
  ORDERDATA_URL: string = './assets/data/coding-assigment-orders.json';

  ORDER_DATA: Array<OrderElement> = [];
  FLIGHT_DATA: FlightElement[] = [];

  BOX_CAPACITY: number = 20;

  constructor(private http: HttpClient) {}

  getFlightData(): Observable<any> {
    return this.http.get(this.FLIGHTDATA_URL);
  }

  getOrderData(): Observable<any> {
    return this.http.get(this.ORDERDATA_URL);
  }

  normalizeOrderDataAndAssignFlightPerOrder(): any {
    return this.getFlightData().pipe(
      tap((_flightData: any) => this.FLIGHT_DATA = _flightData),
      concatMap((res: { _flightData: FlightElement }) => this.getOrderData())
    ).subscribe((_orderData: object) => {
      console.warn('result from concatMap in subscription', this.FLIGHT_DATA, _orderData);
      const maxValueOfFlights = Math.max(...this.FLIGHT_DATA.map((o: FlightElement) => o.flight_number), 0);
      const orderArr: any[] = Object.entries(_orderData);
      let boxLimit: number = 0;
      let associatedFlightNum: number = 1;
      orderArr.forEach((order, i) => {
        // create a new object every iteration, push newly created object into this.ORDER_DATA
        // add biz logic for 20 boxes/plane
        if (boxLimit < 20 && associatedFlightNum <= maxValueOfFlights) {
          order['flight_number'] = associatedFlightNum;
          order['arrival_city'] = orderArr[i][1]['destination'];
          order['departure_city'] = this.FLIGHT_DATA[associatedFlightNum]['departure_city'];
          order['day'] = this.FLIGHT_DATA[associatedFlightNum]['day'];
          boxLimit++;
        } else {
          boxLimit = 0;
          associatedFlightNum++;
        }
        this.ORDER_DATA.push(order);
      });
    });
  }

}
