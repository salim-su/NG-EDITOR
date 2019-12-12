import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-all-right-panel',
    templateUrl: './all-right-panel.component.html',
    styles: [],
})
export class AllRightPanelComponent implements OnInit {

    @Input()
    selData;
    @Output() customClick = new EventEmitter<Object>();

    constructor() {
    }

    ngOnInit() {
    }

}
