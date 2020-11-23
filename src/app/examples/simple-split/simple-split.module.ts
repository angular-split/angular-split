import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AngularSplitModule } from 'angular-split'
import { UiModule } from '../../ui/ui.module'
import { SimpleSplitComponent } from './simple-split.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: SimpleSplitComponent }]),
    AngularSplitModule,
    UiModule,
  ],
  declarations: [SimpleSplitComponent],
})
export class SimpleSplitModule {}
