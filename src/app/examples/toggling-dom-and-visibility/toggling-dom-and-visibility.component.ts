import { Component, ChangeDetectionStrategy, HostBinding } from '@angular/core'

import { AComponent } from '../../ui/components/AComponent'
import { NgIf } from '@angular/common'
import { SplitComponent, SplitAreaComponent } from 'angular-split'
import { ExampleTitleComponent } from '../../ui/components/exampleTitle.component'

@Component({
  selector: 'sp-ex-toggling-dom-and-visible',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      .btns {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
      }
    `,
  ],
  template: `
    {{ testChangeDetectorRun() }}
    <div class="container">
      <sp-example-title [type]="exampleEnum.TOGGLE"></sp-example-title>
      <div class="split-example ex1" style="height: 150px;">
        <as-split [gutterSize]="15" (dragEnd)="log('dragEnd', $event)">
          <as-split-area *ngIf="action.isPresentA" [visible]="action.isVisibleA">
            <p>A</p>
          </as-split-area>
          <as-split-area *ngIf="action.isPresentB" [visible]="action.isVisibleB">
            <p>B</p>
          </as-split-area>
          <as-split-area *ngIf="action.isPresentC" [visible]="action.isVisibleC">
            <p>C</p>
          </as-split-area>
        </as-split>
      </div>
      <p>Toggle <code>[visible]="boolean"</code> properties:</p>
      <div class="btns">
        <div class="btn-group">
          <label
            class="btn btn-warning"
            [class.active]="!action.isVisibleA"
            (click)="action.isVisibleA = !action.isVisibleA"
            >{{ 'areaA: ' + action.isVisibleA }}</label
          >
          <label
            class="btn btn-warning"
            [class.active]="!action.isVisibleB"
            (click)="action.isVisibleB = !action.isVisibleB"
            >{{ 'areaB: ' + action.isVisibleB }}</label
          >
          <label
            class="btn btn-warning"
            [class.active]="!action.isVisibleC"
            (click)="action.isVisibleC = !action.isVisibleC"
            >{{ 'areaC: ' + action.isVisibleC }}</label
          >
        </div>
      </div>
      <p>Toggle <code>*ngIf="boolean"</code> properties:</p>
      <div class="btns">
        <div class="btn-group">
          <label
            class="btn btn-warning"
            [class.active]="!action.isPresentA"
            (click)="action.isPresentA = !action.isPresentA"
            >{{ 'areaA: ' + action.isPresentA }}</label
          >
          <label
            class="btn btn-warning"
            [class.active]="!action.isPresentB"
            (click)="action.isPresentB = !action.isPresentB"
            >{{ 'areaB: ' + action.isPresentB }}</label
          >
          <label
            class="btn btn-warning"
            [class.active]="!action.isPresentC"
            (click)="action.isPresentC = !action.isPresentC"
            >{{ 'areaC: ' + action.isPresentC }}</label
          >
        </div>
      </div>
      <br />
      <div class="alert alert-danger" role="alert">
        <b>Warning:</b><br /><code>[visible]="false"</code> only hides elements and don't remove it from the DOM, It
        could lead to useless change detection processing.<br />Use of <code>*ngIf="false"</code> should be the default
        option unless you have reasons to keep DOM elements.
      </div>
    </div>
  `,
  standalone: true,
  imports: [ExampleTitleComponent, SplitComponent, NgIf, SplitAreaComponent],
})
export class TogglingDomAndVisibleComponent extends AComponent {
  @HostBinding('class') class = 'split-example-page'

  action = {
    isVisibleA: true,
    isVisibleB: true,
    isVisibleC: true,
    isPresentA: true,
    isPresentB: true,
    isPresentC: true,
    logs: '',
  }

  log(eventName, e) {
    this.action.logs = `${new Date()}: ${eventName} > ${e}\n${this.action.logs}`
  }
}
