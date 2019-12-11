const deepMix = require('@antv/util/lib/deep-mix');
const each = require('@antv/util/lib/each');
const createDOM = require('@antv/util/lib/dom/create-dom');

class AddItemPanel {

    constructor(cfgs) {
        // debugger;
        this._cfgs = deepMix(this.getDefaultCfg(), cfgs);
    }

    getDefaultCfg() {
        // debugger;
        return {container: null};
    }

    get(key) {
        // debugger;
        return this._cfgs[key];
    }

    set(key, val) {
        // debugger;
        this._cfgs[key] = val;
    }

    initPlugin(graph) {
        // debugger;

        console.log('salimsu11111');

        const parentNode = this.get('container');
        console.log(parentNode);
        const ghost = createDOM('<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"' + ' style="opacity:1"/>');


        // const children = parentNode.querySelectorAll('img[data-item]');
        //[data-item]
        // console.log(children);

        const children = parentNode.querySelectorAll('img[data-item]');
        each(children, (child, i) => {
            const addModel = (new Function("return " + child.getAttribute('data-item')))();
            console.log(addModel);
            child.addEventListener('dragstart', e => {
                // debugger;

                e.dataTransfer.setDragImage(ghost, 0, 0);
                /*初始化*/
                graph.set('onDragAddNode', true);
                graph.set('addModel', addModel);

            });
            child.addEventListener('dragend', e => {
                // debugger;
                graph.emit('canvas:mouseup', e);
                graph.set('onDragAddNode', false);
                graph.set('addModel', null);
            });
        })
        // debugger;
    }

    destroy() {
        // debugger;
        this.get('canvas').destroy();
        const container = this.get('container');
        container.parentNode.removeChild(container);
    }
}

export default AddItemPanel;
