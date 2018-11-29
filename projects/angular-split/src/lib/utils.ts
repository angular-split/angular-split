import { ElementRef } from '@angular/core';

import { IPoint } from './interface/IPoint';


export function getPointFromEvent(event: MouseEvent | TouchEvent): IPoint {
    // TouchEvent
    if((<TouchEvent> event).touches !== undefined && (<TouchEvent> event).touches.length > 0) {
        return {
            x: (<TouchEvent> event).touches[0].pageX,
            y: (<TouchEvent> event).touches[0].pageY,
        };
    }
    // MouseEvent
    else if((<MouseEvent> event).pageX !== undefined && (<MouseEvent> event).pageY !== undefined) {
        return {
            x: (<MouseEvent> event).pageX,
            y: (<MouseEvent> event).pageY,
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