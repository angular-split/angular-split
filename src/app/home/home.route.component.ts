import { Component } from '@angular/core';

@Component({
  selector: 'sp-home',
  styles: [`
    :host {
      display: block;
      width: 100%;
      margin: 80px 0 0 0;
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
  `],
  template: `
    <div class="container">

        <div class="jumbotron">
            <h1>angular-split <small><br>Angular (2+) UI library to split views.</small></h1>
            <h4>Install npm module:</h4>
            <pre [innerText]="code1"></pre>
            <br>
            <h4>Add angular module to your app module:</h4>
            <pre [innerText]="code2"></pre>
            <br>
            <button class="btn btn-outline-warning" routerLink="/documentation">Documentation</button>
            <button class="btn btn-outline-warning" routerLink="/examples">Examples</button>
        </div>
    </div>`
        // <r-snippet [code]="code1" language="javascript"></r-snippet>
        // <r-snippet [code]="code2" language="javascript"></r-snippet>
})
export class HomeComponent {
  code1: string = `npm install angular-split --save`

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
}
