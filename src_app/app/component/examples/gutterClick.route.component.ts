import { Component, ViewChild, ElementRef, ChangeDetectionStrategy, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'
import { SplitComponent } from 'angular-split';

import { AComponent } from './AComponent';
import { formatDate } from '../../service/utils';


@Component({
    selector: 'sp-ex-gutter-click',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'split-example-page'
    },
    styles: [`
        as-split.is-transition.is-init:not(.is-dragging) ::ng-deep > .as-split-gutter,
        as-split.is-transition.is-init:not(.is-dragging) > .as-split-area {
            transition: flex-basis 1.5s !important;
        }
        as-split.is-disabled ::ng-deep > .as-split-gutter {
            cursor: pointer !important;
        }
        
        .btns {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
        }
        .btns > div {
            flex: 1 1 50%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .btns > div > button {
            margin-bottom: 10px;
        }
        .logs > p {
            margin-bottom: 5px;
        }
        .logs > ul {
            height: 200px;
            width: 100%;
            overflow-y: scroll;
            overflow-x: hidden;
            border: 1px solid #bfbfbf;
            background-color: #e8e8e8;
        }
    `],
    template: `
        {{ testChangeDetectorRun() }}
        <div class="container">
            <sp-example-title [type]="exampleEnum.CLICK"></sp-example-title>
            <div class="split-example">
                <as-split #mySplit
                          [disabled]="isDisabled" 
                          gutterSize="10" 
                          direction="horizontal" 
                          [useTransition]="useTransition" 
                          (dragStart)="log('dragStart', $event)" 
                          (dragEnd)="log('dragEnd', $event)" 
                          (gutterClick)="log('gutterClick', $event)"
                          (transitionEnd)="log('transitionEnd', $event)" >
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
            <div class="logs">
                <p>All <code>as-split</code> events emitted:</p>
                <ul #logs>
                    <li *ngFor="let l of logMessages" [ngClass]="l.type">{{ l.text }}</li>
                </ul>
            </div>
        </div>`
})
export class GutterClickComponent extends AComponent implements AfterViewInit, OnDestroy {
    isDisabled: boolean = true
    useTransition: boolean = true
    logMessages: Array<{type: string, text: string}> = []
    areas = [
        {size: 25, order: 1, content: 'fg fdkjuh dfskhf dkujv fd vifdk hvdkuh fg'},
        {size: 50, order: 2, content: 'sd h vdshhf deuyf gduyeg hudeg hudfg  fd vifdk hvdkuh fg'},
        {size: 25, order: 3, content: 'sd jslfd ijgil dfhlt jkgvbnhj fl bhjgflh jfglhj fl h fg'},
    ]
    sub: Subscription

    @ViewChild('mySplit') mySplitEl: SplitComponent
    @ViewChild('logs') logsEl: ElementRef

    ngAfterViewInit() {
        this.sub = this.mySplitEl.dragProgress$.subscribe(data => {
            console.log(`${ formatDate(new Date()) } > dragProgress$ observable emitted but current component change detection didn't runned!`, data);
        })
    }

    log(type: string, e: {gutterNum: number, sizes: Array<number>}) {
        this.logMessages.push({type, text: `${ formatDate(new Date()) } > ${ type } event > ${ JSON.stringify(e) }`});
        setTimeout(() => {
            if(this.logsEl.nativeElement.scroll) {
                (<HTMLElement> this.logsEl.nativeElement).scroll({top: this.logMessages.length*30});
            }
        })

        if(type === 'gutterClick') {
            this.gutterClick(e);
        }
        else if(type === 'dragEnd') {
            this.areas[0].size = e.sizes[0];
            this.areas[1].size = e.sizes[1];
            this.areas[2].size = e.sizes[2];
        }
    }

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

    ngOnDestroy() {
        if(this.sub) this.sub.unsubscribe();
    }
}
