import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SplitComponent } from './component/split.component'
import { SplitAreaDirective } from './directive/split-area.directive'

@NgModule({
  imports: [CommonModule],
  declarations: [SplitComponent, SplitAreaDirective],
  exports: [SplitComponent, SplitAreaDirective],
})
export class AngularSplitModule {}
