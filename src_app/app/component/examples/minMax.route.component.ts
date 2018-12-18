import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AComponent } from './AComponent';


@Component({
    selector: 'sp-ex-min-max',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'split-example-page'
    },
    styles: [`
        .txt-min,
        .txt-max {
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
        .txt-max > p {
            font-size: 60px;
            font-weight: bold;
            color: #cccccc;
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
    `],
    template: `
        {{ testChangeDetectorRun() }}
        <div class="container">
            <sp-example-title [type]="exampleEnum.MINMAX"></sp-example-title>
            <h5>Percent mode:</h5>
            <div class="split-example">
                <as-split unit="percent" [direction]="direction" gutterSize="30" (dragEnd)="log($event)">
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
            <div class="split-example">
                <as-split unit="pixel" [direction]="direction" gutterSize="30" (dragEnd)="log($event)">
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
                    <as-split-area size="250" minSize="250" maxSize="400">
                        <p>size="250"<br>minSize="250"<br>maxSize="400"</p>
                        <div class="txt-min"><p>MIN</p></div>
                        <div class="txt-max"><p>MAX</p></div>
                    </as-split-area>
                </as-split>
            </div>
        </div>`
})
export class MinMaxComponent extends AComponent {

    //
    log(x) {
        console.log('dragEnd ', x.sizes, ' total > ', x.sizes.reduce((t, s) => t+s, 0))
    }
}

