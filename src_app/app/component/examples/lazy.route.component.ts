import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { examples } from '../../data/listExamples';
import { AComponent } from './AComponent';


@Component({
    selector: 'sp-ex-lazy',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'split-example-page'
    },
    styles: [`
        .btns {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
        }
    `],
    template: `
        {{ testChangeDetectorRun() }}
        <div class="container">
            <sp-example-title [type]="exampleEnum.LAZY"></sp-example-title>
            <h5>Demo 1</h5>
            <p><code>angular-split</code> is only loaded on demand with the lazy loaded module where it is used:</p>
            <a class="btn btn-warning btn-sm" href="/angular-split/lazy" target="_blank">demo</a>&nbsp;
            <a class="btn btn-secondary btn-sm" [href]="url1" target="_blank">code</a>
            <hr>
            <h5>Demo 2</h5>
            <p><code>angular-split</code> is loaded one time at startup inside AppModule and then used inside a lazy loaded module:</p>
            <a class="btn btn-warning btn-sm" href="/angular-split/lazy2" target="_blank">demo</a>&nbsp;
            <a class="btn btn-secondary btn-sm" [href]="url2" target="_blank">code</a>
        </div>`
})
export class LazyComponent extends AComponent {
    url1: SafeResourceUrl
    url2: SafeResourceUrl

    constructor(private sanitizer: DomSanitizer) {
        super();

        const ex = examples.find(e => e.type === this.exampleEnum.LAZY);
        if(!ex) return;

        this.url1 = this.sanitizer.bypassSecurityTrustResourceUrl(ex.srcUrl);
        this.url2 = this.sanitizer.bypassSecurityTrustResourceUrl(ex.srcUrl2);
    }
}

