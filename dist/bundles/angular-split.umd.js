(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs/Subject')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', 'rxjs/Subject'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.angularSplit = {}),global.ng.core,global.ng.common,global.Rx));
}(this, (function (exports,core,common,Subject) { 'use strict';

"use strict";
var Observable_1 = require('../../Observable');
var debounceTime_1 = require('../../operator/debounceTime');
Observable_1.Observable.prototype.debounceTime = debounceTime_1.debounceTime;

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

var SplitComponent = (function () {
    function SplitComponent(cdRef, elementRef, renderer) {
        this.cdRef = cdRef;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.direction = 'horizontal';
        this.gutterSize = 10;
        this.disabled = false;
        this.visibleTransition = false;
        this.dragStart = new core.EventEmitter(false);
        this.dragProgress = new core.EventEmitter(false);
        this.dragEnd = new core.EventEmitter(false);
        this.visibleTransitionEndInternal = new Subject.Subject();
        this.visibleTransitionEnd = this.visibleTransitionEndInternal.asObservable().debounceTime(20);
        this.areas = [];
        this.minPercent = 5;
        this.isDragging = false;
        this.containerSize = 0;
        this.areaASize = 0;
        this.areaBSize = 0;
        this.eventsDragFct = [];
    }
    Object.defineProperty(SplitComponent.prototype, "styleFlexDirection", {
        get: /**
         * @return {?}
         */
        function () {
            return this.direction === 'vertical';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "styleFlexDirectionStyle", {
        get: /**
         * @return {?}
         */
        function () {
            return this.direction === 'horizontal' ? 'row' : 'column';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "dragging", {
        get: /**
         * @return {?}
         */
        function () {
            // prevent animation of areas when visibleTransition is false, or resizing
            return !this.visibleTransition || this.isDragging;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "styleWidth", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.width && !isNaN(this.width) && this.width > 0) ? this.width + 'px' : '100%';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "styleHeight", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.height && !isNaN(this.height) && this.height > 0) ? this.height + 'px' : '100%';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "visibleAreas", {
        get: /**
         * @return {?}
         */
        function () {
            return this.areas.filter(function (a) { return a.component.visible; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "nbGutters", {
        get: /**
         * @return {?}
         */
        function () {
            return this.visibleAreas.length - 1;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} changes
     * @return {?}
     */
    SplitComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes['gutterSize'] || changes['disabled']) {
            this.refresh();
        }
    };
    /**
     * @param {?} component
     * @param {?} orderUser
     * @param {?} sizeUser
     * @param {?} minPixel
     * @return {?}
     */
    SplitComponent.prototype.addArea = /**
     * @param {?} component
     * @param {?} orderUser
     * @param {?} sizeUser
     * @param {?} minPixel
     * @return {?}
     */
    function (component, orderUser, sizeUser, minPixel) {
        this.areas.push({
            component: component,
            orderUser: orderUser,
            order: -1,
            sizeUser: sizeUser,
            size: -1,
            minPixel: minPixel
        });
        this.refresh();
    };
    /**
     * @param {?} component
     * @param {?} orderUser
     * @param {?} sizeUser
     * @param {?} minPixel
     * @return {?}
     */
    SplitComponent.prototype.updateArea = /**
     * @param {?} component
     * @param {?} orderUser
     * @param {?} sizeUser
     * @param {?} minPixel
     * @return {?}
     */
    function (component, orderUser, sizeUser, minPixel) {
        var /** @type {?} */ item = this.areas.find(function (a) { return a.component === component; });
        if (item) {
            item.orderUser = orderUser;
            item.sizeUser = sizeUser;
            item.minPixel = minPixel;
            this.refresh();
        }
    };
    /**
     * @param {?} area
     * @return {?}
     */
    SplitComponent.prototype.removeArea = /**
     * @param {?} area
     * @return {?}
     */
    function (area) {
        var /** @type {?} */ item = this.areas.find(function (a) { return a.component === area; });
        if (item) {
            var /** @type {?} */ index = this.areas.indexOf(item);
            this.areas.splice(index, 1);
            this.areas.forEach(function (a, i) { return a.order = i * 2; });
            this.refresh();
        }
    };
    /**
     * @param {?} area
     * @return {?}
     */
    SplitComponent.prototype.hideArea = /**
     * @param {?} area
     * @return {?}
     */
    function (area) {
        var /** @type {?} */ item = this.areas.find(function (a) { return a.component === area; });
        if (item) {
            this.refresh();
        }
    };
    /**
     * @param {?} area
     * @return {?}
     */
    SplitComponent.prototype.showArea = /**
     * @param {?} area
     * @return {?}
     */
    function (area) {
        var /** @type {?} */ item = this.areas.find(function (a) { return a.component === area; });
        if (item) {
            this.refresh();
        }
    };
    /**
     * @param {?} area
     * @return {?}
     */
    SplitComponent.prototype.isLastVisibleArea = /**
     * @param {?} area
     * @return {?}
     */
    function (area) {
        return this.visibleAreas.length > 0 ? area === this.visibleAreas[this.visibleAreas.length - 1] : false;
    };
    /**
     * @return {?}
     */
    SplitComponent.prototype.refresh = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.stopDragging();
        // ORDERS: Set css 'order' property depending on user input or added order
        var /** @type {?} */ nbCorrectOrder = this.areas.filter(function (a) { return a.orderUser !== null && !isNaN(a.orderUser); }).length;
        if (nbCorrectOrder === this.areas.length) {
            this.areas.sort(function (a, b) { return Number(a.orderUser) - Number(b.orderUser); });
        }
        this.areas.forEach(function (a, i) {
            a.order = i * 2;
            a.component.setStyle('order', a.order);
        });
        // SIZES: Set css 'flex-basis' property depending on user input or equal sizes
        var /** @type {?} */ totalSize = /** @type {?} */ (this.visibleAreas.map(function (a) { return a.sizeUser; }).reduce(function (acc, s) { return acc + s; }, 0));
        var /** @type {?} */ nbCorrectSize = this.visibleAreas.filter(function (a) { return a.sizeUser !== null && !isNaN(a.sizeUser) && a.sizeUser >= _this.minPercent; }).length;
        if (totalSize < 99.99 || totalSize > 100.01 || nbCorrectSize !== this.visibleAreas.length) {
            var /** @type {?} */ size_1 = Number((100 / this.visibleAreas.length).toFixed(3));
            this.visibleAreas.forEach(function (a) { return a.size = size_1; });
        }
        else {
            this.visibleAreas.forEach(function (a) { return a.size = Number(a.sizeUser); });
        }
        this.refreshStyleSizes();
        this.cdRef.markForCheck();
    };
    /**
     * @return {?}
     */
    SplitComponent.prototype.refreshStyleSizes = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ f = this.gutterSize * this.nbGutters / this.visibleAreas.length;
        this.visibleAreas.forEach(function (a) { return a.component.setStyle('flex-basis', "calc( " + a.size + "% - " + f + "px )"); });
    };
    /**
     * @param {?} startEvent
     * @param {?} gutterOrder
     * @return {?}
     */
    SplitComponent.prototype.startDragging = /**
     * @param {?} startEvent
     * @param {?} gutterOrder
     * @return {?}
     */
    function (startEvent, gutterOrder) {
        var _this = this;
        startEvent.preventDefault();
        if (this.disabled) {
            return;
        }
        var /** @type {?} */ areaA = this.areas.find(function (a) { return a.order === gutterOrder - 1; });
        var /** @type {?} */ areaB = this.areas.find(function (a) { return a.order === gutterOrder + 1; });
        if (!areaA || !areaB) {
            return;
        }
        var /** @type {?} */ prop = (this.direction === 'horizontal') ? 'offsetWidth' : 'offsetHeight';
        this.containerSize = this.elementRef.nativeElement[prop];
        this.areaASize = this.containerSize * areaA.size / 100;
        this.areaBSize = this.containerSize * areaB.size / 100;
        var /** @type {?} */ start;
        if (startEvent instanceof MouseEvent) {
            start = {
                x: startEvent.screenX,
                y: startEvent.screenY
            };
        }
        else if (startEvent instanceof TouchEvent) {
            start = {
                x: startEvent.touches[0].screenX,
                y: startEvent.touches[0].screenY
            };
        }
        else {
            return;
        }
        this.eventsDragFct.push(this.renderer.listenGlobal('document', 'mousemove', function (e) { return _this.dragEvent(e, start, areaA, areaB); }));
        this.eventsDragFct.push(this.renderer.listenGlobal('document', 'touchmove', function (e) { return _this.dragEvent(e, start, areaA, areaB); }));
        this.eventsDragFct.push(this.renderer.listenGlobal('document', 'mouseup', function (e) { return _this.stopDragging(); }));
        this.eventsDragFct.push(this.renderer.listenGlobal('document', 'touchend', function (e) { return _this.stopDragging(); }));
        this.eventsDragFct.push(this.renderer.listenGlobal('document', 'touchcancel', function (e) { return _this.stopDragging(); }));
        areaA.component.lockEvents();
        areaB.component.lockEvents();
        this.isDragging = true;
        this.notify('start');
    };
    /**
     * @param {?} event
     * @param {?} start
     * @param {?} areaA
     * @param {?} areaB
     * @return {?}
     */
    SplitComponent.prototype.dragEvent = /**
     * @param {?} event
     * @param {?} start
     * @param {?} areaA
     * @param {?} areaB
     * @return {?}
     */
    function (event, start, areaA, areaB) {
        if (!this.isDragging) {
            return;
        }
        var /** @type {?} */ end;
        if (event instanceof MouseEvent) {
            end = {
                x: event.screenX,
                y: event.screenY
            };
        }
        else if (event instanceof TouchEvent) {
            end = {
                x: event.touches[0].screenX,
                y: event.touches[0].screenY
            };
        }
        else {
            return;
        }
        this.drag(start, end, areaA, areaB);
    };
    /**
     * @param {?} start
     * @param {?} end
     * @param {?} areaA
     * @param {?} areaB
     * @return {?}
     */
    SplitComponent.prototype.drag = /**
     * @param {?} start
     * @param {?} end
     * @param {?} areaA
     * @param {?} areaB
     * @return {?}
     */
    function (start, end, areaA, areaB) {
        var /** @type {?} */ offsetPixel = (this.direction === 'horizontal') ? (start.x - end.x) : (start.y - end.y);
        var /** @type {?} */ newSizePixelA = this.areaASize - offsetPixel;
        var /** @type {?} */ newSizePixelB = this.areaBSize + offsetPixel;
        if (newSizePixelA <= areaA.minPixel && newSizePixelB < areaB.minPixel) {
            return;
        }
        var /** @type {?} */ newSizePercentA = newSizePixelA / this.containerSize * 100;
        var /** @type {?} */ newSizePercentB = newSizePixelB / this.containerSize * 100;
        if (newSizePercentA <= this.minPercent) {
            newSizePercentA = this.minPercent;
            newSizePercentB = areaA.size + areaB.size - this.minPercent;
        }
        else if (newSizePercentB <= this.minPercent) {
            newSizePercentB = this.minPercent;
            newSizePercentA = areaA.size + areaB.size - this.minPercent;
        }
        else {
            newSizePercentA = Number(newSizePercentA.toFixed(3));
            newSizePercentB = Number((areaA.size + areaB.size - newSizePercentA).toFixed(3));
        }
        areaA.size = newSizePercentA;
        areaB.size = newSizePercentB;
        this.refreshStyleSizes();
        this.notify('progress');
    };
    /**
     * @return {?}
     */
    SplitComponent.prototype.stopDragging = /**
     * @return {?}
     */
    function () {
        if (!this.isDragging) {
            return;
        }
        this.areas.forEach(function (a) { return a.component.unlockEvents(); });
        while (this.eventsDragFct.length > 0) {
            var /** @type {?} */ fct = this.eventsDragFct.pop();
            if (fct) {
                fct();
            }
        }
        this.containerSize = 0;
        this.areaASize = 0;
        this.areaBSize = 0;
        this.isDragging = false;
        this.notify('end');
    };
    /**
     * @param {?} type
     * @return {?}
     */
    SplitComponent.prototype.notify = /**
     * @param {?} type
     * @return {?}
     */
    function (type) {
        var /** @type {?} */ data = this.visibleAreas.map(function (a) { return a.size; });
        switch (type) {
            case 'start':
                return this.dragStart.emit(data);
            case 'progress':
                return this.dragProgress.emit(data);
            case 'end':
                return this.dragEnd.emit(data);
            case 'visibleTransitionEnd':
                return this.visibleTransitionEndInternal.next(data);
        }
    };
    /**
     * @return {?}
     */
    SplitComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.stopDragging();
    };
    SplitComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'split',
                    changeDetection: core.ChangeDetectionStrategy.OnPush,
                    styles: ["\n        :host {\n            display: flex;\n            flex-wrap: nowrap;\n            justify-content: flex-start;\n            align-items: stretch;\n            flex-direction: row;\n        }\n\n        :host.vertical {\n            flex-direction: column;\n        }\n\n        split-gutter {\n            flex-grow: 0;\n            flex-shrink: 0;\n            background-color: #eeeeee;\n            background-position: center center;\n            background-repeat: no-repeat;\n        }\n\n        :host.vertical split-gutter {\n            width: 100%;\n        }\n\n        :host /deep/ split-area {\n            transition: flex-basis 0.3s;\n        }  \n\n        :host.notransition /deep/ split-area {\n            transition: none !important;\n        }      \n\n        :host /deep/ split-area.hided {\n            flex-basis: 0 !important;\n            overflow: hidden !important;\n        }      \n\n        :host.vertical /deep/ split-area.hided {\n            max-width: 0;\n        }\n    "],
                    template: "\n        <ng-content></ng-content>\n        <ng-template ngFor let-area [ngForOf]=\"areas\" let-index=\"index\" let-last=\"last\">\n            <split-gutter *ngIf=\"last === false && area.component.visible === true && !isLastVisibleArea(area)\" \n                          [order]=\"index*2+1\"\n                          [direction]=\"direction\"\n                          [size]=\"gutterSize\"\n                          [disabled]=\"disabled\"\n                          (mousedown)=\"startDragging($event, index*2+1)\"\n                          (touchstart)=\"startDragging($event, index*2+1)\"></split-gutter>\n        </ng-template>",
                },] },
    ];
    /** @nocollapse */
    SplitComponent.ctorParameters = function () { return [
        { type: core.ChangeDetectorRef, },
        { type: core.ElementRef, },
        { type: core.Renderer, },
    ]; };
    SplitComponent.propDecorators = {
        "direction": [{ type: core.Input },],
        "width": [{ type: core.Input },],
        "height": [{ type: core.Input },],
        "gutterSize": [{ type: core.Input },],
        "disabled": [{ type: core.Input },],
        "visibleTransition": [{ type: core.Input },],
        "dragStart": [{ type: core.Output },],
        "dragProgress": [{ type: core.Output },],
        "dragEnd": [{ type: core.Output },],
        "visibleTransitionEnd": [{ type: core.Output },],
        "styleFlexDirection": [{ type: core.HostBinding, args: ['class.vertical',] },],
        "styleFlexDirectionStyle": [{ type: core.HostBinding, args: ['style.flex-direction',] },],
        "dragging": [{ type: core.HostBinding, args: ['class.notransition',] },],
        "styleWidth": [{ type: core.HostBinding, args: ['style.width',] },],
        "styleHeight": [{ type: core.HostBinding, args: ['style.height',] },],
    };
    return SplitComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SplitAreaDirective = (function () {
    function SplitAreaDirective(elementRef, renderer, split) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.split = split;
        this._order = null;
        this._size = null;
        this._minSizePixel = 0;
        this._visible = true;
        this.visibility = "block";
        this.eventsLockFct = [];
    }
    Object.defineProperty(SplitAreaDirective.prototype, "order", {
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._order = !isNaN(v) ? v : null;
            this.split.updateArea(this, this._order, this._size, this._minSizePixel);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitAreaDirective.prototype, "size", {
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._size = !isNaN(v) ? v : null;
            this.split.updateArea(this, this._order, this._size, this._minSizePixel);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitAreaDirective.prototype, "minSizePixel", {
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._minSizePixel = (!isNaN(v) && v > 0) ? v : 0;
            this.split.updateArea(this, this._order, this._size, this._minSizePixel);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitAreaDirective.prototype, "visible", {
        get: /**
         * @return {?}
         */
        function () {
            return this._visible;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this.visibility = v ? "block" : "none";
            this._visible = v;
            if (this.visible) {
                this.split.showArea(this);
            }
            else {
                this.split.hideArea(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SplitAreaDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.split.addArea(this, this._order, this._size, this._minSizePixel);
    };
    /**
     * @return {?}
     */
    SplitAreaDirective.prototype.lockEvents = /**
     * @return {?}
     */
    function () {
        this.eventsLockFct.push(this.renderer.listen(this.elementRef.nativeElement, 'selectstart', function (e) { return false; }));
        this.eventsLockFct.push(this.renderer.listen(this.elementRef.nativeElement, 'dragstart', function (e) { return false; }));
    };
    /**
     * @return {?}
     */
    SplitAreaDirective.prototype.unlockEvents = /**
     * @return {?}
     */
    function () {
        while (this.eventsLockFct.length > 0) {
            var /** @type {?} */ fct = this.eventsLockFct.pop();
            if (fct) {
                fct();
            }
        }
    };
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    SplitAreaDirective.prototype.setStyle = /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        this.renderer.setElementStyle(this.elementRef.nativeElement, key, value);
    };
    /**
     * @return {?}
     */
    SplitAreaDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.split.removeArea(this);
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    SplitAreaDirective.prototype.onTransitionEnd = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        // Limit only flex-basis transition to trigger the event
        if (evt.propertyName === 'flex-basis')
            this.split.notify('visibleTransitionEnd');
    };
    SplitAreaDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: 'split-area',
                    host: {
                        '[style.flex-grow]': '"0"',
                        '[style.flex-shrink]': '"0"',
                        '[style.overflow-x]': '"hidden"',
                        '[style.overflow-y]': '"auto"',
                        '[style.height]': '"100%"',
                        '[class.hided]': '!visible',
                        '(transitionend)': 'onTransitionEnd($event)'
                    }
                },] },
    ];
    /** @nocollapse */
    SplitAreaDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
        { type: core.Renderer, },
        { type: SplitComponent, },
    ]; };
    SplitAreaDirective.propDecorators = {
        "order": [{ type: core.Input },],
        "size": [{ type: core.Input },],
        "minSizePixel": [{ type: core.Input },],
        "visible": [{ type: core.Input },],
    };
    return SplitAreaDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SplitGutterDirective = (function () {
    function SplitGutterDirective(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this._disabled = false;
    }
    Object.defineProperty(SplitGutterDirective.prototype, "order", {
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this.setStyle('order', v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitGutterDirective.prototype, "direction", {
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._direction = v;
            this.refreshStyle();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitGutterDirective.prototype, "size", {
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._size = v;
            this.refreshStyle();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitGutterDirective.prototype, "disabled", {
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._disabled = v;
            this.refreshStyle();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SplitGutterDirective.prototype.refreshStyle = /**
     * @return {?}
     */
    function () {
        this.setStyle('flex-basis', this._size + "px");
        // fix safari bug about gutter height when direction is horizontal
        this.setStyle('height', (this._direction === 'vertical') ? this._size + "px" : "100%");
        var /** @type {?} */ state = (this._disabled === true) ? 'disabled' : this._direction;
        this.setStyle('cursor', this.getCursor(state));
        this.setStyle('background-image', "url(\"" + this.getImage(state) + "\")");
    };
    /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    SplitGutterDirective.prototype.setStyle = /**
     * @param {?} key
     * @param {?} value
     * @return {?}
     */
    function (key, value) {
        this.renderer.setElementStyle(this.elementRef.nativeElement, key, value);
    };
    /**
     * @param {?} state
     * @return {?}
     */
    SplitGutterDirective.prototype.getCursor = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
        switch (state) {
            case 'disabled':
                return 'default';
            case 'vertical':
                return 'row-resize';
            case 'horizontal':
                return 'col-resize';
        }
    };
    /**
     * @param {?} state
     * @return {?}
     */
    SplitGutterDirective.prototype.getImage = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
        switch (state) {
            case 'disabled':
                return '';
            case 'vertical':
                return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFCAMAAABl/6zIAAAABlBMVEUAAADMzMzIT8AyAAAAAXRSTlMAQObYZgAAABRJREFUeAFjYGRkwIMJSeMHlBkOABP7AEGzSuPKAAAAAElFTkSuQmCC';
            case 'horizontal':
                return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==';
        }
    };
    SplitGutterDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: 'split-gutter'
                },] },
    ];
    /** @nocollapse */
    SplitGutterDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
        { type: core.Renderer, },
    ]; };
    SplitGutterDirective.propDecorators = {
        "order": [{ type: core.Input },],
        "direction": [{ type: core.Input },],
        "size": [{ type: core.Input },],
        "disabled": [{ type: core.Input },],
    };
    return SplitGutterDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var AngularSplitModule = (function () {
    function AngularSplitModule() {
    }
    /**
     * @return {?}
     */
    AngularSplitModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: AngularSplitModule,
            providers: []
        };
    };
    /**
     * @return {?}
     */
    AngularSplitModule.forChild = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: AngularSplitModule,
            providers: []
        };
    };
    AngularSplitModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule
                    ],
                    declarations: [
                        SplitComponent,
                        SplitAreaDirective,
                        SplitGutterDirective,
                    ],
                    exports: [
                        SplitComponent,
                        SplitAreaDirective,
                    ]
                },] },
    ];
    /** @nocollapse */
    AngularSplitModule.ctorParameters = function () { return []; };
    return AngularSplitModule;
}());

exports.AngularSplitModule = AngularSplitModule;
exports.ɵa = SplitComponent;
exports.ɵb = SplitAreaDirective;
exports.ɵc = SplitGutterDirective;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=angular-split.umd.js.map
