"use strict";
var core_1 = require("@angular/core");
var SplitGutterDirective = (function () {
    function SplitGutterDirective(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this._disabled = false;
    }
    Object.defineProperty(SplitGutterDirective.prototype, "order", {
        set: function (v) {
            this.setStyle('order', v);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitGutterDirective.prototype, "direction", {
        set: function (v) {
            this._direction = v;
            this.refreshStyle();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitGutterDirective.prototype, "size", {
        set: function (v) {
            this.setStyle('flex-basis', v + 'px');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitGutterDirective.prototype, "disabled", {
        set: function (v) {
            this._disabled = v;
            this.refreshStyle();
        },
        enumerable: true,
        configurable: true
    });
    SplitGutterDirective.prototype.refreshStyle = function () {
        var state = this._disabled === true ? 'disabled' : this._direction;
        this.setStyle('cursor', this.getCursor(state));
        this.setStyle('background-image', "url(\"" + this.getImage(state) + "\")");
    };
    SplitGutterDirective.prototype.setStyle = function (key, value) {
        this.renderer.setElementStyle(this.elementRef.nativeElement, key, value);
    };
    SplitGutterDirective.prototype.getCursor = function (state) {
        switch (state) {
            case 'disabled':
                return 'default';
            case 'horizontal':
                return 'row-resize';
            case 'vertical':
                return 'col-resize';
        }
    };
    SplitGutterDirective.prototype.getImage = function (state) {
        switch (state) {
            case 'disabled':
                return '';
            case 'horizontal':
                return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFCAMAAABl/6zIAAAABlBMVEUAAADMzMzIT8AyAAAAAXRSTlMAQObYZgAAABRJREFUeAFjYGRkwIMJSeMHlBkOABP7AEGzSuPKAAAAAElFTkSuQmCC';
            case 'vertical':
                return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==';
        }
    };
    return SplitGutterDirective;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], SplitGutterDirective.prototype, "order", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], SplitGutterDirective.prototype, "direction", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], SplitGutterDirective.prototype, "size", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], SplitGutterDirective.prototype, "disabled", null);
SplitGutterDirective = __decorate([
    core_1.Directive({
        selector: 'split-gutter'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        core_1.Renderer])
], SplitGutterDirective);
exports.SplitGutterDirective = SplitGutterDirective;
//# sourceMappingURL=splitGutter.directive.js.map