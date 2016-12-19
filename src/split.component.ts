import { Component, ChangeDetectorRef, Input, Output, HostBinding, ElementRef, SimpleChanges,
    ChangeDetectionStrategy, EventEmitter, Renderer, OnDestroy, OnChanges } from '@angular/core';

import { SplitAreaDirective } from './splitArea.directive';


interface IAreaData {
    component: SplitAreaDirective;
    sizeUser: number | null;
    size: number;
    orderUser: number | null;
    order: number;
    minPixel: number;
}

interface Point {
    x: number;
    y: number;
}


@Component({
    selector: 'split',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [`
        :host {
            display: flex;
            flex-wrap: nowrap;
            justify-content: flex-start;
        }

        split-gutter {
            flex-grow: 0;
            flex-shrink: 0;
            flex-basis: 10px;
            height: 100%;
            background-color: #eeeeee;
            background-position: 50%;
            background-repeat: no-repeat;
        }
    `],
    template: `
        <ng-content></ng-content>
        <template ngFor let-area [ngForOf]="areas" let-index="index" let-last="last">
            <split-gutter *ngIf="last === false" 
                          [order]="index*2+1"
                          [direction]="direction"
                          [size]="_gutterSize"
                          [disabled]="_disabled"
                          (mousedown)="startDragging($event, index*2+1)"
                          (touchstart)="startDragging($event, index*2+1)"></split-gutter>
        </template>`,
})
export class SplitComponent implements OnChanges, OnDestroy {
    @Input() direction: string = 'horizontal';
    @Input() width: number;
    @Input() height: number;
    @Input() gutterSize: number = 10;
    @Input() disabled: boolean = false;

    @Output() dragStart = new EventEmitter<Array<number>>(false);
    @Output() dragProgress = new EventEmitter<Array<number>>(false);
    @Output() dragEnd = new EventEmitter<Array<number>>(false);

    @HostBinding('style.flex-direction') get styleFlexDirection() {
        return this.direction === 'horizontal' ? 'row' : 'column';
    }

    @HostBinding('style.width') get styleWidth() {
        return (this.width && !isNaN(this.width) && this.width > 0) ? this.width + 'px' : '100%';
    }

    @HostBinding('style.height') get styleHeight() {
        return (this.height && !isNaN(this.height) && this.height > 0) ? this.height + 'px' : '100%';
    }

    private get nbGutters(): number {
        return this.areas.length - 1;
    }

    private minPercent: number = 5;
    private areas: Array<IAreaData> = [];
    private isDragging: boolean = false;
    private containerSize: number = 0;
    private areaASize: number = 0;
    private areaBSize: number = 0;
    private eventsDragFct: Array<Function> = [];

    constructor(private cdRef: ChangeDetectorRef,
                private elementRef: ElementRef,
                private renderer: Renderer) {}

    public ngOnChanges(changes: SimpleChanges) {
        if(changes['gutterSize'] || changes['disabled']) {
            this.refresh();
        }
    }

    public addArea(component: SplitAreaDirective, orderUser: number | null, sizeUser: number | null, minPixel: number) {
        this.areas.push({
            component, 
            orderUser,
            order: -1,
            sizeUser,
            size: -1,
            minPixel
        });

        this.refresh();
    }

    public updateArea(component: SplitAreaDirective, orderUser: number | null, sizeUser: number | null, minPixel: number) {
        const item = this.areas.find(a => a.component === component);

        if(item) {
            item.orderUser = orderUser;
            item.sizeUser = sizeUser;
            item.minPixel = minPixel;

            this.refresh();
        }
    }

    public removeArea(area: SplitAreaDirective) {
        const item = this.areas.find(a => a.component === area);

        if(item) {
            const index = this.areas.indexOf(item);
            this.areas.splice(index, 1);
            this.areas.forEach((a, i) => a.order = i * 2);
            
            this.refresh();
        }
    }

    private refresh() {
        this.stopDragging();

        // ORDERS: Set css 'order' property depending on user input or added order
        const nbCorrectOrder = this.areas.filter(a => a.orderUser && !isNaN(a.orderUser)).length;
        if(nbCorrectOrder === this.areas.length) {
            this.areas.sort((a, b) => +a.orderUser - +b.orderUser);
        }

        this.areas.forEach((a, i) => {
            a.order = i * 2;
            a.component.setStyle('order', a.order);
        });

        // SIZES: Set css 'flex-basis' property depending on user input or equal sizes
        const totalSize = this.areas.map(a => a.sizeUser).reduce((acc, s) => acc + s, 0);
        const nbCorrectSize = this.areas.filter(a => a.sizeUser && !isNaN(a.sizeUser) && a.sizeUser >= this.minPercent).length;

        if(totalSize < 99.99 || totalSize > 100.01 || nbCorrectSize !== this.areas.length) {
            const size = Number((100 / this.areas.length).toFixed(3));
            this.areas.forEach(a => a.size = size);
        } else {
            this.areas.forEach(a => a.size = Number(a.sizeUser));
        }

        this.refreshStyleSizes();
        this.cdRef.markForCheck();
    }

    private refreshStyleSizes() {
        const f = this.gutterSize * this.nbGutters / this.areas.length;
        this.areas.forEach(a => a.component.setStyle('flex-basis', `calc( ${ a.size }% - ${ f }px )`));
    }

    public startDragging(startEvent: MouseEvent, gutterOrder: number) {
        startEvent.preventDefault();

        if(this.disabled) {
            return;
        }

        const areaA = this.areas.find(a => a.order === gutterOrder - 1);
        const areaB = this.areas.find(a => a.order === gutterOrder + 1);
        if(!areaA || !areaB) {
            return;
        }

        const prop = (this.direction === 'horizontal') ? 'offsetWidth' : 'offsetHeight';
        this.containerSize = this.elementRef.nativeElement[prop];
        this.areaASize = this.containerSize * areaA.size / 100;
        this.areaBSize = this.containerSize * areaB.size / 100;

        const start: Point = {
            x: startEvent.screenX,
            y: startEvent.screenY
        };

        this.eventsDragFct.push( this.renderer.listenGlobal('document', 'mousemove', e => this.dragEvent(e, start, areaA, areaB)) );
        this.eventsDragFct.push( this.renderer.listenGlobal('document', 'touchmove', e => this.dragEvent(e, start, areaA, areaB)) );
        this.eventsDragFct.push( this.renderer.listenGlobal('document', 'mouseup', e => this.stopDragging()) );
        this.eventsDragFct.push( this.renderer.listenGlobal('document', 'touchend', e => this.stopDragging()) );
        this.eventsDragFct.push( this.renderer.listenGlobal('document', 'touchcancel', e => this.stopDragging()) );

        areaA.component.lockEvents();
        areaB.component.lockEvents();

        this.isDragging = true;
        this.notify('start');
    }

    private dragEvent(event: MouseEvent, start: Point, areaA: IAreaData, areaB: IAreaData) {
        if(!this.isDragging) {
            return;
        }

        const end: Point = {
            x: event.screenX,
            y: event.screenY
        };

        this.drag(start, end, areaA, areaB);
    }

    private drag(start: Point, end: Point, areaA: IAreaData, areaB: IAreaData) {
        const offsetPixel = (this.direction === 'horizontal') ? (start.x - end.x) : (start.y - end.y);

        const newSizePixelA = this.areaASize - offsetPixel;
        const newSizePixelB = this.areaBSize + offsetPixel;

        if(newSizePixelA <= areaA.minPixel && newSizePixelB < areaB.minPixel) {
            return;
        }

        let newSizePercentA = newSizePixelA / this.containerSize * 100;
        let newSizePercentB = newSizePixelB / this.containerSize * 100;

        if(newSizePercentA <= this.minPercent) {
            newSizePercentA = this.minPercent;
            newSizePercentB = areaA.size + areaB.size - this.minPercent;
        } else if(newSizePercentB <= this.minPercent) {
            newSizePercentB = this.minPercent;
            newSizePercentA = areaA.size + areaB.size - this.minPercent;
        } else {
            newSizePercentA = Number(newSizePercentA.toFixed(3));
            newSizePercentB = Number((areaA.size + areaB.size - newSizePercentA).toFixed(3));
        }

        areaA.size = newSizePercentA;
        areaB.size = newSizePercentB;

        this.refreshStyleSizes();
        this.notify('progress');
    }

    private stopDragging() {
        if(!this.isDragging) {
            return;
        }

        this.areas.forEach(a => a.component.unlockEvents());

        while(this.eventsDragFct.length > 0) {
            const fct = this.eventsDragFct.pop();
            if(fct) {
                fct();
            }
        }

        this.containerSize = 0;
        this.areaASize = 0;
        this.areaBSize = 0;

        this.isDragging = false;
        this.notify('end');
    }

    private notify(type: string) {
        const data: Array<number> = this.areas.map(a => a.size);

        switch(type) {
            case 'start':
                return this.dragStart.emit(data);

            case 'progress':
                return this.dragProgress.emit(data);

            case 'end':
                return this.dragEnd.emit(data);
        }
    }

    public ngOnDestroy() {
        this.stopDragging();
    }
}
