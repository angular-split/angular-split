"use strict";
var core_1 = require('@angular/core');
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
            case 'vertical':
                return 'row-resize';
            case 'horizontal':
                return 'col-resize';
        }
    };
    SplitGutterDirective.prototype.getImage = function (state) {
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
        { type: core_1.Directive, args: [{
                    selector: 'split-gutter'
                },] },
    ];
    /** @nocollapse */
    SplitGutterDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.Renderer, },
    ]; };
    SplitGutterDirective.propDecorators = {
        'order': [{ type: core_1.Input },],
        'direction': [{ type: core_1.Input },],
        'size': [{ type: core_1.Input },],
        'disabled': [{ type: core_1.Input },],
    };
    return SplitGutterDirective;
}());
exports.SplitGutterDirective = SplitGutterDirective;
//# sourceMappingURL=C:/dev/angular-split_2/splitGutter.directive.js.map