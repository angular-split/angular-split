import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AngularSplitModule } from 'angular-split'
import { UiModule } from '../../ui/ui.module'
import { SyncSplitComponent } from './sync-split.component'

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    RouterModule.forChild([{ path: '', component: SyncSplitComponent }]),
    AngularSplitModule,
    SyncSplitComponent,
  ],
})
export class SyncSplitModule {}
