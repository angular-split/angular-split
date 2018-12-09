import { ElementRef } from '@angular/core';

import { IPoint } from './interface/IPoint';
import { ISplitSnapshot } from './interface/ISplitSnapshot';
import { IAreaSnapshot } from './interface/IAreaSnapshot';

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
    return elRef.nativeElement[(direction === 'horizontal') ? 'offsetWidth' : 'offsetHeight'];

}

export function getInputBoolean(v: any): boolean {
    return (typeof(v) === 'boolean') ? v : (v === 'false' ? false : true);
}

export function getInputPositiveNumber(v: any, defaultValue: any): any {
    v = Number(v);

    return !isNaN(v) && v >= 0 ? v : defaultValue;
}


export function isValidTotalSize(total: number): boolean {
    return total > 99.9 && total < 100.1;
}

export function getSteppedValue(value: number, step: number): number {
    return Math.round(value / step) * step;
}

// Return how many pixels can't be absorbed by the area!
// If output = 0 -> area can absorb all
// If output = pixels -> area can absorb nothing (already at min/0/max)
// If 0 < output < pixelToAbsorb -> area can absorb part of it
//  _______________________________________
// |_____________size_(%_/_px)___________<_| >
//  ___________________
// |_minSize_(%_/_px)__|
//  _________________________________________________
// |________________maxSize_(%_/_px)_________________|
//
export function areaAbsorb(unit: 'percent' | 'pixel', areaSnapshot: IAreaSnapshot, pixels: number): {absorb: number, remain: number} {
    // No pain no gain
    if(pixels === 0) {
        return {
            absorb: 0,
            remain: 0,
        };
    }
    
    // Area at zero and need to be reduced, not possible
    if(areaSnapshot.area.size === 0 && pixels < 0) {
        return {
            absorb: 0,
            remain: pixels,
        };
    }
    

	if(unit === 'pixel') {
        return areaAbsorbPixel(areaSnapshot, pixels);
    }

    return areaAbsorbPercent(areaSnapshot, pixels);
}


function areaAbsorbPercent(areaSnapshot: IAreaSnapshot, pixels: number): {absorb: number, remain: number} {
    const tempPixelSize = areaSnapshot.sizePixelAtStart + pixels;
    const tempPercentSize = tempPixelSize / areaSnapshot.sizePixelAtStart * areaSnapshot.sizePercentAtStart;

    // ENLARGE

    if(pixels > 0) {
        // If maxSize & newSize bigger than it > absorb to max and return remaining pixels 
        if(areaSnapshot.area.maxSize !== undefined && tempPercentSize > areaSnapshot.area.maxSize) {
            // Use area.area.maxSize as newPercentSize and return calculate pixels remaining
            const maxPixelAbsorb = areaSnapshot.sizePixelAtStart * areaSnapshot.area.maxSize / areaSnapshot.sizePercentAtStart;
            return {
                absorb: maxPixelAbsorb,
                remain: pixels - maxPixelAbsorb
            };
        }
        return {
            absorb: pixels,
            remain: 0
        };
    }

    // REDUCE
    
    else if(pixels < 0) {
        // If minSize & newSize smaller than it > absorb to min and return remaining pixels 
        if(areaSnapshot.area.minSize !== undefined && tempPercentSize < areaSnapshot.area.minSize) {
            // Use area.area.minSize as newPercentSize and return calculate pixels remaining
            const maxPixelAbsorb = areaSnapshot.sizePixelAtStart * areaSnapshot.area.minSize / areaSnapshot.sizePercentAtStart;
            return {
                absorb: maxPixelAbsorb,
                remain: pixels - maxPixelAbsorb
            };
        }
        // If reduced under zero > return remaining pixels
        else if(tempPercentSize < 0) {
            // Use 0 as newPercentSize and return calculate pixels remaining
            return {
                absorb: ,
                remain: pixels - areaSnapshot.sizePixelAtStart
            };
        }
        return {
            absorb: pixels,
            remain: 0
        };
    }
}

function areaAbsorbPixel(areaSnapshot: IAreaSnapshot, pixels: number): {absorb: number, remain: number} {
    const tempPixelSize = areaSnapshot.sizePixelAtStart + pixels;
            
    // ENLARGE

    if(pixels > 0) {
        // If maxSize & newSize bigger than it > absorb to max and return remaining pixels 
        if(areaSnapshot.area.maxSize !== undefined && tempPixelSize > areaSnapshot.area.maxSize) {
            return {
                absorb: areaSnapshot.area.maxSize,
                remain: tempPixelSize - areaSnapshot.area.maxSize
            };
        }
        return {
            absorb: pixels,
            remain: 0
        };
    }

    // REDUCE
    
    else if(pixels < 0) {
        // If minSize & newSize smaller than it > absorb to min and return remaining pixels 
        if(areaSnapshot.area.minSize !== undefined && tempPixelSize < areaSnapshot.area.minSize) {
            return {
                absorb: areaSnapshot.area.minSize,
                remain: tempPixelSize - areaSnapshot.area.minSize
            };
        }
        // If reduced under zero > return remaining pixels
        else if(tempPixelSize < 0) {
            return tempPixelSize;
        }
        return {
            absorb: pixels,
            remain: 0
        };
    }
}
