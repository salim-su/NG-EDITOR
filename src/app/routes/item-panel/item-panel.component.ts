import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import i18n from '../../../locales';

@Component({
    selector: 'app-item-panel',
    templateUrl: './item-panel.component.html',
    styles: [],
})
export class ItemPanelComponent implements OnInit {
    @ViewChild('itemPanel_dom', { static: true }) private itemPanel_dom: ElementRef;

    i18n = i18n.zh;

    constructor() {
    }

    ngOnInit() {
    }
    getDom() {
        return this.itemPanel_dom.nativeElement;
    }
}
