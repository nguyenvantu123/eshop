import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Guid } from 'src/guid';
import { IBasket } from '../models/basket.model';
import { IBasketItem } from '../models/basketItem.model';
import { ICatalogItem } from '../models/catalogItem.model';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class BasketWrapperService {

  public basket: IBasket;

  constructor(private identityService: SecurityService) { }

  private addItemToBasketCource = new Subject<IBasketItem>();
  addItemToBasket$ = this.addItemToBasketCource.asObservable();

  private orderCreatedSource = new Subject();
  orderCreated$ = this.orderCreatedSource.asObservable();

  addItemToBasket(item: ICatalogItem) {
    if (this.identityService.IsAuthorized) {
      let basket: IBasketItem = {
        pictureUrl: item.pictureUri,
        productId: item.id,
        productName: item.name,
        quantity: 1,
        unitPrice: item.price,
        id: Guid.newGuid(),
        oldUnitPrice: 0
      };

      this.addItemToBasketCource.next(basket);
    } else {
      this.identityService.Authorize();
    }
  }

  orderCreated() {
    this.orderCreatedSource.next();
  }

}
