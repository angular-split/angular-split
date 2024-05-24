import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AngularSplitModule } from 'angular-split'
import { UiModule } from '../../ui/ui.module'
import { CollapseExpandComponent } from './collapse-expand.component'

@NgModule({
  imports: [UiModule, RouterModule.forChild([{ path: '', component: CollapseExpandComponent }]), AngularSplitModule],
  declarations: [CollapseExpandComponent],
})
export class CollapseExpandModule {}
