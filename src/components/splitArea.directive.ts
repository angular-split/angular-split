import { Directive, Input, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';

import { SplitComponent } from './split.component';

@Directive({
    selector: 'split-area'
})
export class SplitAreaDirective implements OnInit, OnDestroy {

    private _order: number | null = null;

    @Input() set order(v: number | null) {
        this._order = !isNaN(<number> v) ? v : null;

        this.split.updateArea(this);
    }
    
    get order(): number | null {
        return this._order;
    }

    ////

    private _size: number | null = null;

    @Input() set size(v: number | null) {
        this._size = (!isNaN(<number> v) && <number> v >= 0 && <number> v <= 100) ? (<number> v/100) : null;

        this.split.updateArea(this);
    }
    
    get size(): number | null {
        return this._size;
    }

    ////

    private _minSize: number = 0;

    @Input() set minSize(v: number) {
        this._minSize = (!isNaN(v) && v > 0 && v < 100) ? v/100 : 0;

        this.split.updateArea(this);
    }
    
    get minSize(): number {
        return this._minSize;
    }

    ////

    private _visible: boolean = true;

    @Input() set visible(v: boolean) {
        this._visible = v;
        this.setStyleVisibleAndDir(v, this.split.direction);

        if(this.visible) { 
            this.split.showArea(this);
        }
        else {
            this.split.hideArea(this);
        }
    }

    get visible(): boolean {
        return this._visible;
    }

    ////

    private transitionListener: Function;
    private readonly lockListeners: Array<Function> = [];

    constructor(private elRef: ElementRef,
                private renderer: Renderer2,
                private split: SplitComponent) {}

    public ngOnInit() {
        this.split.addArea(this);

        this.renderer.setStyle(this.elRef.nativeElement, 'flex-grow', '0');
        this.renderer.setStyle(this.elRef.nativeElement, 'flex-shrink', '0');

        this.transitionListener = this.renderer.listen(this.elRef.nativeElement, 'transitionend', (e: TransitionEvent) => this.onTransitionEnd(e));
    }

    public getSizePixel(prop: 'offsetWidth' | 'offsetHeight'): number {
        return this.elRef.nativeElement[prop];
    }

    public setStyleVisibleAndDir(isVisible: boolean, direction: 'horizontal' | 'vertical') {
        if(isVisible === false) {
            this.renderer.setStyle(this.elRef.nativeElement, 'flex-basis', '0');
            this.renderer.setStyle(this.elRef.nativeElement, 'overflow-x', 'hidden');
            this.renderer.setStyle(this.elRef.nativeElement, 'overflow-y', 'hidden');
            
            if(direction === 'vertical') {
                this.renderer.setStyle(this.elRef.nativeElement, 'max-width', '0');
            }
        }
        else {
            this.renderer.setStyle(this.elRef.nativeElement, 'overflow-x', 'hidden');
            this.renderer.setStyle(this.elRef.nativeElement, 'overflow-y', 'auto');
            this.renderer.removeStyle(this.elRef.nativeElement, 'max-width');
        }

        if(direction === 'horizontal') {
            this.renderer.setStyle(this.elRef.nativeElement, 'height', '100%');
        }
        else {
            this.renderer.removeStyle(this.elRef.nativeElement, 'height');
        }
    }

    public setStyleTransition(withTransition: boolean) {
        if(withTransition === true) {
            this.renderer.setStyle(this.elRef.nativeElement, 'transition', `flex-basis 0.3s`);
        }
        else {
            this.renderer.setStyle(this.elRef.nativeElement, 'transition', null);
        }
    }

    public setStyleOrder(value: number) {
        this.renderer.setStyle(this.elRef.nativeElement, 'order', value);
    }
    public setStyleFlexbasis(value: string) {
        this.renderer.setStyle(this.elRef.nativeElement, 'flex-basis', value);
    }
    
    private onTransitionEnd(event: TransitionEvent) {
        // Limit only flex-basis transition to trigger the event
        if(event.propertyName === 'flex-basis') {
            this.split.notify('visibleTransitionEnd');
        }
    }
    
    public lockEvents() {
        this.lockListeners.push( this.renderer.listen(this.elRef.nativeElement, 'selectstart', (e: Event) => false) );
        this.lockListeners.push( this.renderer.listen(this.elRef.nativeElement, 'dragstart', (e: Event) => false) );
    }

    public unlockEvents() {
        while(this.lockListeners.length > 0) {
            const fct = this.lockListeners.pop();
            if(fct) {
                fct();
            }
        }
    }

    public ngOnDestroy() {
        this.unlockEvents();

        if(this.transitionListener) {
            this.transitionListener();
        }

        this.split.removeArea(this);
    }
}
