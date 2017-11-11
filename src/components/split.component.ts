import { Component, ChangeDetectorRef, Input, Output, HostBinding, ChangeDetectionStrategy, 
    EventEmitter, Renderer2, OnDestroy, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';

import { IArea } from './../interface/IArea';
import { IPoint } from './../interface/IPoint';
import { SplitAreaDirective } from './splitArea.directive';

/**
 * angular-split
 * 
 * Areas size are set in percentage of the split container & gutters size in pixels.
 * We need to subtract gutters size (in pixels) from area size percentages.
 * So we set css flex-basis like this: "calc( {area.size}% - {area.pxToSubtract}px );"
 * 
 * When an area size is 0, pixel need to be recalculate.
 * 
 * Examples:  gutterSize * nbGutters / nbAreasMoreThanZero = 10*2/3 = 6.667px
 * 
 *                            10px                        10px
 * |--------------------------[]--------------------------[]--------------------------|
 *    calc(33.33% - 6.667px)      calc(33.33% - 6.667px)      calc(33.33% - 6.667px)
 * 
 * 
 *  10px                                                  10px
 * |[]----------------------------------------------------[]--------------------------|
 * 0                  calc(66.66% - 13.333px)                  calc(33%% - 6.667px)
 * 
 * 
 *  10px 10px
 * |[][]------------------------------------------------------------------------------|
 * 0 0                                calc(100% - 20px)
 * 
 */

@Component({
    selector: 'split',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [`
        :host {
            display: flex;
            flex-wrap: nowrap;
            justify-content: flex-start;
            align-items: stretch;
            overflow: hidden;
        }

        split-gutter {
            flex-grow: 0;
            flex-shrink: 0;
            background-color: #eeeeee;
            background-position: center center;
            background-repeat: no-repeat;
        }

        :host.vertical split-gutter {
            width: 100%;
        }
    `],
    template: `
        <ng-content></ng-content>
        <ng-template ngFor let-area [ngForOf]="displayedAreas" let-index="index" let-last="last">
            <split-gutter *ngIf="last === false" 
                          [order]="index*2+1"
                          [direction]="direction"
                          [size]="gutterSize"
                          [disabled]="disabled"
                          (mousedown)="startDragging($event, index*2+1)"
                          (touchstart)="startDragging($event, index*2+1)"></split-gutter>
        </ng-template>`,
})
export class SplitComponent implements OnDestroy {

    private _direction: 'horizontal' | 'vertical' = 'horizontal';

    @Input() set direction(v: 'horizontal' | 'vertical') {
        this._direction = (v === 'horizontal') ? v : 'vertical';
        
        [...this.displayedAreas, ...this.hidedAreas].forEach(area => {
            area.comp.setStyleVisibleAndDir(area.comp.visible, this._direction);
        });
        
        this.build();
    }
    
    get direction(): 'horizontal' | 'vertical' {
        return this._direction;
    }
    
    ////

    private _visibleTransition: boolean = false;

    @Input() set visibleTransition(v: boolean) {
        this._visibleTransition = Boolean(v);

        [...this.displayedAreas, ...this.hidedAreas].forEach(area => {
            area.comp.setStyleTransition(this._visibleTransition);
        });
    }
    
    get visibleTransition(): boolean {
        return this._visibleTransition;
    }
    
    ////

    private _width: number | null = null;

    @Input() set width(v: number | null) {
        this._width = (!isNaN(<number> v) && <number> v > 0) ? v : null;
        
        this.build();
    }
    
    get width(): number | null {
        return this._width;
    }
    
    ////

    private _height: number | null = null;

    @Input() set height(v: number | null) {
        this._height = (!isNaN(<number> v) && <number> v > 0) ? v : null;
        
        this.build();
    }
    
    get height(): number | null {
        return this._height;
    }
    
    ////

    private _gutterSize: number = 10;

    @Input() set gutterSize(v: number) {
        this._gutterSize = !isNaN(v) && v > 0 ? v : 10;

        this.build();
    }
    
    get gutterSize(): number {
        return this._gutterSize;
    }
    
    ////

    private _disabled: boolean = false;
    
    @Input() set disabled(v: boolean) {
        this._disabled = Boolean(v);
        
        this.build();
    }
    
    get disabled(): boolean {
        return this._disabled;
    }

    ////

    @Output() dragStart = new EventEmitter<Array<number>>(false);
    @Output() dragProgress = new EventEmitter<Array<number>>(false);
    @Output() dragEnd = new EventEmitter<Array<number>>(false);

    visibleTransitionEndInternal = new Subject<Array<number>>();
    @Output() visibleTransitionEnd = (<Observable<Array<number>>> this.visibleTransitionEndInternal.asObservable()).debounceTime(20);

    @HostBinding('style.flex-direction') get cssFlexdirection() {
        return (this.direction === 'horizontal') ? 'row' : 'column';
    }

    @HostBinding('style.width') get cssWidth() {
        return this.width ? `${ this.width }px` : '100%';
    }

    @HostBinding('style.height') get cssHeight() {
        return this.height ? `${ this.height }px` : '100%';
    }

    @HostBinding('style.min-width') get cssMinwidth() {
        return (this.direction === 'horizontal') ? `${ this.getNbGutters() * this.gutterSize }px` : null;
    }

    @HostBinding('style.min-height') get cssMinheight() {
        return (this.direction === 'vertical') ? `${ this.getNbGutters() * this.gutterSize }px` : null;
    }

    private _isDragging: boolean = false;

    set isDragging(v: boolean) {
        this._isDragging = v;

        // Disable transition during dragging to avoid 'lag effect' (whatever it is active or not).
        [...this.displayedAreas, ...this.hidedAreas].forEach(area => {
            area.comp.setStyleTransition(v ? false : this.visibleTransition);
        });
    }

    get isDragging(): boolean {
        return this._isDragging;
    }
    
    public readonly displayedAreas: Array<IArea> = [];
    public readonly hidedAreas: Array<IArea> = [];
    
    private readonly dragListeners: Array<Function> = [];
    private readonly dragStartValues = {
        sizePixelContainer: 0,
        sizePixelA: 0,
        sizePixelB: 0,
        sizePercentA: 0,
        sizePercentB: 0,
    };

    constructor(private elRef: ElementRef,
                private cdRef: ChangeDetectorRef,
                private renderer: Renderer2) {}

    private getNbGutters(): number {
        return this.displayedAreas.length - 1;
    }

    public addArea(comp: SplitAreaDirective) {
        const newArea = {
            comp, 
            order: -1, 
            size: -1, 
            pxToSubtract: 0
        };

        if(comp.visible === true) {
            this.displayedAreas.push(newArea);
        }
        else {
            this.hidedAreas.push(newArea);
        }

        comp.setStyleVisibleAndDir(comp.visible, this.direction);
        comp.setStyleTransition(this.visibleTransition);

        this.build();
    }

    public updateArea(comp: SplitAreaDirective) {
        // Only refresh if area is displayed (no need to check inside 'hidedAreas')
        const item = this.displayedAreas.find(a => a.comp === comp);

        if(item) {
            this.build();
        }
    }

    public removeArea(comp: SplitAreaDirective) {
        if(this.displayedAreas.some(a => a.comp === comp)) {
            const area = <IArea> this.displayedAreas.find(a => a.comp === comp)
            this.displayedAreas.splice(this.displayedAreas.indexOf(area), 1);

            this.build();
        }
        else if(this.hidedAreas.some(a => a.comp === comp)) {
            const area = <IArea> this.hidedAreas.find(a => a.comp === comp)
            this.hidedAreas.splice(this.hidedAreas.indexOf(area), 1);
        }
    }

    public hideArea(comp: SplitAreaDirective) {
        const area = <IArea> this.displayedAreas.find(a => a.comp === comp)

        if(area) {
            const areas = this.displayedAreas.splice(this.displayedAreas.indexOf(area), 1);
            this.hidedAreas.push(...areas);

            this.build();
        }
    }

    public showArea(comp: SplitAreaDirective) {
        const area = <IArea> this.hidedAreas.find(a => a.comp === comp);

        if(area) {
            const areas = this.hidedAreas.splice(this.hidedAreas.indexOf(area), 1);
            this.displayedAreas.push(...areas);

            this.build();
        }
    }

    private build() {
        this.stopDragging();

        // ¤ AREAS ORDER
        
        // Based on user input if all provided or added order by default.
        if(this.displayedAreas.every(a => a.comp.order !== null)) {
            this.displayedAreas.sort((a, b) => (<number> a.comp.order) - (<number> b.comp.order));
        }

        this.displayedAreas.forEach((area, i) => {
            area.order = i * 2;
            area.comp.setStyleOrder(area.order);
        });

        // ¤ AREAS SIZE PERCENT
        
        // Set css 'flex-basis' property depending on user input if all set & ~100% or equal sizes by default.
        const totalUserSize = <number> this.displayedAreas.reduce((total: number, s: IArea) => s.comp.size ? total + s.comp.size : total, 0);
        
        if(this.displayedAreas.some(a => a.comp.size === null) || totalUserSize < .999 || totalUserSize > 1.001 ) {
            const size = Number((1 / this.displayedAreas.length).toFixed(4));
            
            this.displayedAreas.forEach(area => {
                area.size = size;
            });
        } 
        else {
            // If some provided % are less than gutterSize > set them to zero and dispatch % to others.
            let percentToShare = 0;
            
            const prop = (this.direction === 'horizontal') ? 'offsetWidth' : 'offsetHeight';
            const containerSizePixel = this.elRef.nativeElement[prop];

            this.displayedAreas.forEach(area => {
                let newSize = Number(area.comp.size);

                if(newSize * containerSizePixel < this.gutterSize) {
                    percentToShare += newSize;
                    newSize = 0;
                }

                area.size = newSize;
            });
            
            if(percentToShare > 0) {
                const nbAreasNotZero = this.displayedAreas.filter(a => a.size !== 0).length;
                const percentToAdd = percentToShare / nbAreasNotZero;

                this.displayedAreas.filter(a => a.size !== 0).forEach(area => {
                    area.size += percentToAdd;
                });
            }    
        }
        
        // ¤ AREAS PX TO SUBTRACT

        const totalPxToSubtract = this.getNbGutters() * this.gutterSize;
        const areasSizeNotZero = this.displayedAreas.filter(a => a.size !== 0);

        areasSizeNotZero.forEach(area => {
            area.pxToSubtract = totalPxToSubtract / areasSizeNotZero.length;
        });

        this.refreshStyleSizes();
        this.cdRef.markForCheck();
    }

    private refreshStyleSizes() {
        this.displayedAreas.forEach(area => {
            area.comp.setStyleFlexbasis(`calc( ${ area.size * 100 }% - ${ area.pxToSubtract }px )`);
        });
    }

    public startDragging(startEvent: MouseEvent | TouchEvent, gutterOrder: number) {
        startEvent.preventDefault();

        if(this.disabled) {
            return;
        }

        const areaA = this.displayedAreas.find(a => a.order === gutterOrder - 1);
        const areaB = this.displayedAreas.find(a => a.order === gutterOrder + 1);
        
        if(!areaA || !areaB) {
            return;
        }

        const prop = (this.direction === 'horizontal') ? 'offsetWidth' : 'offsetHeight';
        this.dragStartValues.sizePixelContainer = this.elRef.nativeElement[prop];
        this.dragStartValues.sizePixelA = areaA.comp.getSizePixel(prop);
        this.dragStartValues.sizePixelB = areaB.comp.getSizePixel(prop);
        this.dragStartValues.sizePercentA = areaA.size;
        this.dragStartValues.sizePercentB = areaB.size;

        let start: IPoint;
        if(startEvent instanceof MouseEvent) {
            start = {
                x: startEvent.screenX,
                y: startEvent.screenY,
            };
        }
        else if(startEvent instanceof TouchEvent) {
            start = {
                x: startEvent.touches[0].screenX,
                y: startEvent.touches[0].screenY,
            };
        }
        else {
            return;
        }

        this.dragListeners.push( this.renderer.listen('document', 'mousemove', (e: MouseEvent) => this.dragEvent(e, start, areaA, areaB)) );
        this.dragListeners.push( this.renderer.listen('document', 'touchmove', (e: TouchEvent) => this.dragEvent(e, start, areaA, areaB)) );
        this.dragListeners.push( this.renderer.listen('document', 'mouseup', (e: MouseEvent) => this.stopDragging()) );
        this.dragListeners.push( this.renderer.listen('document', 'touchend', (e: TouchEvent) => this.stopDragging()) );
        this.dragListeners.push( this.renderer.listen('document', 'touchcancel', (e: TouchEvent) => this.stopDragging()) );

        areaA.comp.lockEvents();
        areaB.comp.lockEvents();

        this.isDragging = true;
        this.notify('start');
    }

    private dragEvent(event: MouseEvent | TouchEvent, start: IPoint, areaA: IArea, areaB: IArea) {
        if(!this.isDragging) {
            return;
        }

        let end: IPoint;
        if(event instanceof MouseEvent) {
            end = {
                x: event.screenX,
                y: event.screenY,
            };
        }
        else if(event instanceof TouchEvent) {
            end = {
                x: event.touches[0].screenX,
                y: event.touches[0].screenY,
            };
        }
        else {
            return;
        }

        this.drag(start, end, areaA, areaB);
    }

    private drag(start: IPoint, end: IPoint, areaA: IArea, areaB: IArea) {

        // ¤ AREAS SIZE PIXEL

        const offsetPixel = (this.direction === 'horizontal') ? (start.x - end.x) : (start.y - end.y);
        
        let newSizePixelA = this.dragStartValues.sizePixelA - offsetPixel;
        let newSizePixelB = this.dragStartValues.sizePixelB + offsetPixel;

const debSizePxA = newSizePixelA;
const debSizePxB = newSizePixelB;
        
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

const debSizeA = areaA.size;
const debSizeB = areaB.size;
        
        if(newSizePixelA === 0) {
            areaB.size += areaA.size;
            areaA.size = 0;
        }
        else if(newSizePixelB === 0) {
            areaA.size += areaB.size;
            areaB.size = 0;
        }
        else {
            // size = ( ( (total * percentStart - F) / pixelStart * pixelNew ) + F ) / total;
            if(this.dragStartValues.sizePercentA === 0) {
                areaB.size = ( ( (this.dragStartValues.sizePixelContainer * this.dragStartValues.sizePercentB - areaB.pxToSubtract) / this.dragStartValues.sizePixelB * newSizePixelB ) + areaB.pxToSubtract ) / this.dragStartValues.sizePixelContainer;
                areaA.size = this.dragStartValues.sizePercentB - areaB.size;
            }
            else if(this.dragStartValues.sizePercentB === 0) {
                areaA.size = ( ( (this.dragStartValues.sizePixelContainer * this.dragStartValues.sizePercentA - areaA.pxToSubtract) / this.dragStartValues.sizePixelA * newSizePixelA ) + areaA.pxToSubtract ) / this.dragStartValues.sizePixelContainer;
                areaB.size = this.dragStartValues.sizePercentA - areaA.size;
            }
            else {
                areaA.size = ( ( (this.dragStartValues.sizePixelContainer * this.dragStartValues.sizePercentA - areaA.pxToSubtract) / this.dragStartValues.sizePixelA * newSizePixelA ) + areaA.pxToSubtract ) / this.dragStartValues.sizePixelContainer;
                areaB.size = (this.dragStartValues.sizePercentA + this.dragStartValues.sizePercentB) - areaA.size;
                //areaB.size = ( ( (this.dragStartValues.sizePixelContainer * this.dragStartValues.sizePercentB - areaB.pxToSubtract) / this.dragStartValues.sizePixelB * newSizePixelB ) + areaB.pxToSubtract ) / this.dragStartValues.sizePixelContainer;
            }

        }


const debPxToSubtractA = areaA.pxToSubtract;
const debPxToSubtractB = areaB.pxToSubtract;

        if(areaA.size === 0) {
            areaB.pxToSubtract += areaA.pxToSubtract;
            areaA.pxToSubtract = 0;
        }
        else if(areaB.size === 0) {
            areaA.pxToSubtract += areaB.pxToSubtract;
            areaB.pxToSubtract = 0;
        }

/*const rd = (val: number) => Math.round(val*100)/100;
console.table([{
    //'start drag PX': rd(this.dragStartValues.sizePixelA) + ' / ' + rd(this.dragStartValues.sizePixelB),
    //'offset': offsetPixel,
    //'new temp PX': rd(debSizePxA) + ' / ' + rd(debSizePxB),
    'new final PX': rd(newSizePixelA) + ' / ' + rd(newSizePixelB),
    'curr %-px': `${ rd(debSizeA)*100 }% - ${ rd(debPxToSubtractA) } / ${ rd(debSizeB)*100 }% - ${ rd(debPxToSubtractB) }`, 
    'new %-px': `${ rd(areaA.size)*100 }% - ${ rd(areaA.pxToSubtract) } / ${ rd(areaB.size)*100 }% - ${ rd(areaB.pxToSubtract) }`, 
}]);*/

        this.refreshStyleSizes();
        this.notify('progress');
    }

    private stopDragging() {
        if(!this.isDragging) {
            return;
        }

        this.displayedAreas.forEach(area => {
            area.comp.unlockEvents();
        });
console.log('>', this.displayedAreas.map(a => a.size).join('/'), '  ', this.displayedAreas.map(a => a.size).reduce((tot, s) => tot+s, 0));

        while(this.dragListeners.length > 0) {
            const fct = this.dragListeners.pop();
            if(fct) {
                fct();
            }
        }

        this.isDragging = false;
        this.notify('end');
    }

    public notify(type: string) {
        const areasSize: Array<number> = this.displayedAreas.map(a => a.size * 100);

        switch(type) {
            case 'start':
                return this.dragStart.emit(areasSize);

            case 'progress':
                return this.dragProgress.emit(areasSize);

            case 'end':
                return this.dragEnd.emit(areasSize);

            case 'visibleTransitionEnd':
                return this.visibleTransitionEndInternal.next(areasSize);
        }
    }

    public ngOnDestroy() {
        this.stopDragging();
    }
}
