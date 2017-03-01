"use strict";
var core_1 = require('@angular/core');
var split_component_1 = require('./split.component');
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
        set: function (v) {
            this._order = !isNaN(v) ? v : null;
            this.split.updateArea(this, this._order, this._size, this._minSizePixel);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitAreaDirective.prototype, "size", {
        set: function (v) {
            this._size = !isNaN(v) ? v : null;
            this.split.updateArea(this, this._order, this._size, this._minSizePixel);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitAreaDirective.prototype, "minSizePixel", {
        set: function (v) {
            this._minSizePixel = (!isNaN(v) && v > 0) ? v : 0;
            this.split.updateArea(this, this._order, this._size, this._minSizePixel);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitAreaDirective.prototype, "visible", {
        get: function () {
            return this._visible;
        },
        set: function (v) {
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
    SplitAreaDirective.prototype.ngOnInit = function () {
        this.split.addArea(this, this._order, this._size, this._minSizePixel);
    };
    SplitAreaDirective.prototype.lockEvents = function () {
        this.eventsLockFct.push(this.renderer.listen(this.elementRef.nativeElement, 'selectstart', function (e) { return false; }));
        this.eventsLockFct.push(this.renderer.listen(this.elementRef.nativeElement, 'dragstart', function (e) { return false; }));
    };
    SplitAreaDirective.prototype.unlockEvents = function () {
        while (this.eventsLockFct.length > 0) {
            var fct = this.eventsLockFct.pop();
            if (fct) {
                fct();
            }
        }
    };
    SplitAreaDirective.prototype.setStyle = function (key, value) {
        this.renderer.setElementStyle(this.elementRef.nativeElement, key, value);
    };
    SplitAreaDirective.prototype.ngOnDestroy = function () {
        this.split.removeArea(this);
    };
    SplitAreaDirective.prototype.onSizingTransitionEnd = function (evt) {
        //note that all css property transition end could trigger transitionend events
        //this limit only flex-basis transition to trigger the event
        if (evt.propertyName == "flex-basis")
            this.split.notify("visibleTransitionEnd");
    };
    SplitAreaDirective.decorators = [
        { type: core_1.Directive, args: [{
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
                },] },
    ];
    /** @nocollapse */
    SplitAreaDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.Renderer, },
        { type: split_component_1.SplitComponent, },
    ]; };
    SplitAreaDirective.propDecorators = {
        'order': [{ type: core_1.Input },],
        'size': [{ type: core_1.Input },],
        'minSizePixel': [{ type: core_1.Input },],
        'visible': [{ type: core_1.Input },],
    };
    return SplitAreaDirective;
}());
exports.SplitAreaDirective = SplitAreaDirective;
//# sourceMappingURL=C:/Dev/angular-split_2/splitArea.directive.js.map