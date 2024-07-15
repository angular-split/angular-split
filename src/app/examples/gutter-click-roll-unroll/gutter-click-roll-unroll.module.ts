import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AngularSplitModule } from 'angular-split'
import { UiModule } from '../../ui/ui.module'
import { GutterClickRollUnrollComponent } from './gutter-click-roll-unroll.component'

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    RouterModule.forChild([{ path: '', component: GutterClickRollUnrollComponent }]),
    AngularSplitModule,
    GutterClickRollUnrollComponent,
  ],
})
export class GutterClickRollUnrollModule {}
