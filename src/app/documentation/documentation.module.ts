import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DocumentationComponent } from './documentation.component'

@NgModule({
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: DocumentationComponent }])],
  declarations: [DocumentationComponent],
})
export class DocumentationModule {}
