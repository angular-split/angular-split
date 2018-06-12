import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement, Component }    from '@angular/core';

import { SplitComponent } from './../../src/components/split.component';
import { SplitAreaDirective } from './../../src/components/splitArea.directive';
import { SplitGutterDirective } from './../../src/components/splitGutter.directive';


@Component({
    selector: 'test',
    template: `
      <split [gutterSize]="gutterSize">
          <split-area *ngFor="let area of areas" [order]="area.order">{{ area.label }}</split-area>
      </split>`
  })
  class TestComponent {
      areas = [
          {label: 'splitA', order: 1},
          {label: 'splitB', order: 2},
      ]
      gutterSize = 10
  }


describe('TestComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let elemAreas: Array<DebugElement>;
    let elemGutters: Array<DebugElement>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ 
                TestComponent, 
                SplitComponent, 
                SplitAreaDirective, 
                SplitGutterDirective,
            ],
        });

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
    });
    
    it('CODE: 2 areas should have TEMPLATE: 2 areas + 1 gutter', () => {
        fixture.detectChanges();

        elemAreas = fixture.debugElement.queryAll(By.css('split-area'));
        expect(elemAreas.length).toEqual(2);

        elemGutters = fixture.debugElement.queryAll(By.css('split-gutter'));
        expect(elemGutters.length).toEqual(1);
    });
    
    it('CODE: 3 areas should have TEMPLATE: 3 areas + 2 gutters', () => {
        component.areas.push({label: 'splitC', order: 3})
        fixture.detectChanges();
        
        elemAreas = fixture.debugElement.queryAll(By.css('split-area'));
        expect(elemAreas.length).toEqual(3);
        
        elemGutters = fixture.debugElement.queryAll(By.css('split-gutter'));
        expect(elemGutters.length).toEqual(2);
    });
    
    it('CODE: 4 areas should have TEMPLATE: 4 areas + 3 gutters', () => {
        component.areas.push({label: 'splitC', order: 3})
        component.areas.shift()
        component.areas.push({label: 'splitD', order: 4})
        component.areas.push({label: 'splitE', order: 5})
        fixture.detectChanges();
        
        elemAreas = fixture.debugElement.queryAll(By.css('split-area'));
        expect(elemAreas.length).toEqual(4);
        
        elemGutters = fixture.debugElement.queryAll(By.css('split-gutter'));
        expect(elemGutters.length).toEqual(3);
    });

    // test gutterSize init = css 10px
    // test gutterSize after change = css 10px

    // test 3 areas with 1 visibility false > prop visibleAreas.length = 2
    // add new area with visibility false > prop visibleAreas.length = 2
    // toggle area visibility false > prop visibleAreas.length = 3

    // test default areas size: 3 areas -> calc( 33% - 2*gutterSize )
    // test with specific sizes

    // try to simulate mousedrag..
});