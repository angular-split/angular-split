import type { SplitAreaDirective } from './directive/split-area.directive'

export type ISplitDirection = 'horizontal' | 'vertical'

export type ISplitDir = 'ltr' | 'rtl'

export type IAreaSize = number | '*'

export type ISplitUnit = 'percent' | 'pixel'

export interface IPoint {
  x: number
  y: number
}

export interface IArea {
  component: SplitAreaDirective
  order: number
  size: IAreaSize
  minSize: number | null
  maxSize: number | null
  sizeBeforeCollapse: IAreaSize | null
  gutterBeforeCollapse: number
}

// CREATED ON DRAG START

export interface ISplitSnapshot {
  gutterNum: number
  allAreasSizePixel: number
  allInvolvedAreasSizePercent: number
  lastSteppedOffset: number
  areasBeforeGutter: Array<IAreaSnapshot>
  areasAfterGutter: Array<IAreaSnapshot>
}

export interface IAreaSnapshot {
  area: IArea
  sizePixelAtStart: number
  sizePercentAtStart: IAreaSize
}

// CREATED ON DRAG PROGRESS

export interface ISplitSideAbsorptionCapacity {
  remain: number
  list: Array<IAreaAbsorptionCapacity>
}

export interface IAreaAbsorptionCapacity {
  areaSnapshot: IAreaSnapshot
  pixelAbsorb: number
  percentAfterAbsorption: IAreaSize
  pixelRemain: number
}

export interface IDefaultOptions {
  dir: ISplitDir
  direction: ISplitDirection
  disabled: boolean
  gutterDblClickDuration: number
  gutterSize: number | null
  gutterStep: number
  restrictMove: boolean
  unit: ISplitUnit
  useTransition: boolean
}

// CREATED TO SEND OUTSIDE

export interface IOutputData {
  gutterNum: number
  sizes: IOutputAreaSizes
}

export interface IOutputAreaSizes extends Array<IAreaSize> {}
