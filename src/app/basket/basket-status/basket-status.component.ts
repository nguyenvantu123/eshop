import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BasketWrapperService } from 'src/app/shared/services/basket.wrapper.service';
import { ConfigurationService } from 'src/app/shared/services/configuration.service';
import { SecurityService } from 'src/app/shared/services/security.service';
import { BasketService } from '../basket.service';

@Component({
  selector: 'app-basket-status',
  templateUrl: './basket-status.component.html',
  styleUrls: ['./basket-status.component.scss']
})
export class BasketStatusComponent implements OnInit {

  basketItemAddedSubscription: Subscription;
  authSubscription: Subscription;
  basketDroppedSubscription: Subscription;

  badge: number = 0;

  constructor(private service: BasketService, private basketEvents: BasketWrapperService, private authService: SecurityService, private configurationService: ConfigurationService) { }

  ngOnInit(): void {

    // Subscribe to Add Basket Observable:
    this.basketItemAddedSubscription = this.basketEvents.addItemToBasket$.subscribe(
      item => {
        this.service.addItemToBasket(item).subscribe(res => {
          this.service.getBasket().subscribe(basket => {
            if (basket)
              this.badge = basket.items.length;
          });
        });
      });

    // Subscribe to Drop Basket Observable:   
    this.basketDroppedSubscription = this.service.basketDroped$.subscribe(res => {
      this.badge = 0;
    });

    // Subscribe to login and logout observable
    this.authSubscription = this.authService.authenticationChallenge$.subscribe(res => {
      this.service.getBasket().subscribe(basket => {
        if (basket != null)
          this.badge = basket.items.length;
      });
    });

    //Init:
    if (this.configurationService.isReady) {
      this.service.getBasket().subscribe(basket => {
        if (basket != null) {
          this.badge = basket.items.length;
        }
      })
    } else {
      this.configurationService.settingsLoaded$.subscribe(x => {
        this.service.getBasket().subscribe(basket => {
          if (basket != null) {
            this.badge = basket.items.length;
          }
        });
      });
    }
  }
}
