import { Component } from '@angular/core';

import { examples } from './../listExamples';


@Component({
  selector: 'sp-ex-toggling-dom-and-visible',
  styles: [`
    :host {
        display: block;
        width: 100%;
        margin: 50px 0;
    }
    .btns {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
  `],
  template: `
    <div class="container">
        <sp-example-title [ex]="data"></sp-example-title>
        <div class="split-example" style="height: 150px;">
            <split [gutterSize]="15" (dragEnd)="log('dragEnd', $event)">
                <split-area *ngIf="action.isPresentA" [visible]="action.isVisibleA" [order]="0">
                    <p>A</p>
                </split-area>
                <split-area *ngIf="action.isPresentB" [visible]="action.isVisibleB" [order]="1">
                    <p>B</p>
                </split-area>
                <split-area *ngIf="action.isPresentC" [visible]="action.isVisibleC" [order]="2">
                    <p>C</p>
                </split-area>
            </split>
        </div>
        <p>Toggle <code>[visible]="boolean"</code> properties:</p>
        <div class="btns">
            <div class="btn-group">
                <label class="btn btn-warning" 
                       [class.active]="action.isVisibleA" 
                       (click)="action.isVisibleA = !action.isVisibleA">{{ 'area1: ' + action.isVisibleA }}</label>
                <label class="btn btn-warning" 
                       [class.active]="action.isVisibleB" 
                       (click)="action.isVisibleB = !action.isVisibleB">{{ 'area2: ' + action.isVisibleB }}</label>
                <label class="btn btn-warning" 
                       [class.active]="action.isVisibleC" 
                       (click)="action.isVisibleC = !action.isVisibleC">{{ 'area3: ' + action.isVisibleC }}</label>
            </div>
        </div>
        <p>Toggle <code>*ngIf="boolean"</code> properties:</p>
        <div class="btns">
            <div class="btn-group">
                <label class="btn btn-warning" 
                       [class.active]="action.isPresentA" 
                       (click)="action.isPresentA = !action.isPresentA">{{ 'area1: ' + action.isPresentA }}</label>
                <label class="btn btn-warning" 
                       [class.active]="action.isPresentB" 
                       (click)="action.isPresentB = !action.isPresentB">{{ 'area2: ' + action.isPresentB }}</label>
                <label class="btn btn-warning" 
                       [class.active]="action.isPresentC" 
                       (click)="action.isPresentC = !action.isPresentC">{{ 'area3: ' + action.isPresentC }}</label>
            </div>
        </div>
        <br>
        <div class="alert alert-danger" role="alert">
        <b>Warning:</b><br><code>[visible]="false"</code> only hides elements and don't remove it from the DOM, It could lead to useless change detection processing.<br>Use of <code>*ngIf="false"</code> should be the default option unless you have reasons to keep DOM elements.
        </div>
    </div>`
})
export class TogglingDomAndVisibleComponent {
    data: IExampleData

    log(eventName, e) {
        this.action.logs = `${ new Date() }: ${ eventName } > ${ e }\n${ this.action.logs }`;
    }

    action = {
        isVisibleA: true,
        isVisibleB: true,
        isVisibleC: true,
        isPresentA: true,
        isPresentB: true,
        isPresentC: true,
        logs: ''
    }

    
    constructor() {
        this.data = examples[4];
    }
}
