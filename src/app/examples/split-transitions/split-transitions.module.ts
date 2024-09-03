import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AngularSplitModule } from 'angular-split'
import { UiModule } from '../../ui/ui.module'
import { SplitTransitionsComponent } from './split-transitions.component'

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    RouterModule.forChild([{ path: '', component: SplitTransitionsComponent }]),
    AngularSplitModule,
    SplitTransitionsComponent,
  ],
})
export class SplitTransitionsModule {}
