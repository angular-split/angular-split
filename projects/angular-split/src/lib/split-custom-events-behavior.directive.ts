import { Directive, ElementRef, inject, input, output } from '@angular/core'
import { eventsEqualWithDelta, fromMouseDownEvent, fromMouseMoveEvent, fromMouseUpEvent, leaveNgZone } from './utils'
import {
  delay,
  filter,
  fromEvent,
  map,
  merge,
  mergeMap,
  of,
  repeat,
  scan,
  switchMap,
  take,
  takeUntil,
  tap,
  timeInterval,
} from 'rxjs'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { DOCUMENT } from '@angular/common'
import { SplitComponent } from './split/split.component'

/**
 * Emits mousedown, click, double click and keydown out of zone
 *
 * Emulates browser behavior of click and double click with new features:
 * 1. Supports touch events (tap and double tap)
 * 2. Ignores the first click in a double click with the side effect of a bit slower emission of the click event
 * 3. Allow customizing the delay after mouse down to count another mouse down as a double click
 */
@Directive({
  selector: '[asSplitCustomEventsBehavior]',
  standalone: true,
})
export class SplitCustomEventsBehaviorDirective {
  private readonly split = inject(SplitComponent)
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef)
  private readonly document = inject(DOCUMENT)

  readonly multiClickThreshold = input.required<number>({ alias: 'asSplitCustomMultiClickThreshold' })
  readonly deltaInPx = input.required<number>({ alias: 'asSplitCustomClickDeltaInPx' })
  readonly mouseDown = output<MouseEvent | TouchEvent>({ alias: 'asSplitCustomMouseDown' })
  readonly click = output({ alias: 'asSplitCustomClick' })
  readonly dblClick = output({ alias: 'asSplitCustomDblClick' })
  readonly keyDown = output<KeyboardEvent>({ alias: 'asSplitCustomKeyDown' })

  constructor() {
    fromEvent<KeyboardEvent>(this.elementRef.nativeElement, 'keydown')
      .pipe(leaveNgZone(), takeUntilDestroyed())
      .subscribe((e) => this.keyDown.emit(e))

    // We just need to know when drag start to cancel all click related interactions
    const dragStarted$ = fromMouseDownEvent(this.elementRef.nativeElement).pipe(
      switchMap((mouseDownEvent) =>
        fromMouseMoveEvent(this.document).pipe(
          filter((e) => !eventsEqualWithDelta(mouseDownEvent, e, this.deltaInPx())),
          take(1),
          map(() => true),
          takeUntil(fromMouseUpEvent(this.document)),
        ),
      ),
    )

    fromMouseDownEvent(this.elementRef.nativeElement)
      .pipe(
        tap((e) => this.mouseDown.emit(e)),
        // Gather mousedown events intervals to identify whether it is a single double or more click
        timeInterval(),
        // We only count a click as part of a multi click if the multiClickThreshold wasn't reached
        scan((sum, { interval }) => (interval >= this.multiClickThreshold() ? 1 : sum + 1), 0),
        // As mouseup always comes after mousedown if the delayed mouseup has yet to come
        // but a new mousedown arrived we can discard the older mouseup as we are part of a multi click
        switchMap((numOfConsecutiveClicks) =>
          // In case of a double click we directly emit as we don't care about more than two consecutive clicks
          // so we don't have to wait compared to a single click that might be followed by another for a double.
          // In case of a mouse up that was too long after the mouse down
          // we don't have to wait as we know it won't be a multi click but a single click
          fromMouseUpEvent(this.elementRef.nativeElement).pipe(
            timeInterval(),
            take(1),
            numOfConsecutiveClicks === 2
              ? map(() => numOfConsecutiveClicks)
              : mergeMap(({ interval }) =>
                  interval >= this.multiClickThreshold()
                    ? of(numOfConsecutiveClicks)
                    : of(numOfConsecutiveClicks).pipe(delay(this.multiClickThreshold() - interval)),
                ),
          ),
        ),
        // Discard everything once drag started or force cancel and listen again (repeat) to mouse down
        takeUntil(merge(dragStarted$, this.split._forceCancelGutterEvents$)),
        repeat(),
        leaveNgZone(),
        takeUntilDestroyed(),
      )
      .subscribe((amount) => {
        if (amount === 1) {
          this.click.emit()
        } else if (amount === 2) {
          this.dblClick.emit()
        }
      })
  }
}
