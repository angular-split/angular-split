import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { GlobalOptionsComponent } from './global-options.component'
import { AngularSplitModule } from 'angular-split'
import { UiModule } from '../../ui/ui.module'
import { ANGULAR_SPLIT_DEFAULT_OPTIONS } from 'angular-split'

@NgModule({
  declarations: [GlobalOptionsComponent],
  imports: [RouterModule.forChild([{ path: '', component: GlobalOptionsComponent }]), AngularSplitModule, UiModule],
  providers: [
    {
      provide: ANGULAR_SPLIT_DEFAULT_OPTIONS,
      useValue: {
        direction: 'vertical',
        gutterSize: 30,
      },
    },
  ],
})
export class GlobalOptionsModule {}
