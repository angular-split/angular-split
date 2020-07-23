import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AngularSplitModule } from 'angular-split'

@NgModule({
  declarations: [],
  imports: [CommonModule, AngularSplitModule],
  exports: [AngularSplitModule],
})
export class SharedModule {}
