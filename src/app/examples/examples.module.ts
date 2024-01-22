import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { exampleRoutes } from './examples.routes'

@NgModule({
  imports: [RouterModule.forChild([...exampleRoutes])],
})
export class ExamplesModule {}
