import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AngularSplitModule } from 'angular-split'
import { UiModule } from '../../ui/ui.module'
import { SyncSplitComponent } from './sync-split.component'

@NgModule({
  imports: [UiModule, RouterModule.forChild([{ path: '', component: SyncSplitComponent }]), AngularSplitModule],
  declarations: [SyncSplitComponent],
})
export class SyncSplitModule {}
