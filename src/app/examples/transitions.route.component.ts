import { Component } from '@angular/core'


@Component({
  selector: 'sp-ex-transitions',
  styles: [`
    :host {
        display: block;
        width: 100%;
        margin: 50px 0;
    }

    button {
        margin: 4px;
    }

    .btns {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }
    .btns > div {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
    }
    .btns > div > button {
        margin-bottom: 10px;
    }

    .btns > div:nth-child(1) {
        flex: 1 1 20%; 
    }
    .btns > div:nth-child(2) {
        flex: 1 1 40%;
    }
    .btns > div:nth-child(3) {
        flex: 1 1 40%;
    }
  `],
  template: `
    <div class="container">
        <h4>Split with transitions</h4>
        <div class="split-example">
            <split direction="horizontal" 
                   disabled="true"
                   [useTransition]="action.useTransition"
                   (dragEnd)="action.a1s=$event.sizes[0]; action.a2s=$event.sizes[1]; action.a3s=$event.sizes[2];">
                <split-area [visible]="action.a1v" [size]="action.a1s" order="1">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tiam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </split-area>
                <split-area [visible]="action.a2v" [size]="action.a2s" order="2">
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eodolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
                </split-area>
                <split-area [visible]="action.a3v" [size]="action.a3s" order="3">
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eodolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
                </split-area>
            </split>
        </div>
        <br>
        <div class="btns">
            <div>
                <button class="btn btn-warning" 
                        [class.active]="action.useTransition" 
                        (click)="action.useTransition = !action.useTransition">{{ 'useTransition: ' + action.useTransition }}</button>
            </div>
            <div class="btn-group">
                <label class="btn btn-warning" 
                       [class.active]="action.a1v" 
                       (click)="action.a1v = !action.a1v">{{ 'area1: ' + action.a1v }}</label>
                <label class="btn btn-warning" 
                       [class.active]="action.a2v" 
                       (click)="action.a2v = !action.a2v">{{ 'area2: ' + action.a2v }}</label>
                <label class="btn btn-warning" 
                       [class.active]="action.a3v" 
                       (click)="action.a3v = !action.a3v">{{ 'area3: ' + action.a3v }}</label>
            </div>
            <div class="btn-group">
                <label class="btn btn-warning"
                       [class.disabled]="action.a1s === 25 || !action.a1v || !action.a2v || !action.a3v" 
                       (click)="action.a1s=25; action.a2s=50; action.a3s=25">Set sizes to 25/50/25</label>
                <label class="btn btn-warning" 
                       [class.disabled]="action.a1s === 40 || !action.a1v || !action.a2v || !action.a3v"
                       (click)="action.a1s=40; action.a2s=20; action.a3s=40">Set sizes to 40/20/40</label>
            </div>
        </div>
        <br>
        <pre [innerText]="code"></pre>
    </div>`
})
export class TransitionsComponent {
    action = {
        a1s: 25,
        a2s: 50,
        a3s: 25,
        a1v: true,
        a2v: true,
        a3v: true,
        useTransition: true,
    }

    code: string = `<div class="split-example">
    <split direction="horizontal" 
           disabled="true"
           [useTransition]="action.useTransition"
           (dragEnd)="action.a1s=$event.sizes[0]; action.a2s=$event.sizes[1]; action.a3s=$event.sizes[2];">
        <split-area [visible]="action.a1v" [size]="action.a1s" order="1">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tiam, quis nostrud...</p>
        </split-area>
        <split-area [visible]="action.a2v" [size]="action.a2s" order="2">
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...</p>
        </split-area>
        <split-area [visible]="action.a3v" [size]="action.a3s" order="3">
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudan...</p>
        </split-area>
    </split>
</div>
<br>
<div class="btns">
    <div>
        <button class="btn btn-warning" 
                [class.active]="action.useTransition" 
                (click)="action.useTransition = !action.useTransition">{{ 'useTransition: ' + action.useTransition }}</button>
    </div>
    <div>
        <button class="btn btn-warning" 
                [class.active]="action.a1v" 
                (click)="action.a1v = !action.a1v">{{ 'a1v: ' + action.a1v }}</button>
        <button class="btn btn-warning" 
                [class.active]="action.a2v" 
                (click)="action.a2v = !action.a2v">{{ 'a2v: ' + action.a2v }}</button>
        <button class="btn btn-warning" 
                [class.active]="action.a3v" 
                (click)="action.a3v = !action.a3v">{{ 'a3v: ' + action.a3v }}</button>
    </div>
    <div>
        <button class="btn btn-warning"
                [disabled]="action.a1s === 25 || !action.a1v || !action.a2v || !action.a3v" 
                (click)="action.a1s=25; action.a2s=50; action.a3s=25">Set sizes to 25/50/25</button>
        <button class="btn btn-warning" 
                [disabled]="action.a1s === 40 || !action.a1v || !action.a2v || !action.a3v"
                (click)="action.a1s=40; action.a2s=20; action.a3s=40">Set sizes to 40/20/40</button>
    </div>
</div>`

}
