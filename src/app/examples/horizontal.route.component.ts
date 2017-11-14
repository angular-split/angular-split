import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { SplitComponent, SplitAreaDirective } from 'angular-split';


@Component({
  selector: 'sp-ex-horizontal',
  styles: [`
    :host {
        display: block;
        width: 100%;
        margin: 50px 0;
    }
  `],
  template: `
    <div class="container">
        <div>HorizontalComponent</div>
        <iframe src="https://api.github.com/repos/bertrandg/angular-split/contents/src/app/app.component.ts?ref=website-src">
        </iframe>
    </div>`
})
export class HorizontalComponent {

}
