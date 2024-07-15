import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AngularSplitModule } from 'angular-split'
import { UiModule } from '../../ui/ui.module'
import { TogglingDomAndVisibleComponent } from './toggling-dom-and-visibility.component'

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    RouterModule.forChild([{ path: '', component: TogglingDomAndVisibleComponent }]),
    AngularSplitModule,
    TogglingDomAndVisibleComponent,
  ],
})
export class TogglingDomAndVisibilityModule {}
