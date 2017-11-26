import { Component } from '@angular/core'


@Component({
  selector: 'sp-ex-toggling-dom-and-visible',
  styles: [`
    :host {
        display: block;
        width: 100%;
        margin: 50px 0;
    }
    .btns {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
  `],
  template: `
    <div class="container">
        <h4>Toggling split areas using <code>[visible]</code> and <code>*ngIf</code></h4>
        <div class="split-example" style="height: 150px;">
            <split [gutterSize]="15" (dragEnd)="log('dragEnd', $event)">
                <split-area *ngIf="action.isPresentA" [visible]="action.isVisibleA" [order]="0">
                    <p>A</p>
                </split-area>
                <split-area *ngIf="action.isPresentB" [visible]="action.isVisibleB" [order]="1">
                    <p>B</p>
                </split-area>
                <split-area *ngIf="action.isPresentC" [visible]="action.isVisibleC" [order]="2">
                    <p>C</p>
                </split-area>
            </split>
        </div>
        <p>Toggle <code>[visible]="boolean"</code> properties:</p>
        <div class="btns">
            <div class="btn-group">
                <label class="btn btn-warning" 
                       [class.active]="action.isVisibleA" 
                       (click)="action.isVisibleA = !action.isVisibleA">{{ 'area1: ' + action.isVisibleA }}</label>
                <label class="btn btn-warning" 
                       [class.active]="action.isVisibleB" 
                       (click)="action.isVisibleB = !action.isVisibleB">{{ 'area2: ' + action.isVisibleB }}</label>
                <label class="btn btn-warning" 
                       [class.active]="action.isVisibleC" 
                       (click)="action.isVisibleC = !action.isVisibleC">{{ 'area3: ' + action.isVisibleC }}</label>
            </div>
        </div>
        <p>Toggle <code>*ngIf="boolean"</code> properties:</p>
        <div class="btns">
            <div class="btn-group">
                <label class="btn btn-warning" 
                       [class.active]="action.isPresentA" 
                       (click)="action.isPresentA = !action.isPresentA">{{ 'area1: ' + action.isPresentA }}</label>
                <label class="btn btn-warning" 
                       [class.active]="action.isPresentB" 
                       (click)="action.isPresentB = !action.isPresentB">{{ 'area2: ' + action.isPresentB }}</label>
                <label class="btn btn-warning" 
                       [class.active]="action.isPresentC" 
                       (click)="action.isPresentC = !action.isPresentC">{{ 'area3: ' + action.isPresentC }}</label>
            </div>
        </div>
        <br><br>
        <pre [innerText]="code"></pre>
    </div>`
})
export class TogglingDomAndVisibleComponent {

    log(eventName, e) {
        this.action.logs = `${ new Date() }: ${ eventName } > ${ e }\n${ this.action.logs }`;
    }

    action = {
        isVisibleA: true,
        isVisibleB: true,
        isVisibleC: true,
        isPresentA: true,
        isPresentB: true,
        isPresentC: true,
        logs: ''
    }

    code: string = `xx`;
}
