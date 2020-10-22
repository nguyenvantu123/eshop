import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ICampaign } from '../shared/models/campaign.model';
import { ICampaignItem } from '../shared/models/campaignItem.model';
import { ConfigurationService } from '../shared/services/configuration.service';
import { DataService } from '../shared/services/data.service';
import { SecurityService } from '../shared/services/security.service';

@Injectable({
  providedIn: 'root'
})
export class CampaignsService {

  private marketingUrl: string = '';
  private buyerId: string = '';
  constructor(private service: DataService, private identityService: SecurityService, private configurationService: ConfigurationService) {
    if (this.identityService.IsAuthorized) {
      if (this.identityService.UserData) {
        this.buyerId = this.identityService.UserData.sub;
      }
    }

    if (this.configurationService.isReady)
      this.marketingUrl = this.configurationService.serverSettings.marketingUrl;
    else
      this.configurationService.settingsLoaded$.subscribe(x => this.marketingUrl = this.configurationService.serverSettings.marketingUrl);

  }

  getCampaigns(pageIndex: number, pageSize: number) {
    let url = this.marketingUrl + '/m/api/v1/campaigns/user';
    url = url + '?pageIndex=' + pageIndex + '&pageSize=' + pageSize;

    return this.service.get(url).pipe<ICampaign>(tap((response: any) => {
      return response;
    }));
  }

  getCampaign(id: number) {
    let url = this.marketingUrl + '/m/api/v1/campaigns/user' + id;

    return this.service.get(url).pipe<ICampaignItem>(tap((response: any) => {
      return response;
    }));
  }
}
