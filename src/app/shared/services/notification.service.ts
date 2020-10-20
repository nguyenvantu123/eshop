import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  printSuccessMessage(message: string) {
    console.log(message);
  }

  printErrorMessage(message: string) {
    console.error(message);
  }
}
