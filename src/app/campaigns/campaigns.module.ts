import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '../shared/shared.module';
import { CampaignsDetailComponent } from './campaigns-detail/campaigns-detail.component';
import { CampaignsComponent } from './campaigns.component';
import { CampaignsService } from './campaigns.service';



@NgModule({
  declarations: [CampaignsComponent, CampaignsDetailComponent],
  imports: [
    BrowserModule,
    SharedModule
  ],
  providers: [
    CampaignsService
  ]
})
export class CampaignsModule { }
