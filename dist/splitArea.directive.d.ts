import { ElementRef, Renderer, OnInit, OnDestroy } from '@angular/core';
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
    private _minSizePercent;
    minSizePercent: number;
    private _visible;
    visible: boolean;
    visibility: string;
    eventsLockFct: Array<Function>;
    constructor(elementRef: ElementRef, renderer: Renderer, split: SplitComponent);
    ngOnInit(): void;
    lockEvents(): void;
    unlockEvents(): void;
    setStyle(key: string, value: any): void;
    ngOnDestroy(): void;
    onTransitionEnd(evt: TransitionEvent): void;
}
