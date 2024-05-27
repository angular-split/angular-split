export type SplitAreaSize = number | '*'

export type SplitAreaSizeInput = SplitAreaSize | `${number}` | undefined | null

const internalAreaSizeTransform = (areaSize: SplitAreaSizeInput): SplitAreaSize =>
  areaSize === undefined || areaSize === null || areaSize === '*' ? '*' : +areaSize

export const areaSizeTransform = (areaSize: SplitAreaSizeInput): SplitAreaSize | 'auto' =>
  internalAreaSizeTransform(areaSize)

export const boundaryAreaSizeTransform = (areaSize: SplitAreaSizeInput): SplitAreaSize =>
  internalAreaSizeTransform(areaSize)

export type SplitDirection = 'horizontal' | 'vertical'

export type SplitDir = 'ltr' | 'rtl'

export type SplitUnit = 'pixel' | 'percent'

export interface SplitGutterInteractionEvent {
  gutterNum: number
  sizes: SplitAreaSize[]
}
