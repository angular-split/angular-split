import { InjectionToken, Provider, inject } from '@angular/core'
import type { SplitDir, SplitDirection, SplitUnit } from './models'

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

/**
 * Provides default options for angular split. The options object has hierarchical inheritance
 * which means only the declared properties will be overridden
 */
export function provideAngularSplitOptions(options: Partial<AngularSplitDefaultOptions>): Provider {
  return {
    provide: ANGULAR_SPLIT_DEFAULT_OPTIONS,
    useFactory: (): AngularSplitDefaultOptions => ({
      ...(inject(ANGULAR_SPLIT_DEFAULT_OPTIONS, { skipSelf: true, optional: true }) ?? defaultOptions),
      ...options,
    }),
  }
}
