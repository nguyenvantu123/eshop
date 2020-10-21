import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BasketStatusComponent } from './basket-status/basket-status.component';
import { BasketComponent } from './basket.component';
import { BasketService } from './basket.service';



@NgModule({
  declarations: [BasketComponent, BasketStatusComponent],
  imports: [
    SharedModule
  ],
  providers: [BasketService],
  exports: [BasketStatusComponent]
})

export class BasketModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: BasketModule,
      providers: [
        // Providers
        BasketService
      ]
    };
  }
}
