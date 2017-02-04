import { ChangeDetectorRef, ElementRef, SimpleChanges, EventEmitter, Renderer, OnDestroy, OnChanges } from '@angular/core';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { SplitAreaDirective } from './splitArea.directive';
export interface IAreaData {
    component: SplitAreaDirective;
    sizeUser: number | null;
    size: number;
    orderUser: number | null;
    order: number;
    minPixel: number;
}
export declare class SplitComponent implements OnChanges, OnDestroy {
    private cdRef;
    private elementRef;
    private renderer;
    direction: string;
    width: number;
    height: number;
    gutterSize: number;
    disabled: boolean;
    animateAreaToggle: boolean;
    dragStart: EventEmitter<number[]>;
    dragProgress: EventEmitter<number[]>;
    dragEnd: EventEmitter<number[]>;
    /**
     * This event if fired when split area show/hide are done with animations completed.
     * Make sure use debounceTime before subscription to prevent repeated hits in short time
     */
    layoutEnd: EventEmitter<number[]>;
    readonly styleFlexDirection: boolean;
    readonly styleFlexDirectionStyle: string;
    readonly dragging: boolean;
    readonly styleWidth: string;
    readonly styleHeight: string;
    private readonly visibleAreas;
    private readonly nbGutters;
    private minPercent;
    private areas;
    private isDragging;
    private containerSize;
    private areaASize;
    private areaBSize;
    private eventsDragFct;
    constructor(cdRef: ChangeDetectorRef, elementRef: ElementRef, renderer: Renderer);
    ngOnChanges(changes: SimpleChanges): void;
    addArea(component: SplitAreaDirective, orderUser: number | null, sizeUser: number | null, minPixel: number): void;
    updateArea(component: SplitAreaDirective, orderUser: number | null, sizeUser: number | null, minPixel: number): void;
    removeArea(area: SplitAreaDirective): void;
    hideArea(area: SplitAreaDirective): void;
    showArea(area: SplitAreaDirective): void;
    isLastVisibleArea(area: IAreaData): boolean;
    private refresh();
    private refreshStyleSizes();
    startDragging(startEvent: MouseEvent | TouchEvent, gutterOrder: number): void;
    private dragEvent(event, start, areaA, areaB);
    private drag(start, end, areaA, areaB);
    private stopDragging();
    private notify(type);
    ngOnDestroy(): void;
}
