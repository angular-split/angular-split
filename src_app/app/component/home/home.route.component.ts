import { Component } from '@angular/core'

@Component({
  selector: 'sp-home',
  styles: [
    `
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
    `,
  ],
  template: `
    <div class="container">
      <div class="jumbotron">
        <div class="text-center">
          <img src="/assets/logo.svg" height="100" class="m-auto" alt="" />
          <h1 class="mt-3">angular-split</h1>
          <h4>Angular UI library to split views and allow dragging to resize areas using CSS flexbox layout.</h4>
          <a href="https://www.npmjs.com/package/angular-split"
            ><img
              src="https://img.shields.io/npm/v/angular-split/latest.svg?style=flat-square"
              alt="npm latest version"
              height="18" /></a
          >&nbsp;<a href="https://www.npmjs.com/package/angular-split"
            ><img
              src="https://img.shields.io/npm/v/angular-split/next.svg?style=flat-square"
              alt="npm next version"
              height="18" /></a
          >&nbsp;<a href="https://travis-ci.com/angular-split/angular-split"
            ><img
              src="https://img.shields.io/travis/com/angular-split/angular-split/master.svg?style=flat-square&label=Cypress+E2E+tests"
              alt="Build Status"
              height="18"
          /></a>
        </div>
        <br />
        <h5>Install npm module:</h5>
        <pre [innerText]="code1"></pre>
        <br />
        <h5>Add angular module to your app:</h5>
        <pre [innerText]="code2"></pre>
        <br />
        <h5>Define splits in your template:</h5>
        <pre [innerText]="code3"></pre>
        <br />
        <h5>Support:</h5>
        If you have an issue using the library, feel free to join our chat! We are part of the
        <a href="https://discord.gg/Qm9MPCg">Angular Community</a> Discord and you can ask questions in the
        <strong>#angular-chat</strong> room there.

        <div class="text-center">
          <a href="https://discord.gg/Qm9MPCg">
            <img
              src="https://img.shields.io/discord/748677963142135818?color=7289DA&label=%23angular-split&logo=discord&logoColor=white&style=flat-square"
            />
          </a>
        </div>

        <h5>Bug report:</h5>
        <p>
          If you find a bug, open an issue with a
          <a href="https://stackblitz.com/fork/angular-split-demo" target="_blank">StackBlitz</a> demo showing it.
        </p>
        <h5>Credits:</h5>
        <p>
          This library is built by <a href="https://github.com/bertrandg">Bertrand Gaillard</a> and maintained by
          <a href="https://github.com/beeman">Bram Borggreve</a>.
        </p>
      </div>
    </div>
  `,
})
export class HomeComponent {
  code1 = `npm install angular-split`

  code2 = `import { AngularSplitModule } from 'angular-split';

@NgModule({
  imports: [
    AngularSplitModule.forRoot(),
    ...
  ],
  ...
})
export class AppModule {}`

  code3 = `<div style="width: 500px; height: 500px; background: yellow;">
  <as-split direction="horizontal">
    <as-split-area [size]="40">
      <p>LEFT</p>
    </as-split-area>
    <as-split-area [size]="60">
      <p>RIGHT</p>
    </as-split-area>
  </as-split>
</div>`
}
