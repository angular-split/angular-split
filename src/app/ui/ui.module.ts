import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AngularSplitModule } from 'angular-split'
import { ButtonsModule } from 'ngx-bootstrap/buttons'
import { CollapseModule } from 'ngx-bootstrap/collapse'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { SortableModule } from 'ngx-bootstrap/sortable'
import { TooltipModule } from 'ngx-bootstrap/tooltip'
import { ExampleTitleComponent } from './components/exampleTitle.component'
import { TopbarComponent } from './components/topbar.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ButtonsModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    SortableModule.forRoot(),
    TooltipModule.forRoot(),
    AngularSplitModule,
  ],
  declarations: [ExampleTitleComponent, TopbarComponent],
  exports: [ExampleTitleComponent, TopbarComponent, ButtonsModule, SortableModule, TooltipModule],
})
export class UiModule {}
