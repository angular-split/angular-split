import { Component } from '@angular/core'


@Component({
    selector: 'sp-examples',
    styles: [`
        :host {
            display: block;
            width: 100%;
            margin: 50px 0;
        }

        hr {
            margin-top: 30px 0;
        }

        pre {
            font-size: 11px;
        }

        textarea {
            width: 100%;
            height: 100px;
        }
    `],
    templateUrl: './examples.route.component.html'
})
export class ExamplesComponent {


    
    code6 = `<div class="split-example">
    <split [gutterSize]="10" [visibleTransition]="true">
        <split-area [visible]="action6.isVisibleA">
            <p>A</p>
        </split-area>
        <split-area [visible]="action6.isVisibleB">
            <p>B</p>
        </split-area>
        <split-area [visible]="action6.isVisibleC">
            <p>C</p>
        </split-area>
    </split>
</div>
<div>
    <div>
        <label>Toggle with [visible]: </label>
        <button (click)="action6.isVisibleA = !action6.isVisibleA" class="btn btn-sm btn-success" [class.btn-danger]="!action6.isVisibleA">areaA</button>
        <button (click)="action6.isVisibleB = !action6.isVisibleB" class="btn btn-sm btn-success" [class.btn-danger]="!action6.isVisibleB">areaB</button>
        <button (click)="action6.isVisibleC = !action6.isVisibleC" class="btn btn-sm btn-success" [class.btn-danger]="!action6.isVisibleC">areaC</button>
    </div>
</div>`
    
    action6 = {
        isVisibleA: true,
        isVisibleB: true,
        isVisibleC: true
    }
}
