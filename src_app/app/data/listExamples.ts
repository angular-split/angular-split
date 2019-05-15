import { SimpleComponent } from '../component/examples/simple.route.component';
import { MinMaxComponent } from '../component/examples/minMax.route.component';
import { NestedComponent } from '../component/examples/nested.route.component';
import { IframeComponent } from '../component/examples/iframe.route.component';
import { TransitionsComponent } from '../component/examples/transitions.route.component';
import { SyncComponent } from '../component/examples/sync.route.component';
import { CustomGutterStyleComponent } from '../component/examples/customGutterStyle.route.component';
import { TogglingDomAndVisibleComponent } from '../component/examples/togglingDomAndVisible.route.component';
import { GutterClickComponent } from '../component/examples/gutterClick.route.component';
import { ClassAccessComponent } from '../component/examples/classAccess.route.component';
import { GeekDemoComponent } from '../component/examples/geekDemo.route.component';
import { DirRtlComponent } from '../component/examples/dirRtl.route.component';
import { WorkspaceLocalstorageComponent } from '../component/examples/workspaceLocalstorage.route.component';
import { LazyComponent } from '../component/examples/lazy.route.component';
import { ExampleEnum } from './enum'
import {CollapseExpandComponent} from '../component/examples/collapseExpandArea.route.component';

const srcUrlBase = 'https://github.com/bertrandg/angular-split/blob/master/';
const srcUrlBaseApp = `${ srcUrlBase }src_app/app/component/examples/`;
const srcUrlBaseAppLazy = `${ srcUrlBase }src_lazy_app`;
const srcUrlBaseAppLazy2 = `${ srcUrlBase }src_lazy_app2`;


export const examples: Array<IExampleData> = [
    {
        type: ExampleEnum.SIMPLE,
        path: 'examples/simple-split', 
        component: SimpleComponent,
        label: 'Simple split', 
        srcUrl: `${ srcUrlBaseApp }simple.route.component.ts`,
    },
    {
        type: ExampleEnum.MINMAX,
        path: 'examples/min-max-split', 
        component: MinMaxComponent,
        label: 'Split with minSize & maxSize', 
        srcUrl: `${ srcUrlBaseApp }minMax.route.component.ts`,
    },
    {
        type: ExampleEnum.NESTED,
        path: 'examples/nested-split', 
        component: NestedComponent,
        label: 'Nested splits', 
        srcUrl: `${ srcUrlBaseApp }nested.route.component.ts`,
    },
    {
        type: ExampleEnum.IFRAME,
        path: 'examples/iframes', 
        component: IframeComponent,
        label: 'Split containing iframes', 
        srcUrl: `${ srcUrlBaseApp }iframe.route.component.ts`,
    },
    {
        type: ExampleEnum.TRANSITION,
        path: 'examples/split-transitons', 
        component: TransitionsComponent,
        label: 'Split with transitions', 
        srcUrl: `${ srcUrlBaseApp }transitions.route.component.ts`,
    },
    {
        type: ExampleEnum.SYNC,
        path: 'examples/sync-split', 
        component: SyncComponent,
        label: 'Split synchronized', 
        srcUrl: `${ srcUrlBaseApp }sync.route.component.ts`,
    },
    {
        type: ExampleEnum.STYLE,
        path: 'examples/custom-gutter-style', 
        component: CustomGutterStyleComponent,
        label: 'Split with custom gutter style', 
        srcUrl: `${ srcUrlBaseApp }customGutterStyle.route.component.ts`,
    },
    {
        type: ExampleEnum.TOGGLE,
        path: 'examples/toggling-dom-and-visibility', 
        component: TogglingDomAndVisibleComponent,
        label: 'Toggling areas using <code>[visible]</code> and <code>*ngIf</code>', 
        srcUrl: `${ srcUrlBaseApp }togglingDomAndVisible.route.component.ts`,
    },
    {
        type: ExampleEnum.CLICK,
        path: 'examples/gutter-click-roll-unroll', 
        component: GutterClickComponent,
        label: 'Roll/unroll area on <code>(gutterClick)</code> event', 
        srcUrl: `${ srcUrlBaseApp }gutterClick.route.component.ts`,
    },
    {
        type: ExampleEnum.CODE,
        path: 'examples/access-from-class', 
        component: ClassAccessComponent,
        label: 'Access and interact <code>SplitComponent</code> from TS class', 
        srcUrl: `${ srcUrlBaseApp }classAccess.route.component.ts`,
    },
    {
        type: ExampleEnum.COLLAPSE,
        path: 'examples/collapse-expand',
        component: CollapseExpandComponent,
        label: 'Collapse/Expand a specific area',
        srcUrl: `${ srcUrlBaseApp }collapseExpandArea.route.component.ts`,
    },
    {
        type: ExampleEnum.GEEK,
        path: 'examples/geek-demo', 
        component: GeekDemoComponent,
        label: 'Geek demo (100% dynamic)', 
        srcUrl: `${ srcUrlBaseApp }geekDemo.route.component.ts`,
    },
    {
        type: ExampleEnum.DIR,
        path: 'examples/dir-rtl', 
        component: DirRtlComponent,
        label: 'Split inside right to left (RTL) page', 
        srcUrl: `${ srcUrlBaseApp }dirRtl.route.component.ts`,
    },
    {
        type: ExampleEnum.WORKSPACE,
        path: 'examples/workspace-localstorage', 
        component: WorkspaceLocalstorageComponent,
        label: 'Fullscreen workspace saved in localStorage', 
        srcUrl: `${ srcUrlBaseApp }workspaceLocalstorage.route.component.ts`,
    },
    {
        type: ExampleEnum.LAZY,
        path: 'examples/lazy-loaded-module', 
        component: LazyComponent,
        label: 'Lazy loaded module examples', 
        srcUrl: srcUrlBaseAppLazy,
        srcUrl2: srcUrlBaseAppLazy2,
    },
];
