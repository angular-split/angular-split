import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ChangelogComponent } from './changelog.component'
import { ChangelogService } from './changelog.service'

@NgModule({
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: ChangelogComponent }])],
  declarations: [ChangelogComponent],
  providers: [ChangelogService],
})
export class ChangelogModule {}
