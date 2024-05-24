import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AngularSplitModule } from 'angular-split'
import { UiModule } from '../../ui/ui.module'
import { NestedComponent } from './nested-split.component'

@NgModule({
  imports: [AngularSplitModule, RouterModule.forChild([{ path: '', component: NestedComponent }]), UiModule],
  declarations: [NestedComponent],
})
export class NestedSplitModule {}
