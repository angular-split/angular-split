import { Component, ChangeDetectorRef, Input, Output, HostBinding, ChangeDetectionStrategy, EventEmitter, Renderer2, OnDestroy, ElementRef, NgZone } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { IArea } from '../interface/IArea';
import { IPoint } from '../interface/IPoint';
import { SplitAreaDirective } from '../directive/splitArea.directive';

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
                 (click)="clickGutter($event, index*2+1, index+1)"
                 (mousedown)="startDragging($event, index*2+1, index+1)"
                 (touchstart)="startDragging($event, index*2+1, index+1)"></div>
        </ng-template>`,
})
export class SplitComponent implements OnDestroy {

    private _direction: 'horizontal' | 'vertical' = 'horizontal';

    @Input() set direction(v: 'horizontal' | 'vertical') {
        v = (v === 'vertical') ? 'vertical' : 'horizontal';
        this._direction = v;
        
        this.renderer.addClass(this.elRef.nativeElement, this._direction);
        
        this.build(false, false);
    }
    
    get direction(): 'horizontal' | 'vertical' {
        return this._direction;
    }
    
    ////

    private _useTransition: boolean = false;

    @Input() set useTransition(v: boolean) {
        v = (typeof(v) === 'boolean') ? v : (v === 'false' ? false : true);
        this._useTransition = v;

        if(v)   this.renderer.addClass(this.elRef.nativeElement, 'transition');
        else    this.renderer.removeClass(this.elRef.nativeElement, 'transition');
    }
    
    get useTransition(): boolean {
        return this._useTransition;
    }
    
    ////

    private _disabled: boolean = false;
    
    @Input() set disabled(v: boolean) {
        v = (typeof(v) === 'boolean') ? v : (v === 'false' ? false : true);
        this._disabled = v;

        if(v)   this.renderer.addClass(this.elRef.nativeElement, 'disabled');
        else    this.renderer.removeClass(this.elRef.nativeElement, 'disabled');
    }
    
    get disabled(): boolean {
        return this._disabled;
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

    @Output() dragStart = new EventEmitter<{gutterNum: number, sizes: Array<number>}>(false);
    @Output() dragProgress = new EventEmitter<{gutterNum: number, sizes: Array<number>}>(false);
    @Output() dragEnd = new EventEmitter<{gutterNum: number, sizes: Array<number>}>(false);
    @Output() gutterClick = new EventEmitter<{gutterNum: number, sizes: Array<number>}>(false);

    private transitionEndInternal = new Subject<Array<number>>();
    @Output() transitionEnd = (<Observable<Array<number>>> this.transitionEndInternal.asObservable()).pipe(
        debounceTime(20)
    );

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
                private renderer: Renderer2) {}

    private getNbGutters(): number {
        return this.displayedAreas.length - 1;
    }

    public addArea(comp: SplitAreaDirective): void {
        const newArea: IArea = {
            comp, 
            order: 0, 
            size: 0,
        };

        if(comp.visible === true) {
            this.displayedAreas.push(newArea);
        }
        else {
            this.hidedAreas.push(newArea);
            comp.setStyleFlexbasis('0');
        }

        this.build(true, true);
    }

    public removeArea(comp: SplitAreaDirective): void {
        if(this.displayedAreas.some(a => a.comp === comp)) {
            const area = <IArea> this.displayedAreas.find(a => a.comp === comp)
            this.displayedAreas.splice(this.displayedAreas.indexOf(area), 1);

            this.build(true, true);
        }
        else if(this.hidedAreas.some(a => a.comp === comp)) {
            const area = <IArea> this.hidedAreas.find(a => a.comp === comp)
            this.hidedAreas.splice(this.hidedAreas.indexOf(area), 1);
        }
    }

    public updateArea(comp: SplitAreaDirective, resetOrders: boolean, resetSizes: boolean): void {
        // Only refresh if area is displayed (No need to check inside 'hidedAreas')
        const item = this.displayedAreas.find(a => a.comp === comp);
        if(!item) {
            return;
        }

        this.build(resetOrders, resetSizes);
    }

    public showArea(comp: SplitAreaDirective): void {
        const area = this.hidedAreas.find(a => a.comp === comp);
        if(!area) {
            return;
        }

        const areas = this.hidedAreas.splice(this.hidedAreas.indexOf(area), 1);
        this.displayedAreas.push(...areas);

        this.build(true, true);
    }

    public hideArea(comp: SplitAreaDirective): void {
        const area = this.displayedAreas.find(a => a.comp === comp);
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

    private build(resetOrders: boolean, resetSizes: boolean): void {
        this.stopDragging();

        // ¤ AREAS ORDER
        
        if(resetOrders === true) {

            // If user provided 'order' for each area, use it to sort them.
            if(this.displayedAreas.every(a => a.comp.order !== null)) {
                this.displayedAreas.sort((a, b) => (<number> a.comp.order) - (<number> b.comp.order));
            }
    
            // Then set real order with multiples of 2, numbers between will be used by gutters.
            this.displayedAreas.forEach((area, i) => {
                area.order = i * 2;
                area.comp.setStyleOrder(area.order);
            });

        }

        // ¤ AREAS SIZE PERCENT
        
        if(resetSizes === true) {

            const totalUserSize = <number> this.displayedAreas.reduce((total: number, s: IArea) => s.comp.size ? total + s.comp.size : total, 0);
            
            // If user provided 'size' for each area and total == 1, use it.
            if(this.displayedAreas.every(a => a.comp.size !== null) && totalUserSize > .999 && totalUserSize < 1.001 ) {

                this.displayedAreas.forEach(area => {
                    area.size = <number> area.comp.size;
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
        const containerSizePixel = this.elRef.nativeElement[(this.direction === 'horizontal') ? 'offsetWidth' : 'offsetHeight'];

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
        const sumGutterSize = this.getNbGutters() * this.gutterSize;

        this.displayedAreas.forEach(area => {
            area.comp.setStyleFlexbasis(`calc( ${ area.size * 100 }% - ${ area.size * sumGutterSize }px )`);
        });
    }

    public clickGutter(event: MouseEvent, gutterOrder: number, gutterNum: number): void {
        if(this.startPoint && this.startPoint.x === event.pageX && this.startPoint.y === event.pageY) {
            this.currentGutterNum = gutterNum;

            this.notify('click');
        }
    }

    public startDragging(startEvent: MouseEvent | TouchEvent, gutterOrder: number, gutterNum: number): void {
        console.log('startDragging', startEvent)
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

        this.ngZone.runOutsideAngular(() => {
            this.dragListeners.push( this.renderer.listen('document', 'mouseup', (e: MouseEvent) => this.stopDragging()) );
            this.dragListeners.push( this.renderer.listen('document', 'touchend', (e: TouchEvent) => this.stopDragging()) );
            this.dragListeners.push( this.renderer.listen('document', 'touchcancel', (e: TouchEvent) => this.stopDragging()) );
        });

        const prop = (this.direction === 'horizontal') ? 'offsetWidth' : 'offsetHeight';
        this.dragStartValues.sizePixelContainer = this.elRef.nativeElement[prop];
        this.dragStartValues.sizePixelA = areaA.comp.getSizePixel(prop);
        this.dragStartValues.sizePixelB = areaB.comp.getSizePixel(prop);
        this.dragStartValues.sizePercentA = areaA.size;
        this.dragStartValues.sizePercentB = areaB.size;

        this.currentGutterNum = gutterNum;

        this.ngZone.runOutsideAngular(() => {
            this.dragListeners.push( this.renderer.listen('document', 'mousemove', (e: MouseEvent) => this.dragEvent(e, areaA, areaB)) );
            this.dragListeners.push( this.renderer.listen('document', 'touchmove', (e: TouchEvent) => this.dragEvent(e, areaA, areaB)) );
        });

        areaA.comp.lockEvents();
        areaB.comp.lockEvents();

        this.isDragging = true;
        this.renderer.addClass(this.elRef.nativeElement, 'dragging');
        this.notify('start');
    }

    private dragEvent(event: MouseEvent | TouchEvent, areaA: IArea, areaB: IArea): void {
        console.time('dragEvent')
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
        console.timeEnd('dragEvent')
    }

    private stopDragging(): void {
        if(this.isDragging === false) {
            return;
        }

        this.displayedAreas.forEach(area => {
            area.comp.unlockEvents();
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
        this.renderer.removeClass(this.elRef.nativeElement, 'dragging');

        // Needed to let (click)="clickGutter(...)" event run and verify if mouse moved or not
        setTimeout(() => {
            this.startPoint = null;
            this.endPoint = null;
        })
    }


    public notify(type: 'start' | 'progress' | 'end' | 'click' | 'transitionEnd'): void {
        const sizes: Array<number> = this.displayedAreas.map(a => a.size * 100);

        this.ngZone.run(() => {
            switch(type) {
                case 'start':           return this.dragStart.emit({gutterNum: this.currentGutterNum, sizes});
                case 'progress':        return this.dragProgress.emit({gutterNum: this.currentGutterNum, sizes});
                case 'end':             return this.dragEnd.emit({gutterNum: this.currentGutterNum, sizes});
                case 'click':           return this.gutterClick.emit({gutterNum: this.currentGutterNum, sizes});
                case 'transitionEnd':   return this.transitionEndInternal.next(sizes);
            }
        });
    }

    public ngOnDestroy(): void {
        this.stopDragging();
    }
}


function getPointFromEvent(event: MouseEvent | TouchEvent): IPoint {
    // TouchEvent
    if((<TouchEvent> event).touches !== undefined && (<TouchEvent> event).touches.length > 0) {
        return {
            x: (<TouchEvent> event).touches[0].pageX,
            y: (<TouchEvent> event).touches[0].pageY,
        };
    }
    // MouseEvent
    else if((<MouseEvent> event).pageX !== undefined && (<MouseEvent> event).pageY !== undefined) {
        return {
            x: (<MouseEvent> event).pageX,
            y: (<MouseEvent> event).pageY,
        };
    }
    return null;
}