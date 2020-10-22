import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CatalogComponent } from './catalog.component';
import { BrowserModule } from '@angular/platform-browser';
import { CatalogService } from './catalog.service';



@NgModule({
  declarations: [CatalogComponent],
  imports: [
    SharedModule,
    BrowserModule,
    CommonModule
  ],
  providers: [
    CatalogService
  ]
})
export class CatalogModule { }
