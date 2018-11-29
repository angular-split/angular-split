import { Component, ChangeDetectionStrategy, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription, merge } from 'rxjs'
import { map } from 'rxjs/operators'
import { SplitComponent } from 'angular-split';

import { AComponent } from './AComponent';
import { formatDate } from '../../service/utils';


@Component({
    selector: 'sp-ex-sync',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'split-example-page'
    },
    template: `
        {{ testChangeDetectorRun() }}
        <div class="container">
            <sp-example-title [type]="exampleEnum.SYNC"></sp-example-title>
            <div class="split-example">
                <as-split direction="vertical">
                    <div as-split-area size="30">
                        <as-split direction="horizontal" #mySplitA>
                            <div as-split-area [size]="sizes.a[0]">A 1</div>
                            <as-split-area [size]="sizes.a[1]">A 2</as-split-area>
                        </as-split>
                    </div>
                    <as-split-area size="70">
                        <as-split direction="horizontal" #mySplitB>
                            <as-split-area [size]="sizes.b[0]">B 1</as-split-area>
                            <div as-split-area [size]="sizes.b[1]">
                                B 2<br>
                                Open devTools to view console.log() statement.<br>
                                <button class="btn btn-warning" (click)="test()">Trigger change detection</button>
                            </div>
                        </as-split>
                    </as-split-area>
                </as-split>
            </div>
        </div>`
})
export class SyncComponent extends AComponent implements AfterViewInit, OnDestroy {
    @ViewChild('mySplitA') mySplitAEl: SplitComponent
    @ViewChild('mySplitB') mySplitBEl: SplitComponent
    
    sizes = {
        a: [25, 75],
        b: [25, 75],
    }
    sub: Subscription

    ngAfterViewInit() {
        this.sub = merge(
            this.mySplitAEl.dragProgress$.pipe( map(data => ({name: 'A', data})) ),
            this.mySplitBEl.dragProgress$.pipe( map(data => ({name: 'B', data})) ),
        ).subscribe(d => {
            // If split A changed > updated B
            if(d.name === 'A') {
                this.mySplitBEl.setVisibleAreaSizes(d.data.sizes);
            }
            // Else if split B changed > updated A
            else if(d.name === 'B') {
                this.mySplitAEl.setVisibleAreaSizes(d.data.sizes);
            }

            console.log(`${ formatDate(new Date()) } > dragProgress$ observable emitted, splits synchronized but current component change detection didn't runned! (from split ${ d.name })`);
        })
    }

    test() {}

    ngOnDestroy() {
        if(this.sub) this.sub.unsubscribe();
    }
}
