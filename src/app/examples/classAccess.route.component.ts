import { Component, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core'
import { SplitComponent, SplitAreaDirective } from 'angular-split'


@Component({
  selector: 'sp-ex-class-access',
  styles: [`
    :host {
        display: block;
        width: 100%;
        margin: 50px 0;
    }
  `],
  template: `
    <div class="container">
        <div>ClassAccessComponent</div>
        <hr>
        <div style="width: 402px; max-width: 402px; height: 400px; border: 1px solid red;">
            <split #sp [gutterSize]="val" direction="horizontal">
              <split-area [size]="75">
                  <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eodolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
              </split-area>
              <split-area #spArea [size]="3">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tiam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              </split-area>
              <split-area [visible]="false" [size]="18">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tiam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              </split-area>
              <split-area [size]="4">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tiam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
              </split-area>
          </split>
        </div>
    </div>`
})
export class ClassAccessComponent implements AfterViewInit {
    @ViewChild(SplitComponent) sp: SplitComponent
    @ViewChildren(SplitAreaDirective) areasEl: QueryList<SplitAreaDirective> 

    ngAfterViewInit() {
        console.log('this.sp', this.sp)
        console.log('this.spArea', this.areasEl)
      }

    toggle() {
        this.sp.disabled = !this.sp.disabled;
    }
}
