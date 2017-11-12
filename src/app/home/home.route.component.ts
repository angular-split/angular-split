import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { SplitComponent, SplitAreaDirective } from 'angular-split';


@Component({
  selector: 'sp-home',
  styles: [`
    :host {
      display: block;
      width: 100%;
      margin: 80px 0 50px 0;
    }

    h1 {
        color: #ffc421;
        margin-bottom: 30px;
    }
    h1 > small {
      color: #000000;
    }

    .jumbotron {
      margin-bottom: 0;
    }
    .jumbotron > div {
      margin: 20px;
    }
  `],
  template: `
    <div class="container">
        
<input type="number" #ee (input)="val = ee.value">
<button (click)="toggle()"></button>
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
<hr>

<div style="height:300px; border: 10px solid blue;">
<split gutterSize="10" direction="horizontal" (dragEnd)="dragEnd($event)" (gutterClick)="gutterClick($event)">
  <split-area *ngFor="let a of areas" [size]="a.size" [order]="a.order">
      <p>{{ a.content }}</p>
  </split-area>
</split>
</div>

        <div class="jumbotron">
            <h1>angular-split 
              <a href="https://badge.fury.io/js/angular-split"><img src="https://badge.fury.io/js/angular-split.svg" alt="npm version" height="18"></a>
              <small><br>Angular (2+) UI library to split views using CSS flexbox layout.</small>
            </h1>
            <h4>Install npm module:</h4>
            <pre [innerText]="code1"></pre>
            <br>
            <h4>Add angular module to your app module:</h4>
            <pre [innerText]="code2"></pre>
            <p>If you are using <b>angular-cli</b> / <b>webpack</b>, that's it!</p>
            <br>
            <h4>Systemjs:</h4>
            <p>Add this to your config:</p>
            <pre [innerText]="code3"></pre>
            <br>
            <h4>Bug report:</h4>
            <p>If you find a bug, open an issue with a <a href="https://stackblitz.com/edit/angular-bz2ohj" target="_blank">stackblitz</a> / <a href="https://plnkr.co/edit/17IWKz?p=preview" target="_blank">plunker</a> demo showing it.</p>
            <br>
            <button class="btn btn-outline-warning" routerLink="/documentation">Documentation</button>
            <button class="btn btn-outline-warning" routerLink="/examples">Examples</button>
            <br><br>
            <h5>Note:</h5>
            <div>
              <p>Previously, I coded an angular (2+) wrapper to <a href="https://nathancahill.github.io/Split.js/">Split.js</a> library (<a href="https://github.com/bertrandg/ng2-split/">ng2-split</a>) but I decided to rewrite it purely in Angular for following reasons:</p>
              <ul>
                <li>No more dependency except Angular.</li>
                <li>Use base64 images instead PNG files.</li>
                <li>Angular AOT compilation compliant.</li>
                <li>Use latest Flexbox CSS grid system.</li>
                <li>Fun!</li>
              </ul>
            </div>
        </div>
    </div>`
})
export class HomeComponent {
  val: number = 10
  @ViewChild(SplitComponent) sp: SplitComponent
  @ViewChildren(SplitAreaDirective) areasEl: QueryList<SplitAreaDirective> 

  ngAfterViewInit() {
    console.log('this.sp', this.sp)
    console.log('this.spArea', this.areasEl)
  }
  areas= [
    {size: 25, order: 1, content: 'fg fdkjuh dfskhf dkujv fd vifdk hvdkuh fg'},
    {size: 50, order: 2, content: 'sd h vdshhf deuyf gduyeg hudeg hudfg  fd vifdk hvdkuh fg'},
    {size: 25, order: 3, content: 'sd jslfd ijgil dfhlt jkgvbnhj fl bhjgflh jfglhj fl h fg'},
  ]
  toggle() {
    this.sp.disabled = !this.sp.disabled;
  }
  gutterClick(e) {
    console.log('gutterClick', e);
    const numGutter = <number> e.gutterNum;

    if(numGutter === 1) {
      if(this.areas[0].size === 0) {
        this.areas[0].size = 25;
        this.areas[1].size = 50;
        this.areas[2].size = 25;
      }
      else {
        this.areas[1].size += this.areas[0].size;
        this.areas[0].size = 0;
      }
    }
    else if(numGutter === 2) {
      if(this.areas[2].size === 0) {
        this.areas[0].size = 25;
        this.areas[1].size = 50;
        this.areas[2].size = 25;
      }
      else {
        this.areas[1].size += this.areas[2].size;
        this.areas[2].size = 0;
      }
      
    }
  }
  dragEnd(e) {
    console.log('dragEnd', e)
  }


  code1: string = `npm install angular-split`

  code2: string = `import { AngularSplitModule } from 'angular-split';
  
@NgModule({
  declarations: [
    AppComponent,
    ...
  ],
  imports: [
    AngularSplitModule,
    ...
  ],
  providers: [...],
  bootstrap: [AppComponent]
})
export class AppModule {}`

  code3: string = `System.config({
  ...
  map: {
    ...
    'angular-split': 'node_modules/angular-split/bundles/angular-split.umd.js'
  }
});`
}
