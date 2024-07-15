import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AngularSplitModule } from 'angular-split'
import { UiModule } from '../../ui/ui.module'
import { CustomGutterStyleComponent } from './custom-gutter-style.component'

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    RouterModule.forChild([{ path: '', component: CustomGutterStyleComponent }]),
    AngularSplitModule,
    CustomGutterStyleComponent,
  ],
})
export class CustomGutterStyleModule {}
