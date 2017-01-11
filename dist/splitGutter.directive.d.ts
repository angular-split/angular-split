import { ElementRef, Renderer } from '@angular/core';
export declare class SplitGutterDirective {
    private elementRef;
    private renderer;
    order: number;
    private _direction;
    direction: string;
    size: any;
    private _disabled;
    disabled: boolean;
    constructor(elementRef: ElementRef, renderer: Renderer);
    private refreshStyle();
    private setStyle(key, value);
    private getCursor(state);
    private getImage(state);
}
