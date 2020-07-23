import { Component } from '@angular/core'

@Component({
  selector: 'lazy-loaded-comp',
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
  template: `
    <h1>LazyLoadedComponent from LazyLoadedModule using a split</h1>
    <p><code>angular-split</code> module is only inside LazyLoadedModule so not loaded before needed.</p>
    <hr />
    <div style="height: 200px; background: red;">
      <as-split>
        <as-split-area size="30">A</as-split-area>
        <as-split-area size="40">B</as-split-area>
        <as-split-area size="30">C</as-split-area>
      </as-split>
    </div>
    <router-outlet></router-outlet>
  `,
})
export class LazyLoadedComponent {
  test() {
    console.log('TEST')
  }
}
