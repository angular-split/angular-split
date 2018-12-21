import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSplitModule } from 'angular-split';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularSplitModule
  ],
  exports: [
    AngularSplitModule
  ]
})
export class SharedModule {

  public static forRoot(): ModuleWithProviders {
      return {
          ngModule: SharedModule,
          providers: [
            ...AngularSplitModule.forRoot().providers
          ]
      };
  }
}
