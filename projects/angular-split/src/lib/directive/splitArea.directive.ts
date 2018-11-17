import { Directive, Input, ElementRef, Renderer2, OnInit, OnDestroy, NgZone } from '@angular/core';

import { SplitComponent } from '../component/split.component';

@Directive({
    selector: 'as-split-area'
})
export class SplitAreaDirective implements OnInit, OnDestroy {

    private _order: number | null = null;

    @Input() set order(v: number | null) {
        v = Number(v);
        this._order = !isNaN(v) ? v : null;

        this.split.updateArea(this, true, false);
    }
    
    get order(): number | null {
        return this._order;
    }

    ////

    private _size: number | null = null;

    @Input() set size(v: number | null) {
        v = Number(v);
        this._size = (!isNaN(v) && v >= 0 && v <= 100) ? (v/100) : null;

        this.split.updateArea(this, false, true);
    }
    
    get size(): number | null {
        return this._size;
    }

    ////

    private _visible: boolean = true;

    @Input() set visible(v: boolean) {
        v = (typeof(v) === 'boolean') ? v : (v === 'false' ? false : true);
        this._visible = v;

        if(this.visible) { 
            this.split.showArea(this);
            this.renderer.removeClass(this.elRef.nativeElement, 'is-hided');
        }
        else {
            this.split.hideArea(this);
            this.renderer.addClass(this.elRef.nativeElement, 'is-hided');
        }
    }

    get visible(): boolean {
        return this._visible;
    }

    ////

    private transitionListener: Function;
    private readonly lockListeners: Array<Function> = [];

    constructor(private ngZone: NgZone,
                public elRef: ElementRef,
                private renderer: Renderer2,
                private split: SplitComponent) {}

    public ngOnInit(): void {
        this.split.addArea(this);

        this.ngZone.runOutsideAngular(() => {
            this.transitionListener = this.renderer.listen(this.elRef.nativeElement, 'transitionend', (e: TransitionEvent) => this.onTransitionEnd(e));
        });
    }

    public setStyleOrder(value: number): void {
        this.renderer.setStyle(this.elRef.nativeElement, 'order', value);
    }
    
    public setStyleFlexbasis(value: string): void {
        this.renderer.setStyle(this.elRef.nativeElement, 'flex-basis', value);
    }
    
    private onTransitionEnd(event: TransitionEvent): void {
        // Limit only flex-basis transition to trigger the event
        if(event.propertyName === 'flex-basis') {
            this.split.notify('transitionEnd');
        }
    }
    
    public lockEvents(): void {
        this.ngZone.runOutsideAngular(() => {
            this.lockListeners.push( this.renderer.listen(this.elRef.nativeElement, 'selectstart', (e: Event) => false) );
            this.lockListeners.push( this.renderer.listen(this.elRef.nativeElement, 'dragstart', (e: Event) => false) );
        });
    }

    public unlockEvents(): void {
        while(this.lockListeners.length > 0) {
            const fct = this.lockListeners.pop();
            if(fct) {
                fct();
            }
        }
    }

    public ngOnDestroy(): void {
        this.unlockEvents();

        if(this.transitionListener) {
            this.transitionListener();
        }

        this.split.removeArea(this);
    }
}
