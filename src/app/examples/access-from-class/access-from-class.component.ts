import { Component, ViewChild, ViewChildren, QueryList, AfterViewInit, ChangeDetectionStrategy, HostBinding } from '@angular/core'
import { SplitComponent, SplitAreaDirective } from 'angular-split'

import { AComponent } from '../../ui/components/AComponent'

@Component({
  selector: 'sp-ex-class-access',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .btns {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;
      }
      .btns > div {
        margin-bottom: 10px;
      }
    `,
  ],
  template: `
    <div class="container">
      <sp-example-title [type]="exampleEnum.CODE"></sp-example-title>
      <div class="split-example">
        <as-split>
          <as-split-area [size]="75">
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
          <as-split-area [size]="3">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tiam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </as-split-area>
          <as-split-area [visible]="false" [size]="18">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tiam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </as-split-area>
          <as-split-area [size]="4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tiam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </as-split-area>
        </as-split>
      </div>
      <br />
      <div class="btns">
        <div>
          <button
            class="btn btn-warning"
            (click)="splitEl.direction = splitEl?.direction === 'horizontal' ? 'vertical' : 'horizontal'"
          >
            {{ 'Toggle direction: "' + splitEl?.direction + '"' }}
          </button>
        </div>
        <div>
          <button
            class="btn btn-warning"
            [class.active]="!splitEl?.disabled"
            (click)="splitEl.disabled = !splitEl?.disabled"
          >
            {{ 'splitEl.disabled: ' + splitEl?.disabled }}
          </button>
        </div>
        <div>
          <button class="btn btn-warning" (click)="splitEl.dir = splitEl?.dir === 'rtl' ? 'ltr' : 'rtl'">
            {{ 'splitEl.dir: "' + splitEl?.dir + '"' }}
          </button>
        </div>
        <div>
          <label>Gutter size: </label>
          <div class="btn-group">
            <label
              class="btn btn-warning btn-sm"
              (click)="splitEl.gutterSize = null"
              [class.active]="splitEl?.gutterSize === 11"
              >null</label
            >
            <label
              class="btn btn-warning btn-sm"
              (click)="splitEl.gutterSize = 7"
              [class.active]="splitEl?.gutterSize === 7"
              >7</label
            >
            <label
              class="btn btn-warning btn-sm"
              (click)="splitEl.gutterSize = 22"
              [class.active]="splitEl?.gutterSize === 22"
              >22</label
            >
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AccessFromClassComponent extends AComponent implements AfterViewInit {
  @HostBinding('class') class = 'split-example-page';

  @ViewChild(SplitComponent) splitEl: SplitComponent
  @ViewChildren(SplitAreaDirective) areasEl: QueryList<SplitAreaDirective>

  ngAfterViewInit() {
    console.log('Area Components: ', this.areasEl)
  }
}
