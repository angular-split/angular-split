import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Signal,
  booleanAttribute,
  computed,
  inject,
  input,
  isDevMode,
} from '@angular/core'
import { SplitComponent } from '../split/split.component'
import { createClassesString, mirrorSignal } from '../utils'
import { SplitAreaSize, areaSizeTransform, boundaryAreaSizeTransform } from '../models'

@Component({
  selector: 'as-split-area',
  standalone: true,
  exportAs: 'asSplitArea',
  templateUrl: './split-area.component.html',
  styleUrl: './split-area.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitAreaComponent {
  protected readonly split = inject(SplitComponent)
  /**
   * @internal
   */
  readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef)

  readonly size = input('auto', { transform: areaSizeTransform })
  readonly minSize = input('*', { transform: boundaryAreaSizeTransform })
  readonly maxSize = input('*', { transform: boundaryAreaSizeTransform })
  readonly lockSize = input(false, { transform: booleanAttribute })
  readonly visible = input(true, { transform: booleanAttribute })

  /**
   * @internal
   */
  readonly _internalSize = mirrorSignal(
    computed((): SplitAreaSize => {
      // As size is an input and we can change the size without the outside
      // listening to the change we need an intermediate writeable signal
      if (!this.visible()) {
        return 0
      }

      const size = this.size()
      // auto acts the same as * in all calculations
      return size === 'auto' ? '*' : size
    }),
  )
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
    const minSize = this.normalizeSizeBoundary(this.minSize, defaultMinSize)
    const size = this._internalSize()

    if (size !== '*' && size < minSize) {
      if (isDevMode()) {
        console.warn('as-split: size cannot be smaller than minSize')
      }

      return defaultMinSize
    }

    return minSize
  }

  private normalizeMaxSize() {
    const defaultMaxSize = Infinity
    const maxSize = this.normalizeSizeBoundary(this.maxSize, defaultMaxSize)
    const size = this._internalSize()

    if (size !== '*' && size > maxSize) {
      if (isDevMode()) {
        console.warn('as-split: size cannot be larger than maxSize')
      }

      return defaultMaxSize
    }

    return maxSize
  }

  private normalizeSizeBoundary(sizeBoundarySignal: Signal<SplitAreaSize>, defaultNum: number): number {
    const size = this._internalSize()
    const lockSize = this.lockSize()
    const boundarySize = sizeBoundarySignal()

    if (lockSize) {
      if (isDevMode() && boundarySize !== '*') {
        console.warn('as-split: lockSize overwrites maxSize/minSize')
      }

      if (size === '*') {
        if (isDevMode()) {
          console.warn(`as-split: lockSize isn't supported on area with * size or without size`)
        }

        return defaultNum
      }

      return size
    }

    if (boundarySize === '*') {
      return defaultNum
    }

    if (size === '*') {
      if (isDevMode()) {
        console.warn('as-split: maxSize/minSize not allowed on *')
      }

      return defaultNum
    }

    return boundarySize
  }
}
