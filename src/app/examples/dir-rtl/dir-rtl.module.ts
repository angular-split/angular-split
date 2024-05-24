import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AngularSplitModule } from 'angular-split'
import { UiModule } from '../../ui/ui.module'
import { DirRtlComponent } from './dir-rtl.component'

@NgModule({
  imports: [UiModule, RouterModule.forChild([{ path: '', component: DirRtlComponent }]), AngularSplitModule],
  declarations: [DirRtlComponent],
})
export class DirRtlModule {}
