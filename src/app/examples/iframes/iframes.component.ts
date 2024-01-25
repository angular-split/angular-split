import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core'
import { AComponent } from '../../ui/components/AComponent'

@Component({
  selector: 'sp-ex-nested',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    {{ testChangeDetectorRun() }}
    <div class="container">
      <sp-example-title [type]="exampleEnum.IFRAME"></sp-example-title>
      <div class="split-example" style="height: 400px;">
        <as-split #split direction="horizontal">
          <as-split-area size="40">
            <iframe
              src="https://angular-split.github.io"
              frameborder="0"
              scrolling="no"
              width="100%"
              height="100%"
            ></iframe>
          </as-split-area>
          <as-split-area size="60">
            <iframe
              src="https://angular-split.github.io"
              frameborder="0"
              scrolling="no"
              width="100%"
              height="100%"
            ></iframe>
          </as-split-area>
        </as-split>
        <br />
      </div>
    </div>
  `,
})
export class IframesComponent extends AComponent {
  @HostBinding('class') class = 'split-example-page'
}
