import { Routes } from '@angular/router'

import { ExampleEnum } from './example-types'

const srcUrlBase = 'https://github.com/angular-split/angular-split/blob/main/'
const srcUrlBaseApp = `${srcUrlBase}src/app/examples`

export const exampleRoutes: Routes = [
  {
    data: {
      type: ExampleEnum.SIMPLE,
      label: 'Simple split',
      srcUrl: `${srcUrlBaseApp}/simple-split/simple-split.component.ts`,
    },
    path: 'simple-split',
    loadChildren: () => import('./simple/simple.module').then((m) => m.SimpleModule),
  },
  {
    data: {
      type: ExampleEnum.MINMAX,
      label: 'Split with minSize & maxSize',
      srcUrl: `${srcUrlBaseApp}/min-max-split/min-max-split.component.ts`,
    },
    path: 'min-max-split',
    loadChildren: () => import('./min-max-split/min-max-split.module').then((m) => m.MinMaxSplitModule),
  },
  {
    data: {
      type: ExampleEnum.NESTED,
      label: 'Nested splits',
      srcUrl: `${srcUrlBaseApp}/nested-split/nested-split.component.ts`,
    },
    path: 'nested-split',
    loadChildren: () => import('./nested-split/nested-split.module').then((m) => m.NestedSplitModule),
  },
  {
    data: {
      type: ExampleEnum.IFRAME,
      label: 'Split containing iframes',
      srcUrl: `${srcUrlBaseApp}iframe.route.component.ts`,
    },
    path: 'iframes',
    loadChildren: () => import('./iframes/iframes.module').then((m) => m.IframesModule),
  },
  {
    data: {
      type: ExampleEnum.TRANSITION,
      label: 'Split with transitions',
      srcUrl: `${srcUrlBaseApp}transitions.route.component.ts`,
    },
    path: 'split-transitions',
    loadChildren: () => import('./split-transitions/split-transitions.module').then((m) => m.SplitTransitionsModule),
  },
  {
    data: {
      type: ExampleEnum.SYNC,
      label: 'Split synchronized',
      srcUrl: `${srcUrlBaseApp}sync.route.component.ts`,
    },
    path: 'sync-split',
    loadChildren: () => import('./sync-split/sync-split.module').then((m) => m.SyncSplitModule),
  },
  {
    data: {
      type: ExampleEnum.STYLE,
      label: 'Split with custom gutter style',
      srcUrl: `${srcUrlBaseApp}customGutterStyle.route.component.ts`,
    },
    path: 'custom-gutter-style',
    loadChildren: () =>
      import('./custom-gutter-style/custom-gutter-style.module').then((m) => m.CustomGutterStyleModule),
  },
  {
    data: {
      type: ExampleEnum.TOGGLE,
      label: 'Toggling areas using <code>[visible]</code> and <code>*ngIf</code>',
      srcUrl: `${srcUrlBaseApp}togglingDomAndVisible.route.component.ts`,
    },
    path: 'toggling-dom-and-visibility',
    loadChildren: () =>
      import('./toggling-dom-and-visibility/toggling-dom-and-visibility.module').then(
        (m) => m.TogglingDomAndVisibilityModule,
      ),
  },
  {
    data: {
      type: ExampleEnum.COLLAPSE,
      label: 'Collapse/Expand a specific area',
      srcUrl: `${srcUrlBaseApp}collapseExpandArea.route.component.ts`,
    },
    path: 'collapse-expand',
    loadChildren: () => import('./collapse-expand/collapse-expand.module').then((m) => m.CollapseExpandModule),
  },
  {
    data: {
      type: ExampleEnum.CLICK,
      label: 'Roll/unroll area on <code>(gutterClick)</code> event',
      srcUrl: `${srcUrlBaseApp}gutterClick.route.component.ts`,
    },
    path: 'gutter-click-roll-unroll',
    loadChildren: () =>
      import('./gutter-click-roll-unroll/gutter-click-roll-unroll.module').then((m) => m.GutterClickRollUnrollModule),
  },
  {
    data: {
      type: ExampleEnum.CODE,
      label: 'Access and interact <code>SplitComponent</code> from TS class',
      srcUrl: `${srcUrlBaseApp}classAccess.route.component.ts`,
    },
    path: 'access-from-class',
    loadChildren: () => import('./access-from-class/access-from-class.module').then((m) => m.AccessFromClassModule),
  },
  {
    data: {
      type: ExampleEnum.GEEK,
      label: 'Geek demo (100% dynamic)',
      srcUrl: `${srcUrlBaseApp}geekDemo.route.component.ts`,
    },
    path: 'geek-demo',
    loadChildren: () => import('./geek-demo/geek-demo.module').then((m) => m.GeekDemoModule),
  },
  {
    data: {
      type: ExampleEnum.DIR,
      label: 'Split inside right to left (RTL) page',
      srcUrl: `${srcUrlBaseApp}dirRtl.route.component.ts`,
    },
    path: 'dir-rtl',
    loadChildren: () => import('./dir-rtl/dir-rtl.module').then((m) => m.DirRtlModule),
  },
  {
    data: {
      type: ExampleEnum.WORKSPACE,
      label: 'Fullscreen workspace saved in localStorage',
      srcUrl: `${srcUrlBaseApp}workspaceLocalstorage.route.component.ts`,
    },
    path: 'workspace-localstorage',
    loadChildren: () =>
      import('./workspace-localstorage/workspace-localstorage.module').then((m) => m.WorkspaceLocalstorageModule),
  },
]
