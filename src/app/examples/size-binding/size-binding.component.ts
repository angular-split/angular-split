import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { SplitAreaComponent, SplitAreaSize, SplitComponent, SplitDirection } from 'angular-split'
import { ExampleTitleComponent } from '../../ui/components/exampleTitle.component'
import { ExampleEnum } from '../example-types'

@Component({
  selector: 'sp-size-binding',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SplitComponent, SplitAreaComponent, ExampleTitleComponent],
  host: { class: 'split-example-page' },
  template: `
    <div class="container">
      <sp-example-title [type]="exampleType" />
      <p>
        Bind a property or writable signal with <code>[(size)]</code>. Values update during resizing without a
        <code>dragEnd</code> handler. Wildcard tracks keep their <code>*</code> size.
      </p>
      <h5>One bound area, two unbound neighbors</h5>
      <p>
        Bound size: <b class="partial-value">{{ partialSize() }}</b
        >%. Allowed range: 10% to 60%.
      </p>
      <p>
        Size change events: <b class="change-count">{{ changeCount }}</b>
      </p>
      <div class="split-example binding-partial">
        <as-split [direction]="direction">
          <as-split-area [(size)]="partialSize" minSize="10" maxSize="60" (sizeChange)="changeCount = changeCount + 1">
            Bound to a signal
          </as-split-area>
          <as-split-area size="30">Initially 30%</as-split-area>
          <as-split-area size="50" [visible]="showLast">Initially 50%</as-split-area>
        </as-split>
      </div>
      <h5>A bound area with a derived neighbor</h5>
      <p>
        Bound size: <b class="derived-value">{{ derivedSize }}</b
        >%
      </p>
      <div class="split-example binding-derived">
        <as-split [direction]="direction">
          <as-split-area [(size)]="derivedSize">Bound to a property</as-split-area>
          <as-split-area [size]="100 - numericDerivedSize">Remaining space</as-split-area>
        </as-split>
      </div>
      <button class="btn btn-warning reset-sizes" (click)="reset()">Reset sizes</button>
      <button class="btn btn-warning toggle-last" (click)="showLast = !showLast">Toggle last area</button>
      <button class="btn btn-warning toggle-direction" (click)="toggleDirection()">Toggle direction</button>
    </div>
  `,
})
export class SizeBindingComponent {
  readonly exampleType = ExampleEnum.SIZE_BINDING
  readonly partialSize = signal<SplitAreaSize>(20)
  derivedSize: SplitAreaSize = 30
  direction: SplitDirection = 'horizontal'
  changeCount = 0
  showLast = true

  get numericDerivedSize() {
    return this.derivedSize === '*' ? 0 : this.derivedSize
  }

  reset() {
    this.partialSize.set(20)
    this.derivedSize = 30
  }

  toggleDirection() {
    this.direction = this.direction === 'horizontal' ? 'vertical' : 'horizontal'
  }
}
