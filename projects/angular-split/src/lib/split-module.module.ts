import { NgModule } from '@angular/core'
import { SplitAreaComponent } from './split-area/split-area.component'
import { SplitComponent } from './split/split.component'
import { SplitGutterDirective } from './gutter/split-gutter.directive'
import { SplitGutterDragHandleDirective } from './gutter/split-gutter-drag-handle.directive'
import { SplitGutterExcludeFromDragDirective } from './gutter/split-gutter-exclude-from-drag.directive'

@NgModule({
  imports: [
    SplitComponent,
    SplitAreaComponent,
    SplitGutterDirective,
    SplitGutterDragHandleDirective,
    SplitGutterExcludeFromDragDirective,
  ],
  exports: [
    SplitComponent,
    SplitAreaComponent,
    SplitGutterDirective,
    SplitGutterDragHandleDirective,
    SplitGutterExcludeFromDragDirective,
  ],
})
export class AngularSplitModule {}
