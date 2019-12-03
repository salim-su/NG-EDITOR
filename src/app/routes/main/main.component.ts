import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    ViewChild,
} from '@angular/core';
import G6 from '@antv/g6/src';
import { getShapeName } from '../../../util/clazz';
import Command from '../../../plugins/command';
import Toolbar from '../../../plugins/toolbar';
import AddItemPanel from '../../../plugins/addItemPanel';
import CanvasPanel from '../../../plugins/canvasPanel';
import { exportXML } from '../../../util/bpmn';
import registerShape from '../../../shape';
import registerBehavior from '../../../behavior';
import i18n from '../../../locales';
// import * as G6 from '@antv/g6';

registerShape(G6);
registerBehavior(G6);

@Component({
    selector: 'wfd-vue',
    // selector: 'app-main',
    templateUrl: './main.component.html',
    styles: [],
})
export class MainComponent implements OnInit, OnChanges, AfterViewInit {
    @Input() isView: boolean = false;
    @Input() mode: string = 'edit';
    @Input() height: number = 800;
    @Input() lang: string = 'zh';
    @Input() data = { nodes: [], edges: [] };
    @Input() users: Array<any> = [];
    @Input() groups: Array<any> = [];

    resizeFunc: () => void;
    selectedModel = {};
    processModel = {
        id: '',
        name: '',
        clazz: 'process',
        dataObjs: [],
        signalDefs: [],
        messageDefs: [],
    };
    graph: any;
    cmdPlugin: any;
    /*i18n*/
    i18n = i18n['zh'];

    // @ViewChild('addItemPanel', { static: true }) private addItemPanel: ElementRef;
    @ViewChild('canvas', { static: true }) private canvas: ElementRef;
    @ViewChild('salimsu', { static: true }) private salimsu: ElementRef;
    @ViewChild('toolbar', { static: true }) toolbar: any;
    @ViewChild('addItemPanel', { static: true }) addItemPanel: any;


    // @ViewChild('addItemPanel', { static: true,read: ElementRef }) addItemPanel: ElementRef;
    // @ViewChild('div', { static: true }) div: any;
    // @ViewChild('alert1',{ static: true }) alert1:any;

    constructor() {
        registerShape(G6);
        registerBehavior(G6);
        // console.log(G6.version);
        // console.log(getShapeName('end'));
        // console.log(Command);
        // console.log(Toolbar);
        // console.log(AddItemPanel);
        // console.log(CanvasPanel);
        // console.log(exportXML);
        // console.log(registerShape);
    }

    ngOnInit() {

        console.log(this.data);
        let plugins = [];
        if (!this.isView) {
            this.cmdPlugin = new Command();
            const toolbar = new Toolbar({ container: this.toolbar.getDom() });
            const addItemPanel = new AddItemPanel({ container: this.addItemPanel.getDom() });
            console.log(addItemPanel);
            const canvasPanel = new CanvasPanel({ container: this.canvas.nativeElement });
            plugins = [this.cmdPlugin, toolbar, addItemPanel, canvasPanel];
        }
        const width = this.canvas.nativeElement.offsetWidth;
        this.graph = new G6.Graph({
            plugins: plugins,
            container: this.canvas.nativeElement,
            height: this.height,
            width: width,
            modes: {
                default: ['drag-canvas', 'clickSelected'],
                view: [],
                edit: ['drag-canvas', 'hoverNodeActived', 'hoverAnchorActived', 'dragNode', 'dragEdge',
                    'dragPanelItemAddNode', 'clickSelected', 'deleteItem', 'itemAlign'],
            },
            defaultEdge: {
                shape: 'flow-polyline-round',
            },
        });


        this.graph.saveXML = (createFile = true) => exportXML(this.graph.save(), this.processModel, createFile);
        if (this.isView)
            this.graph.setMode('view');
        else
            this.graph.setMode(this.mode);
        this.graph.data(this.initShape(this.data));
        this.graph.render();
        if (this.isView && this.data && this.data.nodes) {
            this.graph.fitView(5);
        }
        this.initEvents();


        console.log(this.data.nodes);
        console.log(this.groups);
        console.log(this.users);


        // const canvasPanel = new CanvasPanel({container:this.canvas.nativeElement});
        // const toolbar = new Toolbar({container:this.toolbar.getDom()});
        // console.log(this.alert1.getDom());
        // console.log(this.toolbar.getDom());
        // console.log(toolbar);

    }

    ngAfterViewInit(): void {
    }

    ngOnChanges(): void {
    }


    /*mounted() {
        console.log(this.data);
        let plugins = [];
        if (!this.isView) {
            this.cmdPlugin = new Command();
            const toolbar = new Toolbar({ container: this.$refs['toolbar'].$el });
            const addItemPanel = new AddItemPanel({ container: this.$refs['addItemPanel'].$el });
            console.log(addItemPanel);
            const canvasPanel = new CanvasPanel({ container: this.$refs['canvas'] });
            plugins = [this.cmdPlugin, toolbar, addItemPanel, canvasPanel];
        }
        const width = this.$refs['canvas'].offsetWidth;
        this.graph = new G6.Graph({
            plugins: plugins,
            container: this.$refs['canvas'],
            height: this.height,
            width: width,
            modes: {
                default: ['drag-canvas', 'clickSelected'],
                view: [],
                edit: ['drag-canvas', 'hoverNodeActived', 'hoverAnchorActived', 'dragNode', 'dragEdge',
                    'dragPanelItemAddNode', 'clickSelected', 'deleteItem', 'itemAlign'],
            },
            defaultEdge: {
                shape: 'flow-polyline-round',
            },
        });
        this.graph.saveXML = (createFile = true) => exportXML(this.graph.save(), this.processModel, createFile);
        if (this.isView)
            this.graph.setMode('view');
        else
            this.graph.setMode(this.mode);
        this.graph.data(this.initShape(this.data));
        this.graph.render();
        if (this.isView && this.data && this.data.nodes) {
            this.graph.fitView(5);
        }
        this.initEvents();
    }*/

    initShape(data) {
        // debugger;
        if (data && data.nodes) {
            return {
                nodes: data.nodes.map(node => {
                    return {
                        shape: getShapeName(node.clazz),
                        ...node,
                    };
                }),
                edges: data.edges,
            };
        }
        return data;
    }

    initEvents() {
        this.graph.on('afteritemselected', (items) => {
            if (items && items.length > 0) {
                const item = this.graph.findById(items[0]);
                this.selectedModel = { ...item.getModel() };
            } else {
                this.selectedModel = this.processModel;
            }
        });
        const page = this.canvas.nativeElement;
        const graph = this.graph;
        const height = this.height - 1;

        this.resizeFunc = () => {
            graph.changeSize(page.offsetWidth, height);
        };
        window.addEventListener('resize', this.resizeFunc);
    }

    onItemCfgChange(key, value) {
        const items = this.graph.get('selectedItems');
        if (items && items.length > 0) {
            const item = this.graph.findById(items[0]);
            if (this.graph.executeCommand) {
                this.graph.executeCommand('update', {
                    itemId: items[0],
                    updateModel: { [key]: value },
                });
            } else {
                this.graph.updateItem(item, { [key]: value });
            }
            this.selectedModel = { ...item.getModel() };
        } else {
            const canvasModel = { ...this.processModel, [key]: value };
            this.selectedModel = canvasModel;
            this.processModel = canvasModel;
        }
    }

    destroyed() {
        window.removeEventListener('resize', this.resizeFunc);
        this.graph.getNodes().forEach(node => {
            node.getKeyShape().stopAnimate();
        });
    }


}
