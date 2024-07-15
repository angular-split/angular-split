import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { HomeComponent } from './home.component'

@NgModule({
  imports: [CommonModule, RouterModule.forChild([{ path: '', component: HomeComponent }]), HomeComponent],
})
export class HomeModule {}
