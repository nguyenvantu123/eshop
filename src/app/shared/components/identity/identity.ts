import { Component, OnInit } from "@angular/core";
import { Subscription } from 'rxjs';
import { SecurityService } from '../../services/security.service';
import { SignalrService } from '../../services/signalr.service';

@Component({
    selector: 'esh-identity',
    templateUrl: './identity.html',
    styleUrls: ['./identity.scss']
})

export class Identity implements OnInit {

    authenticated: boolean = false;
    private subscription: Subscription;
    private userName: string = '';

    constructor(private securityService: SecurityService, private signalrService: SignalrService) { }

    ngOnInit() {
        this.subscription = this.securityService.authenticationChallenge$.subscribe(res => {
            this.authenticated = res;
            this.userName = this.securityService.UserData.email;
        })

        if (window.location.hash) {
            this.securityService.AuthorizedCallback();
        }

        console.log('identity component,checking authorized' + this.securityService.IsAuthorized);
        this.authenticated = this.securityService.IsAuthorized;

        if (this.authenticated) {
            if (this.securityService.UserData) {
                this.userName = this.securityService.UserData.email;
            }
        }
    }

    logoutClicked(event: any) {
        event.preventDefault();
        console.log('Logout clicked');
        this.logout();
    }

    login() {
        this.securityService.Authorize();
    }

    logout() {
        this.signalrService.stop();
    }
}