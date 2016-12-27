import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CollapseModule } from 'ng2-bootstrap'
import { AngularSplitModule } from 'angular-split'

import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar.component';
import { HomeComponent } from './home/home.route.component';
import { DocComponent } from './doc/doc.route.component';
import { ExamplesComponent } from './examples/examples.route.component';
import { AdvancedExampleComponent } from './advancedExample/advancedExample.route.component';


const routes = [
  { path: '', component: HomeComponent },
  { path: 'documentation', component: DocComponent },
  { path: 'examples', component: ExamplesComponent },
  { path: 'advanced-example', component: AdvancedExampleComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    HomeComponent,
    DocComponent,
    ExamplesComponent,
    AdvancedExampleComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CollapseModule,
    AngularSplitModule
  ],
  providers: [{
    provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
