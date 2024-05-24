import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AngularSplitModule } from 'angular-split'
import { UiModule } from '../../ui/ui.module'
import { GutterClickRollUnrollComponent } from './gutter-click-roll-unroll.component'
import { NgClass } from '@angular/common'

@NgModule({
  imports: [
    NgClass,
    UiModule,
    RouterModule.forChild([{ path: '', component: GutterClickRollUnrollComponent }]),
    AngularSplitModule,
  ],
  declarations: [GutterClickRollUnrollComponent],
})
export class GutterClickRollUnrollModule {}
