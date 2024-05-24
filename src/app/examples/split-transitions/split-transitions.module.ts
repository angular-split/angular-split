import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AngularSplitModule } from 'angular-split'
import { UiModule } from '../../ui/ui.module'
import { SplitTransitionsComponent } from './split-transitions.component'
import { NgClass } from '@angular/common'

@NgModule({
  imports: [
    NgClass,
    UiModule,
    RouterModule.forChild([{ path: '', component: SplitTransitionsComponent }]),
    AngularSplitModule,
  ],
  declarations: [SplitTransitionsComponent],
})
export class SplitTransitionsModule {}
