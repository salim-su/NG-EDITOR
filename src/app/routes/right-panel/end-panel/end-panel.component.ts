import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-end-panel',
  templateUrl: './end-panel.component.html',
  styles: []
})
export class EndPanelComponent implements OnInit,OnChanges {
    @Input() selData;
    @Output() customClick = new EventEmitter<Object>();
    labelValue: string;
    endDateValue: Date;
    emitData:any;
    constructor() {
    }
    ngOnInit() {

    }
    onChange(type:string,value: string): void {

        if (type == 'endDate') {
            console.log('endDate');
            this.emitData ={
                type, value: moment(value).format('YYYY-MM-DD hh:mm:ss'),
            }
        }
        if (type == 'label') {
            console.log('label');
            this.emitData ={
                type, value,
            }
        }
        this.customClick.emit(this.emitData);
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);

        /*数据进来  表单接收数据 */
        for (const selDataKey in this.selData) {
            if (selDataKey == 'label') {
                this.labelValue = this.selData[selDataKey];
            }
            if (selDataKey == 'endDate') {
                this.endDateValue = moment(this.selData[selDataKey]).toDate();
            }
        }

    }

}
