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

import { AppComponent } from './component/app.component';
import { TopbarComponent } from './component/topbar.component';
import { ExampleTitleComponent } from './component/exampleTitle.component';
import { HomeComponent } from './component/home/home.route.component';
import { ChangelogComponent } from './component/changelog/changelog.route.component';
import { DocComponent } from './component/doc/doc.route.component';

import { SimpleComponent } from './component/examples/simple.route.component';
import { NestedComponent } from './component/examples/nested.route.component';
import { TransitionsComponent } from './component/examples/transitions.route.component';
import { SyncComponent } from './component/examples/sync.route.component';
import { CustomGutterStyleComponent } from './component/examples/customGutterStyle.route.component';
import { TogglingDomAndVisibleComponent } from './component/examples/togglingDomAndVisible.route.component';
import { GutterClickComponent } from './component/examples/gutterClick.route.component';
import { ClassAccessComponent } from './component/examples/classAccess.route.component';
import { GeekDemoComponent } from './component/examples/geekDemo.route.component';
import { DirRtlComponent } from './component/examples/dirRtl.route.component';
import { WorkspaceLocalstorageComponent } from './component/examples/workspaceLocalstorage.route.component';

import { ChangelogService } from './service/changelog.service';

import { examples } from './data/listExamples';



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
