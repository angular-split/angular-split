import { NgClass } from '@angular/common'
import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, ViewChild } from '@angular/core'
import { SplitAreaSize, SplitComponent } from 'angular-split'
import { SplitAreaComponent } from 'projects/angular-split/src/public_api'
import { ExampleTitleComponent } from 'src/app/ui/components/exampleTitle.component'
import { AComponent } from '../../ui/components/AComponent'
import { formatDate } from '../../utils/format-date'
@Component({
  selector: 'sp-ex-transitions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SplitAreaComponent, SplitComponent, NgClass, ExampleTitleComponent],
  styles: [
    `
      button {
        margin: 4px;
      }

      .btns {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
      }
      .btns > div {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
      }
      .btns > div > button {
        margin-bottom: 10px;
      }

      .btns > div:nth-child(1) {
        flex: 1 1 20%;
      }
      .btns > div:nth-child(2) {
        flex: 1 1 40%;
      }
      .btns > div:nth-child(3) {
        flex: 1 1 40%;
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

      .as-split-area {
        background: lightgrey;
      }

      .as-split-area.as-min {
        background: green;
      }

      .as-split-area.as-max {
        background: red;
      }

      :host .ex2 button {
        width: 100%;
      }

      .ex2 {
        --as-transition-duration: 1s;
      }
    `,
  ],
  template: `
    {{ testChangeDetectorRun() }}
    <div class="container">
      <sp-example-title [type]="exampleEnum.TRANSITION"></sp-example-title>
      <div class="split-example">
        <as-split
          direction="horizontal"
          disabled="true"
          [useTransition]="action.useTransition"
          (dragEnd)="action.a1s = $event.sizes[0]; action.a2s = $event.sizes[1]; action.a3s = $event.sizes[2]"
          (transitionEnd)="log($event)"
        >
          <as-split-area [visible]="action.a1v" [size]="action.a1s" order="1">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tiam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </as-split-area>
          <as-split-area [visible]="action.a2v" [size]="action.a2s" order="2">
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
          <as-split-area [visible]="action.a3v" [size]="action.a3s" order="3">
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
      <div class="btns">
        <div>
          <button
            class="btn btn-warning"
            [class.active]="!action.useTransition"
            (click)="action.useTransition = !action.useTransition"
          >
            {{ 'useTransition: ' + action.useTransition }}
          </button>
        </div>
        <div class="btn-group">
          <label class="btn btn-warning" [class.active]="!action.a1v" (click)="action.a1v = !action.a1v">{{
            'area1: ' + action.a1v
          }}</label>
          <label class="btn btn-warning" [class.active]="!action.a2v" (click)="action.a2v = !action.a2v">{{
            'area2: ' + action.a2v
          }}</label>
          <label class="btn btn-warning" [class.active]="!action.a3v" (click)="action.a3v = !action.a3v">{{
            'area3: ' + action.a3v
          }}</label>
        </div>
        <div class="btn-group">
          <label
            class="btn btn-warning"
            [class.disabled]="action.a1s === 25 || !action.a1v || !action.a2v || !action.a3v"
            (click)="action.a1s = 25; action.a2s = 50; action.a3s = 25"
            >Set sizes to 25/50/25</label
          >
          <label
            class="btn btn-warning"
            [class.disabled]="action.a1s === 40 || !action.a1v || !action.a2v || !action.a3v"
            (click)="action.a1s = 40; action.a2s = 20; action.a3s = 40"
            >Set sizes to 40/20/40</label
          >
        </div>
      </div>
      <div class="logs">
        <p>Events <code>(transitionEnd)</code>:</p>
        <ul #logs>
          @for (l of logMessages; track l) {
            <li [ngClass]="l.type">{{ l.text }}</li>
          }
        </ul>
      </div>
      <br />
      <hr />
      <br />
      <div class="split-example ex2" style="height: 150px;">
        <as-split useTransition="true" unit="pixel">
          <as-split-area size="200" minSize="200" order="1" [visible]="only === 1 || only === 0">
            <button (click)="left()" class="btn btn-warning">{{ only === 1 ? 'LEFT ⬅️' : 'LEFT ➡' }}</button>
            <p>size: 200px<br />minSize: 200px</p>
          </as-split-area>
          <as-split-area size="*" order="2" [visible]="only === 2 || only === 0">
            <button (click)="center()" class="btn btn-warning">
              {{ only === 2 ? '➡ ️CENTER ⬅' : '️⬅ ️CENTER ➡' }}
            </button>
            <p>size: *</p>
          </as-split-area>
          <as-split-area size="200" minSize="200" order="3" [visible]="only === 3 || only === 0">
            <button (click)="right()" class="btn btn-warning">{{ only === 3 ? '➡ RIGHT' : '⬅️ RIGHT' }}</button>
            <p>size: 200px<br />minSize: 200px</p>
          </as-split-area>
        </as-split>
      </div>
      <div class="split-example ex2" style="height: 150px;">
        <as-split useTransition="true" unit="percent">
          <as-split-area size="30" minSize="30" order="1" [visible]="only === 1 || only === 0">
            <button (click)="left()" class="btn btn-warning">{{ only === 1 ? 'LEFT ⬅️' : 'LEFT ➡' }}</button>
            <p>size: 30%<br />minSize: 30%</p>
          </as-split-area>
          <as-split-area size="40" order="2" [visible]="only === 2 || only === 0">
            <button (click)="center()" class="btn btn-warning">
              {{ only === 2 ? '➡ ️CENTER ⬅' : '️⬅ ️CENTER ➡' }}
            </button>
            <p>size: 40%</p>
          </as-split-area>
          <as-split-area size="30" minSize="30" order="3" [visible]="only === 3 || only === 0">
            <button (click)="right()" class="btn btn-warning">{{ only === 3 ? '➡ RIGHT' : '⬅️ RIGHT' }}</button>
            <p>size: 30%<br />minSize: 30%</p>
          </as-split-area>
        </as-split>
      </div>
      <br />
      <hr />
      <br />
      <div class="btns">
        <div class="btn-group">
          <label class="btn btn-warning" [class.active]="!keepA" (click)="keepA = !keepA">{{ 'A: ' + keepA }}</label>
          <label class="btn btn-warning" [class.active]="!keepB" (click)="keepB = !keepB">{{ 'B: ' + keepB }}</label>
          <label class="btn btn-warning" [class.active]="!keepC" (click)="keepC = !keepC">{{ 'C: ' + keepC }}</label>
        </div>
      </div>
      <div class="split-example ex2" style="height: 150px;">
        <as-split useTransition="true" unit="pixel">
          <as-split-area size="200" minSize="200" order="1" [visible]="keepA">
            <p>A<br />size: 200px<br />minSize: 200px</p>
          </as-split-area>
          <as-split-area size="*" order="2" [visible]="keepB">
            <p>B<br />size: *</p>
          </as-split-area>
          <as-split-area size="200" minSize="200" order="3" [visible]="keepC">
            <p>C<br />size: 200px<br />minSize: 200px</p>
          </as-split-area>
        </as-split>
      </div>
      <div class="split-example ex2" style="height: 150px;">
        <as-split useTransition="true" unit="percent">
          <as-split-area size="30" minSize="30" order="1" [visible]="keepA">
            <p>A<br />size: 30%<br />minSize: 30%</p>
          </as-split-area>
          <as-split-area size="40" order="2" [visible]="keepB">
            <p>B<br />size: 40%</p>
          </as-split-area>
          <as-split-area size="30" minSize="30" order="3" [visible]="keepC">
            <p>C<br />size: 30%<br />minSize: 30%</p>
          </as-split-area>
        </as-split>
      </div>
    </div>
  `,
})
export class SplitTransitionsComponent extends AComponent {
  action: {
    a1s: SplitAreaSize
    a2s: SplitAreaSize
    a3s: SplitAreaSize
    a1v: boolean
    a2v: boolean
    a3v: boolean
    useTransition: boolean
  } = {
    a1s: 25,
    a2s: 50,
    a3s: 25,
    a1v: true,
    a2v: true,
    a3v: true,
    useTransition: true,
  }
  logMessages: Array<{ type: string; text: string }> = []

  @ViewChild('logs') logsEl: ElementRef
  @HostBinding('class') class = 'split-example-page'

  log(e) {
    this.logMessages.push({ type: 'transitionEnd', text: `${formatDate(new Date())} > transitionEnd event > ${e}` })
    setTimeout(() => {
      if (this.logsEl.nativeElement.scroll) {
        (<HTMLElement>this.logsEl.nativeElement).scroll({ top: this.logMessages.length * 30 })
      }
    })
  }

  //

  only = 0

  left() {
    switch (this.only) {
      case 0:
      case 2:
      case 3:
        this.only = 1
        return
      case 1:
        this.only = 0
        return
    }
  }
  center() {
    switch (this.only) {
      case 0:
      case 1:
      case 3:
        this.only = 2
        return
      case 2:
        this.only = 0
        return
    }
  }
  right() {
    switch (this.only) {
      case 0:
      case 1:
      case 2:
        this.only = 3
        return
      case 3:
        this.only = 0
        return
    }
  }

  //

  keepA = true
  keepB = true
  keepC = true
}
