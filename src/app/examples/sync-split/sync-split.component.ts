import { Component, ChangeDetectionStrategy, ViewChild, AfterViewInit, OnDestroy } from '@angular/core'
import { Subscription, merge } from 'rxjs'
import { map } from 'rxjs/operators'
import { SplitComponent } from 'angular-split'

import { AComponent } from '../../ui/components/AComponent'
import { formatDate } from '../../utils/format-date'

@Component({
  selector: 'sp-ex-sync',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'split-example-page',
  },
  template: `
    {{ testChangeDetectorRun() }}
    <div class="container">
      <sp-example-title [type]="exampleEnum.SYNC"></sp-example-title>
      <div class="split-example">
        <as-split direction="vertical">
          <div as-split-area size="20">
            <as-split direction="horizontal" #mySplitA>
              <div as-split-area [size]="sizes[0]">A 1</div>
              <as-split-area [size]="sizes[1]">A 2</as-split-area>
            </as-split>
          </div>
          <div as-split-area size="20">
            <as-split direction="horizontal" #mySplitB>
              <div as-split-area [size]="sizes[0]">B 1</div>
              <as-split-area [size]="sizes[1]">B 2</as-split-area>
            </as-split>
          </div>
          <as-split-area size="60">
            <as-split direction="horizontal" #mySplitC>
              <as-split-area [size]="sizes[0]">C 1</as-split-area>
              <div as-split-area [size]="sizes[1]">
                C 2<br />
                Open devTools to view console.log() statements.<br />
                <button class="btn btn-warning" (click)="test()">Trigger change detection</button>
              </div>
            </as-split>
          </as-split-area>
        </as-split>
      </div>
    </div>
  `,
})
export class SyncSplitComponent extends AComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mySplitA') mySplitAEl: SplitComponent
  @ViewChild('mySplitB') mySplitBEl: SplitComponent
  @ViewChild('mySplitC') mySplitCEl: SplitComponent

  sizes = [25, 75]
  sub: Subscription

  ngAfterViewInit() {
    this.sub = merge(
      this.mySplitAEl.dragProgress$.pipe(map((data) => ({ name: 'A', data }))),
      this.mySplitBEl.dragProgress$.pipe(map((data) => ({ name: 'B', data }))),
      this.mySplitCEl.dragProgress$.pipe(map((data) => ({ name: 'C', data }))),
    ).subscribe((d) => {
      if (d.name === 'A') {
        // If split A changed > update BC
        const sizesSplitA = this.mySplitAEl.getVisibleAreaSizes() //d.data.sizes; <-- Could have use these values too

        this.mySplitBEl.setVisibleAreaSizes(sizesSplitA)
        this.mySplitCEl.setVisibleAreaSizes(sizesSplitA)
      } else if (d.name === 'B') {
        // Else if split B changed > update AC
        const sizesSplitB = this.mySplitBEl.getVisibleAreaSizes() //d.data.sizes; <-- Could have use these values too

        this.mySplitAEl.setVisibleAreaSizes(sizesSplitB)
        this.mySplitCEl.setVisibleAreaSizes(sizesSplitB)
      } else if (d.name === 'C') {
        // Else if split C changed > update AB
        const sizesSplitC = this.mySplitCEl.getVisibleAreaSizes() //d.data.sizes; <-- Could have use these values too

        this.mySplitAEl.setVisibleAreaSizes(sizesSplitC)
        this.mySplitBEl.setVisibleAreaSizes(sizesSplitC)
      }

      console.log(
        `${formatDate(
          new Date(),
        )} > dragProgress$ observable emitted, splits synchronized but current component change detection didn't run! (from split ${
          d.name
        })`,
      )
    })
  }

  test() {}

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe()
  }
}
