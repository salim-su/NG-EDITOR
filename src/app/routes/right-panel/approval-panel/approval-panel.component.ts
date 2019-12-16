import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-approval-panel',
  templateUrl: './approval-panel.component.html',
  styles: []
})
export class ApprovalPanelComponent implements OnInit,OnChanges {

    @Input() selData;
    @Output() customClick = new EventEmitter<Object>();
    labelValue: string;
    dueDateValue: Date;
    assignType: any;
    emitData:any;
    assignValue:any;

    flag;

    constructor() {
    }


    ngOnInit() {
        console.log(this.selData);

    }
    onChange(type:string,value: string): void {

        if (type == 'dueDate') {
            console.log('dueDate');
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
        if (type == 'assignType') {
            console.log(value);
            console.log('assignType');
            this.emitData ={
                type, value,
            }
        }
        if (type == 'assignValue') {
            console.log(value);
            console.log('assignValue');
            this.emitData ={
                type, value,
            }
        }
        this.customClick.emit(this.emitData);
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes.selData.currentValue);
        console.log(this.selData);
        this.labelValue = null;
        this.dueDateValue = null;
        this.assignType = null;
        this.assignValue = null;
        /*数据进来  表单接收数据 */
        for (const selDataKey in this.selData) {
            if (selDataKey == 'label') {
                this.labelValue = this.selData[selDataKey];
            }
            if (selDataKey == 'dueDate') {
                this.dueDateValue = moment(this.selData[selDataKey]).toDate();
            }
            if (selDataKey == 'assignType') {
                this.assignType = this.selData[selDataKey];
            }
            if (selDataKey == 'assignValue') {
                this.assignValue = this.selData[selDataKey];
            }
        }

    }

}
