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
            <split [direction]="action.dir" [gutterSize]="action.gutterSize" (dragEnd)="action.areasSizesCustom = $event; action.areasIndex = -1">
                <split-area [order]="action.areasOrder[0]" [size]="action.areasIndex !== -1 ? action.areasSizes[action.areasIndex][0] : action.areasSizesCustom[action.areasOrder[0]]">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tiam, quis nostrud exercitation ullamco laboris nis.</p>
                </split-area>
                <split-area [order]="action.areasOrder[1]" [size]="action.areasIndex !== -1 ? action.areasSizes[action.areasIndex][1] : action.areasSizesCustom[action.areasOrder[1]]">
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eodolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
                </split-area>
            </split>
        </div>
        <div>
            <div>
                <label>Direction: </label>
                <div class="btn-group">
                    <label class="btn btn-secondary btn-sm" [(ngModel)]="action.dir" btnRadio="horizontal">horizontal</label>
                    <label class="btn btn-secondary btn-sm" [(ngModel)]="action.dir" btnRadio="vertical">vertical</label>
                </div>
            </div>
            <div>
                <label>Order: </label>
                <button class="btn btn-secondary btn-sm" (click)="action.areasOrder = action.areasOrder.reverse(); action.areasSizesCustom = action.areasSizesCustom.reverse()">Switch</button>
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
                    <label *ngFor="let s of action.areasSizes; let i = index"
                            [(ngModel)]="action.areasIndex" [btnRadio]="i" 
                            class="btn btn-secondary btn-sm">{{ s }}</label>
                </div>
            </div>
        </div>
        <br><br>
        <pre [innerText]="code"></pre>
    </div>`
})
export class GeekDemoComponent {
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
    </div>`
    
    action = {
        dir: 'horizontal',
        gutterSize: 5,
        areasIndex: 0,
        areasSizes: [[25, 75], [60, 40], [85, 15]],
        areasSizesCustom: [50, 50],
        areasOrder: [0, 1]
    }

}
