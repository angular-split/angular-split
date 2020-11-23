import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component'
import { UiModule } from './ui/ui.module'

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then((m) => m.HomeModule) },
  { path: 'changelog', loadChildren: () => import('./changelog/changelog.module').then((m) => m.ChangelogModule) },
  {
    path: 'documentation',
    loadChildren: () => import('./documentation/documentation.module').then((m) => m.DocumentationModule),
  },
  {
    path: 'examples',
    loadChildren: () => import('./examples/examples.module').then((m) => m.ExamplesModule),
  },
]

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    UiModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
