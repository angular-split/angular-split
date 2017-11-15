import { Component } from '@angular/core'


@Component({
  selector: 'sp-ex-gutter-click',
  styles: [`
    :host {
        display: block;
        width: 100%;
        margin: 50px 0;
    }
  `],
  template: `
    <div class="container">
        <div>GutterClickComponent</div>
        <hr>
        <button class="btn" (click)="useTransition = !useTransition">{{ 'useTransition: ' + useTransition }}</button>
        <br>
        <div style="height:300px; border: 10px solid blue;">
            <split gutterSize="10" direction="horizontal" [useTransition]="useTransition" (dragEnd)="dragEnd($event)" (gutterClick)="gutterClick($event)">
                <split-area *ngFor="let a of areas" [size]="a.size" [order]="a.order">
                    <p>{{ a.content }}</p>
                </split-area>
            </split>
        </div>
    </div>`
})
export class GutterClickComponent {
    useTransition: boolean = false
    areas = [
        {size: 25, order: 1, content: 'fg fdkjuh dfskhf dkujv fd vifdk hvdkuh fg'},
        {size: 50, order: 2, content: 'sd h vdshhf deuyf gduyeg hudeg hudfg  fd vifdk hvdkuh fg'},
        {size: 25, order: 3, content: 'sd jslfd ijgil dfhlt jkgvbnhj fl bhjgflh jfglhj fl h fg'},
    ]

    gutterClick(e) {
        console.log('gutterClick', e);
        const numGutter = <number> e.gutterNum;

        if(numGutter === 1) {
            if(this.areas[0].size === 0) {
            this.areas[0].size = 25;
            this.areas[1].size = 50;
            this.areas[2].size = 25;
            }
            else {
            this.areas[1].size += this.areas[0].size;
            this.areas[0].size = 0;
            }
        }
        else if(numGutter === 2) {
            if(this.areas[2].size === 0) {
            this.areas[0].size = 25;
            this.areas[1].size = 50;
            this.areas[2].size = 25;
            }
            else {
            this.areas[1].size += this.areas[2].size;
            this.areas[2].size = 0;
            }
            
        }
    }

    dragEnd(e) {
        console.log('dragEnd', e)
    }
}
