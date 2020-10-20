import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UppercasePipe } from './pipes/uppercase.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BasketStatusComponent } from './basket/basket-status/basket-status.component';

@NgModule({
  declarations: [
    Pager,
    Header,
    Identity,
    PageNotFoundComponent,
    UppercasePipe,
    BasketStatusComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    // No need to export as these modules don't expose any components/directive etc'
    HttpClientModule,
    HttpClientJsonpModule
  ],
  exports:[
    // Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    // Providers, Components, directive, pipes
    Pager,
    Header,
    Identity,
    PageNotFoundComponent,
    UppercasePipe
  ]
})
export class SharedModule { }
