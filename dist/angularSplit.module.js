"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var split_component_1 = require('./split.component');
var splitArea_directive_1 = require('./splitArea.directive');
var splitGutter_directive_1 = require('./splitGutter.directive');
var AngularSplitModule = (function () {
    function AngularSplitModule() {
    }
    AngularSplitModule.decorators = [
        { type: core_1.NgModule, args: [{
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
                },] },
    ];
    /** @nocollapse */
    AngularSplitModule.ctorParameters = function () { return []; };
    return AngularSplitModule;
}());
exports.AngularSplitModule = AngularSplitModule;
//# sourceMappingURL=C:/Dev/angular-split_2/angularSplit.module.js.map