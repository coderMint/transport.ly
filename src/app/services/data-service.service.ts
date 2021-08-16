import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  FLIGHTDATA_URL: string = './assets/data/coding-assignment-schedule.json';
  ORDERDATA_URL: string = './assets/data/coding-assignment-orders.json'

  constructor(private http: HttpClient) {}

  getFlightData(): Observable<any> {
    return this.http.get(this.FLIGHTDATA_URL);
  }
}
