import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Guid } from 'src/guid';
import { SecurityService } from './security.service';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private securityService: SecurityService) { }

  get(url: string, params?: any): Observable<Response> {
    let options = {};
    this.setHeaders(options);

    return this.http.get(url, options)
      .pipe(
        // retry(3), // retry a failed request up to 3 times
        tap((res: Response) => {
          return res;
        }),
        catchError(this.handleError)
      );
  }

  private setHeaders(options: any, needId?: boolean) {
    if (needId && this.securityService) {
      options["headers"] = new HttpHeaders()
        .append('authorization', 'Bearer ' + this.securityService.GetToken())
        .append('x-requestid', Guid.newGuid());
    } else if (this.securityService) {
      options["headers"] = new HttpHeaders()
        .append('authorization', 'Bearer ' + this.securityService.GetToken());
    }
  }

  postWithId(url: string, data: any, params?: any): Observable<Response> {
    return this.doPost(url, data, true, params);
  }

  post(url: string, data: any, params?: any): Observable<Response> {
    return this.doPost(url, data, false, params);
  }

  putWithId(url: string, data: any, params?: any): Observable<Response> {
    return this.doPut(url, data, false, params);
  }

  private doPost(url: string, data: any, needId: boolean, params?: any): Observable<Response> {
    let options = {};
    this.setHeaders(options, needId);

    return this.http.post(url, data, options)
      .pipe(
        tap((res: Response) => {
          return res;
        }),
        catchError(this.handleError)
      );
  }

  private doPut(url: string, data: any, needId: boolean, params?: any): Observable<Response> {
    let options = {};
    this.setHeaders(options, needId);

    return this.http.put(url, data, options)
      .pipe(
        tap((res: Response) => {
          return res;
        }),
        catchError(this.handleError)
      );
  }

  delete(url: string, params?: any) {
    let options = {};
    this.setHeaders(options);

    console.log('data.service deleting');

    this.http.delete(url, options)
      .subscribe((res) => {
        console.log('deleted');
      });
  }

  private handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      console.error('Client side network error occured', error.error.message);
    } else {
      console.error('Backend -' +
        `status: ${error.status}` +
        `status: ${error.statusText}` +
        `message: ${error.error.message}`);
    }

    return throwError(error || 'server error');
  }
}
