import { Component } from '@angular/core'


@Component({
  selector: 'sp-ex-transitions',
  styles: [`
    :host {
        display: block;
        width: 100%;
        margin: 50px 0;
    }
  `],
  template: `
    <div class="container">
        <h4>Split with transitions</h4>
        <button class="btn" (click)="a.useTransition = !a.useTransition">{{ 'useTransition: ' + a.useTransition}}</button>
        <br>
        <button class="btn" (click)="a.a1visible = !a.a1visible">{{ 'a1visible: ' + a.a1visible}}</button>
        <button class="btn" (click)="a.a2visible = !a.a2visible">{{ 'a2visible: ' + a.a2visible}}</button>
        <button class="btn" (click)="a.a3visible = !a.a3visible">{{ 'a3visible: ' + a.a3visible}}</button>
        <br>
        <button class="btn" (click)="a.a1=25; a.a2=50; a.a3=25">Set to 25/50/25</button>
        <button class="btn" (click)="a.a1=40; a.a2=20; a.a3=40">Set to 40/20/40</button>
        <br>
        <div class="split-example">
            <split direction="horizontal" 
                    [useTransition]="a.useTransition"
                    (dragEnd)="a.a1=$event.sizes[0]; a.a2=$event.sizes[1]; a.a3=$event.sizes[2];">
                <split-area [visible]="a.a1visible" [size]="a.a1" order="1">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tiam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </split-area>
                <split-area [visible]="a.a2visible" [size]="a.a2" order="2">
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eodolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
                </split-area>
                <split-area [visible]="a.a3visible" [size]="a.a3" order="3">
                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eodolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
                </split-area>
            </split>
        </div>
        <br><br>
        <pre [innerText]="code"></pre>
    </div>`
})
export class TransitionsComponent {
    a = {
        a1: 25,
        a2: 50,
        a3: 25,
        a1visible: true,
        a2visible: true,
        a3visible: true,
        useTransition: true,
    }
    code: string = `xxx`

}
