import { Component } from '@angular/core';
import { PageScrollConfig } from 'ngx-page-scroll';


@Component({
    selector: 'sp-examples',
    styles: [`
        :host {
            display: block;
            width: 100%;
            margin: 50px 0;
        }

        .split-example {
            height: 300px;
            outline: 5px dashed #f9d676;
            margin: 20px;
        }

        split-area > p {
            padding: 15px;
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
    code1: string = `<split direction="vertical">
    <split-area [size]="25">
        <p>Lorem ipsum dolor sit amet...</p>
    </split-area>
    <split-area [size]="75">
        <p>Sed ut perspiciatis unde omnis iste natus erro...</p>
    </split-area>
</split>`

    code2: string = `<split direction="horizontal">
    <split-area [size]="30">
        <p>Lorem ipsum dolor sit amet...</p>
    </split-area>
    <split-area [size]="70">
        <p>Sed ut perspiciatis unde omnis iste natus erro...</p>
    </split-area>
</split>`

    code3: string = `<split direction="horizontal">
    <split-area [size]="40">
        <split direction="vertical">
            <split-area>
                <p>Lorem ipsum dolor sit amet...</p>
            </split-area>
            <split-area>
                <p>Sed ut perspiciatis unde omnis iste natus erro...</p>
            </split-area>
            <split-area>
                <p>Lorem ipsum dolor sit amet...</p>
            </split-area>
        </split>
    </split-area>
    <split-area [size]="60">
        <split direction="vertical">
            <split-area [size]="25">
                <p>Lorem ipsum dolor sit amet...</p>
            </split-area>
            <split-area [size]="75">
                <p>Sed ut perspiciatis unde omnis iste natus erro...</p>
            </split-area>
        </split>
    </split-area>
</split>`

    code4: string = `<div class="split-example">
    <split [direction]="dynamic.dir" [gutterSize]="dynamic.gutterSize" (dragEnd)="areasSizesCustom = $event; dynamic.areasIndex = -1">
        <split-area [size]="dynamic.areasIndex !== -1 ? dynamic.areasSizes[dynamic.areasIndex][0] : areasSizesCustom[0]">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tiam, quis nostrud exercitation ullamco laboris nis.</p>
        </split-area>
        <split-area [size]="dynamic.areasIndex !== -1 ? dynamic.areasSizes[dynamic.areasIndex][1] : areasSizesCustom[1]">
            <p>Sed ut perspiciatis unde omnis iste natus error illum qui dolorem eum fugiat quo voluptas nulla pariatur...</p>
        </split-area>
    </split>
</div>
<div>
    <label>Direction: </label>
    <div class="btn-group">
        <label class="btn btn-secondary btn-sm" [(ngModel)]="dynamic.dir" btnRadio="horizontal">horizontal</label>
        <label class="btn btn-secondary btn-sm" [(ngModel)]="dynamic.dir" btnRadio="vertical">vertical</label>
    </div>
</div>
<div>
    <label>Order: </label>
    <button class="btn btn-secondary btn-sm" (click)="dynamic.areasOrder=dynamic.areasOrder.reverse()">Switch</button>
</div>
<div>
    <label>Gutter size: </label>
    <div class="btn-group">
        <label class="btn btn-secondary btn-sm" [(ngModel)]="dynamic.gutterSize" [btnRadio]="5">5</label>
        <label class="btn btn-secondary btn-sm" [(ngModel)]="dynamic.gutterSize" [btnRadio]="10">10</label>
        <label class="btn btn-secondary btn-sm" [(ngModel)]="dynamic.gutterSize" [btnRadio]="20">20</label>
    </div>
</div>
<div>
    <label>Areas size: </label>
    <div class="btn-group">
        <label *ngFor="let s of dynamic.areasSizes; let i = index"
                [(ngModel)]="dynamic.areasIndex" [btnRadio]="i" 
                class="btn btn-secondary btn-sm">{{ s }}</label>
    </div>
</div>`

    action4 = {
        dir: 'horizontal',
        gutterSize: 5,
        areasIndex: 0,
        areasSizes: [[25, 75], [60, 40], [85, 15]],
        areasSizesCustom: [50, 50],
        areasOrder: [0, 1]
    }

    code5: string = `<div class="split-example">
    <split [gutterSize]="15" (dragEnd)="log('dragEnd', $event)">
        <split-area *ngIf="toggling.isPresentA" [visible]="toggling.isVisibleA" [order]="1">
            <p>A</p>
        </split-area>
        <split-area *ngIf="toggling.isPresentB" [visible]="toggling.isVisibleB" [order]="2">
            <p>B</p>
        </split-area>
        <split-area *ngIf="toggling.isPresentC" [visible]="toggling.isVisibleC" [order]="3">
            <p>C</p>
        </split-area>
    </split>
</div>
<div>
    <label>Toggle with [visible]: </label>
    <button (click)="toggling.isVisibleA = !toggling.isVisibleA" class="btn btn-sm btn-success" [class.btn-danger]="!toggling.isVisibleA">areaA</button>
    <button (click)="toggling.isVisibleB = !toggling.isVisibleB" class="btn btn-sm btn-success" [class.btn-danger]="!toggling.isVisibleB">areaB</button>
    <button (click)="toggling.isVisibleC = !toggling.isVisibleC" class="btn btn-sm btn-success" [class.btn-danger]="!toggling.isVisibleC">areaC</button>
</div>
<div>
    <label>Toggle with *ngIf: </label>
    <button (click)="toggling.isPresentA = !toggling.isPresentA" class="btn btn-sm btn-success" [class.btn-danger]="!toggling.isPresentA">areaA</button>
    <button (click)="toggling.isPresentB = !toggling.isPresentB" class="btn btn-sm btn-success" [class.btn-danger]="!toggling.isPresentB">areaB</button>
    <button (click)="toggling.isPresentC = !toggling.isPresentC" class="btn btn-sm btn-success" [class.btn-danger]="!toggling.isPresentC">areaC</button>
</div>
<div>
    <label>DragEnd events log: </label>
    <textarea [value]="toggling.logs" disabled></textarea>
</div>`

    log(eventName, e) {
        this.action5.logs = `${ new Date() }: ${ eventName } > ${ e }\n${ this.action5.logs }`;
    }

    action5 = {
        isVisibleA: true,
        isVisibleB: true,
        isVisibleC: true,
        isPresentA: true,
        isPresentB: true,
        isPresentC: true,
        logs: ''
    }
    
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

    constructor() {
        PageScrollConfig.defaultScrollOffset = 80;
        PageScrollConfig.defaultDuration = 0;
    }
}
