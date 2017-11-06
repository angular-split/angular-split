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

    .navbar-header {
      /*width: 100%;*/
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
            <li class="nav-item" [class.active]="router.isActive('/documentation', true)">
                <a class="nav-link" routerLink="/documentation">Documentation</a>
            </li>
            <li class="nav-item" [class.active]="router.isActive('/examples', true)">
                <a class="nav-link" routerLink="/examples">Examples</a>
            </li>
            <li class="nav-item" [class.active]="router.isActive('/advanced-example', true)">
                <a class="nav-link" routerLink="/advanced-example">Advanced example</a>
            </li>
        </ul>
      </div>`
})
export class TopbarComponent {
    isCollapsed: boolean = true

    constructor(private router: Router) {
        this.router.events.filter(e => e instanceof NavigationStart).subscribe(event => {
            this.isCollapsed = true;
        });
    }
}