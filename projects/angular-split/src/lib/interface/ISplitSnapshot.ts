import { IAreaSnapshot } from './IAreaSnapshot'

export interface ISplitSnapshot {
	gutterNum: number
	containerSizePixel: number
    lastSteppedOffset: number
    areasBeforeGutter: Array<IAreaSnapshot>
    areasAfterGutter: Array<IAreaSnapshot>
}