import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { GlobalOptionsComponent } from './global-options.component'
import { AngularSplitModule, provideAngularSplitOptions } from 'angular-split'
import { UiModule } from '../../ui/ui.module'

@NgModule({
  declarations: [GlobalOptionsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: GlobalOptionsComponent }]),
    AngularSplitModule,
    UiModule,
  ],
  providers: [
    provideAngularSplitOptions({
      direction: 'vertical',
      gutterSize: 30,
    }),
  ],
})
export class GlobalOptionsModule {}
