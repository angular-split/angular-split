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
    loadChildren: () => import('./simple-split/simple-split.module').then((m) => m.SimpleSplitModule),
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
      srcUrl: `${srcUrlBaseApp}/iframes/iframes.component.ts`,
    },
    path: 'iframes',
    loadChildren: () => import('./iframes/iframes.module').then((m) => m.IframesModule),
  },
  {
    data: {
      type: ExampleEnum.TRANSITION,
      label: 'Split with transitions',
      srcUrl: `${srcUrlBaseApp}/split-transitions/split-transitions.component.ts`,
    },
    path: 'split-transitions',
    loadChildren: () => import('./split-transitions/split-transitions.module').then((m) => m.SplitTransitionsModule),
  },
  {
    data: {
      type: ExampleEnum.SYNC,
      label: 'Split synchronized',
      srcUrl: `${srcUrlBaseApp}/sync-split/sync-split.component.ts`,
    },
    path: 'sync-split',
    loadChildren: () => import('./sync-split/sync-split.module').then((m) => m.SyncSplitModule),
  },
  {
    data: {
      type: ExampleEnum.STYLE,
      label: 'Split with custom gutter style',
      srcUrl: `${srcUrlBaseApp}/custom-gutter-style/custom-gutter-style.component.ts`,
    },
    path: 'custom-gutter-style',
    loadChildren: () =>
      import('./custom-gutter-style/custom-gutter-style.module').then((m) => m.CustomGutterStyleModule),
  },
  {
    data: {
      type: ExampleEnum.TOGGLE,
      label: 'Toggling areas using <code>[visible]</code> and <code>*ngIf</code>',
      srcUrl: `${srcUrlBaseApp}/toggling-dom-and-visibility/toggling-dom-and-visibility.component.ts`,
    },
    path: 'toggling-dom-and-visibility',
    loadChildren: () =>
      import('./toggling-dom-and-visibility/toggling-dom-and-visibility.module').then(
        (m) => m.TogglingDomAndVisibilityModule,
      ),
  },
  {
    data: {
      type: ExampleEnum.CLICK,
      label: 'Roll/unroll area on <code>(gutterClick)</code> event',
      srcUrl: `${srcUrlBaseApp}/gutter-click-roll-unroll/gutter-click-roll-unroll.component.ts`,
    },
    path: 'gutter-click-roll-unroll',
    loadChildren: () =>
      import('./gutter-click-roll-unroll/gutter-click-roll-unroll.module').then((m) => m.GutterClickRollUnrollModule),
  },
  {
    data: {
      type: ExampleEnum.CODE,
      label: 'Access and interact <code>SplitComponent</code> from TS class',
      srcUrl: `${srcUrlBaseApp}/access-from-class/access-from-class.component.ts`,
    },
    path: 'access-from-class',
    loadChildren: () => import('./access-from-class/access-from-class.module').then((m) => m.AccessFromClassModule),
  },
  {
    data: {
      type: ExampleEnum.GEEK,
      label: 'Geek demo (100% dynamic)',
      srcUrl: `${srcUrlBaseApp}/geek-demo/geek-demo.component.ts`,
    },
    path: 'geek-demo',
    loadChildren: () => import('./geek-demo/geek-demo.module').then((m) => m.GeekDemoModule),
  },
  {
    data: {
      type: ExampleEnum.DIR,
      label: 'Split inside right to left (RTL) page',
      srcUrl: `${srcUrlBaseApp}/dir-rtl/dir-rtl.component.ts`,
    },
    path: 'dir-rtl',
    loadChildren: () => import('./dir-rtl/dir-rtl.module').then((m) => m.DirRtlModule),
  },
  {
    data: {
      type: ExampleEnum.WORKSPACE,
      label: 'Fullscreen workspace saved in localStorage',
      srcUrl: `${srcUrlBaseApp}/workspace-localstorage/workspace-localstorage.component.ts`,
    },
    path: 'workspace-localstorage',
    loadChildren: () =>
      import('./workspace-localstorage/workspace-localstorage.module').then((m) => m.WorkspaceLocalstorageModule),
  },
  {
    data: {
      type: ExampleEnum.GLOBAL,
      label: 'Split with global settings',
      srcUrl: `${srcUrlBaseApp}/global-options/global-options.component.ts`,
    },
    path: 'global-options',
    loadChildren: () => import('./global-options/global-options.module').then((m) => m.GlobalOptionsModule),
  },
]
