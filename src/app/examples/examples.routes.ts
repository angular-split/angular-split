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
    loadComponent: () => import('./simple-split/simple-split.component').then((m) => m.SimpleSplitComponent),
  },
  {
    data: {
      type: ExampleEnum.MINMAX,
      label: 'Split with minSize & maxSize',
      srcUrl: `${srcUrlBaseApp}/min-max-split/min-max-split.component.ts`,
    },
    path: 'min-max-split',
    loadComponent: () => import('./min-max-split/min-max-split.component').then((m) => m.MinMaxSplitComponent),
  },
  {
    data: {
      type: ExampleEnum.NESTED,
      label: 'Nested splits',
      srcUrl: `${srcUrlBaseApp}/nested-split/nested-split.component.ts`,
    },
    path: 'nested-split',
    loadComponent: () => import('./nested-split/nested-split.component').then((m) => m.NestedComponent),
  },
  {
    data: {
      type: ExampleEnum.IFRAME,
      label: 'Split containing iframes',
      srcUrl: `${srcUrlBaseApp}/iframes/iframes.component.ts`,
    },
    path: 'iframes',
    loadComponent: () => import('./iframes/iframes.component').then((m) => m.IframesComponent),
  },
  {
    data: {
      type: ExampleEnum.TRANSITION,
      label: 'Split with transitions',
      srcUrl: `${srcUrlBaseApp}/split-transitions/split-transitions.component.ts`,
    },
    path: 'split-transitions',
    loadComponent: () =>
      import('./split-transitions/split-transitions.component').then((m) => m.SplitTransitionsComponent),
  },
  {
    data: {
      type: ExampleEnum.SYNC,
      label: 'Split synchronized',
      srcUrl: `${srcUrlBaseApp}/sync-split/sync-split.component.ts`,
    },
    path: 'sync-split',
    loadComponent: () => import('./sync-split/sync-split.component').then((m) => m.SyncSplitComponent),
  },
  {
    data: {
      type: ExampleEnum.STYLE,
      label: 'Split with custom gutter style',
      srcUrl: `${srcUrlBaseApp}/custom-gutter-style/custom-gutter-style.component.ts`,
    },
    path: 'custom-gutter-style',
    loadComponent: () =>
      import('./custom-gutter-style/custom-gutter-style.component').then((m) => m.CustomGutterStyleComponent),
  },
  {
    data: {
      type: ExampleEnum.TOGGLE,
      label: 'Toggling areas using <code>[visible]</code> and <code>*ngIf</code>',
      srcUrl: `${srcUrlBaseApp}/toggling-dom-and-visibility/toggling-dom-and-visibility.component.ts`,
    },
    path: 'toggling-dom-and-visibility',
    loadComponent: () =>
      import('./toggling-dom-and-visibility/toggling-dom-and-visibility.component').then(
        (m) => m.TogglingDomAndVisibleComponent,
      ),
  },
  {
    data: {
      type: ExampleEnum.CLICK,
      label: 'Roll/unroll area on <code>(gutterClick)</code> event',
      srcUrl: `${srcUrlBaseApp}/gutter-click-roll-unroll/gutter-click-roll-unroll.component.ts`,
    },
    path: 'gutter-click-roll-unroll',
    loadComponent: () =>
      import('./gutter-click-roll-unroll/gutter-click-roll-unroll.component').then(
        (m) => m.GutterClickRollUnrollComponent,
      ),
  },
  {
    data: {
      type: ExampleEnum.CODE,
      label: 'Access and interact <code>SplitComponent</code> from TS class',
      srcUrl: `${srcUrlBaseApp}/access-from-class/access-from-class.component.ts`,
    },
    path: 'access-from-class',
    loadComponent: () =>
      import('./access-from-class/access-from-class.component').then((m) => m.AccessFromClassComponent),
  },
  {
    data: {
      type: ExampleEnum.GEEK,
      label: 'Geek demo (100% dynamic)',
      srcUrl: `${srcUrlBaseApp}/geek-demo/geek-demo.component.ts`,
    },
    path: 'geek-demo',
    loadComponent: () => import('./geek-demo/geek-demo.component').then((m) => m.GeekDemoComponent),
  },
  {
    data: {
      type: ExampleEnum.DIR,
      label: 'Split inside right to left (RTL) page',
      srcUrl: `${srcUrlBaseApp}/dir-rtl/dir-rtl.component.ts`,
    },
    path: 'dir-rtl',
    loadComponent: () => import('./dir-rtl/dir-rtl.component').then((m) => m.DirRtlComponent),
  },
  {
    data: {
      type: ExampleEnum.WORKSPACE,
      label: 'Fullscreen workspace saved in localStorage',
      srcUrl: `${srcUrlBaseApp}/workspace-localstorage/workspace-localstorage.component.ts`,
    },
    path: 'workspace-localstorage',
    loadComponent: () =>
      import('./workspace-localstorage/workspace-localstorage.component').then((m) => m.WorkspaceLocalstorageComponent),
  },
  {
    data: {
      type: ExampleEnum.GLOBAL,
      label: 'Split with global settings',
      srcUrl: `${srcUrlBaseApp}/global-options/global-options.component.ts`,
    },
    path: 'global-options',
    loadComponent: () => import('./global-options/global-options.component').then((m) => m.GlobalOptionsComponent),
  },
]
