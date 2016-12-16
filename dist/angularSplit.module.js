"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var split_component_1 = require('./split.component');
var splitArea_directive_1 = require('./splitArea.directive');
var splitGutter_directive_1 = require('./splitGutter.directive');
var AngularSplitModule = (function () {
    function AngularSplitModule() {
    }
    AngularSplitModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: [
                split_component_1.SplitComponent,
                splitArea_directive_1.SplitAreaDirective,
                splitGutter_directive_1.SplitGutterDirective
            ],
            exports: [
                split_component_1.SplitComponent,
                splitArea_directive_1.SplitAreaDirective,
                splitGutter_directive_1.SplitGutterDirective
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AngularSplitModule);
    return AngularSplitModule;
}());
exports.AngularSplitModule = AngularSplitModule;
//# sourceMappingURL=angularSplit.module.js.map