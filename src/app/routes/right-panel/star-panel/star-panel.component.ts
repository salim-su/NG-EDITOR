import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-star-panel',
    templateUrl: './star-panel.component.html',
    styles: [],
})
export class StarPanelComponent implements OnInit,OnChanges {
    @Input() selData;
    @Output() customClick = new EventEmitter<Object>();

    value: string;
    constructor() {
    }

    ngOnInit() {
        console.log(this.selData);

    }
    onChange(type:string,value: string): void {
        let a ={
            type:type, value: value,
        }
        this.customClick.emit(a);


        console.log(value);
        console.log(type);
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes.selData.currentValue);
    }
}
