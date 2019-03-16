import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AComponent } from './AComponent';


@Component({
    selector: 'sp-ex-toggling-dom-and-visible',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'split-example-page'
    },
    styles: [`
        .btns {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
        }

        .as-split-area {
            background: lightgrey;
        }
        
        .as-split-area.as-min {
            background: green;
        }
        
        .as-split-area.as-max {
            background: red;
        }
        
        button {
            width: 100%;
        }
        
        :host .ex2 /deep/ .as-transition.as-init:not(.as-dragging) >.as-split-area, :host /deep/ .as-transition.as-init:not(.as-dragging) > .as-split-gutter {
            transition: flex-basis 1s !important;
        }
    `],
    template: `
        {{ testChangeDetectorRun() }}
        <div class="container">
            <sp-example-title [type]="exampleEnum.TOGGLE"></sp-example-title>
            <div class="split-example ex1" style="height: 150px;">
                <as-split [gutterSize]="15" (dragEnd)="log('dragEnd', $event)">
                    <as-split-area *ngIf="action.isPresentA" [visible]="action.isVisibleA" [order]="0">
                        <p>A</p>
                    </as-split-area>
                    <as-split-area *ngIf="action.isPresentB" [visible]="action.isVisibleB" [order]="1">
                        <p>B</p>
                    </as-split-area>
                    <as-split-area *ngIf="action.isPresentC" [visible]="action.isVisibleC" [order]="2">
                        <p>C</p>
                    </as-split-area>
                </as-split>
            </div>
            <p>Toggle <code>[visible]="boolean"</code> properties:</p>
            <div class="btns">
                <div class="btn-group">
                    <label class="btn btn-warning" 
                        [class.active]="!action.isVisibleA" 
                        (click)="action.isVisibleA = !action.isVisibleA">{{ 'areaA: ' + action.isVisibleA }}</label>
                    <label class="btn btn-warning" 
                        [class.active]="!action.isVisibleB" 
                        (click)="action.isVisibleB = !action.isVisibleB">{{ 'areaB: ' + action.isVisibleB }}</label>
                    <label class="btn btn-warning" 
                        [class.active]="!action.isVisibleC" 
                        (click)="action.isVisibleC = !action.isVisibleC">{{ 'areaC: ' + action.isVisibleC }}</label>
                </div>
            </div>
            <p>Toggle <code>*ngIf="boolean"</code> properties:</p>
            <div class="btns">
                <div class="btn-group">
                    <label class="btn btn-warning" 
                        [class.active]="!action.isPresentA" 
                        (click)="action.isPresentA = !action.isPresentA">{{ 'areaA: ' + action.isPresentA }}</label>
                    <label class="btn btn-warning" 
                        [class.active]="!action.isPresentB" 
                        (click)="action.isPresentB = !action.isPresentB">{{ 'areaB: ' + action.isPresentB }}</label>
                    <label class="btn btn-warning" 
                        [class.active]="!action.isPresentC" 
                        (click)="action.isPresentC = !action.isPresentC">{{ 'areaC: ' + action.isPresentC }}</label>
                </div>
            </div>
            <br>
            <div class="alert alert-danger" role="alert">
                <b>Warning:</b><br><code>[visible]="false"</code> only hides elements and don't remove it from the DOM, It could lead to useless change detection processing.<br>Use of <code>*ngIf="false"</code> should be the default option unless you have reasons to keep DOM elements.
            </div>
            <br>
            <hr>
            <br>
            <div class="split-example ex2" style="height: 150px;">
                <as-split useTransition="true" unit="pixel">
                    <as-split-area size="200" minSize="200" order="1" [visible]="only === 1 || only === 0">
                        <button (click)="left()" class="btn btn-warning">{{ only === 1 ? 'LEFT ⬅️' : 'LEFT ➡' }}</button>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tiam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    </as-split-area>
                    <as-split-area size="*" order="2" [visible]="only === 2 || only === 0">
                        <button (click)="center()" class="btn btn-warning">{{ only === 2 ? '➡ ️CENTER ⬅' : '️⬅ ️CENTER ➡' }}</button>
                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                    </as-split-area>
                    <as-split-area size="200" minSize="200" order="3" [visible]="only === 3 || only === 0">
                        <button (click)="right()" class="btn btn-warning">{{ only === 3 ? '➡ RIGHT' : '⬅️ RIGHT' }}</button>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tiam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    </as-split-area>
                </as-split>
            </div>
        </div>`
})
export class TogglingDomAndVisibleComponent extends AComponent {
    action = {
        isVisibleA: true,
        isVisibleB: true,
        isVisibleC: true,
        isPresentA: true,
        isPresentB: true,
        isPresentC: true,
        logs: ''
    }

    log(eventName, e) {
        this.action.logs = `${ new Date() }: ${ eventName } > ${ e }\n${ this.action.logs }`;
    }

    //

    only: number = 0

    left() {
        switch(this.only) {
        case 0: 
        case 2: 
        case 3: 
            this.only = 1; 
            return;
        case 1:
            this.only = 0; 
            return;
        }
    }
    center() {
        switch(this.only) {
        case 0: 
        case 1: 
        case 3: 
            this.only = 2; 
            return;
        case 2:
            this.only = 0; 
            return;
        }
    }
    right() {
        switch(this.only) {
        case 0: 
        case 1: 
        case 2: 
            this.only = 3; 
            return;
        case 3:
            this.only = 0; 
            return;
        }
    }
}
