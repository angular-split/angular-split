import { Injectable } from '@angular/core';
import { EventManager } from '@angular/platform-browser';

/**
 * Credit to Michael Strobel from:
 * https://github.com/kryops/ng2-events
 */
@Injectable()
export class UndetectedEventPlugin {
    manager: EventManager;

    supports(eventName: string): boolean {
        return eventName.indexOf('as-split-undetected.') === 0;
    }

    addEventListener(element: HTMLElement, eventName: string, handler: Function): Function {
        const realEventName = eventName.slice(20);

        return this.manager.getZone().runOutsideAngular(() => this.manager.addEventListener(element, realEventName, handler));
    }
}