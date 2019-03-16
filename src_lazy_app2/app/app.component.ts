import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  styles: [`
    :host > div {
      display: block;
      margin: 10px;
      padding: 10px;
      border: 1px solid #000000;
    }

    a.active {
      font-weight: bold;
      color: black;
      text-decoration: none;
    }
  `],
  template: `
    <h1>LAZY LOADED MODULE: DEMO 2</h1>
    <div>
        <h1>AppComponent from AppModule</h1>
        <p><code>angular-split</code> module is only inside AppModule so not reloaded for lazy loaded module.</p>
        <a [class.active]="router.isActive('/home', true)" href="#/home">HOME</a> $ 
        <a [class.active]="router.isActive('/lazy', true)" href="#/lazy">LAZY</a>
        <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  constructor(public router: Router) {}
}
