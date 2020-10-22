import { Component, OnInit, OnChanges, Output, Input, EventEmitter } from '@angular/core';

import { IPager } from '../../models/pager.model';

@Component({
    selector: 'app-pager',
    templateUrl: './pager.html',
    styleUrls: ['./pager.scss']
})


export class PagerComponent implements OnInit, OnChanges  {

    @Output()
    changed: EventEmitter<number> = new EventEmitter<number>();

    @Input()
    model: IPager;

    buttonStates: any = {
        nextDisabled: true,
        previousDisabled: true,
    };

    // tslint:disable-next-line: typedef
    ngOnInit() {
    }

    // tslint:disable-next-line: typedef
    ngOnChanges() {
        if (this.model) {
            this.model.items = (this.model.itemsPage > this.model.totalItems) ? this.model.totalItems : this.model.itemsPage;

            this.buttonStates.previousDisabled = (this.model.actualPage === 0);
            this.buttonStates.nextDisabled = (this.model.actualPage + 1 >= this.model.totalPages);
        }
    }

    // tslint:disable-next-line: typedef
    onNextClicked(event: any) {
        event.preventDefault();
        console.log('Pager next clicked');
        this.changed.emit(this.model.actualPage + 1);
    }

    // tslint:disable-next-line: typedef
    onPreviousCliked(event: any) {
        event.preventDefault();
        console.log('Pager previous clicked');
        this.changed.emit(this.model.actualPage - 1);
    }

}
