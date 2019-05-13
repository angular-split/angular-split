import { Component, ViewChild, ViewChildren, QueryList, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { SplitComponent, SplitAreaDirective } from 'angular-split';

import { AComponent } from './AComponent';


@Component({
  selector: 'sp-ex-class-collapse',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'split-example-page'
  },
  styles: [`
        .btns {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-around;
        }
        .btns > div {
            margin-bottom: 10px;
        }
    `],
  template: `
        <div class="container">
            <sp-example-title [type]="exampleEnum.COLLAPSE"></sp-example-title>
            <div class="split-example">
                <as-split [unit]="'pixel'">
                    <as-split-area [size]="200">
                        <p>area 1</p>
                    </as-split-area>
                    <as-split-area>
                        <p>area 2</p>
                    </as-split-area>
                    <as-split-area [size]="100">
                        <p>area 3</p>
                    </as-split-area>
                </as-split>
            </div>
            <br>
            <div class="btns">
              <div>
                <button class="btn btn-warning" style="margin-right: 10px" (click)="onClose1()">Collapse #1 to 0</button>
                <button class="btn btn-warning" (click)="onClose1(40)">Collapse #1 to 40</button>
              </div>
              <div>
                <button class="btn btn-warning" style="margin-right: 10px" (click)="onClose3()">Collapse #3 to 0</button>
                <button class="btn btn-warning" (click)="onClose3(60)">Collapse #3 to 60</button>
              </div>
            </div>
          <div class="btns">
            <div>
              <button class="btn btn-warning" style="margin-right: 10px" (click)="onExpand1()">Expand #1</button>
            </div>
            <div>
              <button class="btn btn-warning" style="margin-right: 10px" (click)="onExpand3()">Expand #3</button>
            </div>
          </div>
        </div>`
})
export class ClassCollapseComponent extends AComponent implements AfterViewInit {
  @ViewChild(SplitComponent) splitEl: SplitComponent;
  @ViewChildren(SplitAreaDirective) areasEl: QueryList<SplitAreaDirective>

  ngAfterViewInit() {
    // console.log('Area Components: ', this.areasEl);
  }

  onClose1(newSize: number = 0) {
    this.areasEl.first.collapse(newSize);
  }

  onClose3(newSize: number = 0) {
    this.areasEl.last.collapse(newSize, 'left');
  }

  onExpand1() {
    this.areasEl.first.expand();
  }

  onExpand3() {
    this.areasEl.last.expand();
  }
}
