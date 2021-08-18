import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { concatMap, filter, map, max, mergeMap, tap, toArray } from 'rxjs/operators';
import { OrderElement } from '../model/order';
import { FlightElement } from '../model/flight';
import { Destinations, BoxCapacity } from '../model/constants';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  FLIGHTDATA_URL: string = './assets/data/coding-assignment-schedule.json';
  ORDERDATA_URL: string = './assets/data/coding-assigment-orders.json';

  ORDER_DATA: Array<OrderElement> = [];
  FLIGHT_DATA: FlightElement[] = [];

  ORDERS_FOR_THIS_FLIGHT: Array<OrderElement> = [];

  constructor(private http: HttpClient) {}

  getFlightData(): Observable<any> {
    return this.http.get(this.FLIGHTDATA_URL);
  }

  getOrderData(): Observable<any> {
    return this.http.get(this.ORDERDATA_URL);
  }

  normalizeOrderDataAndAssignFlightPerOrder(): Observable<any> {
    return from(this.getFlightData().pipe(
      tap((_flightData: any) => this.FLIGHT_DATA = _flightData),
      concatMap((res: { _flightData: FlightElement }) => this.getOrderData()),
      tap((_orderData: {res: {_flightData: FlightElement}}) => {

        const scatteredOrdersArr: any[] = Object.entries(_orderData);
        let normalizedOrdersArr: OrderElement[] = [];

        console.warn('preliminary data', scatteredOrdersArr, this.FLIGHT_DATA);
        for (let i = 0; i < scatteredOrdersArr.length; i++){
            let boxCapacityCounter = 1;
            for (let j = 0; j < this.FLIGHT_DATA.length; j++) {
                if ((scatteredOrdersArr[i][1]['destination'] == this.FLIGHT_DATA[j]['arrival_city']) 
                  && boxCapacityCounter <= BoxCapacity.BOX_CAPACITY
                  && this.FLIGHT_DATA[j]['day'] == 1) {
                    normalizedOrdersArr.push({
                      orderId: scatteredOrdersArr[i][0],
                      flight_number: this.FLIGHT_DATA[j]['flight_number'],
                      arrival_city: this.FLIGHT_DATA[j]['arrival_city'],
                      departure_city: this.FLIGHT_DATA[j]['departure_city'],
                      day: this.FLIGHT_DATA[j]['day'],
                      destination: this.FLIGHT_DATA[j]['arrival_city']
                    });
                    boxCapacityCounter++;
                    // the break to avoid duplicates; less memory intensive
                    break;
                } 
                else if ((scatteredOrdersArr[i][1]['destination'] == this.FLIGHT_DATA[j]['arrival_city']) 
                  && boxCapacityCounter <= BoxCapacity.BOX_CAPACITY
                  && this.FLIGHT_DATA[j]['day'] == 2) {
                    normalizedOrdersArr.push({
                      orderId: scatteredOrdersArr[i][0],
                      flight_number: this.FLIGHT_DATA[j]['flight_number'],
                      arrival_city: this.FLIGHT_DATA[j]['arrival_city'],
                      departure_city: this.FLIGHT_DATA[j]['departure_city'],
                      day: this.FLIGHT_DATA[j]['day'],
                      destination: this.FLIGHT_DATA[j]['arrival_city']
                    });
                    boxCapacityCounter++;
                    break;
                } 
                else {
                  //in case box is unable to be seated on a plane OR no planes go to box destination
                  normalizedOrdersArr.push({
                      orderId: scatteredOrdersArr[i][0],
                      flight_number: null,
                      arrival_city: scatteredOrdersArr[i][1]['destination'],
                      departure_city: this.FLIGHT_DATA[j]['departure_city'],
                      day: null,
                      destination: scatteredOrdersArr[i][1]['destination']
                  });
                  break;
                }
              }
          }
        
        this.ORDER_DATA.push(...normalizedOrdersArr);
        console.warn('order data', this.ORDER_DATA);
      })

    ));
  }

  returnOrdersRelatedToThisFlight(flightNumber: number): OrderElement[] {
    for (let i = 0; i < this.ORDER_DATA.length; i++) {
      if (this.ORDER_DATA[i].flight_number == flightNumber) {
        this.ORDERS_FOR_THIS_FLIGHT.push(this.ORDER_DATA[i]);
      }
    }
    return this.ORDERS_FOR_THIS_FLIGHT;
  }

}