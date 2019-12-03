import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
// @ts-ignore
// import G6 from '@antv/g6';
import G6 from '@antv/g6/src';

import Minimap from '@antv/g6/build/minimap';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

    constructor(private http: _HttpClient) {

    }

    ngOnInit() {
        console.log(G6.Global.version);
        this.can1();
        this.can2();
        this.can3();
    }


    can1() {
        // const Minimap = require('@antv/g6/build/minimap');
        const minimap = new Minimap({
            size: [100, 100],
            className: 'minimap',
            type: 'delegate',
        });

        const graph = new G6.Graph({
            container: 'mountNode',
            width: 800,
            height: 600,
            // 节点默认配置
            defaultNode: {
                labelCfg: {
                    style: {
                        fill: '#fff'
                    }
                }
            },
            // 边默认配置
            defaultEdge: {
                labelCfg: {
                    autoRotate: true
                }
            },
            // 节点在各状态下的样式
            nodeStateStyles: {
                // hover 状态为 true 时的样式
                hover: {
                    fill: 'lightsteelblue'
                },
                // click 状态为 true 时的样式
                click: {
                    stroke: '#000',
                    lineWidth: 3
                }
            },
            // 边在各状态下的样式
            edgeStateStyles: {
                // click 状态为 true 时的样式
                click: {
                    stroke: 'steelblue'
                }
            },
            // 布局
            layout: {
                type: 'force',
                linkDistance: 100,
                preventOverlap: true,
                nodeStrength: -30,
                edgeStrength: 0.1
            },
            // 内置交互
            modes: {
                default: [ 'drag-canvas', 'zoom-canvas', 'drag-node' ]
            },
            plugins: [minimap]
        });

        const main = async () => {
            const response = await fetch(
                'https://gw.alipayobjects.com/os/basement_prod/6cae02ab-4c29-44b2-b1fd-4005688febcb.json'
            );
            const remoteData = await response.json();

            const nodes = remoteData.nodes;
            const edges = remoteData.edges;
            nodes.forEach(node => {
                if (!node.style) {
                    node.style = {};
                }
                node.style.lineWidth = 1;
                node.style.stroke = '#666';
                node.style.fill = 'steelblue';
                switch (node.class) {
                    case 'c0': {
                        node.shape = 'circle';
                        node.size = 30;
                        break;
                    }
                    case 'c1': {
                        node.shape = 'rect';
                        node.size = [ 35, 20 ];
                        break;
                    }
                    case 'c2': {
                        node.shape = 'ellipse';
                        node.size = [ 35, 20 ];
                        break;
                    }
                }
            });
            edges.forEach(edge => {
                if (!edge.style) {
                    edge.style = {};
                }
                edge.style.lineWidth = edge.weight;
                edge.style.opacity = 0.6;
                edge.style.stroke = 'grey';
            });

            graph.data(remoteData);
            graph.render();

            // 监听鼠标进入节点
            graph.on('node:mouseenter', e => {
                const nodeItem = e.item;
                // 设置目标节点的 hover 状态 为 true
                graph.setItemState(nodeItem, 'hover', true);
            });
            // 监听鼠标离开节点
            graph.on('node:mouseleave', e => {
                const nodeItem = e.item;
                // 设置目标节点的 hover 状态 false
                graph.setItemState(nodeItem, 'hover', false);
            });
            // 监听鼠标点击节点
            graph.on('node:click', e => {
                // 先将所有当前有 click 状态的节点的 click 状态置为 false
                const clickNodes = graph.findAllByState('node', 'click');
                clickNodes.forEach(cn => {
                    graph.setItemState(cn, 'click', false);
                });
                const nodeItem = e.item;
                // 设置目标节点的 click 状态 为 true
                graph.setItemState(nodeItem, 'click', true);
            });
            // 监听鼠标点击节点
            graph.on('edge:click', e => {
                // 先将所有当前有 click 状态的边的 click 状态置为 false
                const clickEdges = graph.findAllByState('edge', 'click');
                clickEdges.forEach(ce => {
                    graph.setItemState(ce, 'click', false);
                });
                const edgeItem = e.item;
                // 设置目标边的 click 状态 为 true
                graph.setItemState(edgeItem, 'click', true);
            });
        };




        main();
    }


    can2() {
        const data = {
            nodes: [
                {
                    id: 'node1',
                    label: 'node1',
                    x: 100,
                    y: 200,
                    // 该节点可选的连接点集合，该点有两个可选的连接点
                    anchorPoints: [
                        [0, 1],
                        [0.5, 1],
                    ],
                    shape: 'rect',
                },
                {
                    id: 'node2',
                    label: 'node2',
                    x: 300,
                    y: 400,
                    // 该节点可选的连接点集合，该点有两个可选的连接点
                    anchorPoints: [
                        [0.5, 0],
                        [1, 0.5],
                    ],
                    shape: 'rect',
                },
            ],
            edges: [
                {
                    source: 'node1',
                    target: 'node2',
                    // 该边连入 source 点的第 0 个 anchorPoint，
                    sourceAnchor: 0,
                    // 该边连入 target 点的第 0 个 anchorPoint，
                    targetAnchor: 0,
                    style: {
                        endArrow: true,
                    },
                },
                {
                    source: 'node2',
                    target: 'node1',
                    // 该边连入 source 点的第 1 个 anchorPoint，
                    sourceAnchor: 1,
                    // 该边连入 source 点的第 1 个 anchorPoint，
                    targetAnchor: 1,
                    style: {
                        endArrow: true,
                    },
                },
            ],
        };

// 创建 G6 图实例
        const graph = new G6.Graph({
            container: 'mountNode1', // 指定图画布的容器 id，与第 9 行的容器对应
            // 画布宽高
            width: 800,
            height: 500,

            // ... 图的其他属性
            defaultNode: {
                // ... 其他属性
                linkPoints: {
                    top: true,
                    bottom: true,
                    left: true,
                    right: true,
                    fill: '#fff',
                    size: 5,
                },
            },
        });
// 读取数据
        graph.data(data);
// 渲染图
        graph.render();
    }

    can3() {
        const data = {
            nodes: [{
                id: 'node1',
                x: 100,
                y: 200
            },{
                id: 'node2',
                x: 300,
                y: 200
            },{
                id: 'node3',
                x: 300,
                y: 300
            }],
            edges: [{
                id: 'edge1',
                target: 'node2',
                source: 'node1'
            }]
        };
        G6.registerBehavior('click-add-edge', {
            getEvents() {
                return {
                    'node:click': 'onClick',
                    mousemove: 'onMousemove',
                    'edge:click': 'onEdgeClick' // 点击空白处，取消边
                };
            },
            onClick(ev) {
                const node = ev.item;
                const graph = this.graph;
                const point = {
                    x: ev.x,
                    y: ev.y
                };
                const model = node.getModel();
                if (this.addingEdge && this.edge) {
                    graph.updateItem(this.edge, {
                        target: model.id
                    });
                    // graph.setItemState(this.edge, 'selected', true);
                    this.edge = null;
                    this.addingEdge = false;
                } else {
                    this.edge = graph.addItem('edge', {
                        source: model.id,
                        target: point
                    });
                    this.addingEdge = true;
                }
            },
            onMousemove(ev) {
                const point = {
                    x: ev.x,
                    y: ev.y
                };
                if (this.addingEdge && this.edge) {
                    this.graph.updateItem(this.edge, {
                        target: point
                    });
                }
            },
            onEdgeClick(ev) {
                const currentEdge = ev.item;
                // 拖拽过程中，点击会点击到新增的边上
                if (this.addingEdge && this.edge == currentEdge) {
                    graph.removeItem(this.edge);
                    this.edge = null;
                    this.addingEdge = false;
                }
            }
        });

// Register a custom behavior to add node
        G6.registerBehavior('click-add-node', {
            getEvents() {
                return {
                    'canvas:click': 'onClick'
                };
            },
            onClick(ev) {
                const graph = this.graph;
                const node = graph.addItem('node', {
                    x: ev.x,
                    y: ev.y,
                    id: G6.Util.uniqueId()
                });
                graph.setItemState(node, 'selected', true);// 添加后默认选中
            }
        });

        const graph = new G6.Graph({
            container: 'mountNode3',
            width: 1200,
            height: 800,
            modes: {
                default: ['drag-node', 'click-select'],
                addNode: ['click-add-node', 'click-select'],
                addEdge: ['click-add-edge', 'click-select']
            }
        });

        graph.data(data);
        graph.render();

        document.getElementById('selector').addEventListener('change', e => {
            // @ts-ignore
            const value = e.target.value;
            graph.setMode(value);
        });
    }
}
