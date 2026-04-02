import { Directive, OnDestroy, ElementRef, inject } from '@angular/core'
import { GUTTER_NUM_TOKEN } from './gutter-num-token'
import { SplitGuttersManagerService } from './split-gutters-manager.service'

@Directive({
  selector: '[asSplitGutterDragHandle]',
})
export class SplitGutterDragHandleDirective implements OnDestroy {
  private readonly gutterNum = inject(GUTTER_NUM_TOKEN)
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef)
  private readonly guttersManager = inject(SplitGuttersManagerService)

  constructor() {
    this.guttersManager.addToMap(this.guttersManager.gutterToHandleElementMap, this.gutterNum, this.elementRef)
  }

  ngOnDestroy(): void {
    this.guttersManager.removeFromMap(this.guttersManager.gutterToHandleElementMap, this.gutterNum, this.elementRef)
  }
}
