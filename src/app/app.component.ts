import { Component } from '@angular/core'
import { Router, NavigationEnd, RouterOutlet } from '@angular/router'
import { filter } from 'rxjs/operators'
import { TopbarComponent } from './ui/components/topbar.component'

@Component({
  selector: 'sp-app-root',
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
      :host > div {
        padding-top: 54px;
        width: 100%;
        height: 100%;
      }
    `,
  ],
  template: `
    <sp-topbar></sp-topbar>
    <div>
      <router-outlet></router-outlet>
    </div>
  `,
  standalone: true,
  imports: [TopbarComponent, RouterOutlet],
})
export class AppComponent {
  constructor(public router: Router) {
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      window.scrollTo(0, 0)
    })
  }
}
