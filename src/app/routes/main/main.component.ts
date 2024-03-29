import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit, SimpleChanges,
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
    styles: [
            `
            .footer {
                position: absolute;
                bottom: 0px;
                width: 100%;
                border-top: 1px solid rgb(232, 232, 232);
                padding: 10px 16px;
                text-align: right;
                left: 0px;
                background: #fff;
            }
        `,
    ],
    styleUrls: [ './main.component.less' ],

})
export class MainComponent implements OnInit, OnChanges, AfterViewInit {
    @Input() isView = false;
    @Input() mode = 'edit';
    @Input() height = 800;
    @Input() lang = 'zh';
    @Input() data = { nodes: [], edges: [] };
    @Input() users: Array<any> = [];
    @Input() groups: Array<any> = [];

    /*控制右侧弹窗*/
    visible = false;

    oldSelItemData: any=[];

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
    graph: any=null;
    cmdPlugin: any=null;
    /*i18n*/
    i18n = i18n.zh;

    // @ViewChild('addItemPanel', { static: true }) private addItemPanel: ElementRef;
    @ViewChild('canvas', { static: true }) private canvas: ElementRef;
    @ViewChild('salimsu', { static: true }) private salimsu: ElementRef;
    @ViewChild('toolbar', { static: true }) toolbar: any;
    @ViewChild('addItemPanel', { static: true }) addItemPanel: any;


    constructor() {
        registerShape(G6);
        registerBehavior(G6);
    }

    ngOnInit() {
        console.log(this.canvas);
        console.log(this.addItemPanel);



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
            plugins,
            container: this.canvas.nativeElement,
            height: this.height,
            width,
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


    ngOnChanges(changes: SimpleChanges): void {
        if (changes.data.currentValue !== changes.data.previousValue) {
            if (this.graph) {
                this.graph.changeData(this.initShape(changes.data.currentValue));
                this.graph.setMode(this.mode);
                this.graph.emit('canvas:click');
                if (this.cmdPlugin) {
                    this.cmdPlugin.initPlugin(this.graph);
                }
                if (this.isView) {
                    this.graph.fitView(5)
                }
            }
        }
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
            if (items.length > 0) {
            }
            if (items && items.length > 0) {
                const item = this.graph.findById(items[0]);
                this.selectedModel = { ...item.getModel() };
                this.open();
            }
            else {
                this.selectedModel = this.processModel;
            }

            console.log(this.selectedModel);

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


    open(): void {
        this.visible = true;
    }

    close(): void {
        this.visible = false;
    }
}
