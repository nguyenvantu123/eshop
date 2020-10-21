import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UppercasePipe } from './pipes/uppercase.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PagerComponent } from './components/pager/pager';
import { Identity } from './components/identity/identity';
import { HeaderComponent } from './components/header/header';
import { DataService } from './services/data.service';
import { BasketWrapperService } from './services/basket.wrapper.service';
import { SecurityService } from './services/security.service';
import { ConfigurationService } from './services/configuration.service';
import { StorageService } from './services/storage.service';
import { SignalrService } from './services/signalr.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';

@NgModule({
  declarations: [
    PagerComponent,
    HeaderComponent,
    Identity,
    PageNotFoundComponent,
    UppercasePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    // No need to export as these modules don't expose any components/directive etc'
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  exports: [
    // Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    PagerComponent,
    HeaderComponent,
    Identity,
    PageNotFoundComponent,
    UppercasePipe,
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        // Providers
        DataService,
        BasketWrapperService,
        SecurityService,
        ConfigurationService,
        StorageService,
        SignalrService,
      ],
    };
  }
}
