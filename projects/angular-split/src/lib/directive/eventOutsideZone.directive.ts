import { Directive, Output, EventEmitter, NgZone, ElementRef, OnInit, OnDestroy } from '@angular/core';


@Directive({
    selector: '[clickOutsideZone]'
})
export class ClickOutsideZoneDirective implements OnInit, OnDestroy {
    @Output('clickOutsideZone') emitter = new EventEmitter();
    private handler: Function;
    
    constructor(private ngZone: NgZone, 
                private elRef: ElementRef) {}

    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            this.handler = $event => this.emitter.emit($event);
            this.elRef.nativeElement.addEventListener('click', this.handler, false);
      });
    }

    ngOnDestroy() {
        this.elRef.nativeElement.removeEventListener('click', this.handler);
    }
}


@Directive({
    selector: '[mousedownOutsideZone]'
})
export class MousedownOutsideZoneDirective implements OnInit, OnDestroy {
    @Output('mousedownOutsideZone') emitter = new EventEmitter();
    private handler: Function;
    
    constructor(private ngZone: NgZone, 
                private elRef: ElementRef) {}

    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            this.handler = $event => this.emitter.emit($event);
            this.elRef.nativeElement.addEventListener('mousedown', this.handler, false);
      });
    }

    ngOnDestroy() {
        this.elRef.nativeElement.removeEventListener('mousedown', this.handler);
    }
}


@Directive({
    selector: '[touchstartOutsideZone]'
})
export class TouchstartOutsideZoneDirective implements OnInit, OnDestroy {
    @Output('touchstartOutsideZone') emitter = new EventEmitter();
    private handler: Function;
    
    constructor(private ngZone: NgZone, 
                private elRef: ElementRef) {}

    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            this.handler = $event => this.emitter.emit($event);
            this.elRef.nativeElement.addEventListener('touchstart', this.handler, false);
      });
    }

    ngOnDestroy() {
        this.elRef.nativeElement.removeEventListener('touchstart', this.handler);
    }
}