import { ChangeDetectionStrategy, Component, HostBinding, viewChild } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { SplitAreaComponent, SplitAreaSize, SplitComponent, SplitDirection } from 'angular-split'
import { ButtonRadioDirective } from 'ngx-bootstrap/buttons'
import { SortableComponent } from 'ngx-bootstrap/sortable'
import { ExampleTitleComponent } from 'src/app/ui/components/exampleTitle.component'
import { AComponent } from '../../ui/components/AComponent'

@Component({
  selector: 'sp-ex-geek-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SortableComponent,
    FormsModule,
    ButtonRadioDirective,
    SplitAreaComponent,
    SplitComponent,
    ExampleTitleComponent,
  ],
  styles: [
    `
      .as-split-area {
        display: flex;
        justify-content: center;
        align-items: center;
        text-shadow:
          2px 0 0 #fff,
          -2px 0 0 #fff,
          0 2px 0 #fff,
          0 -2px 0 #fff,
          1px 1px #fff,
          -1px -1px 0 #fff,
          1px -1px 0 #fff,
          -1px 1px 0 #fff;
      }

      .opts-prop {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;
      }
      .opts-prop > div {
        margin-bottom: 10px;
      }

      .opts-area > .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        background-color: #e8e8e8;
      }

      .area-item {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 4px;
        cursor: move;
      }
      .area-item button {
        margin: 0 5px;
      }

      .num {
        color: #000000;
        text-shadow:
          2px 0 0 #fff,
          -2px 0 0 #fff,
          0 2px 0 #fff,
          0 -2px 0 #fff,
          1px 1px #fff,
          -1px -1px 0 #fff,
          1px -1px 0 #fff,
          -1px 1px 0 #fff;
      }
      label {
        margin: 0;
      }
    `,
  ],
  template: `
    {{ testChangeDetectorRun() }}
    <div class="container">
      <sp-example-title [type]="exampleEnum.GEEK"></sp-example-title>
      <div class="split-example" style="background-color: #e5e0e0;">
        <as-split
          [direction]="d.dir"
          [restrictMove]="d.restrictMove"
          [gutterSize]="d.gutterSize"
          [gutterStep]="d.gutterStep"
          [style.width]="d.width"
          [style.height]="d.height"
          [useTransition]="d.useTransition"
          gutterClickDeltaPx="0"
          style="background-color: #ffffff;"
        >
          @for (area of d.areas; track trackByFct(index, area); let index = $index) {
            @if (area.present) {
              <as-split-area [visible]="area.visible" [size]="area.size" [style.background-color]="area.color">{{
                area.id
              }}</as-split-area>
            }
          }
        </as-split>
      </div>
      <div class="opts-prop">
        <div>
          <button
            class="btn btn-warning btn-sm"
            [class.active]="!d.useTransition"
            (click)="d.useTransition = !d.useTransition"
          >
            {{ 'useTransition: ' + d.useTransition }}
          </button>
        </div>
        <div>
          <div class="btn-group">
            <label class="btn btn-warning btn-sm" [(ngModel)]="d.dir" btnRadio="horizontal">horizontal</label>
            <label class="btn btn-warning btn-sm" [(ngModel)]="d.dir" btnRadio="vertical">vertical</label>
          </div>
        </div>
        <div>
          <label>Width:&nbsp;</label>
          <div class="btn-group">
            <label class="btn btn-warning btn-sm" [(ngModel)]="d.width" [btnRadio]="null">null</label>
            <label class="btn btn-warning btn-sm" [(ngModel)]="d.width" btnRadio="400px">400</label>
            <label class="btn btn-warning btn-sm" [(ngModel)]="d.width" btnRadio="600px">600</label>
          </div>
        </div>
        <div>
          <label>Height:&nbsp;</label>
          <div class="btn-group">
            <label class="btn btn-warning btn-sm" [(ngModel)]="d.height" [btnRadio]="null">null</label>
            <label class="btn btn-warning btn-sm" [(ngModel)]="d.height" btnRadio="200px">200</label>
            <label class="btn btn-warning btn-sm" [(ngModel)]="d.height" btnRadio="350px">350</label>
          </div>
        </div>
        <div>
          <label>Gutter size:&nbsp;</label>
          <div class="btn-group">
            <label class="btn btn-warning btn-sm" [(ngModel)]="d.gutterSize" [btnRadio]="null">null</label>
            <label class="btn btn-warning btn-sm" [(ngModel)]="d.gutterSize" btnRadio="7">7</label>
            <label class="btn btn-warning btn-sm" [(ngModel)]="d.gutterSize" btnRadio="22">22</label>
          </div>
        </div>
        <div>
          <label>Gutter step:&nbsp;</label>
          <div class="btn-group">
            <label class="btn btn-warning btn-sm" [(ngModel)]="d.gutterStep" [btnRadio]="null">null</label>
            <label class="btn btn-warning btn-sm" [(ngModel)]="d.gutterStep" btnRadio="10">10</label>
            <label class="btn btn-warning btn-sm" [(ngModel)]="d.gutterStep" btnRadio="50">50</label>
          </div>
        </div>
      </div>
      <div class="opts-area">
        <div class="title">
          <label><b>Areas (drag elements to change order):</b></label>
          <button class="btn btn-warning btn-sm" (click)="addArea()">Add area</button>
        </div>
        <bs-sortable [(ngModel)]="d.areas" [itemTemplate]="itemTemplate"></bs-sortable>

        <ng-template #itemTemplate let-item="item" let-index="index">
          <div [style.background-color]="item.value.color" class="area-item id-{{ item.value.id }}">
            <div class="num">{{ item.value.id }}</div>
            <div>
              <button
                class="btn btn-warning btn-sm"
                [class.active]="!item.value.present"
                (click)="item.value.present = !item.value.present"
              >
                {{ '*ngIf="' + item.value.present + '"' }}
              </button>
              <button
                class="btn btn-warning btn-sm"
                [class.active]="!item.value.visible"
                (click)="item.value.visible ? hideArea(item.value) : showArea(item.value)"
              >
                {{ '[visible]="' + item.value.visible + '"' }}
              </button>
              <button class="btn btn-warning btn-sm" (click)="removeArea(item.value)">Remove</button>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
})
export class GeekDemoComponent extends AComponent {
  readonly sortableComponent = viewChild(SortableComponent)
  @HostBinding('class') class = 'split-example-page'

  d: {
    dir: SplitDirection
    restrictMove: boolean
    useTransition: boolean
    gutterSize: number | null
    gutterStep: number | null
    width: number | null
    height: number | null
    areas: { id: number; color: string; size: SplitAreaSize; present: boolean; visible: boolean }[]
  } = {
    dir: 'horizontal',
    restrictMove: true,
    useTransition: true,
    gutterSize: null,
    gutterStep: null,
    width: null,
    height: null,
    areas: [
      { id: getRandomNum(), color: getRandomColor(), size: 25, present: true, visible: true },
      { id: getRandomNum(), color: getRandomColor(), size: 50, present: true, visible: true },
      { id: getRandomNum(), color: getRandomColor(), size: 25, present: true, visible: true },
    ],
  }

  trackByFct(index, area) {
    return area.id
  }

  addArea() {
    this.d.areas.push({
      id: getRandomNum(),
      color: getRandomColor(),
      size: 25,
      present: true,
      visible: true,
    })
    this.alignAreaSizes()

    this.sortableComponent().writeValue(this.d.areas)
  }

  removeArea(area: { id: number; color: string; size: SplitAreaSize; present: boolean; visible: boolean }) {
    this.d.areas.splice(this.d.areas.indexOf(area), 1)
    this.alignAreaSizes()

    this.sortableComponent().writeValue(this.d.areas)
  }

  hideArea(area: { id: number; color: string; size: SplitAreaSize; present: boolean; visible: boolean }) {
    this.d.areas.find((a) => a === area).visible = false
    this.alignAreaSizes()
  }

  showArea(area: { id: number; color: string; size: SplitAreaSize; present: boolean; visible: boolean }) {
    this.d.areas.find((a) => a === area).visible = true
    this.alignAreaSizes()
  }

  private alignAreaSizes() {
    this.d.areas.filter((area) => area.visible).forEach((area, _, arr) => (area.size = 100 / arr.length))
  }
}

function getRandomNum(): number {
  return Math.round(Math.random() * 1000)
}

function getRandomColor(): string {
  return '#' + ((Math.random() * 0xffffff) << 0).toString(16)
}
