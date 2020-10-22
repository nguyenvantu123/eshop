import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICampaignItem } from 'src/app/shared/models/campaignItem.model';
import { CampaignsService } from '../campaigns.service';

@Component({
  selector: 'app-campaigns-detail',
  templateUrl: './campaigns-detail.component.html',
  styleUrls: ['./campaigns-detail.component.scss']
})
export class CampaignsDetailComponent implements OnInit {

  campaign: ICampaignItem = <ICampaignItem>{};
  constructor(private service: CampaignsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = +params.get('id');

      this.getCampaign(id);
    });
  }

  getCampaign(id: number) {
    this.service.getCampaign(id).subscribe(campaigns => {
      this.campaign = campaigns;
      console.log('campaign retrived:' + campaigns.id);
      console.log(this.campaign);
    });
  }

}
