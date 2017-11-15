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
    `],
    template: `
        <ng-content></ng-content>
        <ng-template ngFor let-area [ngForOf]="displayedAreas" let-index="index" let-last="last">
            <split-gutter *ngIf="last === false" 
                          [order]="index*2+1"
                          [direction]="direction"
                          [size]="gutterSize"
                          [disabled]="disabled"
                          (mousedown)="startDragging($event, index*2+1, index+1)"
                          (touchstart)="startDragging($event, index*2+1, index+1)"></split-gutter>
        </ng-template>`,
})
export class SplitComponent implements OnDestroy {

    private _direction: 'horizontal' | 'vertical' = 'horizontal';

    @Input() set direction(v: 'horizontal' | 'vertical') {
        v = (v === 'vertical') ? 'vertical' : 'horizontal';
        this._direction = v;
        
        [...this.displayedAreas, ...this.hidedAreas].forEach(area => {
            area.comp.setStyleVisibleAndDir(area.comp.visible, this.isDragging, this.direction);
        });
        
        this.build();
    }
    
    get direction(): 'horizontal' | 'vertical' {
        return this._direction;
    }
    
    ////

    private _useTransition: boolean = false;

    @Input() set useTransition(v: boolean) {
        v = (typeof(v) === 'boolean') ? v : (v === 'false' ? false : true);
        this._useTransition = v;
    }
    
    get useTransition(): boolean {
        return this._useTransition;
    }
    
    ////

    private _disabled: boolean = false;
    
    @Input() set disabled(v: boolean) {
        v = (typeof(v) === 'boolean') ? v : (v === 'false' ? false : true);
        this._disabled = v;
        
        this.build();
    }
    
    get disabled(): boolean {
        return this._disabled;
    }
    
    ////

    private _width: number | null = null;

    @Input() set width(v: number | null) {
        v = Number(v);
        this._width = (!isNaN(v) && v > 0) ? v : null;
        
        this.build();
    }
    
    get width(): number | null {
        return this._width;
    }
    
    ////

    private _height: number | null = null;

    @Input() set height(v: number | null) {
        v = Number(v);
        this._height = (!isNaN(v) && v > 0) ? v : null;
        
        this.build();
    }
    
    get height(): number | null {
        return this._height;
    }
    
    ////

    private _gutterSize: number = 10;

    @Input() set gutterSize(v: number) {
        v = Number(v);
        this._gutterSize = !isNaN(v) && v > 0 ? v : 10;

        this.build();
    }
    
    get gutterSize(): number {
        return this._gutterSize;
    }

    ////

    @Output() dragStart = new EventEmitter<{gutterNum: number, sizes: Array<number>}>(false);
    @Output() dragProgress = new EventEmitter<{gutterNum: number, sizes: Array<number>}>(false);
    @Output() dragEnd = new EventEmitter<{gutterNum: number, sizes: Array<number>}>(false);
    @Output() gutterClick = new EventEmitter<{gutterNum: number, sizes: Array<number>}>(false);

    private transitionEndInternal = new Subject<Array<number>>();
    @Output() transitionEnd = (<Observable<Array<number>>> this.transitionEndInternal.asObservable()).debounceTime(20);

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

    private isDragging: boolean = false;
    private draggingWithoutMove: boolean = false;
    private currentGutterNum: number = 0;

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

    constructor(private elRef: ElementRef,
                private cdRef: ChangeDetectorRef,
                private renderer: Renderer2) {}

    private getNbGutters(): number {
        return this.displayedAreas.length - 1;
    }

    public addArea(comp: SplitAreaDirective) {
        const newArea: IArea = {
            comp, 
            order: -1, 
            size: -1,
        };

        if(comp.visible === true) {
            this.displayedAreas.push(newArea);
        }
        else {
            this.hidedAreas.push(newArea);
        }

        comp.setStyleVisibleAndDir(comp.visible, this.isDragging, this.direction);

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
            comp.setStyleVisibleAndDir(comp.visible, this.isDragging, this.direction);

            const areas = this.displayedAreas.splice(this.displayedAreas.indexOf(area), 1);
            this.hidedAreas.push(...areas);

            this.build();
        }
    }

    public showArea(comp: SplitAreaDirective) {
        const area = <IArea> this.hidedAreas.find(a => a.comp === comp);

        if(area) {
            comp.setStyleVisibleAndDir(comp.visible, this.isDragging, this.direction);

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
            const size = 1 / this.displayedAreas.length;
            
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

        this.refreshStyleSizes();
        this.cdRef.markForCheck();
    }

    private refreshStyleSizes() {
        const allGutterWidth = this.getNbGutters() * this.gutterSize;

        this.displayedAreas.forEach(area => {
            area.comp.setStyleFlexbasis(`calc( ${ area.size * 100 }% - ${ area.size * allGutterWidth }px )`, this.isDragging);
        });
    }

    public startDragging(startEvent: MouseEvent | TouchEvent, gutterOrder: number, gutterNum: number) {
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
        this.draggingWithoutMove = true;
        this.currentGutterNum = gutterNum;

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
        
        this.draggingWithoutMove = false;
        this.drag(start, end, areaA, areaB);
    }

    private drag(start: IPoint, end: IPoint, areaA: IArea, areaB: IArea) {

        // ¤ AREAS SIZE PIXEL

        const offsetPixel = (this.direction === 'horizontal') ? (start.x - end.x) : (start.y - end.y);
        
        let newSizePixelA = this.dragStartValues.sizePixelA - offsetPixel;
        let newSizePixelB = this.dragStartValues.sizePixelB + offsetPixel;

// const debSizePxA = newSizePixelA;
// const debSizePxB = newSizePixelB;
        
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

// const debSizeA = areaA.size;
// const debSizeB = areaB.size;
        
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

// const rd = (val: number) => Math.round(val*100)/100;
// console.table([{
//     'start drag PX': rd(this.dragStartValues.sizePixelA) + ' / ' + rd(this.dragStartValues.sizePixelB),
//     'offset': offsetPixel,
//     'new temp PX': rd(debSizePxA) + ' / ' + rd(debSizePxB),
//     'new final PX': rd(newSizePixelA) + ' / ' + rd(newSizePixelB),
//     'curr %-px': `${ rd(debSizeA)*100 }% / ${ rd(debSizeB)*100 }%`, 
//     'new %-px': `${ rd(areaA.size)*100 }% / ${ rd(areaB.size)*100 }%`, 
// }]);

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
// console.log('>', this.displayedAreas.map(a => a.size).join('/'), '  ', this.displayedAreas.map(a => a.size).reduce((tot, s) => tot+s, 0));

        while(this.dragListeners.length > 0) {
            const fct = this.dragListeners.pop();
            if(fct) {
                fct();
            }
        }

        this.isDragging = false;
        
        if(this.draggingWithoutMove === true) {
            this.notify('click');
        }
        else {
            this.notify('end');
        }
    }


    public notify(type: 'start' | 'progress' | 'end' | 'click' | 'transitionEnd') {
        const areasSize: Array<number> = this.displayedAreas.map(a => a.size * 100);

        switch(type) {
            case 'start':
                return this.dragStart.emit({gutterNum: this.currentGutterNum, sizes: areasSize});

            case 'progress':
                return this.dragProgress.emit({gutterNum: this.currentGutterNum, sizes: areasSize});

            case 'end':
                return this.dragEnd.emit({gutterNum: this.currentGutterNum, sizes: areasSize});
                
            case 'click':
                return this.gutterClick.emit({gutterNum: this.currentGutterNum, sizes: areasSize});

            case 'transitionEnd':
                return this.transitionEndInternal.next(areasSize);
        }
    }

    public ngOnDestroy() {
        this.stopDragging();
    }
}
