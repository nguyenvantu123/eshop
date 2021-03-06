import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IOrder } from '../shared/models/order.model';
import { ConfigurationService } from '../shared/services/configuration.service';
import { SignalrService } from '../shared/services/signalr.service';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  private oldOrders: IOrder[];
  private internal = null;
  errorReceived: boolean;
  orders: IOrder[];

  // tslint:disable-next-line: max-line-length
  constructor(private service: OrdersService, private configurationService: ConfigurationService, private signalrService: SignalrService) { }

  ngOnInit(): void {
    if (this.configurationService.isReady) {
      this.getOrders();
    } else {
      this.configurationService.settingsLoaded$.subscribe(x => {
        this.getOrders();
      });
    }
  }

  // tslint:disable-next-line: typedef
  getOrders(){
    this.errorReceived = false;
    this.service.getOrders()
      .pipe(catchError((err) => this.handleError(err)))
      .subscribe(orders => {
        this.orders = orders;
        this.oldOrders = this.oldOrders;
        console.log('order items retrieved: ' + orders.length);
      });
  }

  // tslint:disable-next-line: typedef
  private handleError(error: any) {
    this.errorReceived = true;
    // tslint:disable-next-line: deprecation
    return Observable.throw(error);
  }
}
