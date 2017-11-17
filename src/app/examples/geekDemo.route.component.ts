import { Component } from '@angular/core'


@Component({
  selector: 'sp-ex-geek-demo',
  styles: [`
    :host {
        display: block;
        width: 100%;
        margin: 50px 0;
    }
  `],
  template: `
    <div class="container">
        <h4>Dynamically controlled split</h4>
        <div class="split-example">
            <split [direction]="action.dir" [gutterSize]="action.gutterSize">
                <split-area [order]="action.orderA" [size]="action.sizeA">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tiam, quis nostrud exercitation ullamco laboris nis.</p>
                </split-area>
                <split-area [order]="action.orderB" [size]="action.sizeB">
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eodolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
                </split-area>
            </split>
        </div>
        <div>
            <div>
                <label>Direction: </label>
                <div class="btn-group">
                    <label class="btn btn-warning btn-sm" [(ngModel)]="action.dir" btnRadio="horizontal">horizontal</label>
                    <label class="btn btn-warning btn-sm" [(ngModel)]="action.dir" btnRadio="vertical">vertical</label>
                </div>
            </div>
            <div>
                <label>Order: </label>
                <button class="btn btn-secondary btn-sm" (click)="action.orderA = (action.orderA === 0) ? 1 : 0; action.orderB = (action.orderB === 0) ? 1 : 0">Switch</button>
            </div>
            <div>
                <label>Gutter size: </label>
                <div class="btn-group">
                    <label class="btn btn-secondary btn-sm" [(ngModel)]="action.gutterSize" [btnRadio]="5">5</label>
                    <label class="btn btn-secondary btn-sm" [(ngModel)]="action.gutterSize" [btnRadio]="10">10</label>
                    <label class="btn btn-secondary btn-sm" [(ngModel)]="action.gutterSize" [btnRadio]="20">20</label>
                </div>
            </div>
            <div>
                <label>Areas size: </label>
                <div class="btn-group">
                    <label class="btn btn-warning"
                           (click)="action.sizeA=25; action.sizeB=75">Set sizes to 25/75</label>
                    <label class="btn btn-warning" 
                           (click)="action.sizeA=50; action.sizeB=50">Set sizes to 50/50</label>
                    <label class="btn btn-warning" 
                            (click)="action.sizeA=100; action.sizeB=0">Set sizes to 100/0</label>
                </div>
            </div>
        </div>
        <br><br>
        <pre [innerText]="code"></pre>
    </div>`
})
export class GeekDemoComponent {
    action = {
        dir: 'horizontal',
        gutterSize: 5,
        sizeA: 25,
        sizeB: 75,
        orderA: 0,
        orderB: 0,
    }

    code: string = `<div class="split-example">
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
    </div>`;

}
