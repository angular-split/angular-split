import { Component } from '@angular/core'
import { Router, NavigationStart } from '@angular/router'

@Component({
  selector: 'sp-topbar',
  styles: [`
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
      margin-right: 120px;
    }

    @media (max-width: 992px) {
      .container-fluid {
        padding-left: 0;
      }
      a.navbar-brand {
        margin-right: 0;
      }
    }
  `],
  host: {
    'class': 'navbar navbar-expand-lg fixed-top navbar-dark bg-dark' 
  },
  template:  `
      <a class="navbar-brand" href="#">angular-split</a>
      <button class="navbar-toggler hidden-lg-up" 
              (click)="isCollapsed = !isCollapsed">
          <span class="navbar-toggler-icon"></span>
      </button> 
      <div class="collapse navbar-collapse" [collapse]="isCollapsed">
        <ul class="nav navbar-nav">
            <li class="nav-item" [class.active]="router.isActive('/', true)">
                <a class="nav-link" routerLink="/">Home</a>
            </li>
            <li class="nav-item" [class.active]="router.isActive('/changelog', true)">
                <a class="nav-link" routerLink="/changelog">Changelog</a>
            </li>
            <li class="nav-item" [class.active]="router.isActive('/documentation', true)">
                <a class="nav-link" routerLink="/documentation">Documentation</a>
            </li>
            <li class="nav-item dropdown" dropdown>
                <a class="nav-link dropdown-toggle" dropdownToggle>Examples <span class="caret"></span></a>
                <ul *dropdownMenu class="dropdown-menu" role="menu">
                    <li [class.active]="router.isActive('/examples/horizontal-split', true)">
                        <a class="dropdown-item" routerLink="/examples/horizontal-split">Horizontal split</a>
                    </li>
                    <li [class.active]="router.isActive('/examples/vertical-split', true)">
                        <a class="dropdown-item" routerLink="/examples/vertical-split">Vertical split</a>
                    </li>
                    <li [class.active]="router.isActive('/examples/nested-split', true)">
                        <a class="dropdown-item" routerLink="/examples/nested-split">Nested split</a>
                    </li>
                    <li [class.active]="router.isActive('/examples/split-transitons', true)">
                        <a class="dropdown-item" routerLink="/examples/split-transitons">Split transitions</a>
                    </li>
                    <li [class.active]="router.isActive('/examples/custom-gutter-style', true)">
                        <a class="dropdown-item" routerLink="/examples/custom-gutter-style">Custom gutter style</a>
                    </li>
                    <li [class.active]="router.isActive('/examples/toggling-dom-and-visibility', true)">
                        <a class="dropdown-item" routerLink="/examples/toggling-dom-and-visibility">Toggling areas using *ngIf and [visible]</a>
                    </li>
                    <li [class.active]="router.isActive('/examples/gutter-click-roll-unroll', true)">
                        <a class="dropdown-item" routerLink="/examples/gutter-click-roll-unroll">Roll/unroll area on gutter click</a>
                    </li>
                    <li [class.active]="router.isActive('/examples/access-from-class', true)">
                        <a class="dropdown-item" routerLink="/examples/access-from-class">Interact from TS class</a>
                    </li>
                    <li [class.active]="router.isActive('/examples/geek-demo', true)">
                        <a class="dropdown-item" routerLink="/examples/geek-demo">Geek demo (100% dynamic)</a>
                    </li>
                    <li [class.active]="router.isActive('/examples/workspace-localstorage', true)">
                        <a class="dropdown-item" routerLink="/examples/workspace-localstorage">Fullscreen workspace</a>
                    </li>
                </ul>
            </li>

        </ul>
      </div>`
})
export class TopbarComponent {
    isCollapsed: boolean = true

    constructor(public router: Router) {
        this.router.events.filter(e => e instanceof NavigationStart).subscribe(event => {
            this.isCollapsed = true;
        });
    }
}