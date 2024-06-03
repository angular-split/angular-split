import { Directive, ElementRef, TemplateRef } from '@angular/core'
import { IArea } from '../interface'

export interface SplitGutterTemplateContext {
  /**
   * The area before the gutter.
   * In RTL the right area and in LTR the left area
   */
  areaBefore: IArea
  /**
   * The area after the gutter.
   * In RTL the left area and in LTR the right area
   */
  areaAfter: IArea
  /**
   * The absolute number of the gutter based on direction (RTL and LTR).
   * First gutter is 1, second is 2, etc...
   */
  gutterNum: number
  /**
   * Whether this is the first gutter.
   * In RTL the most right area and in LTR the most left area
   */
  first: boolean
  /**
   * Whether this is the last gutter.
   * In RTL the most left area and in LTR the most right area
   */
  last: boolean
  /**
   * Whether the gutter is being dragged now
   */
  isDragged: boolean
}

@Directive({
  selector: '[asSplitGutter]',
})
export class SplitGutterDirective {
  /**
   * The map holds reference to the drag handle elements inside instances
   * of the provided template.
   */
  gutterToHandleElementMap = new Map<number, ElementRef<HTMLElement>[]>()
  /**
   * The map holds reference to the excluded drag elements inside instances
   * of the provided template.
   */
  gutterToExcludeDragElementMap = new Map<number, ElementRef<HTMLElement>[]>()

  constructor(public template: TemplateRef<SplitGutterTemplateContext>) {}

  canStartDragging(originElement: HTMLElement, gutterNum: number) {
    if (this.gutterToExcludeDragElementMap.has(gutterNum)) {
      const isInsideExclude = this.gutterToExcludeDragElementMap
        .get(gutterNum)
        .some((gutterExcludeElement) => gutterExcludeElement.nativeElement.contains(originElement))

      if (isInsideExclude) {
        return false
      }
    }

    if (this.gutterToHandleElementMap.has(gutterNum)) {
      return this.gutterToHandleElementMap
        .get(gutterNum)
        .some((gutterHandleElement) => gutterHandleElement.nativeElement.contains(originElement))
    }

    return true
  }

  addToMap(map: Map<number, ElementRef<HTMLElement>[]>, gutterNum: number, elementRef: ElementRef<HTMLElement>) {
    if (map.has(gutterNum)) {
      map.get(gutterNum).push(elementRef)
    } else {
      map.set(gutterNum, [elementRef])
    }
  }

  removedFromMap(map: Map<number, ElementRef<HTMLElement>[]>, gutterNum: number, elementRef: ElementRef<HTMLElement>) {
    const elements = map.get(gutterNum)
    elements.splice(elements.indexOf(elementRef), 1)

    if (elements.length === 0) {
      map.delete(gutterNum)
    }
  }

  static ngTemplateContextGuard(dir: SplitGutterDirective, ctx: unknown): ctx is SplitGutterTemplateContext {
    return true
  }
}
