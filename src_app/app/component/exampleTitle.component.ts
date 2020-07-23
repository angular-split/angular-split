import { Component, Input } from '@angular/core'
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser'

import { examples } from '../data/listExamples'
import { ExampleEnum } from '../data/enum'

@Component({
  selector: 'sp-example-title',
  styles: [
    `
      h4 {
        display: flex;
        align-items: center;
      }
      h4 > div {
        margin-right: 20px;
      }
    `,
  ],
  template: ` <h4>
      <div [innerHTML]="label"></div>
      <a *ngIf="_type !== exampleEnum.LAZY" class="btn btn-secondary" [href]="url" target="_blank">View code</a>
    </h4>
    <hr />`,
})
export class ExampleTitleComponent {
  exampleEnum = ExampleEnum
  label: SafeHtml
  url: SafeResourceUrl

  _type: ExampleEnum
  @Input() set type(v: ExampleEnum) {
    const ex = examples.find((e) => e.type === v)
    if (!ex) return

    this._type = v
    this.label = this.sanitizer.bypassSecurityTrustHtml(ex.label)
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(ex.srcUrl)
  }

  constructor(private sanitizer: DomSanitizer) {}
}
