import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';


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

    @Input() set ex(v: IExampleData) {
        this.label = this.sanitizer.bypassSecurityTrustHtml(v.label);
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(v.srcUrl);
    }

    constructor(private sanitizer: DomSanitizer) {}
}