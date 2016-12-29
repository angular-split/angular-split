import { Component } from '@angular/core';
import { PageScrollConfig } from 'ng2-page-scroll';


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
    `],
    templateUrl: `./examples.route.component.html`
})
export class ExamplesComponent {
    codeV: string = `<split direction="vertical">
    <split-area [size]="25">
        <p>Lorem ipsum dolor sit amet...</p>
    </split-area>
    <split-area [size]="75">
        <p>Sed ut perspiciatis unde omnis iste natus erro...</p>
    </split-area>
</split>`

    codeH: string = `<split direction="horizontal">
    <split-area [size]="30">
        <p>Lorem ipsum dolor sit amet...</p>
    </split-area>
    <split-area [size]="70">
        <p>Sed ut perspiciatis unde omnis iste natus erro...</p>
    </split-area>
</split>`

    codeX: string = `<split direction="horizontal">
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

    codeD: string = `<div class="split-example">
    <split [direction]="dynamic.dir" [gutterSize]="dynamic.gutterSize" (dragEnd)="areasSizesCustom = $event; dynamic.areasIndex = -1">
        <split-area [size]="dynamic.areasIndex !== -1 ? dynamic.areasSizes[dynamic.areasIndex][0] : areasSizesCustom[0]">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tiam, quis nostrud exercitation ullamco laboris nis.</p>
        </split-area>
        <split-area [size]="dynamic.areasIndex !== -1 ? dynamic.areasSizes[dynamic.areasIndex][1] : areasSizesCustom[1]">
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eodolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
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

    dynamic = {
        dir: 'horizontal',
        gutterSize: 5,
        areasIndex: 0,
        areasSizes: [[25, 75], [60, 40], [85, 15]],
        areasSizesCustom: [50, 50]
    }

    constructor() {
        PageScrollConfig.defaultScrollOffset = 80;
        PageScrollConfig.defaultDuration = 0;
    }
}
