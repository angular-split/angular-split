import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styles: [`
    :host {
      display: block;
      margin: 10px;
      padding: 10px;
      border: 1px solid #000000;
    }
  `],
  template: `
    <h1>AppComponent from AppModule using a split</h1>
    <a href="#/home">HOME</a> $ 
    <a href="#/lazy">LAZY</a>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
}
