import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { importProvidersFrom } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideRouter, Routes } from '@angular/router'
import { AppComponent } from './app/app.component'
import { UiModule } from './app/ui/ui.module'

const routes: Routes = [
  { path: '', loadChildren: () => import('./app/home/home.module').then((m) => m.HomeModule) },
  { path: 'changelog', loadChildren: () => import('./app/changelog/changelog.module').then((m) => m.ChangelogModule) },
  {
    path: 'documentation',
    loadChildren: () => import('./app/documentation/documentation.module').then((m) => m.DocumentationModule),
  },
  {
    path: 'examples',
    loadChildren: () => import('./app/examples/examples.module').then((m) => m.ExamplesModule),
  },
]

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, UiModule, FormsModule),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideRouter(routes),
  ],
}).catch((err) => console.error(err))
