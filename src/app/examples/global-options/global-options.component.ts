import { ChangeDetectionStrategy, Component, HostBinding, viewChild } from '@angular/core'
import { SplitAreaComponent, SplitComponent } from 'angular-split'
import { ExampleTitleComponent } from 'src/app/ui/components/exampleTitle.component'
import { AComponent } from '../../ui/components/AComponent'

@Component({
  selector: 'sp-global-options',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SplitAreaComponent, SplitComponent, ExampleTitleComponent],

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
  @HostBinding('class') class = 'split-example-page'

  readonly split = viewChild<SplitComponent>('split')
  readonly area1 = viewChild<SplitAreaComponent>('area1')
  readonly area2 = viewChild<SplitAreaComponent>('area2')

  constructor() {
    super()

    setTimeout(() => {
      console.log('>>> split > ', this.split())
      console.log('>>> area1 > ', this.area1())
      console.log('>>> area2 > ', this.area2())
    }, 1000)
  }
}
