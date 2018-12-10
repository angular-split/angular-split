import { SplitAreaDirective } from "./directive/splitArea.directive";

export interface IPoint {
    x: number;
    y: number;
}

export interface IArea {
    component: SplitAreaDirective;
    order: number;
    size: number;
    minSize?: number;
    maxSize?: number;
}

export interface ISplitSnapshot {
    gutterNum: number
	containerSizePixel: number
    lastSteppedOffset: number
    areasBeforeGutter: Array<IAreaSnapshot>
    areasAfterGutter: Array<IAreaSnapshot>
}

export interface IAreaSnapshot {
    area: IArea
    sizePixelAtStart: number
    sizePercentAtStart: number
}

export interface ISplitSideAbsorptionSnapshot {
    remain: number
    list: Array<IAreaAbsorptionSnapshot>
}

export interface IAreaAbsorptionSnapshot {
    areaSnapshot: IAreaSnapshot
    absorb: number
    remain: number
}