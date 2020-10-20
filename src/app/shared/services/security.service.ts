import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { StorageService } from './storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { info } from 'console';
import { ConfigurationService } from './configuration.service';
import { relative } from 'path';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private actionUrl: string;
  private headers: HttpHeaders;
  private storage: StorageService;
  private authenticationSource = new Subject<boolean>();
  authenticationChallenge$ = this.authenticationSource.asObservable();
  private authorityUrl = '';

  constructor(private _http: HttpClient, private _router: Router, private route: ActivatedRoute, private _configurationService: ConfigurationService, private _storageService: StorageService) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
    this.storage = _storageService;

    this._configurationService.settingsLoaded$.subscribe(x => {
      this.authorityUrl = this._configurationService.serverSettings.identityUrl
      this.storage.store('IdentityUrl', this.authorityUrl);
    });

    if (this.storage.retrieve('IsAuthorized') !== '') {
      this.IsAuthorized = this.storage.retrieve('IsAuthorized');
      this.authenticationSource.next(true);
      this.UserData = this.storage.retrieve('userData');
    }
  }

  public IsAuthorized: boolean;

  public GetToken(): any {
    return this.storage.retrieve('authorizationData');
  }

  public ResetAuthorizationData() {
    this.storage.store('authorizationData', '');
    this.storage.store('authorizationDataIdToken', '');

    this.IsAuthorized = false;
    this.storage.store('IsAuthorized', false);
  }

  public UserData: any;

  public SetAuthirizationData(token: any, id_token: any) {
    if (this.storage.retrieve('authorizationData') !== '') {
      this.storage.store('authorizationData', '');
    }

    this.storage.store('authorizationData', token);
    this.storage.store('authorizationDataIdToken', id_token);
    this.IsAuthorized = true;
    this.storage.store('IsAuthorized', true);

    this.getUserData().subscribe(data => {
      this.UserData = data;
      this.storage.store('userData', data);
      this.authenticationSource.next;
      window.location.href = location.origin;
    },
    error => this.handleError(error),
    () => console.log(this.UserData));
  }

  private handleError(error: any){
    console.log(error);

    if (error.status == 403) {
      this._router.navigate(['/Forbiden']);
    } else {
      this._router.navigate(['/Unauthorized']);
    }
  }

  public Authorize() {
    this.ResetAuthorizationData();

    let authorizationUrl = this.authorityUrl + '/connect/authorize';
    let client_id = 'js';

    let redirect_uri = location.origin + '/';
    let response_type = 'id_token token';
    let scope = 'openid profile orders basket marketing locations webshoppingagg orders.signalrhub';
    let nonce = 'N' + Math.random() + '' + Date.now();
    let state = Date.now() + '' + Math.random();

    this.storage.store('authStateControl', state);
    this.storage.store('authNonce', nonce);

    let url =
      authorizationUrl + '?' +
      'response_type=' + encodeURI(response_type) + '&' +
      'client_id=' + encodeURI(client_id) + '&' +
      'redirect_uri=' + encodeURI(redirect_uri) + '&' +
      'scope=' + encodeURI(scope) + '&' +
      'nonce=' + encodeURI(nonce) + '&' +
      'state=' + encodeURI(state);

    window.location.href = url;
  }

  public AuthorizedCallback() {
    this.ResetAuthorizationData();
    let hash = window.location.hash.substr(1);

    let result: any = hash.split('&').reduce(function (result: any, item: string) {
      let parts = item.split('=');
      result[parts[0]] = parts[1];
      return result;
    }, {});

    console.log(result);

    let token = '';
    let id_token = '';
    let authResponseIsValid = false;

    if (!result.error) {
      if (result.state !== this.storage.retrieve('authStateControl')) {
        console.log('AuthorizationCallback incorrect state');
      }
      else {
        token = result.access_token;
        id_token = result.id_token;

        let dataIdToken: any = this.getDataFromToken(id_token);

        // validate nonce
        if (dataIdToken.nonce !== this.storage.retrieve('authNonce')) {
          console.log('AuthorizedCallback incorrect nonce');
        } else {
          this.storage.store('authNonce', '');
          this.storage.store('authStateControl', '');

          authResponseIsValid = true;
          console.log('AuthorizedCallback state and nonce validated, returning access token');
        }
      }

    }
  }

  private getDataFromToken(token: any) {
    let data = {};

    if (typeof token !== 'undefined') {
      let encoded = token.split('.')[1];

      data = JSON.parse(this.urlBase64Decode(encoded));
    }
    return data;
  }

  private urlBase64Decode(str: any) {
    let output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;

      case 2:
        output += '==';
        break;

      case 3:
        output += '=';  
      default:
        throw 'Illegal base64url string!';
    }

    return window.atob(output);
  }

  private getUserData = (): Observable<string[]> => {
    if (this.authorityUrl === '') {
      this.authorityUrl = this.storage.retrieve('IdentityUrl');
    }

    const options = this.setHeaders();

    return this._http.get<string[]>(`${this.authorityUrl}/connect/userinfo`, options).pipe<string[]>((info: any) => info);
  }

  private setHeaders(): any {
    const httpOptions = {
      headers: new HttpHeaders()
    };

    httpOptions.headers = httpOptions.headers.set('Content-Type', 'application/json');
    httpOptions.headers = httpOptions.headers.set('Accept', 'application/json');

    const token = this.GetToken();

    if (token !== '') {
      httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
    }

    return httpOptions;
  }

}
