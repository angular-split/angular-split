"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/merge');
require('rxjs/add/operator/debounceTime');
require('rxjs/add/operator/distinctUntilChanged');
var SplitComponent = (function () {
    function SplitComponent(cdRef, elementRef, renderer) {
        this.cdRef = cdRef;
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.direction = 'horizontal';
        this.gutterSize = 10;
        this.disabled = false;
        this.animateAreaToggle = false;
        this.dragStart = new core_1.EventEmitter(false);
        this.dragProgress = new core_1.EventEmitter(false);
        this.dragEnd = new core_1.EventEmitter(false);
        /**
         * This event if fired when split area show/hide are done with animations completed.
         * Make sure use debounceTime before subscription to prevent repeated hits in short time
         */
        this.layoutEnd = new core_1.EventEmitter(false);
        this.minPercent = 5;
        this.areas = [];
        this.isDragging = false;
        this.containerSize = 0;
        this.areaASize = 0;
        this.areaBSize = 0;
        this.eventsDragFct = [];
    }
    Object.defineProperty(SplitComponent.prototype, "styleFlexDirection", {
        get: function () {
            return this.direction === 'vertical';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "styleFlexDirectionStyle", {
        get: function () {
            return this.direction === 'horizontal' ? 'row' : 'column';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "dragging", {
        get: function () {
            // prevent animation of areas when animateAreaToggle is false, or resizing
            return !this.animateAreaToggle || this.isDragging;
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
    Object.defineProperty(SplitComponent.prototype, "visibleAreas", {
        get: function () {
            return this.areas.filter(function (a) { return a.component.visible; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SplitComponent.prototype, "nbGutters", {
        get: function () {
            return this.visibleAreas.length - 1;
        },
        enumerable: true,
        configurable: true
    });
    SplitComponent.prototype.ngOnChanges = function (changes) {
        if (changes['gutterSize'] || changes['disabled']) {
            this.refresh();
        }
    };
    SplitComponent.prototype.addArea = function (component, orderUser, sizeUser, minPixel) {
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
    SplitComponent.prototype.hideArea = function (area) {
        var item = this.areas.find(function (a) { return a.component === area; });
        if (item) {
            this.refresh();
        }
    };
    SplitComponent.prototype.showArea = function (area) {
        var item = this.areas.find(function (a) { return a.component === area; });
        if (item) {
            this.refresh();
        }
    };
    SplitComponent.prototype.isLastVisibleArea = function (area) {
        var visibleAreas = this.visibleAreas;
        return visibleAreas.length > 0 ? area === visibleAreas[visibleAreas.length - 1] : false;
    };
    SplitComponent.prototype.refresh = function () {
        var _this = this;
        this.stopDragging();
        var visibleAreas = this.visibleAreas;
        // ORDERS: Set css 'order' property depending on user input or added order
        var nbCorrectOrder = this.areas.filter(function (a) { return a.orderUser !== null && !isNaN(a.orderUser); }).length;
        if (nbCorrectOrder === this.areas.length) {
            this.areas.sort(function (a, b) { return +a.orderUser - +b.orderUser; });
        }
        if (this.areas.length > 1) {
            var l = this.areas.length;
            var c = 0;
            var sub = this.areas[0].component.sizingEnd
                .merge(this.areas
                .filter(function (a, i) { return i > 0; })
                .map(function (a) { return a.component.sizingEnd; }))
                .debounceTime(500)
                .distinctUntilChanged()
                .subscribe(function (evt) {
                _this.notify('sizingEnd');
                sub.unsubscribe();
            });
        }
        this.areas.forEach(function (a, i) {
            a.order = i * 2;
            a.component.setStyle('order', a.order);
        });
        // SIZES: Set css 'flex-basis' property depending on user input or equal sizes
        var totalSize = visibleAreas.map(function (a) { return a.sizeUser; }).reduce(function (acc, s) { return acc + s; }, 0);
        var nbCorrectSize = visibleAreas.filter(function (a) { return a.sizeUser !== null && !isNaN(a.sizeUser) && a.sizeUser >= _this.minPercent; }).length;
        if (totalSize < 99.99 || totalSize > 100.01 || nbCorrectSize !== visibleAreas.length) {
            var size_1 = Number((100 / visibleAreas.length).toFixed(3));
            visibleAreas.forEach(function (a) { return a.size = size_1; });
        }
        else {
            visibleAreas.forEach(function (a) { return a.size = Number(a.sizeUser); });
        }
        this.refreshStyleSizes();
        this.cdRef.markForCheck();
    };
    SplitComponent.prototype.refreshStyleSizes = function () {
        var visibleAreas = this.visibleAreas;
        var f = this.gutterSize * this.nbGutters / visibleAreas.length;
        visibleAreas.forEach(function (a) { return a.component.setStyle('flex-basis', "calc( " + a.size + "% - " + f + "px )"); });
    };
    SplitComponent.prototype.startDragging = function (startEvent, gutterOrder) {
        var _this = this;
        startEvent.preventDefault();
        if (this.disabled) {
            return;
        }
        var areaA = this.areas.find(function (a) { return a.order === gutterOrder - 1; });
        var areaB = this.areas.find(function (a) { return a.order === gutterOrder + 1; });
        if (!areaA || !areaB) {
            return;
        }
        var prop = (this.direction === 'horizontal') ? 'offsetWidth' : 'offsetHeight';
        this.containerSize = this.elementRef.nativeElement[prop];
        this.areaASize = this.containerSize * areaA.size / 100;
        this.areaBSize = this.containerSize * areaB.size / 100;
        var start;
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
    SplitComponent.prototype.dragEvent = function (event, start, areaA, areaB) {
        if (!this.isDragging) {
            return;
        }
        var end;
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
    SplitComponent.prototype.drag = function (start, end, areaA, areaB) {
        var offsetPixel = (this.direction === 'horizontal') ? (start.x - end.x) : (start.y - end.y);
        var newSizePixelA = this.areaASize - offsetPixel;
        var newSizePixelB = this.areaBSize + offsetPixel;
        if (newSizePixelA <= areaA.minPixel && newSizePixelB < areaB.minPixel) {
            return;
        }
        var newSizePercentA = newSizePixelA / this.containerSize * 100;
        var newSizePercentB = newSizePixelB / this.containerSize * 100;
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
    SplitComponent.prototype.notify = function (type) {
        var data = this.visibleAreas.map(function (a) { return a.size; });
        switch (type) {
            case 'start':
                return this.dragStart.emit(data);
            case 'progress':
                return this.dragProgress.emit(data);
            case 'end':
                return this.dragEnd.emit(data);
            case 'sizingEnd':
                return this.layoutEnd.emit(data);
        }
    };
    SplitComponent.prototype.ngOnDestroy = function () {
        this.stopDragging();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], SplitComponent.prototype, "direction", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SplitComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SplitComponent.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SplitComponent.prototype, "gutterSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SplitComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SplitComponent.prototype, "animateAreaToggle", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SplitComponent.prototype, "dragStart", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SplitComponent.prototype, "dragProgress", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SplitComponent.prototype, "dragEnd", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SplitComponent.prototype, "layoutEnd", void 0);
    __decorate([
        core_1.HostBinding('class.vertical'), 
        __metadata('design:type', Object)
    ], SplitComponent.prototype, "styleFlexDirection", null);
    __decorate([
        core_1.HostBinding('style.flex-direction'), 
        __metadata('design:type', Object)
    ], SplitComponent.prototype, "styleFlexDirectionStyle", null);
    __decorate([
        core_1.HostBinding('class.notrans'), 
        __metadata('design:type', Object)
    ], SplitComponent.prototype, "dragging", null);
    __decorate([
        core_1.HostBinding('style.width'), 
        __metadata('design:type', Object)
    ], SplitComponent.prototype, "styleWidth", null);
    __decorate([
        core_1.HostBinding('style.height'), 
        __metadata('design:type', Object)
    ], SplitComponent.prototype, "styleHeight", null);
    SplitComponent = __decorate([
        core_1.Component({
            selector: 'split',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            styles: ["\n        :host {\n            display: flex;\n            flex-wrap: nowrap;\n            justify-content: flex-start;\n            flex-direction: row;\n        }\n\n        :host.vertical {\n            flex-direction: column;\n        }\n\n        split-gutter {\n            flex-grow: 0;\n            flex-shrink: 0;\n            flex-basis: 10px;\n            height: 100%;\n            background-color: #eeeeee;\n            background-position: 50%;\n            background-repeat: no-repeat;\n        }\n\n        :host.vertical split-gutter {\n            width: 100%;\n        }\n\n        :host /deep/ split-area {\n            transition: flex-basis 0.3s;\n        }  \n\n        :host.notrans /deep/ split-area {\n            transition: none !important;\n        }      \n\n        :host /deep/ split-area.notshow {\n            flex-basis: 0 !important;\n            overflow: hidden !important;\n        }      \n\n        :host.vertical /deep/ split-area.notshow {\n            max-width: 0;\n            flex-basis: 0 !important;\n            overflow: hidden !important;\n        }\n    "],
            template: "\n        <ng-content></ng-content>\n        <template ngFor let-area [ngForOf]=\"areas\" let-index=\"index\" let-last=\"last\">\n            <split-gutter *ngIf=\"last === false && area.component.visible === true && !isLastVisibleArea(area)\" \n                          [order]=\"index*2+1\"\n                          [direction]=\"direction\"\n                          [size]=\"gutterSize\"\n                          [disabled]=\"disabled\"\n                          (mousedown)=\"startDragging($event, index*2+1)\"\n                          (touchstart)=\"startDragging($event, index*2+1)\"></split-gutter>\n        </template>",
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef, core_1.ElementRef, core_1.Renderer])
    ], SplitComponent);
    return SplitComponent;
}());
exports.SplitComponent = SplitComponent;
//# sourceMappingURL=C:/dev/angular-split/split.component.js.map