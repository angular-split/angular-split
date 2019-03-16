import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../shared-module/shared.module';
import { LazyLoadedComponent } from './lazy-loaded.component';

const routes: Routes = [
  { path: '', component: LazyLoadedComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LazyLoadedComponent]
})
export class LazyLoadedModule {}

