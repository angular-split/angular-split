import { Directive, OnDestroy, ElementRef, inject } from '@angular/core'
import { SplitGutterDirective } from './split-gutter.directive'
import { GUTTER_NUM_TOKEN } from './gutter-num-token'

@Directive({
  selector: '[asSplitGutterDragHandle]',
})
export class SplitGutterDragHandleDirective implements OnDestroy {
  private readonly gutterNum = inject(GUTTER_NUM_TOKEN)
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef)
  private readonly gutterDir = inject(SplitGutterDirective)

  constructor() {
    this.gutterDir._addToMap(this.gutterDir._gutterToHandleElementMap, this.gutterNum, this.elementRef)
  }

  ngOnDestroy(): void {
    this.gutterDir._removedFromMap(this.gutterDir._gutterToHandleElementMap, this.gutterNum, this.elementRef)
  }
}
