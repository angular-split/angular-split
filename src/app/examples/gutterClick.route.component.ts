import { Component } from '@angular/core';

import { AComponent } from './AComponent';


@Component({
    selector: 'sp-ex-gutter-click',
    host: {
        'class': 'split-example-page'
    },
    styles: [`
        .btns {
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-wrap: wrap;
        }
        .btns > div {
            flex: 1 1 50%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    `],
    template: `
        <div class="container">
            <sp-example-title [type]="exampleEnum.CLICK"></sp-example-title>
            <div class="split-example">
                <as-split [disabled]="isDisabled" 
                    gutterSize="10" 
                    direction="horizontal" 
                    [useTransition]="useTransition" 
                    (dragEnd)="dragEnd($event)" 
                    (gutterClick)="gutterClick($event)">
                    <as-split-area *ngFor="let a of areas" [size]="a.size" [order]="a.order">
                        <p>{{ a.content }}</p>
                    </as-split-area>
                </as-split>
            </div>
            <br>
            <div class="btns">
                <div>
                    <button class="btn btn-warning" [class.active]="!useTransition" (click)="useTransition = !useTransition">{{ 'useTransition: ' + useTransition }}</button>
                </div>
                <div>
                    <button class="btn btn-warning" [class.active]="!isDisabled" (click)="isDisabled = !isDisabled">{{ 'isDisabled: ' + isDisabled }}</button>
                </div>
            </div>
        </div>`
})
export class GutterClickComponent extends AComponent {
    isDisabled: boolean = true
    useTransition: boolean = true
    areas = [
        {size: 25, order: 1, content: 'fg fdkjuh dfskhf dkujv fd vifdk hvdkuh fg'},
        {size: 50, order: 2, content: 'sd h vdshhf deuyf gduyeg hudeg hudfg  fd vifdk hvdkuh fg'},
        {size: 25, order: 3, content: 'sd jslfd ijgil dfhlt jkgvbnhj fl bhjgflh jfglhj fl h fg'},
    ]

    gutterClick(e: {gutterNum: number, sizes: Array<number>}) {
        if(e.gutterNum === 1) {
            if(this.areas[0].size > 0) {
                this.areas[1].size += this.areas[0].size;
                this.areas[0].size = 0;
            }
            else if(this.areas[1].size > 25) {
                this.areas[1].size -= 25;
                this.areas[0].size = 25;
            }
            else {
                this.areas[0].size = 25;
                this.areas[1].size = 50;
                this.areas[2].size = 25;
            }
        }
        else if(e.gutterNum === 2) {
            if(this.areas[2].size > 0) {
                this.areas[1].size += this.areas[2].size;
                this.areas[2].size = 0;
            }
            else if(this.areas[1].size > 25) {
                this.areas[1].size -= 25;
                this.areas[2].size = 25;
            }
            else {
                this.areas[0].size = 25;
                this.areas[1].size = 50;
                this.areas[2].size = 25;
            }
        }
    }

    dragEnd(e: {gutterNum: number, sizes: Array<number>}) {
        this.areas[0].size = e.sizes[0];
        this.areas[1].size = e.sizes[1];
        this.areas[2].size = e.sizes[2];
    }
}
