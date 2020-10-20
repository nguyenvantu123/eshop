import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from './catalog/catalog.component';
import { BasketComponent } from './basket/basket.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { UppercasePipe } from './pipes/uppercase.pipe';
import { BasketStatusComponent } from './basket/basket-status/basket-status.component';
import { OrdersNewComponent } from './orders/orders-new/orders-new.component';
import { OrdersDetailComponent } from './orders/orders-detail/orders-detail.component';
import { CampaignsDetailComponent } from './campaigns/campaigns-detail/campaigns-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    UppercasePipe,
    BasketStatusComponent,
    OrdersNewComponent,
    OrdersDetailComponent,
    CampaignsDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CatalogComponent,
    BasketComponent,
    CampaignsComponent,
    SharedModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
