import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AComponent } from './AComponent';


@Component({
    selector: 'sp-ex-simple',
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
            margin: 0;
        }

        as-split-area {
            background: lightblue;
            transition: background .2s;
            position: relative;
            overflow: hidden !important;
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
            <sp-example-title [type]="exampleEnum.SIMPLE"></sp-example-title>
            <div class="split-example">
                <as-split [direction]="direction" gutterSize="20" (dragEnd)="log($event)">
                    <as-split-area size="30" minSize="20" maxSize="30">
                        <!--<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tiam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>-->
                        <div class="txt-min"><p>MIN</p></div>
                        <div class="txt-max"><p>MAX</p></div>
                    </as-split-area>
                    <as-split-area size="40" minSize="30" maxSize="50">
                        <!--<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eodolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>-->
                        <div class="txt-min"><p>MIN</p></div>
                        <div class="txt-max"><p>MAX</p></div>
                    </as-split-area>
                    <as-split-area size="30" minSize="10" maxSize="50">
                        <!--<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tiam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>-->
                        <div class="txt-min"><p>MIN</p></div>
                        <div class="txt-max"><p>MAX</p></div>
                    </as-split-area>
                </as-split>
            </div>
            <br>
            <div class="btns">
                <button class="btn btn-warning" (click)="direction = (direction === 'horizontal') ? 'vertical' : 'horizontal'">{{ 'Toggle direction: "' + direction + '"' }}</button>    
            </div>
        </div>`
})
export class SimpleComponent extends AComponent {
    direction: string = 'horizontal'

    //
    log(x) {
        if(x.sizes.includes('*')) { debugger; }
        console.log('dragEnd ', x.sizes, ' total > ', x.sizes.reduce((t, s) => t+s, 0))
    }
}

