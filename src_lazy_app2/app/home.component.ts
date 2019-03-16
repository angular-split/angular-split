import { Component } from '@angular/core';

@Component({
  selector: 'home-comp',
  styles: [`
    :host {
      display: block;
      margin: 10px;
      padding: 10px;
      border: 1px solid #000000;
    }
  `],
  template: `
    <h1>HomeComponent from AppModule using a split</h1>
    <hr>
    <div style="height: 200px; background: yellow;">
      <as-split>
        <as-split-area size="30">A</as-split-area>
        <as-split-area size="40">B</as-split-area>
        <as-split-area size="30">C</as-split-area>
      </as-split>
    </div>
    `,
})
export class HomeComponent {}
