import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { SplitComponent, SplitAreaDirective } from 'angular-split';


@Component({
  selector: 'sp-ex-nested',
  styles: [`
    :host {
        display: block;
        width: 100%;
        margin: 50px 0;
    }
  `],
  template: `
    <div class="container">
        <div>NestedComponent</div>
    </div>`
})
export class NestedComponent {

}
