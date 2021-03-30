import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core'
import { SplitComponent, SplitAreaDirective } from 'angular-split'

import { AComponent } from '../../ui/components/AComponent'

@Component({
  selector: 'sp-ex-simple',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'split-example-page',
  },
  styles: [
    `
      .btns {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
      }
    `,
  ],
  template: `
    {{ testChangeDetectorRun() }}
    <div class="container">
      <sp-example-title [type]="exampleEnum.SIMPLE"></sp-example-title>
      <h5>Percent mode:</h5>
      <div class="split-example ex-percent">
        <as-split unit="percent" [direction]="direction" (dragEnd)="dragEnd('percent', $event)" #split="asSplit">
          <as-split-area size="30" #area1="asSplitArea">
            <h5>Initial size: <b>30%</b></h5>
            <h5>
              Current size: <b>{{ sizes.percent.area1 }}%</b>
            </h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tiam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </as-split-area>
          <as-split-area size="70" #area2="asSplitArea">
            <h5>Initial size: <b>70%</b></h5>
            <h5>
              Current size: <b>{{ sizes.percent.area2 }}%</b>
            </h5>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
              rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
              explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
              consequuntur magni dolores eodolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
              tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
              nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
              autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel
              illum qui dolorem eum fugiat quo voluptas nulla pariatur?
            </p>
          </as-split-area>
        </as-split>
      </div>
      <h5>Pixel mode:</h5>
      <div class="split-example ex-pixel">
        <as-split unit="pixel" [direction]="direction" (dragEnd)="dragEnd('pixel', $event)">
          <as-split-area size="120">
            <h5>Initial size: <b>120px</b></h5>
            <h5>
              Current size: <b>{{ sizes.pixel.area1 }}px</b>
            </h5>
            <p>
              Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </as-split-area>
          <as-split-area size="*">
            <h5>Initial size: <b>*</b></h5>
            <h5>
              Current size: <b>{{ sizes.pixel.area2 }}</b>
            </h5>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
              rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
              explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
              consequuntur magni dolores eodolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
              tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
              nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis
              autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel
              illum qui dolorem eum fugiat quo voluptas nulla pariatur?
            </p>
          </as-split-area>
          <as-split-area size="160">
            <h5>Initial size: <b>160px</b></h5>
            <h5>
              Current size: <b>{{ sizes.pixel.area3 }}px</b>
            </h5>
            <p>
              Eiusmod tiam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
              irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </as-split-area>
        </as-split>
      </div>
      <br />
      <div class="btns">
        <button class="btn btn-warning" (click)="direction = direction === 'horizontal' ? 'vertical' : 'horizontal'">
          {{ 'Toggle direction: "' + direction + '"' }}
        </button>
      </div>
    </div>
  `,
})
export class SimpleSplitComponent extends AComponent {
  @ViewChild('split') split: SplitComponent
  @ViewChild('area1') area1: SplitAreaDirective
  @ViewChild('area2') area2: SplitAreaDirective

  direction = 'horizontal'
  sizes = {
    percent: {
      area1: 30,
      area2: 70,
    },
    pixel: {
      area1: 120,
      area2: '*',
      area3: 160,
    },
  }

  constructor() {
    super()

    setTimeout(() => {
      console.log('>>> split > ', this.split)
      console.log('>>> area1 > ', this.area1)
      console.log('>>> area2 > ', this.area2)
    }, 1000)
  }

  dragEnd(unit, { sizes }) {
    if (unit === 'percent') {
      this.sizes.percent.area1 = sizes[0]
      this.sizes.percent.area2 = sizes[1]
    } else if (unit === 'pixel') {
      this.sizes.pixel.area1 = sizes[0]
      this.sizes.pixel.area2 = sizes[1]
      this.sizes.pixel.area3 = sizes[2]
    }
  }
}
