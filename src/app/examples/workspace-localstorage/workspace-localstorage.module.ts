import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AngularSplitModule } from 'angular-split'
import { UiModule } from '../../ui/ui.module'
import { WorkspaceLocalstorageComponent } from './workspace-localstorage.component'

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    RouterModule.forChild([{ path: '', component: WorkspaceLocalstorageComponent }]),
    AngularSplitModule,
  ],
  declarations: [WorkspaceLocalstorageComponent],
})
export class WorkspaceLocalstorageModule {}
