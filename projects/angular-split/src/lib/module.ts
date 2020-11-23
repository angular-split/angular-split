import { NgModule, ModuleWithProviders } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SplitComponent } from './component/split.component'
import { SplitAreaDirective } from './directive/split-area.directive'

@NgModule({
  imports: [CommonModule],
  declarations: [SplitComponent, SplitAreaDirective],
  exports: [SplitComponent, SplitAreaDirective],
})
export class AngularSplitModule {
  public static forRoot(): ModuleWithProviders<AngularSplitModule> {
    console.warn(`AngularSplitModule.forRoot() is deprecated and will be removed in v6`)
    return {
      ngModule: AngularSplitModule,
      providers: [],
    }
  }

  public static forChild(): ModuleWithProviders<AngularSplitModule> {
    console.warn(`AngularSplitModule.forChild() is deprecated and will be removed in v6`)
    return {
      ngModule: AngularSplitModule,
      providers: [],
    }
  }
}
