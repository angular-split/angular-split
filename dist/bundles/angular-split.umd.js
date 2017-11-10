(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('rxjs/Subject'), require('rxjs/add/operator/debounceTime')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/common', 'rxjs/Subject', 'rxjs/add/operator/debounceTime'], factory) :
	(factory((global.ng = global.ng || {}, global.ng.angularSplit = {}),global.ng.core,global.ng.common,global.Rx));
}(this, (function (exports,core,common,Subject) { 'use strict';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * angular-split
 *
 * Areas size are set in percentage of the split container & gutters size in pixels.
 * We need to subtract gutters size (in pixels) from area size percentages.
 * So we set css flex-basis like this: "calc( {area.size}% - {area.pxToSubtract}px );"
 *
 * When an area size is 0, pixel need to be recalculate.
 *
 * Examples:  gutterSize * nbGutters / nbAreasMoreThanZero = 10*2/3 = 6.667px
 *
 *                            10px                        10px
 * |--------------------------[]--------------------------[]--------------------------|
 *    calc(33.33% - 6.667px)      calc(33.33% - 6.667px)      calc(33.33% - 6.667px)
 *
 *
 *  10px                                                  10px
 * |[]----------------------------------------------------[]--------------------------|
 * 0                  calc(66.66% - 13.333px)                  calc(33%% - 6.667px)
 *
 *
 *  10px 10px
 * |[][]------------------------------------------------------------------------------|
 * 0 0                                calc(100% - 20px)
 *
 */
var SplitComponent = (function () {
    function SplitComponent(elRef, cdRef, renderer) {
        this.elRef = elRef;
        this.cdRef = cdRef;
        this.renderer = renderer;
        this._direction = 'horizontal';
        this._visibleTransition = false;
        this._width = null;
        this._height = null;
        this._gutterSize = 10;
        this._disabled = false;
        this.dragStart = new core.EventEmitter(false);
        this.dragProgress = new core.EventEmitter(false);
        this.dragEnd = new core.EventEmitter(false);
        this.visibleTransitionEndInternal = new Subject.Subject();
        this.visibleTransitionEnd = (/** @type {?} */ (this.visibleTransitionEndInternal.asObservable())).debounceTime(20);
        this._isDragging = false;
        this.areas = [];
        this.dragListeners = [];
        this.dragStartValues = {
            sizePixelContainer: 0,
            sizePixelA: 0,
            sizePixelB: 0,
            sizePercentA: 0,
            sizePercentB: 0,
        };
    }
    Object.defineProperty(SplitComponent.prototype, "direction", {
        get: /**
         * @return {?}
         */
        function () {
            return this._direction;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            var _this = this;
            this._direction = (v === 'horizontal') ? v : 'vertical';
            this.areas.forEach(function (area) {
                area.comp.setStyleVisibleAndDir(area.comp.visible, _this._direction);
            });
            this.refresh();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "visibleTransition", {
        get: /**
         * @return {?}
         */
        function () {
            return this._visibleTransition;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            var _this = this;
            this._visibleTransition = Boolean(v);
            this.areas.forEach(function (area) {
                area.comp.setStyleTransition(_this._visibleTransition);
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "width", {
        get: /**
         * @return {?}
         */
        function () {
            return this._width;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._width = (!isNaN(/** @type {?} */ (v)) && /** @type {?} */ (v) > 0) ? v : null;
            this.refresh();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "height", {
        get: /**
         * @return {?}
         */
        function () {
            return this._height;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._height = (!isNaN(/** @type {?} */ (v)) && /** @type {?} */ (v) > 0) ? v : null;
            this.refresh();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "gutterSize", {
        get: /**
         * @return {?}
         */
        function () {
            return this._gutterSize;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._gutterSize = !isNaN(v) && v > 0 ? v : 10;
            this.refresh();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._disabled = Boolean(v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "cssFlexdirection", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.direction === 'horizontal') ? 'row' : 'column';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "cssWidth", {
        get: /**
         * @return {?}
         */
        function () {
            return this.width ? this.width + "px" : '100%';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "cssHeight", {
        get: /**
         * @return {?}
         */
        function () {
            return this.height ? this.height + "px" : '100%';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "cssMinwidth", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.direction === 'horizontal') ? this.getNbGutters() * this.gutterSize + "px" : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "cssMinheight", {
        get: /**
         * @return {?}
         */
        function () {
            return (this.direction === 'vertical') ? this.getNbGutters() * this.gutterSize + "px" : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "isDragging", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isDragging;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            var _this = this;
            this._isDragging = v;
            // Disable transition during dragging to avoid 'lag effect' (whatever it is active or not).
            this.areas.forEach(function (area) {
                area.comp.setStyleTransition(v ? false : _this.visibleTransition);
            });
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
        if (changes["gutterSize"] || changes["disabled"]) {
            this.refresh();
        }
    };
    /**
     * @return {?}
     */
    SplitComponent.prototype.getVisibleAreas = /**
     * @return {?}
     */
    function () {
        return this.areas.filter(function (a) { return a.comp.visible === true; });
    };
    /**
     * @return {?}
     */
    SplitComponent.prototype.getNbGutters = /**
     * @return {?}
     */
    function () {
        return this.getVisibleAreas().length - 1;
    };
    /**
     * @param {?} comp
     * @return {?}
     */
    SplitComponent.prototype.addArea = /**
     * @param {?} comp
     * @return {?}
     */
    function (comp) {
        this.areas.push({ comp: comp, order: -1, size: -1, pxToSubtract: 0 });
        comp.setStyleVisibleAndDir(comp.visible, this.direction);
        comp.setStyleTransition(this.visibleTransition);
        this.refresh();
    };
    /**
     * @param {?} comp
     * @return {?}
     */
    SplitComponent.prototype.updateArea = /**
     * @param {?} comp
     * @return {?}
     */
    function (comp) {
        var /** @type {?} */ item = this.areas.find(function (a) { return a.comp === comp; });
        if (item) {
            this.refresh();
        }
    };
    /**
     * @param {?} comp
     * @return {?}
     */
    SplitComponent.prototype.removeArea = /**
     * @param {?} comp
     * @return {?}
     */
    function (comp) {
        var /** @type {?} */ item = this.areas.find(function (a) { return a.comp === comp; });
        if (item) {
            this.areas.splice(this.areas.indexOf(item), 1);
            this.refresh();
        }
    };
    /**
     * @param {?} comp
     * @return {?}
     */
    SplitComponent.prototype.hideArea = /**
     * @param {?} comp
     * @return {?}
     */
    function (comp) {
        var /** @type {?} */ item = this.areas.find(function (a) { return a.comp === comp; });
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
        var /** @type {?} */ item = this.areas.find(function (a) { return a.comp === area; });
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
        var /** @type {?} */ visibleAreas = this.getVisibleAreas();
        return visibleAreas.length > 0 ? area === visibleAreas[visibleAreas.length - 1] : false;
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
        // ¤ AREAS ORDER
        // Based on user input if all provided or added order by default.
        if (this.areas.some(function (a) { return a.comp.order === null; }) === false) {
            this.areas.sort(function (a, b) { return Number(a.comp.order) - Number(b.comp.order); });
        }
        this.areas.forEach(function (a, i) {
            a.order = i * 2;
            a.comp.setStyleOrder(a.order);
        });
        var /** @type {?} */ visibleAreas = this.getVisibleAreas();
        // ¤ AREAS SIZE PERCENT
        // Set css 'flex-basis' property depending on user input if all set & ~100% or equal sizes by default.
        var /** @type {?} */ totalUserSize = /** @type {?} */ (visibleAreas.reduce(function (total, s) { return s.comp.size ? total + s.comp.size : total; }, 0));
        if (this.areas.some(function (a) { return a.comp.size === null; }) || totalUserSize < .999 || totalUserSize > 1.001) {
            var /** @type {?} */ size_1 = Number((1 / visibleAreas.length).toFixed(4));
            visibleAreas.forEach(function (a) {
                a.size = size_1;
            });
        }
        else {
            // If some provided % are less than gutterSize > set them to zero and dispatch % to others.
            var /** @type {?} */ percentToShare_1 = 0;
            var /** @type {?} */ prop = (this.direction === 'horizontal') ? 'offsetWidth' : 'offsetHeight';
            var /** @type {?} */ containerSizePixel_1 = this.elRef.nativeElement[prop];
            visibleAreas.forEach(function (a) {
                var /** @type {?} */ newSize = Number(a.comp.size);
                if (newSize * containerSizePixel_1 < _this.gutterSize) {
                    percentToShare_1 += newSize;
                    newSize = 0;
                }
                a.size = newSize;
            });
            if (percentToShare_1 > 0) {
                var /** @type {?} */ nbAreasNotZero = visibleAreas.filter(function (a) { return a.size !== 0; }).length;
                var /** @type {?} */ percentToAdd_1 = percentToShare_1 / nbAreasNotZero;
                visibleAreas.filter(function (a) { return a.size !== 0; }).forEach(function (a) {
                    a.size += percentToAdd_1;
                });
            }
        }
        // ¤ AREAS PX TO SUBTRACT
        var /** @type {?} */ totalPxToSubtract = this.getNbGutters() * this.gutterSize;
        var /** @type {?} */ areasSizeNotZero = visibleAreas.filter(function (a) { return a.size !== 0; });
        areasSizeNotZero.forEach(function (a) {
            a.pxToSubtract = totalPxToSubtract / areasSizeNotZero.length;
        });
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
        this.getVisibleAreas().forEach(function (a) {
            a.comp.setStyleFlexbasis("calc( " + a.size * 100 + "% - " + a.pxToSubtract + "px )");
        });
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
        this.dragStartValues.sizePixelContainer = this.elRef.nativeElement[prop];
        this.dragStartValues.sizePixelA = areaA.comp.getSizePixel(prop);
        this.dragStartValues.sizePixelB = areaB.comp.getSizePixel(prop);
        this.dragStartValues.sizePercentA = areaA.size;
        this.dragStartValues.sizePercentB = areaB.size;
        var /** @type {?} */ start;
        if (startEvent instanceof MouseEvent) {
            start = {
                x: startEvent.screenX,
                y: startEvent.screenY,
            };
        }
        else if (startEvent instanceof TouchEvent) {
            start = {
                x: startEvent.touches[0].screenX,
                y: startEvent.touches[0].screenY,
            };
        }
        else {
            return;
        }
        this.dragListeners.push(this.renderer.listen('document', 'mousemove', function (e) { return _this.dragEvent(e, start, areaA, areaB); }));
        this.dragListeners.push(this.renderer.listen('document', 'touchmove', function (e) { return _this.dragEvent(e, start, areaA, areaB); }));
        this.dragListeners.push(this.renderer.listen('document', 'mouseup', function (e) { return _this.stopDragging(); }));
        this.dragListeners.push(this.renderer.listen('document', 'touchend', function (e) { return _this.stopDragging(); }));
        this.dragListeners.push(this.renderer.listen('document', 'touchcancel', function (e) { return _this.stopDragging(); }));
        areaA.comp.lockEvents();
        areaB.comp.lockEvents();
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
                y: event.screenY,
            };
        }
        else if (event instanceof TouchEvent) {
            end = {
                x: event.touches[0].screenX,
                y: event.touches[0].screenY,
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
        // ¤ AREAS SIZE PIXEL
        var /** @type {?} */ offsetPixel = (this.direction === 'horizontal') ? (start.x - end.x) : (start.y - end.y);
        var /** @type {?} */ newSizePixelA = this.dragStartValues.sizePixelA - offsetPixel;
        var /** @type {?} */ newSizePixelB = this.dragStartValues.sizePixelB + offsetPixel;
        if (newSizePixelA < this.gutterSize && newSizePixelB < this.gutterSize) {
            // WTF.. get out of here!
            return;
        }
        else if (newSizePixelA < this.gutterSize) {
            newSizePixelB += newSizePixelA;
            newSizePixelA = 0;
        }
        else if (newSizePixelB < this.gutterSize) {
            newSizePixelA += newSizePixelB;
            newSizePixelB = 0;
        }
        // ¤ AREAS SIZE PERCENT
        var /** @type {?} */ debSizeA = areaA.size;
        var /** @type {?} */ debSizeB = areaB.size;
        if (newSizePixelA === 0) {
            areaB.size += areaA.size;
            areaA.size = 0;
        }
        else if (newSizePixelB === 0) {
            areaA.size += areaB.size;
            areaB.size = 0;
        }
        else {
            // size = ( ( (total * percentStart - F) / pixelStart * pixelNew ) + F ) / total;
            if (this.dragStartValues.sizePercentA === 0) {
                areaB.size = (((this.dragStartValues.sizePixelContainer * this.dragStartValues.sizePercentB - areaB.pxToSubtract) / this.dragStartValues.sizePixelB * newSizePixelB) + areaB.pxToSubtract) / this.dragStartValues.sizePixelContainer;
                areaA.size = this.dragStartValues.sizePercentB - areaB.size;
            }
            else if (this.dragStartValues.sizePercentB === 0) {
                areaA.size = (((this.dragStartValues.sizePixelContainer * this.dragStartValues.sizePercentA - areaA.pxToSubtract) / this.dragStartValues.sizePixelA * newSizePixelA) + areaA.pxToSubtract) / this.dragStartValues.sizePixelContainer;
                areaB.size = this.dragStartValues.sizePercentA - areaA.size;
            }
            else {
                areaA.size = (((this.dragStartValues.sizePixelContainer * this.dragStartValues.sizePercentA - areaA.pxToSubtract) / this.dragStartValues.sizePixelA * newSizePixelA) + areaA.pxToSubtract) / this.dragStartValues.sizePixelContainer;
                areaB.size = (this.dragStartValues.sizePercentA + this.dragStartValues.sizePercentB) - areaA.size;
                //areaB.size = ( ( (this.dragStartValues.sizePixelContainer * this.dragStartValues.sizePercentB - areaB.pxToSubtract) / this.dragStartValues.sizePixelB * newSizePixelB ) + areaB.pxToSubtract ) / this.dragStartValues.sizePixelContainer;
            }
        }
        var /** @type {?} */ debPxToSubtractA = areaA.pxToSubtract;
        var /** @type {?} */ debPxToSubtractB = areaB.pxToSubtract;
        if (areaA.size === 0) {
            areaB.pxToSubtract += areaA.pxToSubtract;
            areaA.pxToSubtract = 0;
        }
        else if (areaB.size === 0) {
            areaA.pxToSubtract += areaB.pxToSubtract;
            areaB.pxToSubtract = 0;
        }
        var /** @type {?} */ rd = function (val) { return Math.round(val * 100) / 100; };
        console.table([{
                //'start drag PX': rd(this.dragStartValues.sizePixelA) + ' / ' + rd(this.dragStartValues.sizePixelB),
                //'offset': offsetPixel,
                //'new temp PX': rd(debSizePxA) + ' / ' + rd(debSizePxB),
                'new final PX': rd(newSizePixelA) + ' / ' + rd(newSizePixelB),
                'curr %-px': rd(debSizeA) * 100 + "% - " + rd(debPxToSubtractA) + " / " + rd(debSizeB) * 100 + "% - " + rd(debPxToSubtractB),
                'new %-px': rd(areaA.size) * 100 + "% - " + rd(areaA.pxToSubtract) + " / " + rd(areaB.size) * 100 + "% - " + rd(areaB.pxToSubtract),
            }]);
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
        this.areas.forEach(function (a) {
            a.comp.unlockEvents();
        });
        console.log('>', this.getVisibleAreas().map(function (a) { return a.size; }).join('/'), '  ', this.getVisibleAreas().map(function (a) { return a.size; }).reduce(function (tot, s) { return tot + s; }, 0));
        while (this.dragListeners.length > 0) {
            var /** @type {?} */ fct = this.dragListeners.pop();
            if (fct) {
                fct();
            }
        }
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
        var /** @type {?} */ areasSize = this.getVisibleAreas().map(function (a) { return a.size; });
        switch (type) {
            case 'start':
                return this.dragStart.emit(areasSize);
            case 'progress':
                return this.dragProgress.emit(areasSize);
            case 'end':
                return this.dragEnd.emit(areasSize);
            case 'visibleTransitionEnd':
                return this.visibleTransitionEndInternal.next(areasSize);
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
                    styles: ["\n        :host {\n            display: flex;\n            flex-wrap: nowrap;\n            justify-content: flex-start;\n            align-items: stretch;\n            overflow: hidden;\n        }\n\n        split-gutter {\n            flex-grow: 0;\n            flex-shrink: 0;\n            background-color: #eeeeee;\n            background-position: center center;\n            background-repeat: no-repeat;\n        }\n\n        :host.vertical split-gutter {\n            width: 100%;\n        }\n    "],
                    template: "\n        <ng-content></ng-content>\n        <ng-template ngFor let-area [ngForOf]=\"areas\" let-index=\"index\" let-last=\"last\">\n            <split-gutter *ngIf=\"last === false && area.comp.visible === true && !isLastVisibleArea(area)\" \n                          [order]=\"index*2+1\"\n                          [direction]=\"direction\"\n                          [size]=\"gutterSize\"\n                          [disabled]=\"disabled\"\n                          (mousedown)=\"startDragging($event, index*2+1)\"\n                          (touchstart)=\"startDragging($event, index*2+1)\"></split-gutter>\n        </ng-template>",
                },] },
    ];
    /** @nocollapse */
    SplitComponent.ctorParameters = function () { return [
        { type: core.ElementRef, },
        { type: core.ChangeDetectorRef, },
        { type: core.Renderer2, },
    ]; };
    SplitComponent.propDecorators = {
        "direction": [{ type: core.Input },],
        "visibleTransition": [{ type: core.Input },],
        "width": [{ type: core.Input },],
        "height": [{ type: core.Input },],
        "gutterSize": [{ type: core.Input },],
        "disabled": [{ type: core.Input },],
        "dragStart": [{ type: core.Output },],
        "dragProgress": [{ type: core.Output },],
        "dragEnd": [{ type: core.Output },],
        "visibleTransitionEnd": [{ type: core.Output },],
        "cssFlexdirection": [{ type: core.HostBinding, args: ['style.flex-direction',] },],
        "cssWidth": [{ type: core.HostBinding, args: ['style.width',] },],
        "cssHeight": [{ type: core.HostBinding, args: ['style.height',] },],
        "cssMinwidth": [{ type: core.HostBinding, args: ['style.min-width',] },],
        "cssMinheight": [{ type: core.HostBinding, args: ['style.min-height',] },],
    };
    return SplitComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SplitAreaDirective = (function () {
    function SplitAreaDirective(elRef, renderer, split) {
        this.elRef = elRef;
        this.renderer = renderer;
        this.split = split;
        this._order = null;
        this._size = null;
        this._minSize = 0;
        this._visible = true;
        this.lockListeners = [];
    }
    Object.defineProperty(SplitAreaDirective.prototype, "order", {
        get: /**
         * @return {?}
         */
        function () {
            return this._order;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._order = !isNaN(/** @type {?} */ (v)) ? v : null;
            this.split.updateArea(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitAreaDirective.prototype, "size", {
        get: /**
         * @return {?}
         */
        function () {
            return this._size;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._size = (!isNaN(/** @type {?} */ (v)) && /** @type {?} */ (v) >= 0 && /** @type {?} */ (v) <= 100) ? (/** @type {?} */ (v) / 100) : null;
            this.split.updateArea(this);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitAreaDirective.prototype, "minSize", {
        get: /**
         * @return {?}
         */
        function () {
            return this._minSize;
        },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            this._minSize = (!isNaN(v) && v > 0 && v < 100) ? v / 100 : 0;
            this.split.updateArea(this);
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
            this._visible = v;
            this.setStyleVisibleAndDir(v, this.split.direction);
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
        var _this = this;
        this.split.addArea(this);
        this.renderer.setStyle(this.elRef.nativeElement, 'flex-grow', '0');
        this.renderer.setStyle(this.elRef.nativeElement, 'flex-shrink', '0');
        this.transitionListener = this.renderer.listen(this.elRef.nativeElement, 'transitionend', function (e) { return _this.onTransitionEnd(e); });
    };
    /**
     * @param {?} prop
     * @return {?}
     */
    SplitAreaDirective.prototype.getSizePixel = /**
     * @param {?} prop
     * @return {?}
     */
    function (prop) {
        return this.elRef.nativeElement[prop];
    };
    /**
     * @param {?} isVisible
     * @param {?} direction
     * @return {?}
     */
    SplitAreaDirective.prototype.setStyleVisibleAndDir = /**
     * @param {?} isVisible
     * @param {?} direction
     * @return {?}
     */
    function (isVisible, direction) {
        if (isVisible === false) {
            this.renderer.setStyle(this.elRef.nativeElement, 'flex-basis', '0');
            this.renderer.setStyle(this.elRef.nativeElement, 'overflow-x', 'hidden');
            this.renderer.setStyle(this.elRef.nativeElement, 'overflow-y', 'hidden');
            if (direction === 'vertical') {
                this.renderer.setStyle(this.elRef.nativeElement, 'max-width', '0');
            }
        }
        else {
            this.renderer.setStyle(this.elRef.nativeElement, 'overflow-x', 'hidden');
            this.renderer.setStyle(this.elRef.nativeElement, 'overflow-y', 'auto');
            this.renderer.removeStyle(this.elRef.nativeElement, 'max-width');
        }
        if (direction === 'horizontal') {
            this.renderer.setStyle(this.elRef.nativeElement, 'height', '100%');
        }
        else {
            this.renderer.removeStyle(this.elRef.nativeElement, 'height');
        }
    };
    /**
     * @param {?} withTransition
     * @return {?}
     */
    SplitAreaDirective.prototype.setStyleTransition = /**
     * @param {?} withTransition
     * @return {?}
     */
    function (withTransition) {
        if (withTransition === true) {
            this.renderer.setStyle(this.elRef.nativeElement, 'transition', "flex-basis 0.3s");
        }
        else {
            this.renderer.setStyle(this.elRef.nativeElement, 'transition', null);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    SplitAreaDirective.prototype.setStyleOrder = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.renderer.setStyle(this.elRef.nativeElement, 'order', value);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    SplitAreaDirective.prototype.setStyleFlexbasis = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.renderer.setStyle(this.elRef.nativeElement, 'flex-basis', value);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SplitAreaDirective.prototype.onTransitionEnd = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // Limit only flex-basis transition to trigger the event
        if (event.propertyName === 'flex-basis') {
            this.split.notify('visibleTransitionEnd');
        }
    };
    /**
     * @return {?}
     */
    SplitAreaDirective.prototype.lockEvents = /**
     * @return {?}
     */
    function () {
        this.lockListeners.push(this.renderer.listen(this.elRef.nativeElement, 'selectstart', function (e) { return false; }));
        this.lockListeners.push(this.renderer.listen(this.elRef.nativeElement, 'dragstart', function (e) { return false; }));
    };
    /**
     * @return {?}
     */
    SplitAreaDirective.prototype.unlockEvents = /**
     * @return {?}
     */
    function () {
        while (this.lockListeners.length > 0) {
            var /** @type {?} */ fct = this.lockListeners.pop();
            if (fct) {
                fct();
            }
        }
    };
    /**
     * @return {?}
     */
    SplitAreaDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.unlockEvents();
        if (this.transitionListener) {
            this.transitionListener();
        }
        this.split.removeArea(this);
    };
    SplitAreaDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: 'split-area'
                },] },
    ];
    /** @nocollapse */
    SplitAreaDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
        { type: core.Renderer2, },
        { type: SplitComponent, },
    ]; };
    SplitAreaDirective.propDecorators = {
        "order": [{ type: core.Input },],
        "size": [{ type: core.Input },],
        "minSize": [{ type: core.Input },],
        "visible": [{ type: core.Input },],
    };
    return SplitAreaDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SplitGutterDirective = (function () {
    ////
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
            this.renderer.setStyle(this.elementRef.nativeElement, 'order', v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitGutterDirective.prototype, "direction", {
        get: /**
         * @return {?}
         */
        function () {
            return this._direction;
        },
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
        get: /**
         * @return {?}
         */
        function () {
            return this._size;
        },
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
        get: /**
         * @return {?}
         */
        function () {
            return this._disabled;
        },
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
        this.renderer.setStyle(this.elementRef.nativeElement, 'flex-basis', this.size + "px");
        // fix safari bug about gutter height when direction is horizontal
        this.renderer.setStyle(this.elementRef.nativeElement, 'height', (this.direction === 'vertical') ? this.size + "px" : "100%");
        var /** @type {?} */ state = (this.disabled === true) ? 'disabled' : this.direction;
        this.renderer.setStyle(this.elementRef.nativeElement, 'cursor', getCursor(state));
        this.renderer.setStyle(this.elementRef.nativeElement, 'background-image', "url(\"" + getImage(state) + "\")");
    };
    SplitGutterDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: 'split-gutter'
                },] },
    ];
    /** @nocollapse */
    SplitGutterDirective.ctorParameters = function () { return [
        { type: core.ElementRef, },
        { type: core.Renderer2, },
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
 * @param {?} state
 * @return {?}
 */
function getCursor(state) {
    switch (state) {
        case 'disabled':
            return 'default';
        case 'vertical':
            return 'row-resize';
        case 'horizontal':
            return 'col-resize';
    }
    return '';
}
/**
 * @param {?} state
 * @return {?}
 */
function getImage(state) {
    switch (state) {
        case 'vertical':
            return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFCAMAAABl/6zIAAAABlBMVEUAAADMzMzIT8AyAAAAAXRSTlMAQObYZgAAABRJREFUeAFjYGRkwIMJSeMHlBkOABP7AEGzSuPKAAAAAElFTkSuQmCC';
        case 'horizontal':
            return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==';
        case 'disabled':
            return '';
    }
    return '';
}

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
