import { Component, Input, Output, ChangeDetectionStrategy, ChangeDetectorRef, Renderer2, AfterViewInit, OnDestroy, ElementRef, NgZone, ViewChildren, QueryList } from '@angular/core';
import { Observable, Subscriber, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { IArea } from '../interface/IArea';
import { IPoint } from '../interface/IPoint';
import { ISplitSnapshot } from '../interface/ISplitSnapshot';
import { IAreaSnapshot } from '../interface/IAreaSnapshot';
import { SplitAreaDirective } from '../directive/splitArea.directive';
import { getInputPositiveNumber, getInputBoolean, getPointFromEvent, getElementPixelSize, getSteppedValue, areaAbsorb, isValidTotalSize } from '../utils';

/**
 * angular-split
 * 
 * Areas size are set in percentage of the split container.
 * Gutters size are set in pixels.
 * 
 * So we set css 'flex-basis' property like this (where 0 <= area.size <= 1): 
 *  calc( { area.size * 100 }% - { area.size * nbGutter * gutterSize }px );
 * 
 * Examples with 3 visible areas and 2 gutters: 
 * 
 * |                     10px                   10px                                  |
 * |---------------------[]---------------------[]------------------------------------|
 * |  calc(20% - 4px)          calc(20% - 4px)              calc(60% - 12px)          |
 * 
 * 
 * |                          10px                        10px                        |
 * |--------------------------[]--------------------------[]--------------------------|
 * |  calc(33.33% - 6.667px)      calc(33.33% - 6.667px)      calc(33.33% - 6.667px)  |
 * 
 * 
 * |10px                                                  10px                        |
 * |[]----------------------------------------------------[]--------------------------|
 * |0                 calc(66.66% - 13.333px)                  calc(33%% - 6.667px)   |
 * 
 * 
 *  10px 10px                                                                         |
 * |[][]------------------------------------------------------------------------------|
 * |0 0                               calc(100% - 20px)                               |
 * 
 */

@Component({
    selector: 'as-split',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: [`./split.component.scss`],
    template: `
        <ng-content></ng-content>
        <ng-template ngFor [ngForOf]="displayedAreas" let-index="index" let-last="last">
            <div *ngIf="last === false" 
                 #gutterEls
                 class="as-split-gutter"
                 [style.flex-basis.px]="gutterSize"
                 [style.order]="index*2+1"
                 (click.out-zone)="clickGutter($event, index+1)"
                 (mousedown.out-zone)="startDragging($event, index*2+1, index+1)"
                 (touchstart.out-zone)="startDragging($event, index*2+1, index+1)">
                <div class="as-split-gutter-icon"></div>
            </div>
        </ng-template>`,
})
export class SplitComponent implements AfterViewInit, OnDestroy {

    private _direction: 'horizontal' | 'vertical' = 'horizontal';

    @Input() set direction(v: 'horizontal' | 'vertical') {
        this._direction = (v === 'vertical') ? 'vertical' : 'horizontal';
        
        this.renderer.addClass(this.elRef.nativeElement, `is-${ this._direction }`);
        this.renderer.removeClass(this.elRef.nativeElement, `is-${ (this._direction === 'vertical') ? 'horizontal' : 'vertical' }`);
        
        this.build(false, false);
    }
    
    get direction(): 'horizontal' | 'vertical' {
        return this._direction;
    }
    
    ////

    private _unit: 'percent' | 'pixel' = 'percent';

    @Input() set unit(v: 'percent' | 'pixel') {
        this._unit = (v === 'pixel') ? 'pixel' : 'percent';
        
        this.renderer.addClass(this.elRef.nativeElement, `is-${ this._unit }`);
        this.renderer.removeClass(this.elRef.nativeElement, `is-${ (this._unit === 'pixel') ? 'percent' : 'pixel' }`);
        
        this.build(false, true);
    }
    
    get unit(): 'percent' | 'pixel' {
        return this._unit;
    }
    
    ////

    private _gutterSize: number = 11;

    @Input() set gutterSize(v: number | null) {
        this._gutterSize = getInputPositiveNumber(v, 11);

        this.build(false, false);
    }
    
    get gutterSize(): number {
        return this._gutterSize;
    }
    
    ////

    private _gutterStep: number = 1;

    @Input() set gutterStep(v: number) {
        this._gutterStep = getInputPositiveNumber(v, 1);
    }
    
    get gutterStep(): number {
        return this._gutterStep;
    }
    
    ////

    private _useTransition: boolean = false;

    @Input() set useTransition(v: boolean) {
        this._useTransition = getInputBoolean(v);

        if(this._useTransition) this.renderer.addClass(this.elRef.nativeElement, 'is-transition');
        else                    this.renderer.removeClass(this.elRef.nativeElement, 'is-transition');
    }
    
    get useTransition(): boolean {
        return this._useTransition;
    }
    
    ////

    private _disabled: boolean = false;
    
    @Input() set disabled(v: boolean) {
        this._disabled = getInputBoolean(v);

        if(this._disabled)  this.renderer.addClass(this.elRef.nativeElement, 'is-disabled');
        else                this.renderer.removeClass(this.elRef.nativeElement, 'is-disabled');
    }
    
    get disabled(): boolean {
        return this._disabled;
    }

    ////

    private _dir: 'ltr' | 'rtl' = 'ltr';
    
    @Input() set dir(v: 'ltr' | 'rtl') {
        v = (v === 'rtl') ? 'rtl' : 'ltr';
        this._dir = v;
        
        this.renderer.setAttribute(this.elRef.nativeElement, 'dir', this._dir);
    }
    
    get dir(): 'ltr' | 'rtl' {
        return this._dir;
    }

    ////

    private dragStartSubscriber: Subscriber<{gutterNum: number, sizes: Array<number>}>
    @Output() get dragStart(): Observable<{gutterNum: number, sizes: Array<number>}> {
        return new Observable(subscriber => this.dragStartSubscriber = subscriber);
    }

    private dragEndSubscriber: Subscriber<{gutterNum: number, sizes: Array<number>}>
    @Output() get dragEnd(): Observable<{gutterNum: number, sizes: Array<number>}> {
        return new Observable(subscriber => this.dragEndSubscriber = subscriber);
    }

    private gutterClickSubscriber: Subscriber<{gutterNum: number, sizes: Array<number>}>
    @Output() get gutterClick(): Observable<{gutterNum: number, sizes: Array<number>}> {
        return new Observable(subscriber => this.gutterClickSubscriber = subscriber);
    }

    private transitionEndSubscriber: Subscriber<Array<number>>
    @Output() get transitionEnd(): Observable<Array<number>> {
        return new Observable(subscriber => this.transitionEndSubscriber = subscriber).pipe(
            debounceTime<Array<number>>(20)
        );
    }
    
    private dragProgressSubject: Subject<{gutterNum: number, sizes: Array<number>}> = new Subject();
    dragProgress$: Observable<{gutterNum: number, sizes: Array<number>}> = this.dragProgressSubject.asObservable();

    ////

    private isDragging: boolean = false;
    //private currentGutterNum: number = 0;
    private startPoint: IPoint | null = null;
    private endPoint: IPoint | null = null;

    public readonly displayedAreas: Array<IArea> = [];
    private readonly hidedAreas: Array<IArea> = [];
    
    private readonly dragListeners: Array<Function> = [];
    private snapshot: ISplitSnapshot | null = null;

    @ViewChildren('gutterEls') private gutterEls: QueryList<ElementRef>;

    constructor(private ngZone: NgZone,
                private elRef: ElementRef,
                private cdRef: ChangeDetectorRef,
                private renderer: Renderer2) {
        // To force adding default class, could be override by user @Input() or not
        this.direction = this._direction;
    }

    public ngAfterViewInit() {
        this.ngZone.runOutsideAngular(() => {
            // To avoid transition at first rendering
            setTimeout(() => this.renderer.addClass(this.elRef.nativeElement, 'is-init'));
        });
    }
    
    private getNbGutters(): number {
        return (this.displayedAreas.length === 0) ? 0 : this.displayedAreas.length - 1;
    }

    public addArea(component: SplitAreaDirective): void {
        const newArea: IArea = {
            component, 
            order: 0, 
            size: 0,
        };

        if(component.visible === true) {
            this.displayedAreas.push(newArea);

            this.build(true, true);
        }
        else {
            this.hidedAreas.push(newArea);
        }
    }

    public removeArea(component: SplitAreaDirective): void {
        if(this.displayedAreas.some(a => a.component === component)) {
            const area = this.displayedAreas.find(a => a.component === component);
            this.displayedAreas.splice(this.displayedAreas.indexOf(area), 1);

            this.build(true, true);
        }
        else if(this.hidedAreas.some(a => a.component === component)) {
            const area = this.hidedAreas.find(a => a.component === component);
            this.hidedAreas.splice(this.hidedAreas.indexOf(area), 1);
        }
    }

    public updateArea(component: SplitAreaDirective, resetOrders: boolean, resetSizes: boolean): void {
        // Only refresh if area is displayed (No need to check inside 'hidedAreas')
        const area = this.displayedAreas.find(a => a.component === component);
        if(!area) {
            return;
        }

        this.build(resetOrders, resetSizes);
    }

    public showArea(component: SplitAreaDirective): void {
        const area = this.hidedAreas.find(a => a.component === component);
        if(!area) {
            return;
        }

        const areas = this.hidedAreas.splice(this.hidedAreas.indexOf(area), 1);
        this.displayedAreas.push(...areas);

        this.build(true, true);
    }

    public hideArea(comp: SplitAreaDirective): void {
        const area = this.displayedAreas.find(a => a.component === comp);
        if(!area) {
            return;
        }

        const areas = this.displayedAreas.splice(this.displayedAreas.indexOf(area), 1);
        areas.forEach(area => {
            area.order = 0;
            area.size = 0;
        })
        this.hidedAreas.push(...areas);

        this.build(true, true);
    }

    public getVisibleAreaSizes(): Array<number> {
        return this.displayedAreas.map(a => a.size * 100);
    }

    public setVisibleAreaSizes(sizes: Array<number>): boolean {
        if(sizes.length !== this.displayedAreas.length) {
            return false;
        }

        sizes = sizes.map(s => s / 100);

        const total = sizes.reduce((total: number, v: number) => total + v, 0);
        if(!isValidTotalSize(total)) {
            return false;
        }

        this.displayedAreas.forEach((area, i) => {
            // @ts-ignore
            area.component._size = sizes[i];
        })

        this.build(false, true);
        return true;
    }

    private build(resetOrders: boolean, resetSizes: boolean): void {
        this.stopDragging();

        // ¤ AREAS ORDER
        
        if(resetOrders === true) {

            // If user provided 'order' for each area, use it to sort them.
            if(this.displayedAreas.every(a => a.component.order !== null)) {
                this.displayedAreas.sort((a, b) => (<number> a.component.order) - (<number> b.component.order));
            }
    
            // Then set real order with multiples of 2, numbers between will be used by gutters.
            this.displayedAreas.forEach((area, i) => {
                area.order = i * 2;
                area.component.setStyleOrder(area.order);
            });

        }

        // ¤ AREAS SIZE PERCENT
        
        if(resetSizes === true) {

            const totalUserSize = <number> this.displayedAreas.reduce((total: number, s: IArea) => s.component.size ? total + s.component.size : total, 0);
            
            // If user provided 'size' for each area and total == 1, use it.
            if(this.displayedAreas.every(a => a.component.size !== null) && isValidTotalSize(totalUserSize) ) {

                this.displayedAreas.forEach(area => {
                    area.size = <number> area.component.size;
                });
            }
            // Else set equal sizes for all areas.
            else {
                const size = 1 / this.displayedAreas.length;
                
                this.displayedAreas.forEach(area => {
                    area.size = size;
                });
            }
        }
        
        // ¤ 
        // If some real area sizes are less than gutterSize, 
        // set them to zero and dispatch size to others.

        let percentToDispatch = 0;
        
        // Get container pixel size
        const containerSizePixel = getElementPixelSize(this.elRef, this.direction);

        this.displayedAreas.forEach(area => {
            if(area.size * containerSizePixel < this.gutterSize) {
                percentToDispatch += area.size;
                area.size = 0;
            }
        });
        
        if(percentToDispatch > 0 && this.displayedAreas.length > 0) {
            const nbAreasNotZero = this.displayedAreas.filter(a => a.size !== 0).length;

            if(nbAreasNotZero > 0) {
                const percentToAdd = percentToDispatch / nbAreasNotZero;
    
                this.displayedAreas.filter(a => a.size !== 0).forEach(area => {
                    area.size += percentToAdd;
                });
            }
            // All area sizes (container percentage) are less than guterSize,
            // It means containerSize < ngGutters * gutterSize
            else {
                this.displayedAreas[this.displayedAreas.length - 1].size = 1;
            }
        }

        this.refreshStyleSizes();
        this.cdRef.markForCheck();
    }

    private refreshStyleSizes(): void {
        switch(this.unit) {
            case 'percent':
                const sumGutterSize = this.getNbGutters() * this.gutterSize;

                this.displayedAreas.forEach(area => {
                    area.component.setStyleFlex(`0 0 calc( ${ area.size }% - ${ area.size * sumGutterSize }px )`);
                });
                break;

            case 'pixel':
                this.displayedAreas.forEach(area => {
                    if(area.size === null) {
                        area.component.setStyleFlex(`1 1 auto`);
                    }
                    else {
                        area.component.setStyleFlex(`0 0 ${ area.size }px`);
                    }
                });
                break;
        }
    }

    public clickGutter(event: MouseEvent, gutterNum: number): void {
        event.preventDefault();
        event.stopPropagation();

        if(this.startPoint && this.startPoint.x === event.clientX && this.startPoint.y === event.clientY) {
            this.currentGutterNum = gutterNum;

            this.notify('click');
        }
    }

    public startDragging(event: MouseEvent | TouchEvent, gutterOrder: number, gutterNum: number): void {
        event.preventDefault();
        event.stopPropagation();

        this.startPoint = getPointFromEvent(event);
        if(!this.startPoint || this.disabled) {
            return;
        }

        this.snapshot = {
            gutterNum,
            lastSteppedOffset: 0,
            containerSizePixel: getElementPixelSize(this.elRef, this.direction),
            areasBeforeGutter: [],
            areasAfterGutter: [],
        };

        this.displayedAreas.forEach(area => {
            const areaSnapshot: IAreaSnapshot = {
                area,
                sizePixelAtStart: getElementPixelSize(area.component.elRef, this.direction),
                sizePercentAtStart: area.size // If pixel mode, anyway, will not be used.
            };

            if(area.order < gutterOrder) {
                this.snapshot.areasBeforeGutter.unshift(areaSnapshot);
            }
            else if(area.order > gutterOrder) {
                this.snapshot.areasAfterGutter.push(areaSnapshot);
            }
        });
        
        if(this.snapshot.areasBeforeGutter.length === 0 || this.snapshot.areasAfterGutter.length === 0) {
            return;
        }

        this.ngZone.runOutsideAngular(() => {
            this.dragListeners.push( this.renderer.listen('document', 'mouseup', this.stopDragging.bind(this)) );
            this.dragListeners.push( this.renderer.listen('document', 'touchend', this.stopDragging.bind(this)) );
            this.dragListeners.push( this.renderer.listen('document', 'touchcancel', this.stopDragging.bind(this)) );
            
            this.dragListeners.push( this.renderer.listen('document', 'mousemove', (e: MouseEvent) => this.dragEvent(e, areaA, areaB)) );
            this.dragListeners.push( this.renderer.listen('document', 'touchmove', (e: TouchEvent) => this.dragEvent(e, areaA, areaB)) );
        });

        this.displayedAreas.forEach(area => {
            area.component.lockEvents();
        });

        this.isDragging = true;
        this.renderer.addClass(this.elRef.nativeElement, 'is-dragging');
        this.renderer.addClass(this.gutterEls.toArray()[this.snapshot.gutterNum - 1].nativeElement, 'is-dragged');
        
        this.notify('start');
    }

    private dragEvent(event: MouseEvent | TouchEvent, areaA: IArea, areaB: IArea): void {
        event.preventDefault();
        event.stopPropagation();

        if(!this.isDragging) {
            return;
        }

        this.endPoint = getPointFromEvent(event);
        if(!this.endPoint) {
            return;
        }
        
        // ¤ AREAS SIZE PIXEL

        let offset = (this.direction === 'horizontal') ? (this.startPoint.x - this.endPoint.x) : (this.startPoint.y - this.endPoint.y);
        if(this.dir === 'rtl') {
            offset = -offset;
        }
        const steppedOffset = getSteppedValue(offset, this.gutterStep);

        if(steppedOffset === this.snapshot.lastSteppedOffset) {
            return;
        }

        this.snapshot.lastSteppedOffset = steppedOffset;
        
        const pixelBeforeRemaining = this.snapshot.areasBeforeGutter.reduce((pixel, a) => areaAbsorb(this.unit, a, pixel).remain, steppedOffset);
        if(pixelBeforeRemaining !== 0) return;

        const pixelAfterRemaining = this.snapshot.areasAfterGutter.reduce((pixel, a) => areaAbsorb(this.unit, a, pixel).remain, -steppedOffset);
        if(pixelAfterRemaining !== 0) return;


        /*let newSizePixelA = this.dragStartValues.sizePixelA - offset;
        let newSizePixelB = this.dragStartValues.sizePixelB + offset;
        
        if(newSizePixelA < this.gutterSize && newSizePixelB < this.gutterSize) {
            // WTF.. get out of here!
            return;
        }
        else if(newSizePixelA < this.gutterSize) {
            newSizePixelB += newSizePixelA;
            newSizePixelA = 0;
        }
        else if(newSizePixelB < this.gutterSize) {
            newSizePixelA += newSizePixelB;
            newSizePixelB = 0;
        }

        // ¤ AREAS SIZE PERCENT

        if(newSizePixelA === 0) {
            areaB.size += areaA.size;
            areaA.size = 0;
        }
        else if(newSizePixelB === 0) {
            areaA.size += areaB.size;
            areaB.size = 0;
        }
        else {
            // NEW_PERCENT = START_PERCENT / START_PIXEL * NEW_PIXEL;
            if(this.dragStartValues.sizePercentA === 0) {
                areaB.size = this.dragStartValues.sizePercentB / this.dragStartValues.sizePixelB * newSizePixelB;
                areaA.size = this.dragStartValues.sizePercentB - areaB.size;
            }
            else if(this.dragStartValues.sizePercentB === 0) {
                areaA.size = this.dragStartValues.sizePercentA / this.dragStartValues.sizePixelA * newSizePixelA;
                areaB.size = this.dragStartValues.sizePercentA - areaA.size;
            }
            else {
                areaA.size = this.dragStartValues.sizePercentA / this.dragStartValues.sizePixelA * newSizePixelA;
                areaB.size = (this.dragStartValues.sizePercentA + this.dragStartValues.sizePercentB) - areaA.size;
            }
        }*/

        this.refreshStyleSizes();
        
        // If moved from starting point, notify progress
        if(this.startPoint.x !== this.endPoint.x || this.startPoint.y !== this.endPoint.y) {
            this.notify('progress');
        }
    }

    private stopDragging(event?: Event): void {
        if(event) {
            event.preventDefault();
            event.stopPropagation();
        }
        
        if(this.isDragging === false) {
            return;
        }
        
        this.displayedAreas.forEach(area => {
            area.component.unlockEvents();
        });
        
        while(this.dragListeners.length > 0) {
            const fct = this.dragListeners.pop();
            if(fct) {
                fct();
            }
        }
        
        // If moved from starting point, notify end
        if(event && this.endPoint && (this.startPoint.x !== this.endPoint.x || this.startPoint.y !== this.endPoint.y)) {
            this.notify('end');
        }
        
        this.isDragging = false;
        this.snapshot = null;
        this.renderer.removeClass(this.elRef.nativeElement, 'is-dragging');
        this.renderer.removeClass(this.gutterEls.toArray()[this.snapshot.gutterNum - 1].nativeElement, 'is-dragged');

        // Needed to let (click)="clickGutter(...)" event run and verify if mouse moved or not
        this.ngZone.runOutsideAngular(() => {
            setTimeout(() => {
                this.startPoint = null;
                this.endPoint = null;
            })
        });
    }

    public notify(type: 'start' | 'progress' | 'end' | 'click' | 'transitionEnd'): void {
        const sizes: Array<number> = this.displayedAreas.map(a => a.size * 100);

        if(type === 'start') {
            if(this.dragStartSubscriber) {
                this.ngZone.run(() => this.dragStartSubscriber.next({gutterNum: this.snapshot.gutterNum, sizes}));
            }
        }
        else if(type === 'end') {
            if(this.dragEndSubscriber) {
                this.ngZone.run(() => this.dragEndSubscriber.next({gutterNum: this.snapshot.gutterNum, sizes}));
            }
        }
        else if(type === 'click') {
            if(this.gutterClickSubscriber) {
                this.ngZone.run(() => this.gutterClickSubscriber.next({gutterNum: this.snapshot.gutterNum, sizes}));
            }
        }
        else if(type === 'transitionEnd') {
            if(this.transitionEndSubscriber) {
                this.ngZone.run(() => this.transitionEndSubscriber.next(sizes));
            }
        }
        else if(type === 'progress') {
            // Stay outside zone to allow users do what they want about change detection mechanism.
            this.dragProgressSubject.next({gutterNum: this.snapshot.gutterNum, sizes});
        }
    }

    public ngOnDestroy(): void {
        this.stopDragging();
    }
}
