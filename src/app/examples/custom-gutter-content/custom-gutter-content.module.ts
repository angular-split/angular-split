import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CustomGutterContentComponent } from './custom-gutter-content.component'
import { RouterModule } from '@angular/router'
import { AngularSplitModule } from 'angular-split'
import { UiModule } from '../../ui/ui.module'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [CustomGutterContentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CustomGutterContentComponent }]),
    AngularSplitModule,
    FormsModule,
    UiModule,
  ],
})
export class CustomGutterContentModule {}
