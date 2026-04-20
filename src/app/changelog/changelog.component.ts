import { Component, OnInit, inject } from '@angular/core'
import { Observable } from 'rxjs'

import { AsyncPipe } from '@angular/common'
import { ChangelogService } from './changelog.service'

@Component({
  selector: 'sp-ex-changelog',
  imports: [AsyncPipe],
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        margin: 50px 0;
      }
    `,
  ],
  template: `
    <div class="container">
      <div [innerHTML]="changelogHtml$ | async"></div>
    </div>
  `,
})
export class ChangelogComponent implements OnInit {
  private changelogService = inject(ChangelogService)

  changelogHtml$: Observable<string>

  ngOnInit() {
    this.changelogHtml$ = this.changelogService.getHtml()
  }
}
