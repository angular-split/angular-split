import { ElementRef } from '@angular/core';

import { IPoint, IAreaSnapshot, IAreaAbsorptionCapacity } from './interface';

export function getPointFromEvent(event: MouseEvent | TouchEvent): IPoint {
    // TouchEvent
    if((<TouchEvent> event).touches !== undefined && (<TouchEvent> event).touches.length > 0) {
        return {
            x: (<TouchEvent> event).touches[0].clientX,
            y: (<TouchEvent> event).touches[0].clientY,
        };
    }
    // MouseEvent
    else if((<MouseEvent> event).clientX !== undefined && (<MouseEvent> event).clientY !== undefined) {
        return {
            x: (<MouseEvent> event).clientX,
            y: (<MouseEvent> event).clientY,
        };
    }
    return null;
}

export function getElementPixelSize(elRef: ElementRef, direction: 'horizontal' | 'vertical'): number {
    const rect = (<HTMLElement> elRef.nativeElement).getBoundingClientRect();

    return (direction === 'horizontal') ? rect.width : rect.height;
}

export function getInputBoolean(v: any): boolean {
    return (typeof(v) === 'boolean') ? v : (v === 'false' ? false : true);
}

export function getInputPositiveNumber<T>(v: any, defaultValue: T): number | T {
    v = Number(v);

    return !isNaN(v) && v >= 0 ? v : defaultValue;
}

export function isUserSizesValid(unit: 'percent' | 'pixel', sizes: Array<number | null>): boolean {
    // All sizes have to be not null and total should be 100
    if(unit === 'percent') {
        const total = sizes.reduce((total, s) => s !== null ? total + s : total, 0);
        return sizes.every(s => s !== null) && total > 99.9 && total < 100.1;
    }
    // A size at null is mandatory but only one.
    if(unit === 'pixel') {
        return sizes.filter(s => s === null).length === 1;
    }
}

export function getAreaAbsorptionCapacity(unit: 'percent' | 'pixel', areaSnapshot: IAreaSnapshot, pixels: number): IAreaAbsorptionCapacity {
    // No pain no gain
    if(pixels === 0) {
        return {
            areaSnapshot,
            pixelAbsorb: 0,
            percentAfterAbsorption: 0,
            pixelRemain: 0,
        };
    }
    
    // Area at zero and need to be reduced, not possible
    if(areaSnapshot.area.size === 0 && pixels < 0) {
        return {
            areaSnapshot,
            pixelAbsorb: 0,
            percentAfterAbsorption: 0,
            pixelRemain: pixels,
        };
    }
    
	if(unit === 'pixel') {
        return getAreaAbsorptionCapacityPixel(areaSnapshot, pixels);
    }
    else if(unit === 'percent') {
        return getAreaAbsorptionCapacityPercent(areaSnapshot, pixels);
    }
}

function getAreaAbsorptionCapacityPercent(areaSnapshot: IAreaSnapshot, pixels: number): IAreaAbsorptionCapacity {
    const tempPixelSize = areaSnapshot.sizePixelAtStart + pixels;
    const tempPercentSize = tempPixelSize / areaSnapshot.sizePixelAtStart * areaSnapshot.sizePercentAtStart;

    // ENLARGE AREA

    if(pixels > 0) {
        // If maxSize & newSize bigger than it > absorb to max and return remaining pixels 
        if(areaSnapshot.area.maxSize !== null && tempPercentSize > areaSnapshot.area.maxSize) {
            // Use area.area.maxSize as newPercentSize and return calculate pixels remaining
            const maxPixelAbsorb = areaSnapshot.sizePixelAtStart * areaSnapshot.area.maxSize / areaSnapshot.sizePercentAtStart;
            return {
                areaSnapshot,
                pixelAbsorb: maxPixelAbsorb,
                percentAfterAbsorption: (areaSnapshot.sizePixelAtStart + maxPixelAbsorb) / areaSnapshot.sizePixelAtStart * areaSnapshot.sizePercentAtStart,
                pixelRemain: pixels - maxPixelAbsorb
            };
        }
        return {
            areaSnapshot,
            pixelAbsorb: pixels,
            percentAfterAbsorption: tempPercentSize,
            pixelRemain: 0
        };
    }

    // REDUCE AREA
    
    else if(pixels < 0) {
        // If minSize & newSize smaller than it > absorb to min and return remaining pixels 
        if(areaSnapshot.area.minSize !== null && tempPercentSize < areaSnapshot.area.minSize) {
            // Use area.area.minSize as newPercentSize and return calculate pixels remaining
            const maxPixelAbsorb = areaSnapshot.sizePixelAtStart * areaSnapshot.area.minSize / areaSnapshot.sizePercentAtStart;
            return {
                areaSnapshot,
                pixelAbsorb: maxPixelAbsorb,
                percentAfterAbsorption: (areaSnapshot.sizePixelAtStart + maxPixelAbsorb) / areaSnapshot.sizePixelAtStart * areaSnapshot.sizePercentAtStart,
                pixelRemain: pixels - maxPixelAbsorb
            };
        }
        // If reduced under zero > return remaining pixels
        else if(tempPercentSize < 0) {
            // Use 0 as newPercentSize and return calculate pixels remaining
            return {
                areaSnapshot,
                pixelAbsorb: -areaSnapshot.sizePixelAtStart,
                percentAfterAbsorption: 0,
                pixelRemain: pixels - areaSnapshot.sizePixelAtStart
            };
        }
        return {
            areaSnapshot,
            pixelAbsorb: pixels,
            percentAfterAbsorption: tempPercentSize,
            pixelRemain: 0
        };
    }
}

function getAreaAbsorptionCapacityPixel(areaSnapshot: IAreaSnapshot, pixels: number): IAreaAbsorptionCapacity {
    const tempPixelSize = areaSnapshot.sizePixelAtStart + pixels;
            
    // ENLARGE AREA

    if(pixels > 0) {
        // If maxSize & newSize bigger than it > absorb to max and return remaining pixels 
        if(areaSnapshot.area.maxSize !== null && tempPixelSize > areaSnapshot.area.maxSize) {
            return {
                areaSnapshot,
                pixelAbsorb: areaSnapshot.area.maxSize,
                percentAfterAbsorption: -1,
                pixelRemain: tempPixelSize - areaSnapshot.area.maxSize
            };
        }
        return {
            areaSnapshot,
            pixelAbsorb: pixels,
            percentAfterAbsorption: -1,
            pixelRemain: 0
        };
    }

    // REDUCE AREA
    
    else if(pixels < 0) {
        // If minSize & newSize smaller than it > absorb to min and return remaining pixels 
        if(areaSnapshot.area.minSize !== null && tempPixelSize < areaSnapshot.area.minSize) {
            return {
                areaSnapshot,
                pixelAbsorb: areaSnapshot.area.minSize,
                percentAfterAbsorption: -1,
                pixelRemain: tempPixelSize - areaSnapshot.area.minSize
            };
        }
        // If reduced under zero > return remaining pixels
        else if(tempPixelSize < 0) {
            return {
                areaSnapshot,
                pixelAbsorb: -areaSnapshot.sizePixelAtStart,
                percentAfterAbsorption: -1,
                pixelRemain: pixels - areaSnapshot.sizePixelAtStart
            };
        }
        return {
            areaSnapshot,
            pixelAbsorb: pixels,
            percentAfterAbsorption: -1,
            pixelRemain: 0
        };
    }
}

export function updateAreaSize(unit: 'percent' | 'pixel', item: IAreaAbsorptionCapacity): boolean {
    if(item.pixelAbsorb === 0) {
        return Boolean(item.pixelRemain > 0);
    }

    if(unit === 'percent') {
        item.areaSnapshot.area.size = item.percentAfterAbsorption;
    }
    else if(unit === 'pixel') {
        // Update size except for the wildcard size area
        if(item.areaSnapshot.area.size !== null) {
            item.areaSnapshot.area.size += item.pixelAbsorb;
        }
    }

    return Boolean(item.pixelRemain > 0);
}
