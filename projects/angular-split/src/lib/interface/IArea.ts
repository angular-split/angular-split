import { SplitAreaDirective } from "../directive/splitArea.directive";

export interface IArea {
    component: SplitAreaDirective;
    order: number;
    size: number;
    minSize?: number;
    maxSize?: number;
}