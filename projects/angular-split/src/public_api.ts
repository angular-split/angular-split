/*
 * Public API Surface of angular-split
 */

export { AngularSplitModule } from './lib/split-module.module'
export { SplitComponent } from './lib/split/split.component'
export { SplitGutterDirective, SplitGutterTemplateContext } from './lib/gutter/split-gutter.directive'
export { SplitGutterDragHandleDirective } from './lib/gutter/split-gutter-drag-handle.directive'
export { SplitGutterExcludeFromDragDirective } from './lib/gutter/split-gutter-exclude-from-drag.directive'
export { SplitAreaComponent } from './lib/split-area/split-area.component'
export { AngularSplitDefaultOptions, provideAngularSplitOptions } from './lib/angular-split-config.token'
export {
  SplitAreaSize,
  SplitAreaSizeInput,
  SplitGutterInteractionEvent,
  SplitUnit,
  SplitDir,
  SplitDirection,
} from './lib/models'
