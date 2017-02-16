import {
    Directive, Input, Output, ElementRef, Renderer, OnInit, OnDestroy,
    EventEmitter
} from '@angular/core';

import { SplitComponent } from './split.component';

@Directive({
    selector: 'split-area',
    host: {
        '[style.flex-grow]': '"0"',
        '[style.flex-shrink]': '"0"',
        '[style.overflow-x]': '"hidden"',
        '[style.overflow-y]': '"auto"',
        '[style.height]': '"100%"',
        '[class.notshow]': '!visible',
        '(transitionend)': 'onSizingTransitionEnd($event)'
    }
})
export class SplitAreaDirective implements OnInit, OnDestroy {

    private _order: number | null = null;
    @Input() set order(v: number) {
        this._order = !isNaN(v) ? v : null;
        this.split.updateArea(this, this._order, this._size, this._minSizePixel);
    }

    private _size: number | null = null;
    @Input() set size(v: any) {
        this._size = !isNaN(v) ? v : null;
        this.split.updateArea(this, this._order, this._size, this._minSizePixel);
    }

    private _minSizePixel: number = 0;
    @Input() set minSizePixel(v: number) {
        this._minSizePixel = (!isNaN(v) && v > 0) ? v : 0;
        this.split.updateArea(this, this._order, this._size, this._minSizePixel);
    }

    private _visible: boolean = true;
    @Input() set visible(v: boolean) {
        this.visibility = v ? "block" : "none";
        this._visible = v;

        if (this.visible) { 
            this.split.showArea(this);
        } else {
            this.split.hideArea(this);
        }
    }
    get visible(): boolean {
        return this._visible;
    }

    visibility: string = "block";

    eventsLockFct: Array<Function> = [];

    @Output() sizingEnd = new EventEmitter<SplitAreaDirective>();

    constructor(private elementRef: ElementRef,
        private renderer: Renderer,
        private split: SplitComponent) { }

    public ngOnInit() {
        this.split.addArea(this, this._order, this._size, this._minSizePixel);
    }

    public lockEvents() {
        this.eventsLockFct.push(this.renderer.listen(this.elementRef.nativeElement, 'selectstart', e => false));
        this.eventsLockFct.push(this.renderer.listen(this.elementRef.nativeElement, 'dragstart', e => false));
    }

    public unlockEvents() {
        while (this.eventsLockFct.length > 0) {
            const fct = this.eventsLockFct.pop();
            if (fct) {
                fct();
            }
        }
    }

    public setStyle(key: string, value: any) {
        this.renderer.setElementStyle(this.elementRef.nativeElement, key, value);
    }

    public ngOnDestroy() {
        this.split.removeArea(this);
    }

    onSizingTransitionEnd(evt: TransitionEvent) {
        //note that all css property transition end could trigger transitionend events
        //this limit only flex-basis transition to trigger the event
        if (evt.propertyName == "flex-basis")
            this.sizingEnd.emit(this);
    }
}
