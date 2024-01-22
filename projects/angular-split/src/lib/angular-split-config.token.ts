import { InjectionToken } from '@angular/core'
import { IDefaultOptions } from './interface'

export const ANGULAR_SPLIT_DEFAULT_OPTIONS = new InjectionToken<Partial<IDefaultOptions>>('angular-split-global-config')
