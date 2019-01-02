import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AComponent } from './AComponent';


@Component({
    selector: 'sp-ex-min-max',
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

        .txt-min,
        .txt-max,
        .txt-minmax {
            pointer-events: none;
            position: absolute;
            opacity: 0;
            transition: opacity .2s;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        
        .txt-min > p,
        .txt-max > p,
        .txt-minmax > p {
            font-size: 30px;
            font-weight: bold;
            color: #cccccc;
            text-align: center;
        }

        as-split-area {
            background: lightblue;
            transition: background .2s;
            position: relative;
            overflow: hidden !important;
        }

        as-split-area > p {
            position: absolute;
            font-size: 12px;
            font-weight: bold;
            padding: 5px;
            line-height: 12px;
        }

        as-split-area.as-min {
            background: green;
        }
        as-split-area.as-min .txt-min {
            opacity: 1;
        }
        as-split-area.as-max {
            background: red;
        }
        as-split-area.as-max .txt-max {
            opacity: 1;
        }
        as-split-area.as-min.as-max {
            background: purple;
        }
        as-split-area.as-min.as-max .txt-minmax {
            opacity: 1;
        }
    `],
    template: `
        {{ testChangeDetectorRun() }}
        <div class="container">
            <sp-example-title [type]="exampleEnum.MINMAX"></sp-example-title>
            <h5>Percent mode:</h5>
            <div class="split-example ex-percent">
                <as-split unit="percent" [restrictMove]="restrictMove" gutterSize="30" (dragEnd)="log($event)">
                    <as-split-area size="30" minSize="20" maxSize="30">
                        <p>size="30"<br>minSize="20"<br>maxSize="30"</p>
                        <div class="txt-min"><p>MIN</p></div>
                        <div class="txt-max"><p>MAX</p></div>
                    </as-split-area>
                    <as-split-area size="40" minSize="30" maxSize="50">
                        <p>size="40"<br>minSize="30"<br>maxSize="50"</p>
                        <div class="txt-min"><p>MIN</p></div>
                        <div class="txt-max"><p>MAX</p></div>
                    </as-split-area>
                    <as-split-area size="30" minSize="20" maxSize="50">
                        <p>size="30"<br>minSize="20"<br>maxSize="50"</p>
                        <div class="txt-min"><p>MIN</p></div>
                        <div class="txt-max"><p>MAX</p></div>
                    </as-split-area>
                </as-split>
            </div>
            <h5>Pixel mode:</h5>
            <div class="split-example ex-pixel">
                <as-split unit="pixel" [restrictMove]="restrictMove" gutterSize="30" (dragEnd)="log($event)">
                    <as-split-area size="200" minSize="100" maxSize="200">
                        <p>size="200"<br>minSize="100"<br>maxSize="200"</p>
                        <div class="txt-min"><p>MIN</p></div>
                        <div class="txt-max"><p>MAX</p></div>
                    </as-split-area>
                    <as-split-area size="*">
                        <p>size="*"</p>
                        <div class="txt-min"><p>MIN</p></div>
                        <div class="txt-max"><p>MAX</p></div>
                    </as-split-area>
                    <as-split-area size="150" lockSize="true">
                        <p>size="150"<br>lockSize="true"<br><br>Same as<br>minSize="150"<br>maxSize="150"</p>
                        <div class="txt-minmax"><p>MIN<br>&<br>MAX</p></div>
                    </as-split-area>
                    <as-split-area size="250" minSize="250" maxSize="400">
                        <p>size="250"<br>minSize="250"<br>maxSize="400"</p>
                        <div class="txt-min"><p>MIN</p></div>
                        <div class="txt-max"><p>MAX</p></div>
                    </as-split-area>
                </as-split>
            </div>
            <br>
            <div class="btns">
                <button class="btn btn-warning" (click)="restrictMove = restrictMove ? false : true">{{ 'Restrict move: "' + restrictMove + '"' }}</button>    
            </div>
        </div>`
})
export class MinMaxComponent extends AComponent {
    restrictMove: boolean = false

    //
    log(x) {
        console.log('dragEnd ', x.sizes, ' total > ', x.sizes.reduce((t, s) => t+s, 0))
    }
}

