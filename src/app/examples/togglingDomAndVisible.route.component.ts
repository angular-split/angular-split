import { Component } from '@angular/core'


@Component({
  selector: 'sp-ex-toggling-dom-and-visible',
  styles: [`
    :host {
        display: block;
        width: 100%;
        margin: 50px 0;
    }
  `],
  template: `
    <div class="container">
        <div>TogglingDomAndVisibleComponent</div>
        
        <div class="split-example" style="height: 150px;">
            <split [gutterSize]="15" (dragEnd)="log('dragEnd', $event)">
                <split-area *ngIf="action.isPresentA" [visible]="action.isVisibleA" [order]="1">
                    <p>A</p>
                </split-area>
                <split-area *ngIf="action.isPresentB" [visible]="action.isVisibleB" [order]="2">
                    <p>B</p>
                </split-area>
                <split-area *ngIf="action.isPresentC" [visible]="action.isVisibleC" [order]="3">
                    <p>C</p>
                </split-area>
            </split>
        </div>
        <div>
            <div>
                <label>Toggle with <code>[visible]</code>: </label>
                <button (click)="action.isVisibleA = !action.isVisibleA" class="btn btn-sm btn-success" [class.btn-danger]="!action.isVisibleA">areaA</button>
                <button (click)="action.isVisibleB = !action.isVisibleB" class="btn btn-sm btn-success" [class.btn-danger]="!action.isVisibleB">areaB</button>
                <button (click)="action.isVisibleC = !action.isVisibleC" class="btn btn-sm btn-success" [class.btn-danger]="!action.isVisibleC">areaC</button>
            </div>
            <div>
                <label>Toggle with <code>*ngIf</code>: </label>
                <button (click)="action.isPresentA = !action.isPresentA" class="btn btn-sm btn-success" [class.btn-danger]="!action.isPresentA">areaA</button>
                <button (click)="action.isPresentB = !action.isPresentB" class="btn btn-sm btn-success" [class.btn-danger]="!action.isPresentB">areaB</button>
                <button (click)="action.isPresentC = !action.isPresentC" class="btn btn-sm btn-success" [class.btn-danger]="!action.isPresentC">areaC</button>
            </div>
            <div>
                <label>DragEnd events log: </label>
                <textarea [value]="action.logs" disabled></textarea>
            </div>
        </div>
        <br><br>
        <pre [innerText]="code"></pre>
    </div>`
})
export class TogglingDomAndVisibleComponent {
    code: string = `<div class="split-example">
    <split [gutterSize]="15" (dragEnd)="log('dragEnd', $event)">
        <split-area *ngIf="toggling.isPresentA" [visible]="toggling.isVisibleA" [order]="1">
            <p>A</p>
        </split-area>
        <split-area *ngIf="toggling.isPresentB" [visible]="toggling.isVisibleB" [order]="2">
            <p>B</p>
        </split-area>
        <split-area *ngIf="toggling.isPresentC" [visible]="toggling.isVisibleC" [order]="3">
            <p>C</p>
        </split-area>
    </split>
</div>
<div>
    <label>Toggle with [visible]: </label>
    <button (click)="toggling.isVisibleA = !toggling.isVisibleA" class="btn btn-sm btn-success" [class.btn-danger]="!toggling.isVisibleA">areaA</button>
    <button (click)="toggling.isVisibleB = !toggling.isVisibleB" class="btn btn-sm btn-success" [class.btn-danger]="!toggling.isVisibleB">areaB</button>
    <button (click)="toggling.isVisibleC = !toggling.isVisibleC" class="btn btn-sm btn-success" [class.btn-danger]="!toggling.isVisibleC">areaC</button>
</div>
<div>
    <label>Toggle with *ngIf: </label>
    <button (click)="toggling.isPresentA = !toggling.isPresentA" class="btn btn-sm btn-success" [class.btn-danger]="!toggling.isPresentA">areaA</button>
    <button (click)="toggling.isPresentB = !toggling.isPresentB" class="btn btn-sm btn-success" [class.btn-danger]="!toggling.isPresentB">areaB</button>
    <button (click)="toggling.isPresentC = !toggling.isPresentC" class="btn btn-sm btn-success" [class.btn-danger]="!toggling.isPresentC">areaC</button>
</div>
<div>
    <label>DragEnd events log: </label>
    <textarea [value]="toggling.logs" disabled></textarea>
</div>`;

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
}
