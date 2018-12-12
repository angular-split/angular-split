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
        .sel {
            font-size: 16px;
            color: #adadad;
        }
        tr > th {
            color: #adadad;
        }
        tr > th:first-child,
        .selContent {
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
            {name: 'gutterSize',      type: 'number',   default: '11',            details: `Gutters's size (dragging elements) in pixels.`},
            {name: 'disabled',        type: 'boolean',  default: 'false',         details: 'Disable the dragging feature (remove cursor/image on gutters). <code>(gutterClick)</code> still emits.'},
            {name: 'useTransition',   type: 'boolean',  default: 'false',         details: 'Add transition when toggling visibility using <code>[visible]</code> or <code>[size]</code>.<br><u>Warning: Transitions are not working for <a href="https://github.com/philipwalton/flexbugs#flexbug-16">IE/Edge/Safari</a></u>'},
        ],
        outputs: [
            {name: 'dragStart',         value: '{gutterNum: number, sizes: Array<number>}', details: 'Emit when drag starts.'},
            {name: 'dragEnd',           value: '{gutterNum: number, sizes: Array<number>}', details: 'Emit when drag ends.'},
            {name: 'gutterClick',       value: '{gutterNum: number, sizes: Array<number>}', details: 'Emit when user clicks on a gutter.'},
            {name: 'transitionEnd',     value: 'Array<number>',                             details: 'Emit when transition ends (could be triggered from <code>[visible]</code> or <code>[size]</code>).<br>Only if <code>[useTransition]="true"</code>.<br><u>Warning: Transitions are not working for <a href="https://github.com/philipwalton/flexbugs#flexbug-16">IE/Edge/Safari</a></u>'},
        ],
        class: [
            {name: 'dragProgress$',         type: 'Observable<{gutterNum: number, sizes: Array<number>}>',  details: 'Emit when dragging. Replace old <code>(dragProgress)</code> template event for better flexibility about change detection mechanism.'},
            {name: 'setVisibleAreaSizes()', type: '(Array<number>) => boolean',                             details: 'Set all <b>visible</b> area sizes in one go, return a boolean to know if input values were correct. Useful when combined with <code>dragProgress$</code> to sync multiple splits.'},
            {name: 'getVisibleAreaSizes()', type: '() => Array<number>',                                    details: 'Get all <b>visible</b> area sizes.'},
        ],
    };

    readonly splitAreaDoc = {
        inputs: [
            {name: 'size',      type: 'number',   default: '100/nb_visible_areas',  details: 'Size of the area in percent (value between <code>0</code> and <code>100</code>).<br>If not provided or if all areas sizes not equal to 100, all areas will have the same size.'},
        ]
    }

    readonly cssClasses = {
        split: [
            {name: 'is-init',                   details: 'Added after component initialization.'},
            {name: 'is-horizontal / is-vertical', details: 'Depends on <code>&lt;as-split [direction]="x"&gt;</code>.'},
            {name: 'is-disabled',               details: 'Added when <code>&lt;as-split [disabled]="true"&gt;</code>.'},
            {name: 'is-transition',             details: 'Added when <code>&lt;as-split [useTransition]="true"&gt;</code>.'},
            {name: 'is-dragging',               details: 'Added while a gutter is dragged.'},
        ],
        area: [
            {name: 'as-split-area',             details: 'Added on all areas.'},
            {name: 'is-hided',                  details: 'Added when <code>&lt;as-split-area [visible]="false"&gt;</code>.'},
        ],
        gutter: [
            {name: 'as-split-gutter',           details: 'Added on all gutters.'},
            {name: 'is-dragged',                details: 'Added on gutter while dragged.'},
        ],
    };

}
