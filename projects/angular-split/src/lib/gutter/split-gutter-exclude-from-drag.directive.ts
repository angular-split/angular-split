import { Directive, OnDestroy, ElementRef, inject } from '@angular/core'
import { GUTTER_NUM_TOKEN } from './gutter-num-token'
import { SplitGuttersManagerService } from './split-gutters-manager.service'

@Directive({
  selector: '[asSplitGutterExcludeFromDrag]',
})
export class SplitGutterExcludeFromDragDirective implements OnDestroy {
  private readonly gutterNum = inject(GUTTER_NUM_TOKEN)
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef)
  private readonly guttersManager = inject(SplitGuttersManagerService)

  constructor() {
    this.guttersManager.addToMap(this.guttersManager.gutterToExcludeDragElementMap, this.gutterNum, this.elementRef)
  }

  ngOnDestroy(): void {
    this.guttersManager.removeFromMap(
      this.guttersManager.gutterToExcludeDragElementMap,
      this.gutterNum,
      this.elementRef,
    )
  }
}
