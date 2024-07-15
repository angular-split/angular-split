import { Component, ChangeDetectionStrategy, HostBinding } from '@angular/core'
import { Router, NavigationStart, Routes, RouterLink, RouterLinkActive } from '@angular/router'
import { DomSanitizer } from '@angular/platform-browser'
import { filter } from 'rxjs/operators'

import { exampleRoutes } from '../../examples/examples.routes'

import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { CollapseModule } from 'ngx-bootstrap/collapse'

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
  template: `
    <button class="navbar-toggler hidden-lg-up" (click)="isCollapsed = !isCollapsed">
      <span class="navbar-toggler-icon"></span>
    </button>
    <span class="mr-auto">
      <img src="/assets/logo.svg" height="28" class="mx-2" alt="" />
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
            @for (ex of examples; track ex) {
              <li routerLinkActive="active">
                <a
                  class="dropdown-item"
                  [routerLink]="['/examples', ex.path]"
                  [innerHTML]="transform(ex?.data?.label)"
                ></a>
              </li>
            }
          </ul>
        </li>
      </ul>
    </div>
  `,
  standalone: true,
  imports: [RouterLink, CollapseModule, RouterLinkActive, BsDropdownModule],
})
export class TopbarComponent {
  examples: Routes
  isCollapsed = true

  @HostBinding('class') class = 'navbar navbar-expand-lg fixed-top navbar-dark bg-dark'
  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly router: Router,
  ) {
    this.examples = exampleRoutes

    this.router.events.pipe(filter((e) => e instanceof NavigationStart)).subscribe(() => {
      this.isCollapsed = true
    })
  }

  transform(label: string) {
    return this.sanitizer.bypassSecurityTrustHtml(label)
  }
}
