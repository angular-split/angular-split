import { ElementRef, Renderer, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { SplitComponent } from './split.component';
export declare class SplitAreaDirective implements OnInit, OnDestroy {
    private elementRef;
    private renderer;
    private split;
    private _order;
    order: number;
    private _size;
    size: any;
    private _minSizePixel;
    minSizePixel: number;
    private _visible;
    visible: boolean;
    visibility: string;
    eventsLockFct: Array<Function>;
    sizingEnd: EventEmitter<SplitAreaDirective>;
    constructor(elementRef: ElementRef, renderer: Renderer, split: SplitComponent);
    ngOnInit(): void;
    lockEvents(): void;
    unlockEvents(): void;
    setStyle(key: string, value: any): void;
    ngOnDestroy(): void;
    onSizingTransitionEnd(evt: TransitionEvent): void;
}
