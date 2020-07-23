import { Component } from '@angular/core'

@Component({
  selector: 'home-comp',
  styles: [
    `
      :host {
        display: block;
        margin: 10px;
        padding: 10px;
        border: 1px solid #000000;
      }
    `,
  ],
  template: ` <h1>HomeComponent from AppModule</h1> `,
})
export class HomeComponent {}
