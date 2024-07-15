import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { DocumentationComponent } from './documentation.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: DocumentationComponent }]),
    DocumentationComponent,
  ],
})
export class DocumentationModule {}
