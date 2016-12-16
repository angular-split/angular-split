import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SplitComponent } from './split.component';
import { SplitAreaDirective } from './splitArea.directive';
import { SplitGutterDirective } from './splitGutter.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SplitComponent,
        SplitAreaDirective,
        SplitGutterDirective
    ],
    exports: [
        SplitComponent,
        SplitAreaDirective,
        SplitGutterDirective
    ]
})
export class AngularSplitModule {}
