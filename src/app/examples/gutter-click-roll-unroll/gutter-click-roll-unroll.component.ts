import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  ViewChild,
} from '@angular/core'
import { SplitAreaSize, SplitGutterInteractionEvent, SplitComponent } from 'angular-split'
import { Subscription } from 'rxjs'
import { AComponent } from '../../ui/components/AComponent'
import { formatDate } from '../../utils/format-date'

@Component({
  selector: 'sp-ex-gutter-click',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      as-split {
        --as-transition-duration: 1.5s;
        --as-gutter-disabled-cursor: pointer;
      }

      .btns {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
      }
      .btns > div {
        flex: 1 1 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .btns > div > button {
        margin-bottom: 10px;
      }
      .logs > p {
        margin-bottom: 5px;
      }
      .logs > ul {
        height: 200px;
        width: 100%;
        overflow-y: scroll;
        overflow-x: hidden;
        border: 1px solid #bfbfbf;
        background-color: #e8e8e8;
      }
    `,
  ],
  template: `
    {{ testChangeDetectorRun() }}
    <div class="container">
      <sp-example-title [type]="exampleEnum.CLICK"></sp-example-title>
      <div class="split-example">
        <as-split
          #mySplit
          [disabled]="isDisabled"
          gutterSize="10"
          [gutterDblClickDuration]="dblClickTime"
          direction="horizontal"
          [useTransition]="useTransition"
          (dragStart)="log('dragStart', $event)"
          (dragEnd)="log('dragEnd', $event)"
          (gutterClick)="log('gutterClick', $event)"
          (gutterDblClick)="log('gutterDblClick', $event)"
          (transitionEnd)="log('transitionEnd', $event)"
        >
          <as-split-area *ngFor="let a of areas" [size]="a.size">
            <p>{{ a.content }}</p>
          </as-split-area>
        </as-split>
      </div>
      <br />
      <div class="btns">
        <div>
          <button class="btn btn-warning" [class.active]="!useTransition" (click)="useTransition = !useTransition">
            {{ 'useTransition: ' + useTransition }}
          </button>
        </div>
        <div>
          <button class="btn btn-warning" [class.active]="!isDisabled" (click)="isDisabled = !isDisabled">
            {{ 'isDisabled: ' + isDisabled }}
          </button>
        </div>
        <div>
          <label>Property <code>[gutterDblClickDuration]</code>:&nbsp;</label>
          <div class="btn-group">
            <label
              class="btn btn-warning"
              tooltip="When set to 0ms, 'click' is instant and 'dblclick' is impossible."
              [class.disabled]="dblClickTime === 0"
              (click)="dblClickTime = 0"
              >0ms</label
            >
            <label
              class="btn btn-warning"
              tooltip="When set to 500ms, 'click' is delayed and 'dblclick' is possible."
              [class.disabled]="dblClickTime === 500"
              (click)="dblClickTime = 500"
              >500ms</label
            >
          </div>
        </div>
      </div>
      <div class="logs">
        <p>All <code>as-split</code> events emitted:</p>
        <ul #logs>
          <li *ngFor="let l of logMessages" [ngClass]="l.type">{{ l.text }}</li>
        </ul>
      </div>
    </div>
  `,
  
})
export class GutterClickRollUnrollComponent extends AComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class') class = 'split-example-page'

  isDisabled = true
  useTransition = true
  dblClickTime = 0
  logMessages: Array<{ type: string; text: string }> = []
  areas: { size: SplitAreaSize; order: number; content: string }[] = [
    { size: 25, order: 1, content: 'fg fdkjuh dfskhf dkujv fd vifdk hvdkuh fg' },
    { size: '*', order: 2, content: 'sd h vdshhf deuyf gduyeg hudeg hudfg  fd vifdk hvdkuh fg' },
    { size: 25, order: 3, content: 'sd jslfd ijgil dfhlt jkgvbnhj fl bhjgflh jfglhj fl h fg' },
  ]
  sub: Subscription

  @ViewChild('mySplit') mySplitEl: SplitComponent
  @ViewChild('logs') logsEl: ElementRef

  ngAfterViewInit() {
    this.sub = this.mySplitEl.dragProgress$.subscribe((data) => {
      console.log(
        `${formatDate(
          new Date(),
        )} > dragProgress$ observable emitted but current component change detection didn't run!`,
        data,
      )
    })
  }

  log(
    ...[type, e]:
      | [type: 'dragStart' | 'dragEnd' | 'gutterClick' | 'gutterDblClick', e: SplitGutterInteractionEvent]
      | [type: 'transitionEnd', e: SplitAreaSize[]]
  ) {
    this.logMessages.push({ type, text: `${formatDate(new Date())} > ${type} event > ${JSON.stringify(e)}` })

    setTimeout(() => {
      if (this.logsEl.nativeElement.scroll) {
        (<HTMLElement>this.logsEl.nativeElement).scroll({ top: this.logMessages.length * 30 })
      }
    })

    if (type === 'gutterClick') {
      this.gutterClick(e)
    } else if (type === 'dragEnd') {
      this.areas[0].size = e.sizes[0]
      this.areas[1].size = e.sizes[1]
      this.areas[2].size = e.sizes[2]
    }
  }

  gutterClick(e: SplitGutterInteractionEvent) {
    if (e.gutterNum === 1) {
      if ((this.areas[0].size as number) > 0) {
        this.areas[0].size = 0
      } else {
        this.areas[0].size = 25
      }
    } else if (e.gutterNum === 2) {
      if ((this.areas[2].size as number) > 0) {
        this.areas[2].size = 0
      } else {
        this.areas[2].size = 25
      }
    }
  }

  dragEnd(e: { gutterNum: number; sizes: Array<number> }) {
    this.areas[0].size = e.sizes[0]
    this.areas[1].size = e.sizes[1]
    this.areas[2].size = e.sizes[2]
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe()
  }
}
