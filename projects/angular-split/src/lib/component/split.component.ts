import { Component, Input, Output, HostBinding, ChangeDetectionStrategy, ChangeDetectorRef, Renderer2, AfterViewInit, OnDestroy, ElementRef, NgZone } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { IArea } from '../interface/IArea';
import { IPoint } from '../interface/IPoint';
import { SplitAreaDirective } from '../directive/splitArea.directive';
import { getPointFromEvent, getPixelSize } from '../utils';

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
        <ng-template ngFor let-area [ngForOf]="displayedAreas" let-index="index" let-last="last">
            <div *ngIf="last === false" 
                 class="as-split-gutter"
                 [style.flex-basis.px]="gutterSize"
                 [style.order]="index*2+1"
                 (click)="clickGutter($event, index+1)"
                 (mousedown)="startDragging($event, index*2+1, index+1)"
                 (touchstart)="startDragging($event, index*2+1, index+1)">
                <div class="as-split-gutter-icon"></div>
            </div>
        </ng-template>`,
})
export class SplitComponent implements AfterViewInit, OnDestroy {

    private _direction: 'horizontal' | 'vertical' = 'horizontal';

    @Input() set direction(v: 'horizontal' | 'vertical') {
        v = (v === 'vertical') ? 'vertical' : 'horizontal';
        this._direction = v;
        
        this.renderer.addClass(this.elRef.nativeElement, `is-${ this._direction }`);
        this.renderer.removeClass(this.elRef.nativeElement, `is-${ (this._direction === 'vertical') ? 'horizontal' : 'vertical' }`);
        
        this.build(false, false);
    }
    
    get direction(): 'horizontal' | 'vertical' {
        return this._direction;
    }
    
    ////

    private _gutterSize: number = 11;

    @Input() set gutterSize(v: number) {
        v = Number(v);
        this._gutterSize = (!isNaN(v) && v > 0) ? v : 11;

        this.build(false, false);
    }
    
    get gutterSize(): number {
        return this._gutterSize;
    }
    
    ////

    private _useTransition: boolean = false;

    @Input() set useTransition(v: boolean) {
        v = (typeof(v) === 'boolean') ? v : (v === 'false' ? false : true);
        this._useTransition = v;

        if(v)   this.renderer.addClass(this.elRef.nativeElement, 'is-transition');
        else    this.renderer.removeClass(this.elRef.nativeElement, 'is-transition');
    }
    
    get useTransition(): boolean {
        return this._useTransition;
    }
    
    ////

    private _disabled: boolean = false;
    
    @Input() set disabled(v: boolean) {
        v = (typeof(v) === 'boolean') ? v : (v === 'false' ? false : true);
        this._disabled = v;

        if(v)   this.renderer.addClass(this.elRef.nativeElement, 'is-disabled');
        else    this.renderer.removeClass(this.elRef.nativeElement, 'is-disabled');
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

    private _dragStartSubscriber: Subscriber<{gutterNum: number, sizes: Array<number>}>
    @Output() get dragStart(): Observable<{gutterNum: number, sizes: Array<number>}> {
        return new Observable(subscriber => this._dragStartSubscriber = subscriber);
    }
    private _dragProgressSubscriber: Subscriber<{gutterNum: number, sizes: Array<number>}>
    @Output() get dragProgress(): Observable<{gutterNum: number, sizes: Array<number>}> {
        return new Observable(subscriber => this._dragProgressSubscriber = subscriber);
    }
    private _dragEndSubscriber: Subscriber<{gutterNum: number, sizes: Array<number>}>
    @Output() get dragEnd(): Observable<{gutterNum: number, sizes: Array<number>}> {
        return new Observable(subscriber => this._dragEndSubscriber = subscriber);
    }
    private _gutterClickSubscriber: Subscriber<{gutterNum: number, sizes: Array<number>}>
    @Output() get gutterClick(): Observable<{gutterNum: number, sizes: Array<number>}> {
        return new Observable(subscriber => this._gutterClickSubscriber = subscriber);
    }

    private _transitionEndSubscriber: Subscriber<Array<number>>
    @Output() get transitionEnd(): Observable<Array<number>> {
        return new Observable(subscriber => this._transitionEndSubscriber = subscriber).pipe(
            debounceTime<Array<number>>(20)
        );
    }

    @HostBinding('style.min-width') get cssMinwidth() {
        return (this.direction === 'horizontal') ? `${ this.getNbGutters() * this.gutterSize }px` : null;
    }

    @HostBinding('style.min-height') get cssMinheight() {
        return (this.direction === 'vertical') ? `${ this.getNbGutters() * this.gutterSize }px` : null;
    }

    private isDragging: boolean = false;
    private currentGutterNum: number = 0;
    private startPoint: IPoint | null = null;
    private endPoint: IPoint | null = null;

    public readonly displayedAreas: Array<IArea> = [];
    private readonly hidedAreas: Array<IArea> = [];
    
    private readonly dragListeners: Array<Function> = [];
    private readonly dragStartValues = {
        sizePixelContainer: 0,
        sizePixelA: 0,
        sizePixelB: 0,
        sizePercentA: 0,
        sizePercentB: 0,
    };

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
            this.cdRef.markForCheck();
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
            this.cdRef.markForCheck();
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
        this.cdRef.markForCheck();
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
        this.cdRef.markForCheck();
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
            if(this.displayedAreas.every(a => a.component.size !== null) && totalUserSize > .999 && totalUserSize < 1.001 ) {

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
        const containerSizePixel = getPixelSize(this.elRef, this.direction);

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
    }

    private refreshStyleSizes(): void {
        const sumGutterSize = this.getNbGutters() * this.gutterSize;

        this.displayedAreas.forEach(area => {
            area.component.setStyleFlexbasis(`calc( ${ area.size * 100 }% - ${ area.size * sumGutterSize }px )`);
        });
    }

    public clickGutter(event: MouseEvent, gutterNum: number): void {
        if(this.startPoint && this.startPoint.x === event.pageX && this.startPoint.y === event.pageY) {
            this.currentGutterNum = gutterNum;

            this.notify('click');
        }
    }

    public startDragging(startEvent: MouseEvent | TouchEvent, gutterOrder: number, gutterNum: number): void {
        startEvent.preventDefault();

        this.startPoint = getPointFromEvent(startEvent);
        if(!this.startPoint || this.disabled) {
            return;
        }

        const areaA = this.displayedAreas.find(a => a.order === gutterOrder - 1);
        const areaB = this.displayedAreas.find(a => a.order === gutterOrder + 1);
        
        if(!areaA || !areaB) {
            return;
        }

        this.dragStartValues.sizePixelContainer = getPixelSize(this.elRef, this.direction);
        this.dragStartValues.sizePixelA = getPixelSize(areaA.component.elRef, this.direction);
        this.dragStartValues.sizePixelB = getPixelSize(areaB.component.elRef, this.direction);
        this.dragStartValues.sizePercentA = areaA.size;
        this.dragStartValues.sizePercentB = areaB.size;
        this.currentGutterNum = gutterNum;

        this.ngZone.runOutsideAngular(() => {
            this.dragListeners.push( this.renderer.listen('document', 'mouseup', this.stopDragging.bind(this)) );
            this.dragListeners.push( this.renderer.listen('document', 'touchend', this.stopDragging.bind(this)) );
            this.dragListeners.push( this.renderer.listen('document', 'touchcancel', this.stopDragging.bind(this)) );
            
            this.dragListeners.push( this.renderer.listen('document', 'mousemove', (e: MouseEvent) => this.dragEvent(e, areaA, areaB)) );
            this.dragListeners.push( this.renderer.listen('document', 'touchmove', (e: TouchEvent) => this.dragEvent(e, areaA, areaB)) );
        });

        areaA.component.lockEvents();
        areaB.component.lockEvents();

        this.isDragging = true;
        this.renderer.addClass(this.elRef.nativeElement, 'is-dragging');
        this.notify('start');
    }

    private dragEvent(event: MouseEvent | TouchEvent, areaA: IArea, areaB: IArea): void {
        event.preventDefault();

        if(!this.isDragging) {
            return;
        }

        this.endPoint = getPointFromEvent(event);
        if(!this.endPoint) {
            return;
        }
        
        // ¤ AREAS SIZE PIXEL

        const devicePixelRatio = /*window.devicePixelRatio ||*/ 1;
        let offsetPixel = (this.direction === 'horizontal') ? (this.startPoint.x - this.endPoint.x) : (this.startPoint.y - this.endPoint.y);
        offsetPixel = offsetPixel / devicePixelRatio;
        
        if(this.dir === 'rtl') {
            offsetPixel = -offsetPixel;
        }

        let newSizePixelA = this.dragStartValues.sizePixelA - offsetPixel;
        let newSizePixelB = this.dragStartValues.sizePixelB + offsetPixel;
        
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
        }

        this.refreshStyleSizes();
        
        if(this.startPoint.x !== this.endPoint.x || this.startPoint.y !== this.endPoint.y) {
            this.notify('progress');
        }
    }

    private stopDragging(event?: Event): void {
        if(event) {
            event.preventDefault();
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
        
        if(this.endPoint && (this.startPoint.x !== this.endPoint.x || this.startPoint.y !== this.endPoint.y)) {
            this.notify('end');
        }
        
        this.isDragging = false;
        this.renderer.removeClass(this.elRef.nativeElement, 'is-dragging');

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
            if(this._dragStartSubscriber) {
                this.ngZone.run(() => this._dragStartSubscriber.next({gutterNum: this.currentGutterNum, sizes}));
            }
        }
        else if(type === 'progress') {
            if(this._dragProgressSubscriber) {
                this.ngZone.run(() => this._dragProgressSubscriber.next({gutterNum: this.currentGutterNum, sizes}));
            }
        }
        else if(type === 'end') {
            if(this._dragEndSubscriber) {
                this.ngZone.run(() => this._dragEndSubscriber.next({gutterNum: this.currentGutterNum, sizes}));
            }
        }
        else if(type === 'click') {
            if(this._gutterClickSubscriber) {
                this.ngZone.run(() => this._gutterClickSubscriber.next({gutterNum: this.currentGutterNum, sizes}));
            }
        }
        else if(type === 'transitionEnd') {
            if(this._transitionEndSubscriber) {
                this.ngZone.run(() => this._transitionEndSubscriber.next(sizes));
            }
        }
    }

    public ngOnDestroy(): void {
        this.stopDragging();
    }
}
