import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
    selector: 'sp-app-root',
    styles: [`
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
    `],
    template: `
        <sp-topbar></sp-topbar>
        <div>
            <router-outlet></router-outlet>
        </div>`
})
export class AppComponent {
    
    constructor(public router: Router) {
        this.router.events.pipe(
            filter(e => e instanceof NavigationEnd)
        ).subscribe(event => {
            window.scrollTo(0, 0);
        });
    }
}
