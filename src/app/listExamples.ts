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
import { ExampleEnum } from './enum'

const srcUrlBase = 'https://github.com/bertrandg/angular-split/blob/master/src/app/examples/';


export const examples: Array<IExampleData> = [
    {
        type: ExampleEnum.SIMPLE,
        path: 'examples/simple-split', 
        component: SimpleComponent,
        label: 'Simple split', 
        srcUrl: `${ srcUrlBase }simple.route.component.ts`,
    },
    {
        type: ExampleEnum.NESTED,
        path: 'examples/nested-split', 
        component: NestedComponent,
        label: 'Nested splits', 
        srcUrl: `${ srcUrlBase }nested.route.component.ts`,
    },
    {
        type: ExampleEnum.TRANSITION,
        path: 'examples/split-transitons', 
        component: TransitionsComponent,
        label: 'Split with transitions', 
        srcUrl: `${ srcUrlBase }transitions.route.component.ts`,
    },
    {
        type: ExampleEnum.SYNC,
        path: 'examples/sync-split', 
        component: SyncComponent,
        label: 'Split synchronized', 
        srcUrl: `${ srcUrlBase }sync.route.component.ts`,
    },
    {
        type: ExampleEnum.STYLE,
        path: 'examples/custom-gutter-style', 
        component: CustomGutterStyleComponent,
        label: 'Split with custom gutter style', 
        srcUrl: `${ srcUrlBase }customGutterStyle.route.component.ts`,
    },
    {
        type: ExampleEnum.TOGGLE,
        path: 'examples/toggling-dom-and-visibility', 
        component: TogglingDomAndVisibleComponent,
        label: 'Toggling areas using <code>[visible]</code> and <code>*ngIf</code>', 
        srcUrl: `${ srcUrlBase }togglingDomAndVisible.route.component.ts`,
    },
    {
        type: ExampleEnum.CLICK,
        path: 'examples/gutter-click-roll-unroll', 
        component: GutterClickComponent,
        label: 'Roll/unroll area on <code>(gutterClick)</code> event', 
        srcUrl: `${ srcUrlBase }gutterClick.route.component.ts`,
    },
    {
        type: ExampleEnum.CODE,
        path: 'examples/access-from-class', 
        component: ClassAccessComponent,
        label: 'Access and interact <code>SplitComponent</code> from TS class', 
        srcUrl: `${ srcUrlBase }classAccess.route.component.ts`,
    },
    {
        type: ExampleEnum.GEEK,
        path: 'examples/geek-demo', 
        component: GeekDemoComponent,
        label: 'Geek demo (100% dynamic)', 
        srcUrl: `${ srcUrlBase }geekDemo.route.component.ts`,
    },
    {
        type: ExampleEnum.DIR,
        path: 'examples/dir-rtl', 
        component: DirRtlComponent,
        label: 'Split inside right to left (RTL) page', 
        srcUrl: `${ srcUrlBase }dirRtl.route.component.ts`,
    },
    {
        type: ExampleEnum.WORKSPACE,
        path: 'examples/workspace-localstorage', 
        component: WorkspaceLocalstorageComponent,
        label: 'Fullscreen workspace saved in localStorage', 
        srcUrl: `${ srcUrlBase }workspaceLocalstorage.route.component.ts`,
    },
];
