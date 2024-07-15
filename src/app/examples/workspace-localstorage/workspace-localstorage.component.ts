import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core'
import { AComponent } from '../../ui/components/AComponent'
import { SplitAreaSize, SplitGutterInteractionEvent, SplitComponent, SplitAreaComponent } from 'angular-split'
import { ExampleTitleComponent } from '../../ui/components/exampleTitle.component'

interface IConfig {
  columns: Array<{
    visible: boolean
    size: SplitAreaSize
    rows: Array<{
      visible: boolean
      size: SplitAreaSize
      type: string
    }>
  }>
  disabled: boolean
}

const defaultConfig: IConfig = {
  columns: [
    {
      visible: true,
      size: 25,
      rows: [
        { visible: true, size: 25, type: 'A' },
        { visible: true, size: 75, type: 'B' },
      ],
    },
    {
      visible: true,
      size: 50,
      rows: [
        { visible: true, size: 60, type: 'doc' },
        { visible: true, size: 40, type: 'C' },
      ],
    },
    {
      visible: true,
      size: 25,
      rows: [
        { visible: true, size: 20, type: 'D' },
        { visible: true, size: 30, type: 'E' },
        { visible: true, size: 50, type: 'F' },
      ],
    },
  ],
  disabled: false,
}

@Component({
  selector: 'sp-ex-workspace-localstorage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
      .bloc {
        height: 100%;
      }

      .explanations {
        padding: 15px;
      }

      .panel {
        font-size: 100px;
        font-weight: bold;
        color: #cccccc;

        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        overflow: hidden;
      }
      .panel > p {
        margin: 0;
      }
      button {
        margin-bottom: 10px;
      }
    `,
  ],
  template: `
    @if (config) {
      <as-split direction="horizontal" [disabled]="config.disabled" (dragEnd)="onDragEnd(-1, $event)">
        @for (column of config.columns; track column; let icol = $index) {
          @if (column.visible) {
            <as-split-area [size]="column.size">
              <as-split direction="vertical" [disabled]="config.disabled" (dragEnd)="onDragEnd(icol, $event)">
                @for (row of column.rows; track row; let irow = $index) {
                  @if (row.visible) {
                    <as-split-area [size]="row.size">
                      <div class="bloc">
                        @switch (row.type) {
                          @case ('doc') {
                            <div class="explanations">
                              <sp-example-title [type]="exampleEnum.WORKSPACE"></sp-example-title>
                              <p>
                                All areas size and visibility are saved to localStorage.<br />
                                Toggle areas visibility using following buttons:
                              </p>
                              @for (c of config.columns; track c) {
                                @for (r of c.rows; track r) {
                                  @if (r.type !== 'doc') {
                                    <button
                                      (click)="r.visible = !r.visible; refreshColumnVisibility(c)"
                                      [class.active]="!r.visible"
                                      class="btn btn-warning"
                                    >
                                      {{ r.type }}
                                    </button>
                                  }
                                }
                              }
                              <br />
                              <button
                                class="btn btn-warning"
                                [class.active]="!config.disabled"
                                (click)="toggleDisabled()"
                              >
                                {{ 'isDisabled: ' + config.disabled }}
                              </button>
                              <br />
                              <button (click)="resetConfig()" class="btn btn-warning">Reset localStorage</button>
                            </div>
                          }
                          @default {
                            <div class="panel">
                              <p>{{ row.type }}</p>
                            </div>
                          }
                        }
                      </div>
                    </as-split-area>
                  }
                }
              </as-split>
            </as-split-area>
          }
        }
      </as-split>
    }
  `,
  standalone: true,
  imports: [SplitComponent, SplitAreaComponent, ExampleTitleComponent],
})
export class WorkspaceLocalstorageComponent extends AComponent implements OnInit {
  localStorageName = 'angular-split-ws'
  config: IConfig = null

  ngOnInit() {
    if (localStorage.getItem(this.localStorageName)) {
      this.config = JSON.parse(localStorage.getItem(this.localStorageName))
    } else {
      this.resetConfig()
    }
  }

  resetConfig() {
    this.config = structuredClone(defaultConfig)

    localStorage.removeItem(this.localStorageName)
  }

  onDragEnd(columnindex: number, e: SplitGutterInteractionEvent) {
    // Column dragged
    if (columnindex === -1) {
      // Set size for all visible columns
      this.config.columns.filter((c) => c.visible === true).forEach((column, index) => (column.size = e.sizes[index]))
    }
    // Row dragged
    else {
      // Set size for all visible rows from specified column
      this.config.columns[columnindex].rows
        .filter((r) => r.visible === true)
        .forEach((row, index) => (row.size = e.sizes[index]))
    }

    this.saveLocalStorage()
  }

  toggleDisabled() {
    this.config.disabled = !this.config.disabled

    this.saveLocalStorage()
  }

  refreshColumnVisibility(column: IConfig['columns'][number]) {
    const visibleRows = column.rows.filter((row) => row.visible)
    visibleRows.forEach((row) => (row.size = 100 / visibleRows.length))
    column.visible = column.rows.some((row) => row.visible === true)

    this.saveLocalStorage()
  }

  saveLocalStorage() {
    localStorage.setItem(this.localStorageName, JSON.stringify(this.config))
  }
}
