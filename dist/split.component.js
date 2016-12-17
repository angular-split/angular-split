"use strict";
var core_1 = require("@angular/core");
var SplitComponent = (function () {
    function SplitComponent(cdRef, elementRef, renderer) {
        this.cdRef = cdRef;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.direction = 'horizontal';
        this._gutterSize = 10;
        this._disabled = false;
        this.dragStart = new core_1.EventEmitter(false);
        this.dragProgress = new core_1.EventEmitter(false);
        this.dragEnd = new core_1.EventEmitter(false);
        this.minPercent = 5;
        this.areas = [];
        this.isDragging = false;
        this.sizes = {
            container: null,
            areaPixelA: null,
            areaPixelB: null
        };
        this.eventsDragFct = [];
    }
    Object.defineProperty(SplitComponent.prototype, "gutterSize", {
        set: function (v) {
            this._gutterSize = v;
            this.refresh();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "disabled", {
        set: function (v) {
            this._disabled = v;
            this.refresh();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "styleFlexDirection", {
        get: function () {
            return this.direction === 'vertical' ? 'row' : 'column';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "styleWidth", {
        get: function () {
            return (this.width && !isNaN(this.width) && this.width > 0) ? this.width + 'px' : '100%';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "styleHeight", {
        get: function () {
            return (this.height && !isNaN(this.height) && this.height > 0) ? this.height + 'px' : '100%';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "nbGutters", {
        get: function () {
            return this.areas.length - 1;
        },
        enumerable: true,
        configurable: true
    });
    SplitComponent.prototype.addArea = function (component, orderUser, sizeUser, minPixel) {
        this.areas.push({
            component: component,
            orderUser: orderUser,
            sizeUser: sizeUser,
            minPixel: minPixel
        });
        this.refresh();
    };
    SplitComponent.prototype.updateArea = function (component, orderUser, sizeUser, minPixel) {
        var item = this.areas.find(function (a) { return a.component === component; });
        if (item) {
            item.orderUser = orderUser;
            item.sizeUser = sizeUser;
            item.minPixel = minPixel;
            this.refresh();
        }
    };
    SplitComponent.prototype.removeArea = function (area) {
        var item = this.areas.find(function (a) { return a.component === area; });
        if (item) {
            var index = this.areas.indexOf(item);
            this.areas.splice(index, 1);
            this.areas.forEach(function (a, i) { return a.order = i * 2; });
            this.refresh();
        }
    };
    SplitComponent.prototype.refresh = function () {
        var _this = this;
        this.stopDragging();
        // ORDERS
        // soit toutes les areas ont une prop order et on les utilise, soit on utilise uniquement leur position
        var nbCorrectOrder = this.areas.filter(function (a) { return !isNaN(a.orderUser); }).length;
        if (nbCorrectOrder === this.areas.length) {
            // on sort le tableau par rapport aux prop orderUser
            this.areas.sort(function (a, b) { return +a.orderUser - +b.orderUser; });
        }
        this.areas.forEach(function (a, i) {
            a.order = i * 2;
            a.component.setStyle('order', a.order);
        });
        // SIZES
        var totalSize = this.areas.map(function (a) { return a.sizeUser; }).reduce(function (acc, s) { return acc + s; }, 0);
        var nbCorrectSize = this.areas.filter(function (a) { return !isNaN(a.sizeUser) && a.sizeUser >= _this.minPercent; }).length;
        if (totalSize < 99.99 || totalSize > 100.01 || nbCorrectSize !== this.areas.length) {
            var size_1 = Number((100 / this.areas.length).toFixed(3));
            this.areas.forEach(function (a) { return a.size = size_1; });
        }
        else {
            this.areas.forEach(function (a) { return a.size = a.sizeUser; });
        }
        this.refreshStyleSizes();
        this.cdRef.markForCheck();
    };
    SplitComponent.prototype.refreshStyleSizes = function () {
        var f = this._gutterSize * this.nbGutters / this.areas.length;
        this.areas.forEach(function (a) { return a.component.setStyle('flex-basis', "calc( " + a.size + "% - " + f + "px )"); });
    };
    SplitComponent.prototype.startDragging = function (startEvent, gutterOrder) {
        var _this = this;
        startEvent.preventDefault();
        if (this._disabled) {
            return;
        }
        var areaA = this.areas.find(function (a) { return a.order === gutterOrder - 1; });
        var areaB = this.areas.find(function (a) { return a.order === gutterOrder + 1; });
        if (!areaA || !areaB) {
            return;
        }
        var prop = (this.direction === 'vertical') ? 'offsetWidth' : 'offsetHeight';
        this.sizes.container = this.elementRef.nativeElement[prop];
        this.sizes.areaPixelA = this.sizes.container * areaA.size / 100;
        this.sizes.areaPixelB = this.sizes.container * areaB.size / 100;
        var start = {
            x: startEvent.screenX,
            y: startEvent.screenY
        };
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
    SplitComponent.prototype.dragEvent = function (event, start, areaA, areaB) {
        if (!this.isDragging) {
            return;
        }
        var end = {
            x: event.screenX,
            y: event.screenY
        };
        this.drag(start, end, areaA, areaB);
    };
    SplitComponent.prototype.drag = function (start, end, areaA, areaB) {
        var offsetPixel = (this.direction === 'vertical') ? (start.x - end.x) : (start.y - end.y);
        var newSizePixelA = this.sizes.areaPixelA - offsetPixel;
        var newSizePixelB = this.sizes.areaPixelB + offsetPixel;
        if (newSizePixelA <= areaA.minPixel && newSizePixelB < areaB.minPixel) {
            return;
        }
        var newSizePercentA = newSizePixelA / this.sizes.container * 100;
        var newSizePercentB = newSizePixelB / this.sizes.container * 100;
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
    SplitComponent.prototype.stopDragging = function () {
        if (!this.isDragging) {
            return;
        }
        this.areas.forEach(function (a) { return a.component.unlockEvents(); });
        while (this.eventsDragFct.length > 0) {
            var fct = this.eventsDragFct.pop();
            fct();
        }
        this.sizes.container = null;
        this.sizes.areaPixelA = null;
        this.sizes.areaPixelB = null;
        this.isDragging = false;
        this.notify('end');
    };
    SplitComponent.prototype.notify = function (type) {
        var data = this.areas.map(function (a) { return a.size; });
        switch (type) {
            case 'start':
                return this.dragStart.emit(data);
            case 'progress':
                return this.dragProgress.emit(data);
            case 'end':
                return this.dragEnd.emit(data);
        }
    };
    SplitComponent.prototype.ngOnDestroy = function () {
        this.stopDragging();
    };
    return SplitComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SplitComponent.prototype, "direction", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], SplitComponent.prototype, "width", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], SplitComponent.prototype, "height", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], SplitComponent.prototype, "gutterSize", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], SplitComponent.prototype, "disabled", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SplitComponent.prototype, "dragStart", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SplitComponent.prototype, "dragProgress", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SplitComponent.prototype, "dragEnd", void 0);
__decorate([
    core_1.HostBinding('style.flex-direction'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], SplitComponent.prototype, "styleFlexDirection", null);
__decorate([
    core_1.HostBinding('style.width'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], SplitComponent.prototype, "styleWidth", null);
__decorate([
    core_1.HostBinding('style.height'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], SplitComponent.prototype, "styleHeight", null);
SplitComponent = __decorate([
    core_1.Component({
        selector: 'split',
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        styles: ["\n        :host {\n            display: flex;\n            flex-wrap: nowrap;\n            justify-content: flex-start;\n            background: red;\n        }\n\n        /deep/ split-area {\n            flex-grow: 0;\n            flex-shrink: 0;\n            overflow-x: hidden;\n            overflow-y: auto;\n            background: blue;\n            height: /*100px;*/100%;\n        }\n\n        split-gutter {\n            flex-grow: 0;\n            flex-shrink: 0;\n            flex-basis: 10px;\n            height: /*100px;*/100%;\n            background-color: #eeeeee;\n            background-position: 50%;\n            background-repeat: no-repeat;\n        }\n    "],
        template: "\n        <ng-content></ng-content>\n        <template ngFor let-area [ngForOf]=\"areas\" let-index=\"index\" let-last=\"last\">\n            <split-gutter *ngIf=\"last === false\" \n                        [order]=\"index*2+1\"\n                        [direction]=\"direction\"\n                        [size]=\"_gutterSize\"\n                        [disabled]=\"_disabled\"\n                        (mousedown)=\"startDragging($event, index*2+1)\"\n                        (touchstart)=\"startDragging($event, index*2+1)\"></split-gutter>\n        </template>",
    }),
    __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
        core_1.ElementRef,
        core_1.Renderer])
], SplitComponent);
exports.SplitComponent = SplitComponent;
//# sourceMappingURL=split.component.js.map