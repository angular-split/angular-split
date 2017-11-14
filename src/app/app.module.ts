import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { AngularSplitModule } from 'angular-split'

import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar.component';

import { HomeComponent } from './home/home.route.component';
import { ChangelogComponent } from './changelog/changelog.route.component';
import { DocComponent } from './doc/doc.route.component';

import { ExamplesComponent } from './examples/examples.route.component';
import { HorizontalComponent } from './examples/horizontal.route.component';
import { VerticalComponent } from './examples/vertical.route.component';
import { NestedComponent } from './examples/nested.route.component';
import { TogglingDomAndVisibleComponent } from './examples/togglingDomAndVisible.route.component';
import { GutterClickComponent } from './examples/gutterClick.route.component';
import { ClassAccessComponent } from './examples/classAccess.route.component';
import { GeekDemoComponent } from './examples/geekDemo.route.component';
import { WorkspaceLocalstorageComponent } from './examples/workspaceLocalstorage.route.component';


const routes = [
  { path: '', component: HomeComponent },
  { path: 'changelog', component: ChangelogComponent },
  { path: 'documentation', component: DocComponent },
  { path: 'examples', component: ExamplesComponent },
  { path: 'examples/horizontal-split', component: HorizontalComponent },
  { path: 'examples/vertical-split', component: VerticalComponent },
  { path: 'examples/nested-split', component: NestedComponent },
  { path: 'examples/toggling-dom-and-visibility', component: TogglingDomAndVisibleComponent },
  { path: 'examples/gutter-click-roll-unroll', component: GutterClickComponent },
  { path: 'examples/access-from-class', component: ClassAccessComponent },
  { path: 'examples/geek-demo', component: GeekDemoComponent },
  { path: 'examples/workspace-localstorage', component: WorkspaceLocalstorageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    HomeComponent,
    ChangelogComponent,
    DocComponent,
    ExamplesComponent,
    HorizontalComponent,
    VerticalComponent,
    NestedComponent,
    TogglingDomAndVisibleComponent,
    GutterClickComponent,
    ClassAccessComponent,
    GeekDemoComponent,
    WorkspaceLocalstorageComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ButtonsModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgxPageScrollModule,
    AngularSplitModule,
  ],
  providers: [{
    provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
