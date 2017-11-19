import { Component, ViewChild } from '@angular/core'
import { SortableComponent } from 'ngx-bootstrap/sortable';


@Component({
  selector: 'sp-ex-geek-demo',
  styles: [`
    :host {
        display: block;
        width: 100%;
        margin: 50px 0;
    }

    split-area {
        display: flex;
        justify-content: center;
        align-items: center;
        text-shadow: 2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff;
    }

    .opts-prop {
        display: flex;
        justify-content: space-around;
    }
    .opts-area {
        
    }

    .num {
        color: #000000;
        text-shadow: 2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff;
    }
    label {
        margin: 0;
    }
  `],
  template: `
    <div class="container">
        <h4>Geek demoDynamically split</h4>
        <div class="split-example" style="height: 500px; background-color: #e5e0e0;">
            <split [direction]="d.dir" 
                   [gutterSize]="d.gutterSize" 
                   [width]="d.width" 
                   [height]="d.height" 
                   useTransition="true" 
                   style="background-color: #ffffff;">
                <ng-template ngFor let-area [ngForOf]="d.areas" let-index="index">
                    <split-area *ngIf="area.present" 
                                [visible]="area.visible" 
                                [order]="index" 
                                [size]="area.size"
                                [style.background-color]="area.color">{{ area.id }}</split-area>
                </ng-template>
            </split>
        </div>
        <div class="opts-prop">
            <div>
                <label>Direction: </label>
                <div class="btn-group">
                    <label class="btn btn-warning btn-sm" [(ngModel)]="d.dir" btnRadio="horizontal">horizontal</label>
                    <label class="btn btn-warning btn-sm" [(ngModel)]="d.dir" btnRadio="vertical">vertical</label>
                </div>
            </div>
            <div>
                <label>Width: </label>
                <div class="btn-group">
                    <label class="btn btn-warning btn-sm" [(ngModel)]="d.width" [btnRadio]="null">null</label>
                    <label class="btn btn-warning btn-sm" [(ngModel)]="d.width" btnRadio="600">600</label>
                    <label class="btn btn-warning btn-sm" [(ngModel)]="d.width" btnRadio="400">400</label>
                </div>
            </div>
            <div>
                <label>Height: </label>
                <div class="btn-group">
                    <label class="btn btn-warning btn-sm" [(ngModel)]="d.height" [btnRadio]="null">null</label>
                    <label class="btn btn-warning btn-sm" [(ngModel)]="d.height" btnRadio="350">350</label>
                    <label class="btn btn-warning btn-sm" [(ngModel)]="d.height" btnRadio="200">200</label>
                </div>
            </div>
            <div>
                <label>Gutter size: </label>
                <div class="btn-group">
                    <label class="btn btn-warning btn-sm" [(ngModel)]="d.gutterSize" [btnRadio]="null">null</label>
                    <label class="btn btn-warning btn-sm" [(ngModel)]="d.gutterSize" btnRadio="7">7</label>
                    <label class="btn btn-warning btn-sm" [(ngModel)]="d.gutterSize" btnRadio="22">22</label>
                </div>
            </div>
        </div>
        <div class="opts-area">
            <label>Areas (drag elements to change order): </label>
            <button class="btn btn-warning btn-sm" (click)="addArea()">Add</button>

            <table class="table table-sm table-dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>isPresent</th>
                        <th>isVisible</th>
                        <th>Remove</th>
                    </tr>
                </thead>
            </table>
                <bs-sortable [(ngModel)]="d.areas"
                             [itemTemplate]="itemTemplate"></bs-sortable>
                <ng-template #itemTemplate let-item="item" let-index="index">
                    <table class="table table-sm table-dark">
                        <tbody>
                            <tr [style.background-color]="item.value.color">
                                <th class="num">{{ item.value.id }}</th>
                                <td><button class="btn btn-warning btn-sm" (click)="item.value.present = !item.value.present">{{ 'Toggle presence: ' + item.value.present }}</button></td>
                                <td><button class="btn btn-warning btn-sm" (click)="item.value.visible = !item.value.visible">{{ 'Toggle visibility: ' + item.value.visible }}</button></td>
                                <td><button class="btn btn-warning btn-sm" (click)="removeArea(item.value)">Remove</button></td>
                            </tr>
                        </tbody>
                    </table>
                </ng-template>
        </div>
        <br><br>
        <pre [innerText]="code"></pre>
    </div>`
})
export class GeekDemoComponent {
    @ViewChild(SortableComponent) sortableComponent: SortableComponent
    
    d = {
        dir: 'horizontal',
        gutterSize: null,
        width: null,
        height: null,
        areas: [
            {id: getRandomNum(), color: getRandomColor(), size: 25, present: true, visible: true},
            {id: getRandomNum(), color: getRandomColor(), size: 50, present: true, visible: true},
            {id: getRandomNum(), color: getRandomColor(), size: 25, present: true, visible: true},
            {id: getRandomNum(), color: getRandomColor(), size: 25, present: true, visible: false},
        ]
    }

    addArea() {
        this.d.areas.push({
            id: getRandomNum(), 
            color: getRandomColor(), 
            size: 25, 
            present: true, 
            visible: true
        });
        
        this.sortableComponent.writeValue(this.d.areas);
    }

    removeArea(area: any) {
        this.d.areas.splice(this.d.areas.indexOf(area), 1);
        
        this.sortableComponent.writeValue(this.d.areas);
    }
    
    code: string = `xxx`;
    
}


function getRandomNum(): number {
    return Math.round(Math.random() * 1000);
}

function getRandomColor(): string {
    return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
}