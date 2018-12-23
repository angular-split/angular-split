import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';

import { SplitComponent } from './component/split.component';
import { SplitAreaDirective } from './directive/splitArea.directive';
import { UndetectedEventPlugin } from "./service/UndetectedEventPlugin";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SplitComponent,
        SplitAreaDirective,
    ],
    exports: [
        SplitComponent,
        SplitAreaDirective,
    ]
})
export class AngularSplitModule {

    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: AngularSplitModule,
            providers: [{
                provide: EVENT_MANAGER_PLUGINS,
                useClass: UndetectedEventPlugin,
                multi: true
            }]
        };
    }

    public static forChild(): ModuleWithProviders {
        return {
            ngModule: AngularSplitModule,
            providers: []
        };
    }

}
