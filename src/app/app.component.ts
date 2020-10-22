import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ConfigurationService } from './shared/services/configuration.service';
import { SecurityService } from './shared/services/security.service';
import { SignalrService } from './shared/services/signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  Authenticated = false;
  subscription: Subscription;

  constructor(
    private titleService: Title,
    private securityService: SecurityService,
    private configurationService: ConfigurationService,
    private signalrService: SignalrService,
    private toastr: ToastrService,
    vcr: ViewContainerRef
  ) {
    this.Authenticated = this.securityService.IsAuthorized;
  }

  ngOnInit(): void {
    console.log('app on init');
    this.subscription = this.securityService.authenticationChallenge$.subscribe(res => {
      this.Authenticated = res;
    });

    console.log('configuration');
    this.configurationService.load();
  }

  // tslint:disable-next-line: typedef
  public setTitle(newTitle: string) {
    this.titleService.setTitle('eShopOnContainers');
}
}
