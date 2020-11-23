import { Component, ChangeDetectionStrategy } from '@angular/core'
import { Router, NavigationStart } from '@angular/router'
import { DomSanitizer } from '@angular/platform-browser'
import { filter } from 'rxjs/operators'

import { examples } from '../data/listExamples'

@Component({
  selector: 'sp-topbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        /* To override default 'fixed' who prevent scrolling */
        position: absolute;
      }

      a.navbar-brand,
      a.navbar-brand:hover {
        font-weight: bold;
        color: #ffc421;
      }

      li > a {
        cursor: pointer;
      }

      ul.dropdown-menu > li > a:active,
      ul.dropdown-menu > li.active > a {
        background-color: #eeeeee;
        cursor: default;
        color: #000000;
      }

      .navbar-toggler {
        float: right;
        margin-right: 20px;
      }

      @media (max-width: 992px) {
        .container-fluid {
          padding-left: 0;
        }
        a.navbar-brand {
          margin-right: 0;
        }
      }
    `,
  ],
  host: {
    class: 'navbar navbar-expand-lg fixed-top navbar-dark bg-dark',
  },
  template: `
    <button class="navbar-toggler hidden-lg-up" (click)="isCollapsed = !isCollapsed">
      <span class="navbar-toggler-icon"></span>
    </button>
    <span class="mr-auto">
      <img src="/assets/logo.svg" height="28" class="mr-2" alt="" />
      <a class="navbar-brand" routerLink="/">angular-split</a>
    </span>
    <div class="collapse navbar-collapse" [collapse]="isCollapsed">
      <ul class="nav navbar-nav">
        <li class="nav-item" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
          <a class="nav-link" routerLink="/">Home</a>
        </li>
        <li class="nav-item" routerLinkActive="active">
          <a class="nav-link" routerLink="/changelog">Changelog</a>
        </li>
        <li class="nav-item" routerLinkActive="active">
          <a class="nav-link" routerLink="/documentation">Documentation</a>
        </li>
        <li class="nav-item dropdown" dropdown routerLinkActive="active">
          <a class="nav-link dropdown-toggle" dropdownToggle>Examples <span class="caret"></span></a>
          <ul *dropdownMenu class="dropdown-menu" role="menu">
            <li *ngFor="let ex of examples" routerLinkActive="active">
              <a class="dropdown-item" [routerLink]="ex.path" [innerHTML]="transform(ex.label)"></a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  `,
})
export class TopbarComponent {
  examples: Array<IExampleData>
  isCollapsed = true

  constructor(private readonly sanitizer: DomSanitizer, private readonly router: Router) {
    this.examples = examples

    this.router.events.pipe(filter((e) => e instanceof NavigationStart)).subscribe((event) => {
      this.isCollapsed = true
    })
  }

  transform(label: string) {
    return this.sanitizer.bypassSecurityTrustHtml(label)
  }
}
