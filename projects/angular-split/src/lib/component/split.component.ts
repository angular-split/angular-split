import {
  Component,
  Input,
  Output,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Renderer2,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  NgZone,
  ViewChildren,
  QueryList,
  EventEmitter,
  ViewEncapsulation,
  Inject,
  Optional,
  ContentChild,
} from '@angular/core'
import { Observable, Subscriber, Subject } from 'rxjs'
import { debounceTime } from 'rxjs/operators'
import {
  IArea,
  IPoint,
  ISplitSnapshot,
  IAreaSnapshot,
  IOutputData,
  IOutputAreaSizes,
  IDefaultOptions,
  IAreaSize,
  ISplitDirection,
  ISplitDir,
  ISplitUnit,
} from '../interface'
import { SplitAreaDirective } from '../directive/split-area.directive'
import {
  getInputPositiveNumber,
  getInputBoolean,
  getAreaMinSize,
  getAreaMaxSize,
  getPointFromEvent,
  getElementPixelSize,
  getGutterSideAbsorptionCapacity,
  isUserSizesValid,
  pointDeltaEquals,
  updateAreaSize,
  getKeyboardEndpoint,
} from '../utils'
import { ANGULAR_SPLIT_DEFAULT_OPTIONS } from '../angular-split-config.token'
import { SplitGutterDirective } from '../gutter/split-gutter.directive'

/**
 * angular-split
 *
 *
 *  PERCENT MODE ([unit]="'percent'")
 *  ___________________________________________________________________________________________
 * |       A       [g1]       B       [g2]       C       [g3]       D       [g4]       E       |
 * |-------------------------------------------------------------------------------------------|
 * |       20                 30                 20                 15                 15      | <-- [size]="x"
 * |               10px               10px               10px               10px               | <-- [gutterSize]="10"
 * |calc(20% - 8px)    calc(30% - 12px)   calc(20% - 8px)    calc(15% - 6px)    calc(15% - 6px)| <-- CSS flex-basis property (with flex-grow&shrink at 0)
 * |     152px              228px              152px              114px              114px     | <-- el.getBoundingClientRect().width
 * |___________________________________________________________________________________________|
 *                                                                                 800px         <-- el.getBoundingClientRect().width
 *  flex-basis = calc( { area.size }% - { area.size/100 * nbGutter*gutterSize }px );
 *
 *
 *  PIXEL MODE ([unit]="'pixel'")
 *  ___________________________________________________________________________________________
 * |       A       [g1]       B       [g2]       C       [g3]       D       [g4]       E       |
 * |-------------------------------------------------------------------------------------------|
 * |      100                250                 *                 150                100      | <-- [size]="y"
 * |               10px               10px               10px               10px               | <-- [gutterSize]="10"
 * |   0 0 100px          0 0 250px           1 1 auto          0 0 150px          0 0 100px   | <-- CSS flex property (flex-grow/flex-shrink/flex-basis)
 * |     100px              250px              200px              150px              100px     | <-- el.getBoundingClientRect().width
 * |___________________________________________________________________________________________|
 *                                                                                 800px         <-- el.getBoundingClientRect().width
 *
 */

@Component({
  selector: 'as-split',
  exportAs: 'asSplit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [`./split.component.scss`],
  template: ` <ng-content></ng-content>
    <ng-template
      ngFor
      [ngForOf]="displayedAreas"
      let-area="$implicit"
      let-index="index"
      let-first="first"
      let-last="last"
    >
      <div
        role="separator"
        tabindex="0"
        *ngIf="last === false"
        #gutterEls
        class="as-split-gutter"
        [class.as-dragged]="draggedGutterNum === index + 1"
        [style.flex-basis.px]="gutterSize"
        [style.order]="index * 2 + 1"
        (keydown)="startKeyboardDrag($event, index * 2 + 1, index + 1)"
        (mousedown)="startMouseDrag($event, index * 2 + 1, index + 1)"
        (touchstart)="startMouseDrag($event, index * 2 + 1, index + 1)"
        (mouseup)="clickGutter($event, index + 1)"
        (touchend)="clickGutter($event, index + 1)"
        [attr.aria-label]="gutterAriaLabel"
        [attr.aria-orientation]="direction"
        [attr.aria-valuemin]="area.minSize"
        [attr.aria-valuemax]="area.maxSize"
        [attr.aria-valuenow]="area.size === '*' ? null : area.size"
        [attr.aria-valuetext]="getAriaAreaSizeText(area.size)"
      >
        <ng-container *ngIf="customGutter?.template; else defaultGutterTpl">
          <ng-container *asSplitGutterDynamicInjector="index + 1; let injector">
            <ng-container
              *ngTemplateOutlet="
                customGutter.template;
                context: {
                  areaBefore: area,
                  areaAfter: displayedAreas[index + 1],
                  gutterNum: index + 1,
                  first,
                  last: index === displayedAreas.length - 2,
                  isDragged: draggedGutterNum === index + 1
                };
                injector: injector
              "
            ></ng-container>
          </ng-container>
        </ng-container>
        <ng-template #defaultGutterTpl>
          <div class="as-split-gutter-icon"></div>
        </ng-template>
      </div>
    </ng-template>`,
  encapsulation: ViewEncapsulation.Emulated,
})
export class SplitComponent implements AfterViewInit, OnDestroy {
  @ContentChild(SplitGutterDirective) customGutter: SplitGutterDirective
  @Input() set direction(v: ISplitDirection) {
    this._direction = v === 'vertical' ? 'vertical' : 'horizontal'

    this.renderer.addClass(this.elRef.nativeElement, `as-${this._direction}`)
    this.renderer.removeClass(
      this.elRef.nativeElement,
      `as-${this._direction === 'vertical' ? 'horizontal' : 'vertical'}`,
    )

    this.build(false, false)
  }

  get direction(): ISplitDirection {
    return this._direction
  }

  @Input() set unit(v: ISplitUnit) {
    this._unit = v === 'pixel' ? 'pixel' : 'percent'

    this.renderer.addClass(this.elRef.nativeElement, `as-${this._unit}`)
    this.renderer.removeClass(this.elRef.nativeElement, `as-${this._unit === 'pixel' ? 'percent' : 'pixel'}`)

    this.build(false, true)
  }

  get unit(): ISplitUnit {
    return this._unit
  }

  @Input() set gutterSize(v: number | `${number}` | null | undefined) {
    this._gutterSize = getInputPositiveNumber(v, 11)

    this.build(false, false)
  }

  get gutterSize(): number {
    return this._gutterSize
  }

  @Input() set gutterStep(v: number | `${number}`) {
    this._gutterStep = getInputPositiveNumber(v, 1)
  }

  get gutterStep(): number {
    return this._gutterStep
  }

  @Input() set restrictMove(v: boolean | `${boolean}`) {
    this._restrictMove = getInputBoolean(v)
  }

  get restrictMove(): boolean {
    return this._restrictMove
  }

  @Input() set useTransition(v: boolean | `${boolean}`) {
    this._useTransition = getInputBoolean(v)

    if (this._useTransition) {
      this.renderer.addClass(this.elRef.nativeElement, 'as-transition')
    } else {
      this.renderer.removeClass(this.elRef.nativeElement, 'as-transition')
    }
  }

  get useTransition(): boolean {
    return this._useTransition
  }

  @Input() set disabled(v: boolean | `${boolean}`) {
    this._disabled = getInputBoolean(v)

    if (this._disabled) {
      this.renderer.addClass(this.elRef.nativeElement, 'as-disabled')
    } else {
      this.renderer.removeClass(this.elRef.nativeElement, 'as-disabled')
    }
  }

  get disabled(): boolean {
    return this._disabled
  }

  @Input() set dir(v: ISplitDir) {
    this._dir = v === 'rtl' ? 'rtl' : 'ltr'

    this.renderer.setAttribute(this.elRef.nativeElement, 'dir', this._dir)
  }

  get dir(): ISplitDir {
    return this._dir
  }

  @Input() set gutterDblClickDuration(v: number | `${number}`) {
    this._gutterDblClickDuration = getInputPositiveNumber(v, 0)
  }

  @Input() gutterClickDeltaPx = 2

  @Input() gutterAriaLabel: string

  get gutterDblClickDuration(): number {
    return this._gutterDblClickDuration
  }
  @Output() get transitionEnd(): Observable<IOutputAreaSizes> {
    return new Observable<IOutputAreaSizes>(
      (subscriber: Subscriber<IOutputAreaSizes>) => (this.transitionEndSubscriber = subscriber),
    ).pipe(debounceTime<IOutputAreaSizes>(20))
  }

  private _config: IDefaultOptions = {
    direction: 'horizontal',
    unit: 'percent',
    gutterSize: 11,
    gutterStep: 1,
    restrictMove: false,
    useTransition: false,
    disabled: false,
    dir: 'ltr',
    gutterDblClickDuration: 0,
  }

  constructor(
    private ngZone: NgZone,
    private elRef: ElementRef,
    private cdRef: ChangeDetectorRef,
    private renderer: Renderer2,
    @Optional() @Inject(ANGULAR_SPLIT_DEFAULT_OPTIONS) globalConfig: IDefaultOptions,
  ) {
    // To force adding default class, could be override by user @Input() or not
    this.direction = this._direction
    this._config = globalConfig ? Object.assign(this._config, globalConfig) : this._config
    Object.keys(this._config).forEach((property) => {
      this[property] = this._config[property]
    })
  }
  private _direction: ISplitDirection

  private _unit: ISplitUnit

  private _gutterSize: number

  private _gutterStep: number

  private _restrictMove: boolean

  private _useTransition: boolean

  private _disabled: boolean

  private _dir: ISplitDir

  private _gutterDblClickDuration: number

  @Output() dragStart = new EventEmitter<IOutputData>(false)
  @Output() dragEnd = new EventEmitter<IOutputData>(false)
  @Output() gutterClick = new EventEmitter<IOutputData>(false)
  @Output() gutterDblClick = new EventEmitter<IOutputData>(false)

  private transitionEndSubscriber: Subscriber<IOutputAreaSizes>

  private dragProgressSubject = new Subject<IOutputData>()
  dragProgress$ = this.dragProgressSubject.asObservable()

  private isDragging = false
  private isWaitingClear = false
  private isWaitingInitialMove = false
  private dragListeners: Array<Function> = []
  private snapshot: ISplitSnapshot | null = null
  private startPoint: IPoint | null = null
  private endPoint: IPoint | null = null

  public readonly displayedAreas: Array<IArea> = []
  private readonly hiddenAreas: Array<IArea> = []

  @ViewChildren('gutterEls') private gutterEls: QueryList<ElementRef>

  _clickTimeout: number | null = null
  draggedGutterNum: number = undefined

  public ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      // To avoid transition at first rendering
      setTimeout(() => this.renderer.addClass(this.elRef.nativeElement, 'as-init'))
    })
  }

  private getNbGutters(): number {
    return this.displayedAreas.length === 0 ? 0 : this.displayedAreas.length - 1
  }

  public addArea(component: SplitAreaDirective): void {
    const newArea: IArea = {
      component,
      order: 0,
      size: 0,
      minSize: null,
      maxSize: null,
      sizeBeforeCollapse: null,
      gutterBeforeCollapse: 0,
    }

    if (component.visible === true) {
      this.displayedAreas.push(newArea)

      this.build(true, true)
    } else {
      this.hiddenAreas.push(newArea)
    }
  }

  public removeArea(component: SplitAreaDirective): void {
    if (this.displayedAreas.some((a) => a.component === component)) {
      const area = this.displayedAreas.find((a) => a.component === component)
      this.displayedAreas.splice(this.displayedAreas.indexOf(area), 1)

      this.build(true, true)
    } else if (this.hiddenAreas.some((a) => a.component === component)) {
      const area = this.hiddenAreas.find((a) => a.component === component)
      this.hiddenAreas.splice(this.hiddenAreas.indexOf(area), 1)
    }
  }

  public updateArea(component: SplitAreaDirective, resetOrders: boolean, resetSizes: boolean): void {
    if (component.visible === true) {
      this.build(resetOrders, resetSizes)
    }
  }

  public showArea(component: SplitAreaDirective): void {
    const area = this.hiddenAreas.find((a) => a.component === component)
    if (area === undefined) {
      return
    }

    const areas = this.hiddenAreas.splice(this.hiddenAreas.indexOf(area), 1)
    this.displayedAreas.push(...areas)

    this.build(true, true)
  }

  public hideArea(comp: SplitAreaDirective): void {
    const area = this.displayedAreas.find((a) => a.component === comp)
    if (area === undefined) {
      return
    }

    const areas = this.displayedAreas.splice(this.displayedAreas.indexOf(area), 1)
    areas.forEach((item) => {
      item.order = 0
      item.size = 0
    })
    this.hiddenAreas.push(...areas)

    this.build(true, true)
  }

  public getVisibleAreaSizes(): IOutputAreaSizes {
    return this.displayedAreas.map((a) => a.size)
  }

  public setVisibleAreaSizes(sizes: IOutputAreaSizes): boolean {
    if (sizes.length !== this.displayedAreas.length) {
      return false
    }

    const formattedSizes = sizes.map((s) => getInputPositiveNumber(s, '*'))
    const isValid = isUserSizesValid(this.unit, formattedSizes)

    if (isValid === false) {
      return false
    }

    // @ts-ignore
    this.displayedAreas.forEach((area, i) => (area.component._size = formattedSizes[i]))

    this.build(false, true)
    return true
  }

  private build(resetOrders: boolean, resetSizes: boolean): void {
    this.stopDragging()

    // ¤ AREAS ORDER

    if (resetOrders === true) {
      // If user provided 'order' for each area, use it to sort them.
      if (this.displayedAreas.every((a) => a.component.order !== null)) {
        this.displayedAreas.sort((a, b) => a.component.order - b.component.order)
      }

      // Then set real order with multiples of 2, numbers between will be used by gutters.
      this.displayedAreas.forEach((area, i) => {
        area.order = i * 2
        area.component.setStyleOrder(area.order)
      })
    }

    // ¤ AREAS SIZE

    if (resetSizes === true) {
      const useUserSizes = isUserSizesValid(
        this.unit,
        this.displayedAreas.map((a) => a.component.size),
      )

      switch (this.unit) {
        case 'percent': {
          const defaultSize = 100 / this.displayedAreas.length

          this.displayedAreas.forEach((area) => {
            area.size = useUserSizes ? area.component.size : defaultSize
            area.minSize = getAreaMinSize(area)
            area.maxSize = getAreaMaxSize(area)
          })
          break
        }
        case 'pixel': {
          if (useUserSizes) {
            this.displayedAreas.forEach((area) => {
              area.size = area.component.size
              area.minSize = getAreaMinSize(area)
              area.maxSize = getAreaMaxSize(area)
            })
          } else {
            const wildcardSizeAreas = this.displayedAreas.filter((a) => a.component.size === '*')

            // No wildcard area > Need to select one arbitrarily > first
            if (wildcardSizeAreas.length === 0 && this.displayedAreas.length > 0) {
              this.displayedAreas.forEach((area, i) => {
                area.size = i === 0 ? '*' : area.component.size
                area.minSize = i === 0 ? null : getAreaMinSize(area)
                area.maxSize = i === 0 ? null : getAreaMaxSize(area)
              })
            } else if (wildcardSizeAreas.length > 1) {
              // More than one wildcard area > Need to keep only one arbitrarily > first
              let alreadyGotOne = false
              this.displayedAreas.forEach((area) => {
                if (area.component.size === '*') {
                  if (alreadyGotOne === false) {
                    area.size = '*'
                    area.minSize = null
                    area.maxSize = null
                    alreadyGotOne = true
                  } else {
                    area.size = 100
                    area.minSize = null
                    area.maxSize = null
                  }
                } else {
                  area.size = area.component.size
                  area.minSize = getAreaMinSize(area)
                  area.maxSize = getAreaMaxSize(area)
                }
              })
            }
          }
          break
        }
      }
    }

    this.refreshStyleSizes()
    this.cdRef.markForCheck()
  }

  private refreshStyleSizes(): void {
    ///////////////////////////////////////////
    // PERCENT MODE
    if (this.unit === 'percent') {
      // Only one area > flex-basis 100%
      if (this.displayedAreas.length === 1) {
        this.displayedAreas[0].component.setStyleFlex(0, 0, `100%`, false, false)
      } else {
        // Multiple areas > use each percent basis
        const sumGutterSize = this.getNbGutters() * this.gutterSize

        this.displayedAreas.forEach((area) => {
          // Area with wildcard size
          if (area.size === '*') {
            if (this.displayedAreas.length === 1) {
              area.component.setStyleFlex(1, 1, `100%`, false, false)
            } else {
              area.component.setStyleFlex(1, 1, `auto`, false, false)
            }
          } else {
            area.component.setStyleFlex(
              0,
              0,
              `calc( ${area.size}% - ${(area.size / 100) * sumGutterSize}px )`,
              area.minSize !== null && area.minSize === area.size,
              area.maxSize !== null && area.maxSize === area.size,
            )
          }
        })
      }
    } else if (this.unit === 'pixel') {
      ///////////////////////////////////////////
      // PIXEL MODE
      this.displayedAreas.forEach((area) => {
        // Area with wildcard size
        if (area.size === '*') {
          if (this.displayedAreas.length === 1) {
            area.component.setStyleFlex(1, 1, `100%`, false, false)
          } else {
            area.component.setStyleFlex(1, 1, `auto`, false, false)
          }
        } else {
          // Area with pixel size
          // Only one area > flex-basis 100%
          if (this.displayedAreas.length === 1) {
            area.component.setStyleFlex(0, 0, `100%`, false, false)
          } else {
            // Multiple areas > use each pixel basis
            area.component.setStyleFlex(
              0,
              0,
              `${area.size}px`,
              area.minSize !== null && area.minSize === area.size,
              area.maxSize !== null && area.maxSize === area.size,
            )
          }
        }
      })
    }
  }

  public clickGutter(event: MouseEvent | TouchEvent, gutterNum: number): void {
    const tempPoint = getPointFromEvent(event)

    // Be sure mouseup/touchend happened if touch/cursor is not moved.
    if (
      this.startPoint &&
      pointDeltaEquals(this.startPoint, tempPoint, this.gutterClickDeltaPx) &&
      (!this.isDragging || this.isWaitingInitialMove)
    ) {
      // If timeout in progress and new click > clearTimeout & dblClickEvent
      if (this._clickTimeout !== null) {
        window.clearTimeout(this._clickTimeout)
        this._clickTimeout = null
        this.notify('dblclick', gutterNum)
        this.stopDragging()
      } else {
        // Else start timeout to call clickEvent at end
        this._clickTimeout = window.setTimeout(() => {
          this._clickTimeout = null
          this.notify('click', gutterNum)
          this.stopDragging()
        }, this.gutterDblClickDuration)
      }
    }
  }

  public startKeyboardDrag(event: KeyboardEvent, gutterOrder: number, gutterNum: number) {
    if (this.disabled === true || this.isWaitingClear === true) {
      return
    }

    const endPoint = getKeyboardEndpoint(event, this.direction)
    if (endPoint === null) {
      return
    }
    this.endPoint = endPoint
    this.startPoint = getPointFromEvent(event)

    event.preventDefault()
    event.stopPropagation()

    this.setupForDragEvent(gutterOrder, gutterNum)
    this.startDragging()
    this.drag()
    this.stopDragging()
  }

  public startMouseDrag(event: MouseEvent | TouchEvent, gutterOrder: number, gutterNum: number): void {
    if (this.customGutter && !this.customGutter.canStartDragging(event.target as HTMLElement, gutterNum)) {
      return
    }

    event.preventDefault()
    event.stopPropagation()

    this.startPoint = getPointFromEvent(event)
    if (this.startPoint === null || this.disabled === true || this.isWaitingClear === true) {
      return
    }

    this.setupForDragEvent(gutterOrder, gutterNum)

    this.dragListeners.push(this.renderer.listen('document', 'mouseup', this.stopDragging.bind(this)))
    this.dragListeners.push(this.renderer.listen('document', 'touchend', this.stopDragging.bind(this)))
    this.dragListeners.push(this.renderer.listen('document', 'touchcancel', this.stopDragging.bind(this)))

    this.ngZone.runOutsideAngular(() => {
      this.dragListeners.push(this.renderer.listen('document', 'mousemove', this.mouseDragEvent.bind(this)))
      this.dragListeners.push(this.renderer.listen('document', 'touchmove', this.mouseDragEvent.bind(this)))
    })

    this.startDragging()
  }

  private setupForDragEvent(gutterOrder: number, gutterNum: number) {
    this.snapshot = {
      gutterNum,
      lastSteppedOffset: 0,
      allAreasSizePixel: getElementPixelSize(this.elRef, this.direction) - this.getNbGutters() * this.gutterSize,
      allInvolvedAreasSizePercent: 100,
      areasBeforeGutter: [],
      areasAfterGutter: [],
    }

    this.displayedAreas.forEach((area) => {
      const areaSnapshot: IAreaSnapshot = {
        area,
        sizePixelAtStart: getElementPixelSize(area.component.elRef, this.direction),
        sizePercentAtStart: this.unit === 'percent' ? area.size : -1, // If pixel mode, anyway, will not be used.
      }

      if (area.order < gutterOrder) {
        if (this.restrictMove === true) {
          this.snapshot.areasBeforeGutter = [areaSnapshot]
        } else {
          this.snapshot.areasBeforeGutter.unshift(areaSnapshot)
        }
      } else if (area.order > gutterOrder) {
        if (this.restrictMove === true) {
          if (this.snapshot.areasAfterGutter.length === 0) {
            this.snapshot.areasAfterGutter = [areaSnapshot]
          }
        } else {
          this.snapshot.areasAfterGutter.push(areaSnapshot)
        }
      }
    })

    // allInvolvedAreasSizePercent is only relevant if there is restrictMove as otherwise the sum
    // is always 100.
    // Pixel mode doesn't have browser % problem which is the origin of allInvolvedAreasSizePercent.
    if (this.restrictMove && this.unit === 'percent') {
      const areaSnapshotBefore = this.snapshot.areasBeforeGutter[0]
      const areaSnapshotAfter = this.snapshot.areasAfterGutter[0]

      // We have a wildcard size area beside the dragged gutter.
      // In this case we can only calculate the size based on the move restricted areas.
      if (areaSnapshotBefore.area.size === '*' || areaSnapshotAfter.area.size === '*') {
        const notInvolvedAreasSizesPercent = this.displayedAreas.reduce((accum, area) => {
          if (areaSnapshotBefore.area !== area && areaSnapshotAfter.area !== area) {
            return accum + (area.size as number)
          }

          return accum
        }, 0)

        this.snapshot.allInvolvedAreasSizePercent = 100 - notInvolvedAreasSizesPercent
      } else {
        // No wildcard or not beside the gutter - we can just sum the areas beside gutter percents.
        this.snapshot.allInvolvedAreasSizePercent = [
          ...this.snapshot.areasBeforeGutter,
          ...this.snapshot.areasAfterGutter,
        ].reduce((t, a) => t + (a.sizePercentAtStart as number), 0)
      }
    }

    if (this.snapshot.areasBeforeGutter.length === 0 || this.snapshot.areasAfterGutter.length === 0) {
      return
    }
  }

  private startDragging() {
    this.displayedAreas.forEach((area) => area.component.lockEvents())

    this.isDragging = true
    this.isWaitingInitialMove = true
  }

  private mouseDragEvent(event: MouseEvent | TouchEvent): void {
    event.preventDefault()
    event.stopPropagation()

    const tempPoint = getPointFromEvent(event)
    if (this._clickTimeout !== null && !pointDeltaEquals(this.startPoint, tempPoint, this.gutterClickDeltaPx)) {
      window.clearTimeout(this._clickTimeout)
      this._clickTimeout = null
    }

    if (this.isDragging === false) {
      return
    }

    this.endPoint = getPointFromEvent(event)
    if (this.endPoint === null) {
      return
    }

    this.drag()
  }

  private drag() {
    if (this.isWaitingInitialMove) {
      if (this.startPoint.x !== this.endPoint.x || this.startPoint.y !== this.endPoint.y) {
        this.ngZone.run(() => {
          this.isWaitingInitialMove = false

          this.renderer.addClass(this.elRef.nativeElement, 'as-dragging')
          this.draggedGutterNum = this.snapshot.gutterNum
          this.cdRef.markForCheck()

          this.notify('start', this.snapshot.gutterNum)
        })
      } else {
        return
      }
    }

    // Calculate steppedOffset

    let offset =
      this.direction === 'horizontal' ? this.startPoint.x - this.endPoint.x : this.startPoint.y - this.endPoint.y

    // RTL requires negative offset only in horizontal mode as in vertical
    // RTL has no effect on drag direction.
    if (this.dir === 'rtl' && this.direction === 'horizontal') {
      offset = -offset
    }

    const steppedOffset = Math.round(offset / this.gutterStep) * this.gutterStep

    if (steppedOffset === this.snapshot.lastSteppedOffset) {
      return
    }

    this.snapshot.lastSteppedOffset = steppedOffset

    // Need to know if each gutter side areas could reacts to steppedOffset

    let areasBefore = getGutterSideAbsorptionCapacity(
      this.unit,
      this.snapshot.areasBeforeGutter,
      -steppedOffset,
      this.snapshot.allAreasSizePixel,
    )
    let areasAfter = getGutterSideAbsorptionCapacity(
      this.unit,
      this.snapshot.areasAfterGutter,
      steppedOffset,
      this.snapshot.allAreasSizePixel,
    )

    // Each gutter side areas can't absorb all offset
    if (areasBefore.remain !== 0 && areasAfter.remain !== 0) {
      if (Math.abs(areasBefore.remain) === Math.abs(areasAfter.remain)) {
      } else if (Math.abs(areasBefore.remain) > Math.abs(areasAfter.remain)) {
        areasAfter = getGutterSideAbsorptionCapacity(
          this.unit,
          this.snapshot.areasAfterGutter,
          steppedOffset + areasBefore.remain,
          this.snapshot.allAreasSizePixel,
        )
      } else {
        areasBefore = getGutterSideAbsorptionCapacity(
          this.unit,
          this.snapshot.areasBeforeGutter,
          -(steppedOffset - areasAfter.remain),
          this.snapshot.allAreasSizePixel,
        )
      }
    } else if (areasBefore.remain !== 0) {
      // Areas before gutter can't absorbs all offset > need to recalculate sizes for areas after gutter.
      areasAfter = getGutterSideAbsorptionCapacity(
        this.unit,
        this.snapshot.areasAfterGutter,
        steppedOffset + areasBefore.remain,
        this.snapshot.allAreasSizePixel,
      )
    } else if (areasAfter.remain !== 0) {
      // Areas after gutter can't absorbs all offset > need to recalculate sizes for areas before gutter.
      areasBefore = getGutterSideAbsorptionCapacity(
        this.unit,
        this.snapshot.areasBeforeGutter,
        -(steppedOffset - areasAfter.remain),
        this.snapshot.allAreasSizePixel,
      )
    }

    if (this.unit === 'percent') {
      // Hack because of browser messing up with sizes using calc(X% - Ypx) -> el.getBoundingClientRect()
      // If not there, playing with gutters makes total going down to 99.99875% then 99.99286%, 99.98986%,..
      const all = [...areasBefore.list, ...areasAfter.list]
      const wildcardArea = all.find((a) => a.percentAfterAbsorption == '*')
      // In case we have a wildcard area - always align the percents on the wildcard area.
      const areaToReset =
        wildcardArea ??
        all.find(
          (a) =>
            a.percentAfterAbsorption !== 0 &&
            a.percentAfterAbsorption !== a.areaSnapshot.area.minSize &&
            a.percentAfterAbsorption !== a.areaSnapshot.area.maxSize,
        )

      if (areaToReset) {
        areaToReset.percentAfterAbsorption =
          this.snapshot.allInvolvedAreasSizePercent -
          all.filter((a) => a !== areaToReset).reduce((total, a) => total + (a.percentAfterAbsorption as number), 0)
      }
    }

    // Now we know areas could absorb steppedOffset, time to really update sizes

    areasBefore.list.forEach((item) => updateAreaSize(this.unit, item))
    areasAfter.list.forEach((item) => updateAreaSize(this.unit, item))

    this.refreshStyleSizes()
    this.notify('progress', this.snapshot.gutterNum)
  }

  private stopDragging(event?: Event): void {
    if (event) {
      event.preventDefault()
      event.stopPropagation()
    }

    if (this.isDragging === false) {
      return
    }

    this.displayedAreas.forEach((area) => area.component.unlockEvents())

    while (this.dragListeners.length > 0) {
      const fct = this.dragListeners.pop()
      if (fct) {
        fct()
      }
    }

    // Warning: Have to be before "notify('end')"
    // because "notify('end')"" can be linked to "[size]='x'" > "build()" > "stopDragging()"
    this.isDragging = false

    // If moved from starting point, notify end
    if (this.isWaitingInitialMove === false) {
      this.notify('end', this.snapshot.gutterNum)
    }

    this.renderer.removeClass(this.elRef.nativeElement, 'as-dragging')
    this.draggedGutterNum = undefined
    this.cdRef.markForCheck()

    this.snapshot = null
    this.isWaitingClear = true

    // Needed to let (click)="clickGutter(...)" event run and verify if mouse moved or not
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.startPoint = null
        this.endPoint = null
        this.isWaitingClear = false
      })
    })
  }

  public notify(type: 'start' | 'progress' | 'end' | 'click' | 'dblclick' | 'transitionEnd', gutterNum: number): void {
    const sizes = this.getVisibleAreaSizes()

    if (type === 'start') {
      this.dragStart.emit({ gutterNum, sizes })
    } else if (type === 'end') {
      this.dragEnd.emit({ gutterNum, sizes })
    } else if (type === 'click') {
      this.gutterClick.emit({ gutterNum, sizes })
    } else if (type === 'dblclick') {
      this.gutterDblClick.emit({ gutterNum, sizes })
    } else if (type === 'transitionEnd') {
      if (this.transitionEndSubscriber) {
        this.ngZone.run(() => this.transitionEndSubscriber.next(sizes))
      }
    } else if (type === 'progress') {
      // Stay outside zone to allow users do what they want about change detection mechanism.
      this.dragProgressSubject.next({ gutterNum, sizes })
    }
  }

  public ngOnDestroy(): void {
    this.stopDragging()
  }

  public collapseArea(comp: SplitAreaDirective, newSize: number, gutter: 'left' | 'right'): void {
    const area = this.displayedAreas.find((a) => a.component === comp)
    if (area === undefined) {
      return
    }
    const whichGutter = gutter === 'right' ? 1 : -1
    if (!area.sizeBeforeCollapse) {
      area.sizeBeforeCollapse = area.size
      area.gutterBeforeCollapse = whichGutter
    }
    area.size = newSize
    const gtr = this.gutterEls.find((f) => f.nativeElement.style.order === `${area.order + whichGutter}`)
    if (gtr) {
      this.renderer.addClass(gtr.nativeElement, 'as-split-gutter-collapsed')
    }
    this.updateArea(comp, false, false)
  }

  public expandArea(comp: SplitAreaDirective): void {
    const area = this.displayedAreas.find((a) => a.component === comp)
    if (area === undefined) {
      return
    }
    if (!area.sizeBeforeCollapse) {
      return
    }
    area.size = area.sizeBeforeCollapse
    area.sizeBeforeCollapse = null
    const gtr = this.gutterEls.find((f) => f.nativeElement.style.order === `${area.order + area.gutterBeforeCollapse}`)
    if (gtr) {
      this.renderer.removeClass(gtr.nativeElement, 'as-split-gutter-collapsed')
    }
    this.updateArea(comp, false, false)
  }

  public getAriaAreaSizeText(size: IAreaSize): string {
    if (size === '*') {
      return null
    }

    return size.toFixed(0) + ' ' + this.unit
  }
}
