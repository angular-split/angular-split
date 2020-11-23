import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AngularSplitModule } from 'angular-split'
import { UiModule } from '../../ui/ui.module'
import { AccessFromClassComponent } from './access-from-class.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: AccessFromClassComponent }]),
    AngularSplitModule.forChild(),
    UiModule,
  ],
  declarations: [AccessFromClassComponent],
})
export class AccessFromClassModule {}
