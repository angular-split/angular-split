import { InjectionToken } from '@angular/core'

export const ANGULAR_SPLIT_DEFAULT_OPTIONS = new InjectionToken<Partial<DefaultOptions>>('angular-split-global-config')

export interface DefaultOptions {
  dir: 'ltr' | 'rtl'
  direction: 'horizontal' | 'vertical'
  disabled: boolean
  gutterDblClickDuration: number
  gutterSize: number | null
  gutterStep: number
  restrictMove: boolean
  unit: 'percent' | 'pixel'
  useTransition: boolean
}
