import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-star-panel',
    templateUrl: './star-panel.component.html',
    styles: [],
})
export class StarPanelComponent implements OnInit,OnChanges {
    @Input() selData;
    @Output() customClick = new EventEmitter<Object>();
    labelValue: string;
    constructor() {
    }

    ngOnInit() {

    }
    onChange(type:string,value: string): void {
        let a ={
            type:type, value: value,
        }
        this.customClick.emit(a);
    }

    ngOnChanges(changes: SimpleChanges): void {
        for (let selDataKey in this.selData) {
            console.log(selDataKey);
            if (selDataKey == 'label') {
                this.labelValue = this.selData[selDataKey];
            }
        }
        console.log(changes.selData.currentValue);
    }
}
