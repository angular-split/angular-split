import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';

import { examples } from './listExamples';
import { ExampleEnum } from './enum';


@Component({
    selector: 'sp-example-title',
    styles: [`
        h4 {
            display: flex;
            align-items: center;
        }
        h4 > div {
            margin-right: 20px;
        }
    `],
    template:  `
        <h4>
            <div [innerHTML]="label"></div>
            <a class="btn btn-secondary" [href]="url" target="_blank">View code</a>
        </h4>
        <hr>`
})
export class ExampleTitleComponent {
    label: SafeHtml
    url: SafeResourceUrl

    @Input() set type(v: ExampleEnum) {
        const ex = examples.find(e => e.type === v);
        if(!ex) return;

        this.label = this.sanitizer.bypassSecurityTrustHtml(ex.label);
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(ex.srcUrl);
    }

    constructor(private sanitizer: DomSanitizer) {}
}