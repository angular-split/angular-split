import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }   from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { AngularSplitModule } from 'angular-split';

import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar.component';
import { ExampleTitleComponent } from './exampleTitle.component';
import { HomeComponent } from './home/home.route.component';
import { ChangelogComponent } from './changelog/changelog.route.component';
import { DocComponent } from './doc/doc.route.component';

import { SimpleComponent } from './examples/simple.route.component';
import { NestedComponent } from './examples/nested.route.component';
import { TransitionsComponent } from './examples/transitions.route.component';
import { SyncComponent } from './examples/sync.route.component';
import { CustomGutterStyleComponent } from './examples/customGutterStyle.route.component';
import { TogglingDomAndVisibleComponent } from './examples/togglingDomAndVisible.route.component';
import { GutterClickComponent } from './examples/gutterClick.route.component';
import { ClassAccessComponent } from './examples/classAccess.route.component';
import { GeekDemoComponent } from './examples/geekDemo.route.component';
import { DirRtlComponent } from './examples/dirRtl.route.component';
import { WorkspaceLocalstorageComponent } from './examples/workspaceLocalstorage.route.component';

import { ChangelogService } from './changelog.service';

import { examples } from './listExamples';



const routes = [
    { path: '', component: HomeComponent },
    { path: 'changelog', component: ChangelogComponent },
    { path: 'documentation', component: DocComponent },
    ...examples
];

@NgModule({
    declarations: [
        AppComponent,
        TopbarComponent,
        HomeComponent,
        ChangelogComponent,
        DocComponent,
        ExampleTitleComponent,
        SimpleComponent,
        NestedComponent,
        TransitionsComponent,
        SyncComponent,
        CustomGutterStyleComponent,
        TogglingDomAndVisibleComponent,
        GutterClickComponent,
        ClassAccessComponent,
        GeekDemoComponent,
        DirRtlComponent,
        WorkspaceLocalstorageComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
        FormsModule,
        ButtonsModule.forRoot(),
        CollapseModule.forRoot(),
        BsDropdownModule.forRoot(),
        SortableModule.forRoot(),
        AngularSplitModule,
    ],
    providers: [{
        provide: LocationStrategy, useClass: HashLocationStrategy},
        ChangelogService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
