import { Component, ViewChild } from '@angular/core';
import { SortableComponent } from 'ngx-bootstrap/sortable';

import { AComponent } from './AComponent';


@Component({
    selector: 'sp-ex-geek-demo',
    host: {
        'class': 'split-example-page'
    },
    styles: [`
        as-split-area {
            display: flex;
            justify-content: center;
            align-items: center;
            text-shadow: 2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff;
        }

        .opts-prop {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-around;
        }
        .opts-prop > div {
            margin-bottom: 10px;
        }

        .opts-area > .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px;
            background-color: #e8e8e8;
        }

        .area-item {
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 4px;
            cursor: move;
        }
        .area-item button {
            margin: 0 5px;
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
            <sp-example-title [type]="exampleEnum.GEEK"></sp-example-title>
            <div class="split-example" style="background-color: #e5e0e0;">
                <as-split [direction]="d.dir" 
                    [gutterSize]="d.gutterSize" 
                    [width]="d.width" 
                    [height]="d.height" 
                    useTransition="true" 
                    style="background-color: #ffffff;">
                    <ng-template ngFor let-area [ngForOf]="d.areas" let-index="index">
                        <as-split-area *ngIf="area.present" 
                                    [visible]="area.visible" 
                                    [order]="index" 
                                    [size]="area.size"
                                    [style.background-color]="area.color">{{ area.id }}</as-split-area>
                    </ng-template>
                </as-split>
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
                        <label class="btn btn-warning btn-sm" [(ngModel)]="d.width" btnRadio="400">400</label>
                        <label class="btn btn-warning btn-sm" [(ngModel)]="d.width" btnRadio="600">600</label>
                    </div>
                </div>
                <div>
                    <label>Height: </label>
                    <div class="btn-group">
                        <label class="btn btn-warning btn-sm" [(ngModel)]="d.height" [btnRadio]="null">null</label>
                        <label class="btn btn-warning btn-sm" [(ngModel)]="d.height" btnRadio="200">200</label>
                        <label class="btn btn-warning btn-sm" [(ngModel)]="d.height" btnRadio="350">350</label>
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
                <div class="title">
                    <label><b>Areas (drag elements to change order):</b></label>
                    <button class="btn btn-warning btn-sm" (click)="addArea()">Add area</button>
                </div>
                <bs-sortable [(ngModel)]="d.areas" [itemTemplate]="itemTemplate"></bs-sortable>
                
                <ng-template #itemTemplate let-item="item" let-index="index">
                    <div [style.background-color]="item.value.color" class="area-item">
                        <div class="num">{{ item.value.id }}</div>
                        <div>
                            <button class="btn btn-warning btn-sm" [class.active]="!item.value.present" (click)="item.value.present = !item.value.present">{{ '*ngIf="' + item.value.present + '"' }}</button>
                            <button class="btn btn-warning btn-sm" [class.active]="!item.value.visible" (click)="item.value.visible = !item.value.visible">{{ '[visible]="' + item.value.visible + '"' }}</button>
                            <button class="btn btn-warning btn-sm" (click)="removeArea(item.value)">Remove</button>
                        </div>
                    </div>
                </ng-template>
            </div>
        </div>`
})
export class GeekDemoComponent extends AComponent {
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
}


function getRandomNum(): number {
    return Math.round(Math.random() * 1000);
}

function getRandomColor(): string {
    return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
}