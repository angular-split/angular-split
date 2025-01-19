/*
 * Public API Surface of angular-split
 */

export { AngularSplitDefaultOptions, provideAngularSplitOptions } from './lib/angular-split-config.token'
export { SplitGutterDragHandleDirective } from './lib/gutter/split-gutter-drag-handle.directive'
export { SplitGutterExcludeFromDragDirective } from './lib/gutter/split-gutter-exclude-from-drag.directive'
export { SplitGutterDirective, SplitGutterTemplateContext } from './lib/gutter/split-gutter.directive'
export {
  SplitAreaSize,
  SplitAreaSizeInput,
  SplitDir,
  SplitDirection,
  SplitGutterInteractionEvent,
  SplitUnit,
} from './lib/models'
export { SplitAreaComponent } from './lib/split-area/split-area.component'
export { AngularSplitModule } from './lib/split-module.module'
export { SplitComponent } from './lib/split/split.component'
