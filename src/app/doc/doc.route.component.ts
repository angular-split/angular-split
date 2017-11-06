import { Component } from '@angular/core';

@Component({
  selector: 'sp-doc',
  styles: [`
    :host {
      display: block;
      width: 100%;
      margin: 50px 0;
    }
    h4 {
      margin: 20px 0;
    }
    tr > th:first-child,
    .directive {
      font-weight: bold;
      color: #ffc421;
    }
  `],
  templateUrl: './doc.route.component.html'
})
export class DocComponent {}
