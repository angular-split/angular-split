import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Signal,
  booleanAttribute,
  computed,
  inject,
  input,
  isDevMode,
  linkedSignal,
} from '@angular/core'
import { SPLIT_AREA_CONTRACT, SplitComponent } from '../split/split.component'
import { createClassesString } from '../utils'
import { SplitAreaSize, areaSizeTransform, boundaryAreaSizeTransform } from '../models'

@Component({
  selector: 'as-split-area',
  standalone: true,
  exportAs: 'asSplitArea',
  templateUrl: './split-area.component.html',
  styleUrl: './split-area.component.css',
  providers: [
    {
      provide: SPLIT_AREA_CONTRACT,
      useExisting: SplitAreaComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitAreaComponent {
  protected readonly split = inject(SplitComponent)

  readonly size = input('auto', { transform: areaSizeTransform })
  readonly minSize = input('*', { transform: boundaryAreaSizeTransform })
  readonly maxSize = input('*', { transform: boundaryAreaSizeTransform })
  readonly lockSize = input(false, { transform: booleanAttribute })
  readonly visible = input(true, { transform: booleanAttribute })

  /**
   * @internal
   */
  readonly _internalSize = linkedSignal((): SplitAreaSize => {
    if (!this.visible()) {
      return 0
    }

    const visibleIndex = this.split._visibleAreas().findIndex((area) => area === this)

    return this.split._alignedVisibleAreasSizes()[visibleIndex]
  })
  /**
   * @internal
   */
  readonly _normalizedMinSize = computed(() => this.normalizeMinSize())
  /**
   * @internal
   */
  readonly _normalizedMaxSize = computed(() => this.normalizeMaxSize())
  private readonly index = computed(() => this.split._areas().findIndex((area) => area === this))
  private readonly gridAreaNum = computed(() => this.index() * 2 + 1)
  private readonly hostClasses = computed(() =>
    createClassesString({
      ['as-split-area']: true,
      ['as-min']: this.visible() && this._internalSize() === this._normalizedMinSize(),
      ['as-max']: this.visible() && this._internalSize() === this._normalizedMaxSize(),
      ['as-hidden']: !this.visible(),
    }),
  )

  @HostBinding('class') protected get hostClassesBinding() {
    return this.hostClasses()
  }
  @HostBinding('style.grid-column') protected get hostGridColumnStyleBinding() {
    return this.split.direction() === 'horizontal' ? `${this.gridAreaNum()} / ${this.gridAreaNum()}` : undefined
  }
  @HostBinding('style.grid-row') protected get hostGridRowStyleBinding() {
    return this.split.direction() === 'vertical' ? `${this.gridAreaNum()} / ${this.gridAreaNum()}` : undefined
  }
  @HostBinding('style.position') protected get hostPositionStyleBinding() {
    return this.split._isDragging() ? 'relative' : undefined
  }

  private normalizeMinSize() {
    const defaultMinSize = 0

    if (!this.visible()) {
      return defaultMinSize
    }

    const minSize = this.normalizeSizeBoundary(this.minSize, defaultMinSize)
    const size = this.size()

    if (size !== '*' && size !== 'auto' && size < minSize) {
      if (isDevMode()) {
        console.warn('as-split: size cannot be smaller than minSize')
      }

      return defaultMinSize
    }

    return minSize
  }

  private normalizeMaxSize() {
    const defaultMaxSize = Infinity

    if (!this.visible()) {
      return defaultMaxSize
    }

    const maxSize = this.normalizeSizeBoundary(this.maxSize, defaultMaxSize)
    const size = this.size()

    if (size !== '*' && size !== 'auto' && size > maxSize) {
      if (isDevMode()) {
        console.warn('as-split: size cannot be larger than maxSize')
      }

      return defaultMaxSize
    }

    return maxSize
  }

  private normalizeSizeBoundary(sizeBoundarySignal: Signal<SplitAreaSize>, defaultBoundarySize: number): number {
    const size = this.size()
    const lockSize = this.lockSize()
    const boundarySize = sizeBoundarySignal()

    if (lockSize) {
      if (isDevMode() && boundarySize !== '*') {
        console.warn('as-split: lockSize overwrites maxSize/minSize')
      }

      if (size === '*' || size === 'auto') {
        if (isDevMode()) {
          console.warn(`as-split: lockSize isn't supported on area with * size or without size`)
        }

        return defaultBoundarySize
      }

      return size
    }

    if (boundarySize === '*') {
      return defaultBoundarySize
    }

    if (size === '*' || size === 'auto') {
      if (isDevMode()) {
        console.warn('as-split: maxSize/minSize not allowed on * or without size')
      }

      return defaultBoundarySize
    }

    return boundarySize
  }
}
