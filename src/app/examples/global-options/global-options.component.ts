import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core'
import { AComponent } from '../../ui/components/AComponent'
import { SplitComponent, SplitAreaDirective } from 'angular-split'

@Component({
  selector: 'app-global-options',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'split-example-page',
  },
  template: `
    {{ testChangeDetectorRun() }}
    <div class="container">
      <sp-example-title [type]="exampleEnum.GLOBAL"></sp-example-title>
      <h5>Global direction and gutter size:</h5>
      <div class="split-example ex-percent">
        <as-split #split="asSplit">
          <as-split-area #area1="asSplitArea">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tiam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </as-split-area>
          <as-split-area #area2="asSplitArea">
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
      <br />
    </div>
  `,
})
export class GlobalOptionsComponent extends AComponent {
  @ViewChild('split') split: SplitComponent
  @ViewChild('area1') area1: SplitAreaDirective
  @ViewChild('area2') area2: SplitAreaDirective

  constructor() {
    super()

    setTimeout(() => {
      console.log('>>> split > ', this.split)
      console.log('>>> area1 > ', this.area1)
      console.log('>>> area2 > ', this.area2)
    }, 1000)
  }
}
