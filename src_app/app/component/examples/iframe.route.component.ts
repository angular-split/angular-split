import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AComponent } from './AComponent';


@Component({
    selector: 'sp-ex-nested',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'split-example-page'
    },
    styles: [`
        .as-split-area > div {
            position: relative;
            height: 100%;
            overflow: hidden;
        }

        .hack-iframe-hider {
            background: rgba(0, 0, 0, .2);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    `],
    template: `
        {{ testChangeDetectorRun() }}
        <div class="container">
            <sp-example-title [type]="exampleEnum.IFRAME"></sp-example-title>
            <div class="split-example" style="height: 400px;">
                <as-split direction="horizontal" (dragStart)="showIframeHider = true" (dragEnd)="showIframeHider = false">
                    <as-split-area size="40">
                        <div>
                            <iframe src="https://bertrandg.github.io/angular-split" frameborder="0" width="100%" height="100%"></iframe>
                            <div [hidden]="showIframeHider === false" class="hack-iframe-hider"></div>
                        </div>
                    </as-split-area>
                    <as-split-area size="60">
                        <div>
                            <iframe src="https://bertrandg.github.io/angular-split" frameborder="0" width="100%" height="100%"></iframe>
                            <div [hidden]="showIframeHider === false" class="hack-iframe-hider"></div>
                        </div>
                    </as-split-area>
                </as-split>
            </div>
        </div>`
})
export class IframeComponent extends AComponent {
    showIframeHider = false
}
