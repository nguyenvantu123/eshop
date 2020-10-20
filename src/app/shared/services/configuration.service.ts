import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IConfiguration } from '../models/configuration.model';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  serverSettings: IConfiguration;
  private settingsLoadedSource = new Subject();
  settingsLoaded$ = this.settingsLoadedSource.asObservable();
  isReady: boolean = false;

  constructor(private http: HttpClient, private storageService: StorageService) { }

  load() {
    const baseURI = document.baseURI.endsWith('/') ? document.baseURI : `${document.baseURI}/`;
    let url = `${baseURI}Home/Configuration`;
    this.http.get(url).subscribe((response) => {
        console.log('server settings loaded');
        this.serverSettings = response as IConfiguration;
        console.log(this.serverSettings);
        this.storageService.store('identityUrl', this.serverSettings.identityUrl);
        this.storageService.store('marketingUrl', this.serverSettings.marketingUrl);
        this.storageService.store('purchaseUrl', this.serverSettings.purchaseUrl);
        this.storageService.store('signalrHubUrl', this.serverSettings.signalrHubUrl);
        this.storageService.store('activateCampaignDetailFunction', this.serverSettings.activateCampaignDetailFunction);
        this.isReady = true;
        this.settingsLoadedSource.next();
    });
}
}
