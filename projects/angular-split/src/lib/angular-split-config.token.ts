import { InjectionToken, Provider } from '@angular/core'
import { SplitDir, SplitDirection, SplitUnit } from './models'

export interface AngularSplitDefaultOptions {
  dir: SplitDir
  direction: SplitDirection
  disabled: boolean
  gutterDblClickDuration: number
  gutterSize: number
  gutterStep: number
  gutterClickDeltaPx: number
  restrictMove: boolean
  unit: SplitUnit
  useTransition: boolean
}

const defaultOptions: AngularSplitDefaultOptions = {
  dir: 'ltr',
  direction: 'horizontal',
  disabled: false,
  gutterDblClickDuration: 0,
  gutterSize: 11,
  gutterStep: 1,
  gutterClickDeltaPx: 2,
  restrictMove: false,
  unit: 'percent',
  useTransition: false,
}

export const ANGULAR_SPLIT_DEFAULT_OPTIONS = new InjectionToken<AngularSplitDefaultOptions>(
  'angular-split-global-config',
  { providedIn: 'root', factory: () => defaultOptions },
)

export function provideAngularSplitOptions(options: Partial<AngularSplitDefaultOptions>): Provider {
  return {
    provide: ANGULAR_SPLIT_DEFAULT_OPTIONS,
    useValue: {
      ...defaultOptions,
      ...options,
    },
  }
}
