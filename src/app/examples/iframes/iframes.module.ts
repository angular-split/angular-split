import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AngularSplitModule } from 'angular-split'
import { UiModule } from '../../ui/ui.module'
import { IframesComponent } from './iframes.component'

@NgModule({
  imports: [UiModule, RouterModule.forChild([{ path: '', component: IframesComponent }]), AngularSplitModule],
  declarations: [IframesComponent],
})
export class IframesModule {}
