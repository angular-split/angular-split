import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AngularSplitModule } from 'angular-split'
import { UiModule } from '../../ui/ui.module'
import { MinMaxSplitComponent } from './min-max-split.component'

@NgModule({
  imports: [
    CommonModule,
    AngularSplitModule,
    RouterModule.forChild([{ path: '', component: MinMaxSplitComponent }]),
    UiModule,
    MinMaxSplitComponent,
  ],
})
export class MinMaxSplitModule {}
