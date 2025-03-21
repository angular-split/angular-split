import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy,
  HostBinding,
  inject,
  ChangeDetectorRef,
  signal,
  viewChild,
} from '@angular/core'
import { Subscription, merge } from 'rxjs'
import { SplitAreaComponent, SplitAreaSize, SplitComponent } from 'angular-split'

import { AComponent } from '../../ui/components/AComponent'
import { ExampleTitleComponent } from 'src/app/ui/components/exampleTitle.component'

@Component({
  selector: 'sp-ex-sync',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExampleTitleComponent, SplitComponent, SplitAreaComponent],
  template: `
    {{ testChangeDetectorRun() }}
    <div class="container">
      <sp-example-title [type]="exampleEnum.SYNC"></sp-example-title>
      <div class="split-example">
        <as-split direction="vertical">
          <as-split-area size="20">
            <as-split direction="horizontal" #mySplitA>
              <as-split-area [size]="sizes()[0]">A 1</as-split-area>
              <as-split-area [size]="sizes()[1]">A 2</as-split-area>
            </as-split>
          </as-split-area>
          <as-split-area size="20">
            <as-split direction="horizontal" #mySplitB>
              <as-split-area [size]="sizes()[0]">B 1</as-split-area>
              <as-split-area [size]="sizes()[1]">B 2</as-split-area>
            </as-split>
          </as-split-area>
          <as-split-area size="60">
            <as-split direction="horizontal" #mySplitC>
              <as-split-area [size]="sizes()[0]">C 1</as-split-area>
              <as-split-area [size]="sizes()[1]">
                C 2<br />
                Open devTools to view console.log() statements.<br />
                <button class="btn btn-warning" (click)="test()">Trigger change detection</button>
              </as-split-area>
            </as-split>
          </as-split-area>
        </as-split>
      </div>
    </div>
  `,
})
export class SyncSplitComponent extends AComponent implements AfterViewInit, OnDestroy {
  private z = inject(ChangeDetectorRef)
  readonly mySplitAEl = viewChild<SplitComponent>('mySplitA')
  readonly mySplitBEl = viewChild<SplitComponent>('mySplitB')
  readonly mySplitCEl = viewChild<SplitComponent>('mySplitC')
  @HostBinding('class') class = 'split-example-page'

  sizes = signal<SplitAreaSize[]>([25, 75])
  sub: Subscription

  ngAfterViewInit() {
    this.sub = merge(
      this.mySplitAEl().dragProgress$,
      this.mySplitBEl().dragProgress$,
      this.mySplitCEl().dragProgress$,
    ).subscribe((t) => {
      this.sizes.set(t.sizes)
    })
  }

  test() {}

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe()
  }
}
