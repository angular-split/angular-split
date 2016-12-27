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
  template: `
    <div class="container">
        <h3>Documentation</h3>
        <h4>Component <span class="directive">&#60;split&#62;</span></h4>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>@Input()</th> <th>Type</th> <th>Default</th> <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>direction</td> <td>string</td> <td>'horizontal'</td> <td>Specify 'horizontal' or 'vertical'.</td>
            </tr>
            <tr>
              <td>width</td> <td>number</td> <td>null</td> <td>Specify a value in pixels or it takes all space available.</td>
            </tr>
            <tr>
              <td>height</td> <td>number</td> <td>null</td> <td>Specify a value in pixels or it takes all space available.</td>
            </tr>
            <tr>
              <td>disabled</td> <td>boolean</td> <td>false</td> <td>Disable the dragging feature and remove cursor/image.</td>
            </tr>
            <tr>
              <td>gutterSize</td> <td>number</td> <td>10</td> <td>Set gutter (dragging element) width size.</td>
            </tr>
          </tbody>
        </table>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>@Output()</th> <th>Value</th> <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>dragStart</td> <td>Areas size array (ex: [17, 43, 40])</td> <td>Emit when drag starts.</td>
            </tr>
            <tr>
              <td>dragProgress</td> <td>Areas size array (ex: [17, 43, 40])</td> <td>Emit when dragging.</td>
            </tr>
            <tr>
              <td>dragEnd</td> <td>Areas size array (ex: [17, 43, 40])</td> <td>Emit when drag ends.</td>
            </tr>
          </tbody>
        </table>
        <br><br>
        <h4>Directive <span class="directive">&#60;split-area&#62;</span></h4>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>@Input()</th> <th>Type</th> <th>Default</th> <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>size</td> <td>number</td> <td>100/nb_areas</td> <td>Percentage size of the area. If null or if all areas sizes not equal to 100, all areas will have the same size.</td>
            </tr>
            <tr>
              <td>order</td> <td>number</td> <td>null</td> <td>Order of the area. Useful if you show/hide areas using NgIf/NgFor and wants to keep the same order. If specified for all, areas displayed from order min to max.</td>
            </tr>
          </tbody>
        </table>
        <button class="btn btn-outline-warning" routerLink="/examples">Examples</button>
    </div>`
})
export class DocComponent {}
