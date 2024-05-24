import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { AngularSplitModule } from 'angular-split'
import { UiModule } from '../../ui/ui.module'
import { GeekDemoComponent } from './geek-demo.component'

@NgModule({
  imports: [
    UiModule,
    RouterModule.forChild([{ path: '', component: GeekDemoComponent }]),
    AngularSplitModule,
    FormsModule,
  ],
  declarations: [GeekDemoComponent],
})
export class GeekDemoModule {}
