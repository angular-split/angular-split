import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core'
import {
  SplitAreaComponent,
  SplitAreaSize,
  SplitComponent,
  SplitDirection,
  SplitGutterDragHandleDirective,
  SplitGutterInteractionEvent,
  SplitGutterDirective,
  SplitGutterExcludeFromDragDirective,
} from 'angular-split'
import { ExampleTitleComponent } from 'src/app/ui/components/exampleTitle.component'
import { AComponent } from '../../ui/components/AComponent'

@Component({
  selector: 'sp-ex-custom-gutter-style',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SplitAreaComponent,
    SplitComponent,
    ExampleTitleComponent,
    SplitGutterExcludeFromDragDirective,
    SplitGutterDragHandleDirective,
    SplitGutterDirective,
  ],
  styleUrls: [`./custom-gutter-style.component.scss`],
  template: `
    {{ testChangeDetectorRun() }}
    <div class="container">
      <sp-example-title [type]="exampleEnum.STYLE"></sp-example-title>
      <div class="split-example ex-a">
        <as-split [direction]="direction" gutterSize="35">
          <div *asSplitGutter class="custom-hand-gutter">
            <div asSplitGutterDragHandle class="custom-hand-gutter-icon"></div>
          </div>
          <as-split-area [size]="30">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tiam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </as-split-area>
          <as-split-area [size]="40">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tiam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </as-split-area>
          <as-split-area size="*">
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
      <div class="split-example ex-b">
        <as-split [direction]="direction" restrictMove="true" gutterSize="1">
          <div *asSplitGutter="let isDragged = isDragged" class="custom-shade-gutter" [class.dragged]="isDragged">
            <div class="custom-shade-gutter-icon"></div>
          </div>
          <as-split-area [size]="30"
            ><p>
              A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A A
            </p></as-split-area
          >
          <as-split-area [size]="50"
            ><p>
              B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B B
            </p></as-split-area
          >
          <as-split-area [size]="20"
            ><p>
              C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C C
            </p></as-split-area
          >
        </as-split>
      </div>
      <div class="split-example ex-c">
        <as-split [direction]="direction" gutterSize="25" (dragEnd)="exampleCDragEnd($event)">
          <div
            *asSplitGutter="let gutterNum = gutterNum; let first = first; let last = last"
            class="custom-collapse-gutter"
          >
            <div class="custom-collapse-gutter-header">
              @if (!last) {
                <div asSplitGutterExcludeFromDrag (click)="collapseExampleCArea(gutterNum - 1, 'before')">
                  {{ direction === 'horizontal' ? '◀' : '🔼' }}
                </div>
              }
              @if (!first) {
                <div asSplitGutterExcludeFromDrag (click)="collapseExampleCArea(gutterNum, 'after')">
                  {{ direction === 'horizontal' ? '▶' : '🔽' }}
                </div>
              }
            </div>
            <div class="custom-collapse-gutter-icon"></div>
            <div class="custom-collapse-gutter-ghost"></div>
          </div>
          <as-split-area [size]="exampleCSizes[0]">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tiam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </as-split-area>
          <as-split-area [size]="exampleCSizes[1]">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tiam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </as-split-area>
          <as-split-area [size]="exampleCSizes[2]">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tiam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </as-split-area>
          <as-split-area [size]="exampleCSizes[3]">
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
        <button class="btn btn-warning" (click)="direction = direction === 'horizontal' ? 'vertical' : 'horizontal'">
          {{ 'Toggle direction: "' + direction + '"' }}
        </button>
      </div>
    </div>
  `,
})
export class CustomGutterStyleComponent extends AComponent {
  @HostBinding('class') class = 'split-example-page'

  direction: SplitDirection = 'horizontal'
  exampleCSizes: SplitAreaSize[] = [30, 10, 40, 20]

  exampleCDragEnd(e: SplitGutterInteractionEvent) {
    this.exampleCSizes = e.sizes
  }

  collapseExampleCArea(index: number, areaToCollapseDirection: 'before' | 'after') {
    const sizeBeforeCollapse = this.exampleCSizes[index] as number
    const sizeIndexToChange = index === 0 || areaToCollapseDirection === 'before' ? index + 1 : index - 1

    this.exampleCSizes[index] = 0
    this.exampleCSizes[sizeIndexToChange] = (this.exampleCSizes[sizeIndexToChange] as number) + sizeBeforeCollapse
  }
}
