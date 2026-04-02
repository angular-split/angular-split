import { Directive, OnDestroy, ElementRef, inject, computed, input, booleanAttribute } from '@angular/core'
import { GUTTER_NUM_TOKEN } from './gutter-num-token'
import { SplitGuttersManagerService } from './split-gutters-manager.service'
import { SplitComponent } from '../split/split.component'
import { assertUnreachable } from '../utils'

@Directive({
  selector: '[asSplitGutterDragHandle]',
  host: {
    '[style.cursor]': `cursor()`,
  },
})
export class SplitGutterDragHandleDirective implements OnDestroy {
  private readonly gutterNum = inject(GUTTER_NUM_TOKEN)
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef)
  private readonly guttersManager = inject(SplitGuttersManagerService)
  private readonly splitComponent = inject(SplitComponent)

  readonly suppressDefaultCursor = input(false, { transform: booleanAttribute })

  protected readonly cursor = computed(() => {
    if (this.suppressDefaultCursor()) {
      return undefined
    }

    const direction = this.splitComponent.direction()

    switch (direction) {
      case 'horizontal':
        return 'col-resize'
      case 'vertical':
        return 'row-resize'
      default:
        return assertUnreachable(direction, 'SplitDirection')
    }
  })

  constructor() {
    this.guttersManager.addDragHandle(this.gutterNum, this.elementRef)
  }

  ngOnDestroy(): void {
    this.guttersManager.removeDragHandle(this.gutterNum, this.elementRef)
  }
}
