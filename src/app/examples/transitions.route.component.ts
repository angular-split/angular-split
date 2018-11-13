import { Component } from '@angular/core';

import { AComponent } from './AComponent';


@Component({
    selector: 'sp-ex-transitions',
    host: {
        'class': 'split-example-page'
    },
    styles: [`
        button {
            margin: 4px;
        }

        .btns {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
        }
        .btns > div {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
        }
        .btns > div > button {
            margin-bottom: 10px;
        }

        .btns > div:nth-child(1) {
            flex: 1 1 20%; 
        }
        .btns > div:nth-child(2) {
            flex: 1 1 40%;
        }
        .btns > div:nth-child(3) {
            flex: 1 1 40%;
        }
        .logs > p {
            margin-bottom: 5px;
        }
        .logs > ul {
            height: 64px;
            width: 100%;
            overflow-y: scroll;
            overflow-x: hidden;
            border: 1px solid #bfbfbf;
            background-color: #e8e8e8;
        }
    `],
    template: `
        <div class="container">
            <sp-example-title [type]="exampleEnum.TRANSITION"></sp-example-title>
            <div class="split-example">
                <as-split direction="horizontal" 
                    disabled="true"
                    [useTransition]="action.useTransition"
                    (dragEnd)="action.a1s=$event.sizes[0]; action.a2s=$event.sizes[1]; action.a3s=$event.sizes[2];"
                    (transitionEnd)="log($event)">
                    <as-split-area [visible]="action.a1v" [size]="action.a1s" order="1">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tiam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    </as-split-area>
                    <as-split-area [visible]="action.a2v" [size]="action.a2s" order="2">
                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eodolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
                    </as-split-area>
                    <as-split-area [visible]="action.a3v" [size]="action.a3s" order="3">
                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eodolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
                    </as-split-area>
                </as-split>
            </div>
            <br>
            <div class="btns">
                <div>
                    <button class="btn btn-warning" 
                            [class.active]="!action.useTransition" 
                            (click)="action.useTransition = !action.useTransition">{{ 'useTransition: ' + action.useTransition }}</button>
                </div>
                <div class="btn-group">
                    <label class="btn btn-warning" 
                        [class.active]="!action.a1v" 
                        (click)="action.a1v = !action.a1v">{{ 'area1: ' + action.a1v }}</label>
                    <label class="btn btn-warning" 
                        [class.active]="!action.a2v" 
                        (click)="action.a2v = !action.a2v">{{ 'area2: ' + action.a2v }}</label>
                    <label class="btn btn-warning" 
                        [class.active]="!action.a3v" 
                        (click)="action.a3v = !action.a3v">{{ 'area3: ' + action.a3v }}</label>
                </div>
                <div class="btn-group">
                    <label class="btn btn-warning"
                        [class.disabled]="action.a1s === 25 || !action.a1v || !action.a2v || !action.a3v" 
                        (click)="action.a1s=25; action.a2s=50; action.a3s=25">Set sizes to 25/50/25</label>
                    <label class="btn btn-warning" 
                        [class.disabled]="action.a1s === 40 || !action.a1v || !action.a2v || !action.a3v"
                        (click)="action.a1s=40; action.a2s=20; action.a3s=40">Set sizes to 40/20/40</label>
                </div>
            </div>
            <div class="logs">
                <p>Events <code>(transitionEnd)</code>:</p>
                <ul>
                    <li *ngFor="let l of logMessages">{{ l }}</li>
                </ul>
            </div>
        </div>`
})
export class TransitionsComponent extends AComponent {
    action = {
        a1s: 25,
        a2s: 50,
        a3s: 25,
        a1v: true,
        a2v: true,
        a3v: true,
        useTransition: true,
    }
    logMessages: Array<string> = []

    log(e) {
        this.logMessages.unshift(`${ formatDate(new Date()) } > transitionEnd event > ${ e }`);
    }

}

function formatDate(date) {
    const year = date.getFullYear(),
        month = date.getMonth() + 1, // months are zero indexed
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
        minuteFormatted = minute < 10 ? "0" + minute : minute,
        morning = hour < 12 ? "am" : "pm";

    return `${ month }/${ day }/${ year } ${ hourFormatted }:${ minuteFormatted }${ morning }`;
}