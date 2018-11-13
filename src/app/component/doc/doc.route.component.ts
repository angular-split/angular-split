import { Component } from '@angular/core';

@Component({
    selector: 'sp-doc',
    styles: [`
        :host {
            display: block;
            width: 100%;
            margin: 50px 0;
        }
        h4 {
            margin: 20px 0;
        }
        tr > th:first-child,
        .directive {
            font-weight: bold;
            color: #ffc421;
        }
        tr > td:first-child {
            font-weight: bold;
        }
    `],
    templateUrl: './doc.route.component.html'
})
export class DocComponent {

    readonly splitDoc = {
        inputs: [
            {name: 'direction',       type: 'string',   default: '"horizontal"',  details: 'Select split direction: <code>"horizontal"</code> or <code>"vertical"</code>.'},
            {name: 'width',           type: 'number',   default: 'null',          details: 'Container width value in pixels. If not provided container width set to 100%.'},
            {name: 'height',          type: 'number',   default: 'null',          details: 'Container height in pixels. If not provided container height set to 100%.'},
            {name: 'gutterSize',      type: 'number',   default: '11',            details: `Gutters's size (dragging elements) in pixels.`},
            {name: 'gutterColor',     type: 'string',   default: '#eeeeee',       details: `Gutters's color (dragging elements). Could be <code>grey</code>, <code>#ff0000</code>, <code>rgba(45,45,45,.5)</code>,..`},
            {name: 'gutterImageH',    type: 'string',   default: '-',             details: `Gutters's image used in horizontal mode. Could be base64 (<code>"url('data:image/png;base64,iVBORw0..')"</code>) or path (<code>"url('./images/col-resize.png')"</code>)`},
            {name: 'gutterImageV',    type: 'string',   default: '-',             details: `Gutters's image used in vertical mode. Could be base64 (<code>"url('data:image/png;base64,ORw0id..')"</code>) or path (<code>"url('./images/row-resize.png')"</code>)`},
            {name: 'disabled',        type: 'boolean',  default: 'false',         details: 'Disable the dragging feature (remove cursor/image on gutters). <code>(gutterClick)</code> still emits.'},
            {name: 'useTransition',   type: 'boolean',  default: 'false',         details: 'Add transition when toggling visibility using <code>[visible]</code> or <code>[size]</code>.'},
        ],
        outputs: [
            {name: 'dragStart',         value: '{gutterNum: number, sizes: Array<number>}', details: 'Emit when drag starts.'},
            {name: 'dragProgress',      value: '{gutterNum: number, sizes: Array<number>}', details: 'Emit when dragging.'},
            {name: 'dragEnd',           value: '{gutterNum: number, sizes: Array<number>}', details: 'Emit when drag ends.'},
            {name: 'gutterClick',       value: '{gutterNum: number, sizes: Array<number>}', details: 'Emit when user clicks on a gutter.'},
            {name: 'transitionEnd',     value: 'Array<number>', details: 'Emit when transition ends (could be triggered from <code>[visible]</code> or <code>[size]</code>).<br>Only if <code>[useTransition]="true"</code>'},
        ],
    };

    readonly splitAreaDoc = {
        inputs: [
            {name: 'size',      type: 'number',   default: '100/nb_visible_areas',  details: 'Size of the area in percent (value between <code>0</code> and <code>100</code>).<br>If not provided or if all areas sizes not equal to 100, all areas will have the same size.'},
            {name: 'order',     type: 'number',   default: 'null',                  details: 'Order of the area. If provided for all, areas displayed from order min to max.<br>Useful to keep the same order if you show/hide areas using <code>*ngIf</code> or <code>[visible]</code>.'},
            {name: 'visible',   type: 'boolean',  default: 'true',                  details: 'Allow to toggle area visibility without removing it from the DOM.<br>Differs from <code>[size]="0"</code> because no gutter showed for areas with <code>[visible]="false"</code>.'},
        ]
    }

}
