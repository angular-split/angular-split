import { Component } from '@angular/core'

@Component({
  selector: 'sp-doc',
  styles: [
    `
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
    `,
  ],
  templateUrl: './documentation.component.html',
})
export class DocumentationComponent {
  readonly splitDoc = {
    inputs: [
      {
        name: 'dir',
        type: 'string',
        default: '"ltr"',
        details:
          'Indicates the directionality of the areas: <code>"ltr"</code> (left to right) or <code>"rtl"</code> (right to left).',
      },
      {
        name: 'direction',
        type: 'string',
        default: '"horizontal"',
        details: 'Select split direction: <code>"horizontal"</code> or <code>"vertical"</code>.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        default: 'false',
        details:
          'Disable the dragging feature (remove cursor/image on gutters). <code>(gutterClick)</code>/<code>(gutterDblClick)</code> still emits.',
      },
      {
        name: 'gutterDblClickDuration',
        type: 'number',
        default: '0',
        details: `Milliseconds to detect a double click on a gutter. Set it around 300-500ms if you want to use <code>(gutterDblClick)</code> event.`,
      },
      {
        name: 'gutterSize',
        type: 'number',
        default: '11',
        details: `Gutters's size (dragging elements) in pixels.`,
      },
      {
        name: 'gutterStep',
        type: 'number',
        default: '1',
        details: `Gutter step while moving in pixels.`,
      },
      {
        name: 'restrictMove',
        type: 'boolean',
        default: 'false',
        details: 'Set to <code>true</code> if you want to limit gutter move to adjacent areas only.',
      },
      {
        name: 'unit',
        type: 'string',
        default: '"percent"',
        details: `Selected unit you want to use: <code>"percent"</code> or <code>"pixel"</code> to specify area sizes.`,
      },
      {
        name: 'useTransition',
        type: 'boolean',
        default: 'false',
        details:
          'Add transition when toggling visibility using <code>[visible]</code> or <code>[size]</code> changes.<br><u>Warning: Transitions are not working for <a href="https://github.com/philipwalton/flexbugs#flexbug-16">IE/Edge/Safari</a></u>',
      },
    ],
    outputs: [
      {
        name: 'dragEnd',
        value: '{gutterNum: number, sizes: Array<number>}',
        details: 'Emit when drag ends.',
      },
      {
        name: 'dragStart',
        value: '{gutterNum: number, sizes: Array<number>}',
        details: 'Emit when drag starts.',
      },
      {
        name: 'gutterDblClick',
        value: '{gutterNum: number, sizes: Array<number>}',
        details: 'Emit when user double clicks on a gutter. See <code>[gutterDblClickDuration]</code> input.',
      },
      {
        name: 'gutterClick',
        value: '{gutterNum: number, sizes: Array<number>}',
        details: 'Emit when user clicks on a gutter. See <code>[gutterDblClickDuration]</code> input.',
      },
      {
        name: 'transitionEnd',
        value: 'Array<number>',
        details:
          'Emit when transition ends (could be triggered from <code>[visible]</code> or <code>[size]</code> changes).<br>Only if <code>[useTransition]="true"</code>.<br><u>Warning: Transitions are not working for <a href="https://github.com/philipwalton/flexbugs#flexbug-16">IE/Edge/Safari</a></u>',
      },
    ],
    class: [
      {
        name: 'dragProgress$',
        type: 'Observable<{gutterNum: number, sizes: Array<number>}>',
        details: `Emit when dragging. Replace old <code>(dragProgress)</code> template event for better flexibility about change detection mechanism.<br><u>Warning: Running outside zone by design, if you need to notify angular add</u> <code>this.splitEl.dragProgress$.subscribe(x => this.ngZone.run(() => this.x = x));</code>`,
      },
      {
        name: 'getVisibleAreaSizes()',
        type: '() => Array<number>',
        details: 'Get all <b>visible</b> area sizes.',
      },
      {
        name: 'setVisibleAreaSizes()',
        type: '(Array<number>) => boolean',
        details:
          'Set all <b>visible</b> area sizes in one go, return a boolean to know if input values were correct. Useful when combined with <code>dragProgress$</code> to sync multiple splits.',
      },
    ],
  }

  readonly splitAreaDoc = {
    inputs: [
      {
        name: 'lockSize',
        type: 'boolean',
        default: 'false',
        details: `Lock area size, same as <code>minSize</code> = <code>maxSize</code> = <code>size</code>.<br><u>Not working when <code>[size]="'*'"</code></u>`,
      },
      {
        name: 'maxSize',
        type: 'number',
        default: 'null',
        details: `Maximum pixel or percent size, should be equal to or larger than provided <code>[size]</code>.<br><u>Not working when <code>[size]="'*'"</code></u>`,
      },
      {
        name: 'minSize',
        type: 'number',
        default: 'null',
        details: `Minimum pixel or percent size, should be equal to or smaller than provided <code>[size]</code>.<br><u>Not working when <code>[size]="'*'"</code></u>`,
      },
      {
        name: 'order',
        type: 'number',
        default: 'null',
        details: `Order of the area. Used to maintain the order of areas when toggling their visibility. Toggling area visibility without specifying an <code>order</code> leads to weird behavior`,
      },
      {
        name: 'size',
        type: "number|'*'",
        default: '-',
        details: `Size of the area in selected unit (<code>percent</code>/<code>pixel</code>).<br><u>Percent mode:</u> All areas sizes should equal to 100, If not, all areas will have the same size.<br><u>Pixel mode:</u> An area with  wildcard size (<code>[size]="'*'"</code>) is mandatory (only one) and can't have <code>[visible]="false"</code> or <code>minSize</code>/<code>maxSize</code>/<code>lockSize</code> properties.`,
      },
      {
        name: 'visible',
        type: 'boolean',
        default: 'true',
        details: `Hide area visually but still present in the DOM, use <code>ngIf</code> to completely remove it.<br><u>Not working when <code>[size]="'*'"</code></u>`,
      },
    ],
  }

  readonly cssClasses = {
    split: [
      { name: 'as-init', details: 'Added after component initialization.' },
      {
        name: 'as-horizontal / as-vertical',
        details: 'Depends on <code>&lt;as-split [direction]="x"&gt;</code>.',
      },
      {
        name: 'as-disabled',
        details: 'Added when <code>&lt;as-split [disabled]="true"&gt;</code>.',
      },
      {
        name: 'as-transition',
        details: 'Added when <code>&lt;as-split [useTransition]="true"&gt;</code>.',
      },
      { name: 'as-dragging', details: 'Added while a gutter is dragged.' },
    ],
    area: [
      { name: 'as-split-area', details: 'Added on all areas.' },
      {
        name: 'as-hidden',
        details: 'Added when <code>&lt;as-split-area [visible]="false"&gt;</code>.',
      },
    ],
    gutter: [
      { name: 'as-split-gutter', details: 'Added on all gutters.' },
      { name: 'as-dragged', details: 'Added on gutter while dragged.' },
    ],
  }
}
