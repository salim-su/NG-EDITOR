import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import i18n from '../../../locales';

@Component({
    selector: 'app-toolbar-panel',
    templateUrl: './toolbar-panel.component.html',
    styleUrls: [ './toolbar-panel.component.less' ],
})
export class ToolbarPanelComponent implements OnInit {
    @ViewChild('toolbar_dom', { static: true }) private toolbar_dom: ElementRef;
    /*i18n*/
    i18n = i18n.zh;

    constructor() {
    }

    ngOnInit() {
    }
    getDom() {
        return this.toolbar_dom.nativeElement;
    }
}
