import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.html',
    styleUrls: ['./header.scss']
})

export class HeaderComponent implements OnInit {

  @Input()
  url: string;

    ngOnInit(): void {

    }


}
