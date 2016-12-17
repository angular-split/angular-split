"use strict";
var core_1 = require("@angular/core");
var split_component_1 = require("./split.component");
var SplitAreaDirective = (function () {
    function SplitAreaDirective(elementRef, renderer, split) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.split = split;
        this._order = null;
        this._size = null;
        this._minSizePixel = 0;
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
            fct();
        }
    };
    SplitAreaDirective.prototype.setStyle = function (key, value) {
        this.renderer.setElementStyle(this.elementRef.nativeElement, key, value);
    };
    SplitAreaDirective.prototype.ngOnDestroy = function () {
        this.split.removeArea(this);
    };
    return SplitAreaDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], SplitAreaDirective.prototype, "order", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], SplitAreaDirective.prototype, "size", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], SplitAreaDirective.prototype, "minSizePixel", null);
SplitAreaDirective = __decorate([
    core_1.Directive({
        selector: 'split-area'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        core_1.Renderer,
        split_component_1.SplitComponent])
], SplitAreaDirective);
exports.SplitAreaDirective = SplitAreaDirective;
//# sourceMappingURL=splitArea.directive.js.map