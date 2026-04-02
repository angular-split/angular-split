import { ElementRef, Injectable } from '@angular/core'

@Injectable()
export class SplitGuttersManagerService {
  /**
   * The map holds reference to the drag handle elements inside instances
   * of the provided template.
   */
  readonly gutterToHandleElementMap = new Map<number, ElementRef<HTMLElement>[]>()
  /**
   * The map holds reference to the excluded drag elements inside instances
   * of the provided template.
   */
  readonly gutterToExcludeDragElementMap = new Map<number, ElementRef<HTMLElement>[]>()

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

  removeFromMap(map: Map<number, ElementRef<HTMLElement>[]>, gutterNum: number, elementRef: ElementRef<HTMLElement>) {
    const elements = map.get(gutterNum)
    elements.splice(elements.indexOf(elementRef), 1)

    if (elements.length === 0) {
      map.delete(gutterNum)
    }
  }
}
