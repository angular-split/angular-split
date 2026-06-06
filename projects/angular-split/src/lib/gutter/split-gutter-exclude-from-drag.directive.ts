import { Directive, OnDestroy, ElementRef, inject, input, booleanAttribute, computed } from '@angular/core'
import { GUTTER_NUM_TOKEN } from './gutter-num-token'
import { SplitGuttersManagerService } from './split-gutters-manager.service'

@Directive({
  selector: '[asSplitGutterExcludeFromDrag]',
  host: {
    '[style.cursor]': `cursor()`,
  },
})
export class SplitGutterExcludeFromDragDirective implements OnDestroy {
  private readonly gutterNum = inject(GUTTER_NUM_TOKEN)
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef)
  private readonly guttersManager = inject(SplitGuttersManagerService)

  readonly suppressDefaultCursor = input(false, { transform: booleanAttribute })

  cursor = computed(() => (this.suppressDefaultCursor() ? undefined : 'default'))

  constructor() {
    this.guttersManager.addExcludeDrag(this.gutterNum, this.elementRef)
  }

  ngOnDestroy(): void {
    this.guttersManager.removeExcludeDrag(this.gutterNum, this.elementRef)
  }
}
