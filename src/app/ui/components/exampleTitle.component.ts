import { Component, inject, Input } from '@angular/core'
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser'
import { ExampleEnum } from '../../examples/example-types'
import { exampleRoutes } from '../../examples/examples.routes'

@Component({
  selector: 'sp-example-title',
  standalone: true,
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
  template: `
    <h4>
      <div [innerHTML]="label"></div>
      <a class="btn btn-secondary" [href]="url" target="_blank">View code</a>
    </h4>
    <hr />
  `,
})
export class ExampleTitleComponent {
  exampleEnum = ExampleEnum
  label: SafeHtml
  url: SafeResourceUrl
  private sanitizer = inject(DomSanitizer)

  @Input() set type(v: ExampleEnum) {
    const ex = exampleRoutes.find((e) => e.data.type === v)
    if (!ex) {
      return
    }

    this.label = this.sanitizer.bypassSecurityTrustHtml(ex.data.label)
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(ex.data.srcUrl)
  }
}
