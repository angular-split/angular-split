import { ElementRef } from '@angular/core';

import { IPoint } from './interface/IPoint';


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

export function getPixelSize(elRef: ElementRef, direction: 'horizontal' | 'vertical'): number {
    return elRef.nativeElement[(direction === 'horizontal') ? 'offsetWidth' : 'offsetHeight'];

}

export function getInputBoolean(v: any) {
    return (typeof(v) === 'boolean') ? v : (v === 'false' ? false : true);
}

export function isValidTotalSize(total: number): boolean {
    return total > .999 && total < 1.001;
}