import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IBasket } from '../shared/models/basket.model';
import { IBasketItem } from '../shared/models/basketItem.model';
import { BasketWrapperService } from '../shared/services/basket.wrapper.service';
import { BasketService } from './basket.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  errorMessages: any;
  basket: IBasket;
  totalPrice: number = 0;

  constructor(private service: BasketService, private router: Router, private basketwrapper: BasketWrapperService) { }

  ngOnInit(): void {
    this.service.getBasket().subscribe(basket => {
      this.basket = basket;
      this.calculateTotalPrice();
    })
  }

  itemQuantityChanged(item: IBasketItem) {
    this.calculateTotalPrice();
    this.service.setBasket(this.basket).subscribe(x => console.log('basket update: ' + x));
  }

  update(event: any): Observable<boolean> {
    let setBasketObservable = this.service.setBasket(this.basket);
    setBasketObservable.subscribe(x => {
      this.errorMessages = [];
      console.log('basket update: ' + x);
    },
      errMessage => this.errorMessages = errMessage);

    return setBasketObservable;
  }

  checkOut(event: any) {
    this.update(event).subscribe(x => {
      this.errorMessages = [];
      this.basketwrapper.basket = this.basket;
      this.router.navigate(['order']);
    });
  }

  private calculateTotalPrice() {
    this.totalPrice = 0;
    this.basket.items.forEach(item => {
      this.totalPrice += (item.quantity * item.unitPrice);
    });
  }
}
