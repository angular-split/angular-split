import { Component } from '@angular/core';

import { AComponent } from './AComponent';


@Component({
    selector: 'sp-ex-sync',
    host: {
        'class': 'split-example-page'
    },
    template: `
        <div class="container">
            <sp-example-title [type]="exampleEnum.SYNC"></sp-example-title>
            <div class="split-example">
                <as-split direction="vertical">
                    <as-split-area size="30">
                        <as-split direction="horizontal" (dragProgress)="update('b', $event)">
                            <as-split-area [size]="sizes.a[0]">A 1</as-split-area>
                            <as-split-area [size]="sizes.a[1]">A 2</as-split-area>
                        </as-split>
                    </as-split-area>
                    <as-split-area size="70">
                        <as-split direction="horizontal" (dragProgress)="update('a', $event)">
                            <as-split-area [size]="sizes.b[0]">B 1</as-split-area>
                            <as-split-area [size]="sizes.b[1]">B 2</as-split-area>
                        </as-split>
                    </as-split-area>
                </as-split>
            </div>
        </div>`
})
export class SyncComponent extends AComponent {
    sizes = {
        a: [25, 75],
        b: [25, 75],
    }

    update(name: 'a' | 'b', data: {gutterNum: number, sizes: Array<number>}) {
        this.sizes[name] = data.sizes;
    }
}
