import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AngularSplitModule } from 'angular-split'
import { SimpleComponent } from './simple.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: SimpleComponent }]),
    AngularSplitModule.forChild(),
  ],
  declarations: [SimpleComponent],
})
export class SimpleModule {}
