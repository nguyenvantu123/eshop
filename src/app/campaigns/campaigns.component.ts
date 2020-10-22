import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ICampaign } from '../shared/models/campaign.model';
import { IPager } from '../shared/models/pager.model';
import { ConfigurationService } from '../shared/services/configuration.service';
import { CampaignsService } from './campaigns.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})

export class CampaignsComponent implements OnInit {

  private internal: null;
  campaigns: ICampaign;
  paginationInfo: IPager;
  isCampaignsDetailFunctionEnabled: boolean = false;
  errorReceived: boolean;
  constructor(private service: CampaignsService, private configurationService: ConfigurationService) { }

  ngOnInit(): void {
    if (this.configurationService.isReady) {
      this.getCampaigns(9, 0);
    } else {
      this.configurationService.settingsLoaded$.subscribe(x => {
        this.getCampaigns(9, 0);
      });
    }
  }

  onPageChanged(value: any) {
    console.log('campaigns pager event fired' + value);
    this.paginationInfo.actualPage = value;
  }

  getCampaigns(pageSize: number, pageIndex: number) {
    this.errorReceived = false;

    this.service.getCampaigns(pageIndex, pageSize)
      .pipe(catchError((err) => this.handleError(err)))
      .subscribe(campaigns => {
        this.campaigns = campaigns;
        this.paginationInfo = {
          actualPage: campaigns.pageIndex,
          itemsPage: campaigns.pageSize,
          totalItems: campaigns.count,
          totalPages: Math.ceil(campaigns.count / campaigns.pageSize),
          items: campaigns.pageSize
        };
      });
  }

  onNavigateDetails(uri: string) {
    window.open(uri, "_blank");
  }

  private handleError(error: any) {
    this.errorReceived = true;
    return Observable.throw(error);
  }
}
