import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { ChangelogComponent } from './changelog.component'
import { ChangelogService } from './changelog.service'
import { AsyncPipe } from '@angular/common'

@NgModule({
  imports: [AsyncPipe, RouterModule.forChild([{ path: '', component: ChangelogComponent }])],
  declarations: [ChangelogComponent],
  providers: [ChangelogService],
})
export class ChangelogModule {}
