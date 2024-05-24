import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DocumentationComponent } from './documentation.component'

@NgModule({
  imports: [RouterModule.forChild([{ path: '', component: DocumentationComponent }])],
  declarations: [DocumentationComponent],
})
export class DocumentationModule {}
