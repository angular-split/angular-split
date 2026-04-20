import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
import { importProvidersFrom, provideZoneChangeDetection } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser'
import { provideAnimations } from '@angular/platform-browser/animations'
import { provideRouter, Routes } from '@angular/router'
import { AppComponent } from './app/app.component'

const routes: Routes = [
  { path: '', loadComponent: () => import('./app/home/home.component').then((m) => m.HomeComponent) },
  {
    path: 'changelog',
    loadComponent: () => import('./app/changelog/changelog.component').then((m) => m.ChangelogComponent),
  },
  {
    path: 'documentation',
    loadComponent: () => import('./app/documentation/documentation.component').then((m) => m.DocumentationComponent),
  },
  {
    path: 'examples',
    loadChildren: () => import('./app/examples/examples.routes').then((m) => m.exampleRoutes),
  },
]

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(),
    importProvidersFrom(BrowserModule, FormsModule),
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
  ],
}).catch((err) => console.error(err))
