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
  `],
  templateUrl: './doc.route.component.html'
})
export class DocComponent {

  readonly splitComp = {
    inputs: [
      {name: 'direction',           type: 'string',   default: '"horizontal"',  details: 'Specify "horizontal" or "vertical".'},
      {name: 'width',               type: 'number',   default: 'null',          details: 'Specify a value in pixels or it takes all space available.'},
      {name: 'height',              type: 'number',   default: 'null',          details: 'Specify a value in pixels or it takes all space available.'},
      {name: 'gutterSize',          type: 'number',   default: '10',            details: 'Set gutter (dragging element) width size in pixels.'},
      {name: 'disabled',            type: 'boolean',  default: 'false',         details: 'Disable the dragging feature and remove cursor/image.'},
      {name: 'visibleTransition',   type: 'boolean',  default: 'false',         details: 'Add transition when toggling visibility using `[visible]`.'},
      {name: 'sizeTransition',      type: 'boolean',  default: 'false',         details: 'Add transition when updating size using `[size]`.'},
    ],
    outputs: [
      {name: 'dragStart',         value: '{gutterNum: number, sizes: Array<number>}', details: 'Emit when drag starts.'},
      {name: 'dragProgress',      value: '{gutterNum: number, sizes: Array<number>}', details: 'Emit when dragging.'},
      {name: 'dragEnd',           value: '{gutterNum: number, sizes: Array<number>}', details: 'Emit when drag ends.'},
      {name: 'gutterClick',       value: '{gutterNum: number, sizes: Array<number>}', details: 'Emit when user clicks on a gutter.'},
      {name: 'transitionEnd',     value: 'Array<number>', details: 'Emit when transition ends (could be triggered from [visible] or [size]).'},
    ],
  };

  readonly splitAreaDir = {
    inputs: [
      {name: 'size',      type: 'number',   default: '100/nb_visible_areas',  details: 'Percentage size of the area. If null or if all areas sizes not equal to 100, all areas will have the same size.'},
      {name: 'order',     type: 'number',   default: 'null',                  details: 'Order of the area. Useful if you show/hide areas using NgIf/NgFor and wants to keep the same order. If specified for all, areas displayed from order min to max.'},
      {name: 'visible',   type: 'boolean',  default: 'true',                  details: 'Allow to toggle area visibility without removing it from the DOM. Useful for specific case like routing.'},
    ]
  }

}
