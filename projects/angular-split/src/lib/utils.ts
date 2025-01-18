import { NgZone, Signal, computed, inject, numberAttribute, signal, untracked } from '@angular/core'
import { Observable, filter, fromEvent, merge } from 'rxjs'

export interface ClientPoint {
  x: number
  y: number
}

/**
 * Only supporting a single {@link TouchEvent} point
 */
export function getPointFromEvent(event: MouseEvent | TouchEvent | KeyboardEvent): ClientPoint {
  // NOTE: In firefox TouchEvent is only defined for touch capable devices
  const isTouchEvent = (e: typeof event): e is TouchEvent => window.TouchEvent && event instanceof TouchEvent

  if (isTouchEvent(event)) {
    if (event.changedTouches.length === 0) {
      return undefined
    }

    const { clientX, clientY } = event.changedTouches[0]

    return {
      x: clientX,
      y: clientY,
    }
  }

  if (event instanceof KeyboardEvent) {
    const target = event.target as HTMLElement

    // Calculate element midpoint
    return {
      x: target.offsetLeft + target.offsetWidth / 2,
      y: target.offsetTop + target.offsetHeight / 2,
    }
  }

  return {
    x: event.clientX,
    y: event.clientY,
  }
}

export function gutterEventsEqualWithDelta(
  startEvent: MouseEvent | TouchEvent,
  endEvent: MouseEvent | TouchEvent,
  deltaInPx: number,
  gutterElement: HTMLElement,
) {
  if (
    !gutterElement.contains(startEvent.target as HTMLElement) ||
    !gutterElement.contains(endEvent.target as HTMLElement)
  ) {
    return false
  }

  const startPoint = getPointFromEvent(startEvent)
  const endPoint = getPointFromEvent(endEvent)

  return Math.abs(endPoint.x - startPoint.x) <= deltaInPx && Math.abs(endPoint.y - startPoint.y) <= deltaInPx
}

export function fromMouseDownEvent(target: HTMLElement | Document) {
  return merge(
    fromEvent<MouseEvent>(target, 'mousedown').pipe(filter((e) => e.button === 0)),
    // We must prevent default here so we declare it as non passive explicitly
    fromEvent<TouchEvent>(target, 'touchstart', { passive: false }),
  )
}

export function fromMouseMoveEvent(target: HTMLElement | Document) {
  return merge(fromEvent<MouseEvent>(target, 'mousemove'), fromEvent<TouchEvent>(target, 'touchmove'))
}

export function fromMouseUpEvent(target: HTMLElement | Document, includeTouchCancel = false) {
  const withoutTouchCancel = merge(fromEvent<MouseEvent>(target, 'mouseup'), fromEvent<TouchEvent>(target, 'touchend'))

  return includeTouchCancel
    ? merge(withoutTouchCancel, fromEvent<TouchEvent>(target, 'touchcancel'))
    : withoutTouchCancel
}

export function sum<T>(array: T[] | readonly T[], fn: (item: T) => number) {
  return (array as T[]).reduce((sum, item) => sum + fn(item), 0)
}

export function toRecord<TItem, TKey extends string, TValue>(
  array: TItem[] | readonly TItem[],
  fn: (item: TItem, index: number) => [TKey, TValue],
): Record<TKey, TValue> {
  return (array as TItem[]).reduce<Record<TKey, TValue>>(
    (record, item, index) => {
      const [key, value] = fn(item, index)
      record[key] = value
      return record
    },
    {} as Record<TKey, TValue>,
  )
}

export function createClassesString(classesRecord: Record<string, boolean>) {
  return Object.entries(classesRecord)
    .filter(([, value]) => value)
    .map(([key]) => key)
    .join(' ')
}

export interface MirrorSignal<T> {
  (): T
  set(value: T): void
  reset(): void
}

/**
 * Creates a semi signal which allows writes but is based on an existing signal
 * Whenever the original signal changes the mirror signal gets aligned
 * overriding the current value inside.
 */
export function mirrorSignal<T>(outer: Signal<T>): MirrorSignal<T> {
  const inner = computed(() => signal(outer()))
  const mirror: MirrorSignal<T> = () => inner()()
  mirror.set = (value: T) => untracked(inner).set(value)
  mirror.reset = () => untracked(() => inner().set(outer()))
  return mirror
}

export function leaveNgZone<T>() {
  return (source: Observable<T>) =>
    new Observable<T>((observer) => inject(NgZone).runOutsideAngular(() => source.subscribe(observer)))
}

export const numberAttributeWithFallback = (fallback: number) => (value: unknown) => numberAttribute(value, fallback)

export const assertUnreachable = (value: never, name: string) => {
  throw new Error(`as-split: unknown value "${value}" for "${name}"`)
}
