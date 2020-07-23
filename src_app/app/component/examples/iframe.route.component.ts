import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core'
import { IOutputData, SplitComponent } from 'angular-split'

import { AComponent } from './AComponent'

@Component({
  selector: 'sp-ex-nested',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'split-example-page',
  },
  styles: [
    `
      .as-split-area > div {
        position: relative;
        height: 100%;
        overflow: hidden;
      }

      .hack-iframe-hider {
        background: rgba(0, 0, 0, 0.2);
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    `,
  ],
  template: ` {{ testChangeDetectorRun() }}
    <div class="container">
      <sp-example-title [type]="exampleEnum.IFRAME"></sp-example-title>
      <div class="split-example" style="height: 400px;">
        <as-split
          #split
          direction="horizontal"
          (dragStart)="dragStartHandler($event)"
          (dragEnd)="dragEndHandler($event)"
          (gutterClick)="splitGutterClick($event)"
        >
          <as-split-area size="40">
            <div>
              <iframe
                src="https://bertrandg.github.io/angular-split"
                frameborder="0"
                width="100%"
                height="100%"
              ></iframe>
              <div [hidden]="showIframeHider === false" class="hack-iframe-hider"></div>
            </div>
          </as-split-area>
          <as-split-area size="60">
            <div>
              <iframe
                src="https://bertrandg.github.io/angular-split"
                frameborder="0"
                width="100%"
                height="100%"
              ></iframe>
              <div [hidden]="showIframeHider === false" class="hack-iframe-hider"></div>
            </div>
          </as-split-area>
        </as-split>
      </div>
    </div>`,
})
export class IframeComponent extends AComponent {
  showIframeHider = false
  @ViewChild(SplitComponent, { static: false }) split: SplitComponent

  dragStartHandler($event: IOutputData) {
    console.log('dragStartHandler', { event: $event })
    this.showIframeHider = true
  }

  dragEndHandler($event: IOutputData) {
    console.log('dragEndHandler', { event: $event })
    this.showIframeHider = false
  }

  splitGutterClick({ gutterNum }: IOutputData) {
    // By default, clicking the gutter without changing position does not trigger the 'dragEnd' event
    // This can be fixed by manually notifying the component
    // See issue: https://github.com/bertrandg/angular-split/issues/186
    // TODO: Create custom example for this, and document it
    this.split.notify('end', gutterNum)
  }
}
