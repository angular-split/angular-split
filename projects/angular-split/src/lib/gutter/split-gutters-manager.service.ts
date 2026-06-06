import { ElementRef, Injectable, signal } from '@angular/core'

@Injectable()
export class SplitGuttersManagerService {
  /**
   * The map holds reference to the drag handle elements inside instances
   * of the provided template.
   */
  private readonly gutterToHandleElementMap = signal(new Map<number, ElementRef<HTMLElement>[]>(), {
    equal: () => false,
  })
  /**
   * The map holds reference to the excluded drag elements inside instances
   * of the provided template.
   */
  private readonly gutterToExcludeDragElementMap = signal(new Map<number, ElementRef<HTMLElement>[]>(), {
    equal: () => false,
  })

  canStartDragging(originElement: HTMLElement, gutterNum: number) {
    if (this.gutterToExcludeDragElementMap().has(gutterNum)) {
      const isInsideExclude = this.gutterToExcludeDragElementMap()
        .get(gutterNum)
        .some((gutterExcludeElement) => gutterExcludeElement.nativeElement.contains(originElement))

      if (isInsideExclude) {
        return false
      }
    }

    if (this.gutterToHandleElementMap().has(gutterNum)) {
      return this.gutterToHandleElementMap()
        .get(gutterNum)
        .some((gutterHandleElement) => gutterHandleElement.nativeElement.contains(originElement))
    }

    return true
  }

  hasDragHandles(gutterNum: number) {
    return this.gutterToHandleElementMap().has(gutterNum)
  }

  addDragHandle(gutterNum: number, elementRef: ElementRef<HTMLElement>) {
    const map = this.gutterToHandleElementMap()
    this.addToMap(map, gutterNum, elementRef)
    this.gutterToHandleElementMap.set(map)
  }

  removeDragHandle(gutterNum: number, elementRef: ElementRef<HTMLElement>) {
    const map = this.gutterToHandleElementMap()
    this.removeFromMap(map, gutterNum, elementRef)
    this.gutterToHandleElementMap.set(map)
  }

  addExcludeDrag(gutterNum: number, elementRef: ElementRef<HTMLElement>) {
    const map = this.gutterToExcludeDragElementMap()
    this.addToMap(map, gutterNum, elementRef)
    this.gutterToExcludeDragElementMap.set(map)
  }

  removeExcludeDrag(gutterNum: number, elementRef: ElementRef<HTMLElement>) {
    const map = this.gutterToExcludeDragElementMap()
    this.removeFromMap(map, gutterNum, elementRef)
    this.gutterToExcludeDragElementMap.set(map)
  }

  private addToMap(
    map: Map<number, ElementRef<HTMLElement>[]>,
    gutterNum: number,
    elementRef: ElementRef<HTMLElement>,
  ) {
    if (map.has(gutterNum)) {
      map.get(gutterNum).push(elementRef)
    } else {
      map.set(gutterNum, [elementRef])
    }
  }

  private removeFromMap(
    map: Map<number, ElementRef<HTMLElement>[]>,
    gutterNum: number,
    elementRef: ElementRef<HTMLElement>,
  ) {
    const elements = map.get(gutterNum)
    elements.splice(elements.indexOf(elementRef), 1)

    if (elements.length === 0) {
      map.delete(gutterNum)
    }
  }
}
