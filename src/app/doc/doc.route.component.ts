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
      {name: 'direction',           type: 'string',   default: '"horizontal"',  details: 'Select split direction: "horizontal" or "vertical".'},
      {name: 'width',               type: 'number',   default: 'null',          details: 'Container width value in pixels (if not provided width set to 100%).'},
      {name: 'height',              type: 'number',   default: 'null',          details: 'Container height in pixels (if not provided height set to 100%).'},
      {name: 'gutterSize',          type: 'number',   default: '10',            details: 'Size of the gutter (dragging element) in pixels.'},
      {name: 'disabled',            type: 'boolean',  default: 'false',         details: 'Disable the dragging feature (remove cursor/image on gutters).'},
      {name: 'visibleTransition',   type: 'boolean',  default: 'false',         details: 'Add transition when toggling visibility using `[visible]`.'},
      {name: 'sizeTransition',      type: 'boolean',  default: 'false',         details: 'Add transition when updating size using `[size]`.'},
    ],
    outputs: [
      {name: 'dragStart',         value: '{gutterNum: number, sizes: Array<number>}', details: 'Emit when drag starts.'},
      {name: 'dragProgress',      value: '{gutterNum: number, sizes: Array<number>}', details: 'Emit when dragging.'},
      {name: 'dragEnd',           value: '{gutterNum: number, sizes: Array<number>}', details: 'Emit when drag ends.'},
      {name: 'gutterClick',       value: '{gutterNum: number, sizes: Array<number>}', details: 'Emit when user clicks on a gutter.'},
      {name: 'transitionEnd',     value: 'Array<number>', details: 'Emit when transition ends (could be triggered from `[visible]` or `[size]`).'},
    ],
  };

  readonly splitAreaDoc = {
    inputs: [
      {name: 'size',      type: 'number',   default: '100/nb_visible_areas',  details: 'Size of the area in percent (so 0 >= value >= 100). If null or if all areas sizes not equal to 100, all areas will have the same size.'},
      {name: 'order',     type: 'number',   default: 'null',                  details: 'Order of the area. If provided for all, areas displayed from order min to max. Useful to keep the same order if you show/hide areas.'},
      {name: 'visible',   type: 'boolean',  default: 'true',                  details: 'Allow to toggle area visibility without removing it from the DOM. Differs from `[size]="0"` because no gutter showed for areas with `[visible]="false"`.'},
    ]
  }

}
