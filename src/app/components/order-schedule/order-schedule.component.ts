import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { OrderElement } from 'src/app/model/order';

@Component({
  selector: 'order-schedule',
  templateUrl: './order-schedule.component.html',
  styleUrls: ['./order-schedule.component.scss']
})
export class OrderScheduleComponent implements OnInit {

  @Input() source: OrderElement[] = [];
  @ViewChild(MatTable) table: MatTable<OrderElement> | any;

  displayedColumns: string[] = ['orderId', 'flight_number', 'departure_city', 'arrival_city', 'day'];
  dataSource: any[] = [];

  constructor() {}

  ngOnInit(): void {}
  
  ngOnChanges(): void {
    this.dataSource = this.source;
  }

}
