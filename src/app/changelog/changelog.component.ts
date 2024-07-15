import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'

import { ChangelogService } from './changelog.service'
import { AsyncPipe } from '@angular/common'

@Component({
  selector: 'sp-ex-changelog',
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
  standalone: true,
  imports: [AsyncPipe],
})
export class ChangelogComponent implements OnInit {
  changelogHtml$: Observable<string>

  constructor(private changelogService: ChangelogService) {}

  ngOnInit() {
    this.changelogHtml$ = this.changelogService.getHtml()
  }
}
