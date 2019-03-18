/// <reference types="Cypress" />

import { moveGutter, checkSplitDirAndSizes } from '../support/splitUtils'


context('Gutter click example page tests', () => {
    const W = 1070;
    const H = 300;
    const GUTTER = 10;
    
    beforeEach(() => {
        cy.visit('/#/examples/gutter-click-roll-unroll')
    })

    it('Display initial state', () => {
        checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [262.5, 525, 262.5]);
    })
    
    it('Click gutters to switch area sizes between 0 and X', () => {
        cy.get('.as-split-gutter').eq(0).click();
        cy.wait(1500);
        checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [0, 787.5, 262.5]);
        cy.wait(10);
        
        cy.get('.as-split-gutter').eq(0).click();
        cy.wait(1500);
        checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [262.5, 525, 262.5]);
        cy.wait(10);
        
        cy.get('.as-split-gutter').eq(0).click();
        cy.wait(1500);
        checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [0, 787.5, 262.5]);
        cy.wait(10);
        
        cy.get('.as-split-gutter').eq(1).click();
        cy.wait(1500);
        checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [0, 1050, 0]);
        cy.wait(10);
        
        cy.get('.as-split-gutter').eq(0).click();
        cy.wait(1500);
        checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [262.5, 787.5, 0]);
        cy.wait(10);
        
        cy.get('.as-split-gutter').eq(1).click();
        cy.wait(1500);
        checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [262.5, 525, 262.5]);
        cy.wait(10);

        cy.get('.logs ul li').filter('.gutterClick').should('have.length', 6);
        // cy.get('.logs ul li').filter('.transitionEnd').should('have.length', 6);
    })
    
    it('Mix gutter click and dragging', () => {
        // Try move gutter event if disabled
        moveGutter('.as-split-gutter', 0, -100, 0);
        checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [262.5, 525, 262.5]);
        cy.get('.logs ul li').should('have.length', 0);

        // Enable gutters
        cy.get('.btns button').eq(1).click();

        // Move gutter1
        moveGutter('.as-split-gutter', 0, -100, 0);
        checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [162.5, 625, 262.5]);
        cy.wait(10);

        cy.get('.logs ul li').filter('.dragStart').should('have.length', 1);
        cy.get('.logs ul li').filter('.dragEnd').should('have.length', 1);
        
        // Click gutter1 to close area1
        cy.get('.as-split-gutter').eq(0).click();
        cy.wait(1500);
        checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [0, 787.5, 262.5]);
        cy.wait(10);
        
        cy.get('.logs ul li').filter('.dragStart').should('have.length', 2);
        cy.get('.logs ul li').filter('.dragEnd').should('have.length', 1);
        cy.get('.logs ul li').filter('.gutterClick').should('have.length', 1);
        cy.get('.logs ul li').filter('.transitionEnd').should('have.length', 1);

        // Click gutter2 to close area3
        cy.get('.as-split-gutter').eq(1).click();
        cy.wait(1500);
        checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [0, 1050, 0]);
        cy.wait(10);
        
        cy.get('.logs ul li').filter('.dragStart').should('have.length', 3);
        cy.get('.logs ul li').filter('.dragEnd').should('have.length', 1);
        cy.get('.logs ul li').filter('.gutterClick').should('have.length', 2);
        cy.get('.logs ul li').filter('.transitionEnd').should('have.length', 2);
        
        // Move gutter2 to enlarge area3
        moveGutter('.as-split-gutter', 1, -20, 0);
        checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [0, 1030, 20]);
        
        cy.get('.logs ul li').filter('.dragStart').should('have.length', 4);
        cy.get('.logs ul li').filter('.dragEnd').should('have.length', 2);
        cy.get('.logs ul li').filter('.gutterClick').should('have.length', 2);
        cy.get('.logs ul li').filter('.transitionEnd').should('have.length', 2);

        // Click gutter2 to close area3
        cy.get('.as-split-gutter').eq(1).click();
        cy.wait(1500);
        checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [0, 1050, 0]);
        cy.wait(10);
        
        cy.get('.logs ul li').filter('.dragStart').should('have.length', 5);
        cy.get('.logs ul li').filter('.dragEnd').should('have.length', 2);
        cy.get('.logs ul li').filter('.gutterClick').should('have.length', 3);
        cy.get('.logs ul li').filter('.transitionEnd').should('have.length', 3);

        // Click gutter1 to display area1
        cy.get('.as-split-gutter').eq(0).click();
        cy.wait(1500);
        checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [262.5, 787.5, 0]);
        cy.wait(10);
        
        cy.get('.logs ul li').filter('.dragStart').should('have.length', 6);
        cy.get('.logs ul li').filter('.dragEnd').should('have.length', 2);
        cy.get('.logs ul li').filter('.gutterClick').should('have.length', 4);
        cy.get('.logs ul li').filter('.transitionEnd').should('have.length', 4);
    })
        
    it('Test double click event', () => {
        // Click 2 times with 100ms delay => +2 CLICK
        cy.get('.as-split-gutter').eq(0).click();
        cy.wait(100);
        cy.get('.as-split-gutter').eq(0).click();
        
        cy.wait(550);
        cy.get('.logs ul li').filter('.gutterDblClick').should('have.length', 0);
        cy.get('.logs ul li').filter('.gutterClick').should('have.length', 2);

        // Set to 500ms
        cy.get('div.btn-group label').eq(1).click({force: true});
        cy.wait(100);
        
        // Click 2 times with 100ms delay => +1 DBLCLICK
        cy.get('.as-split-gutter').eq(0).click();
        cy.wait(100);
        cy.get('.as-split-gutter').eq(0).click();
        
        cy.wait(550);
        cy.get('.logs ul li').filter('.gutterDblClick').should('have.length', 1);
        cy.get('.logs ul li').filter('.gutterClick').should('have.length', 2);
        
        // Click 2 times with 250ms delay => +1 DBLCLICK
        cy.get('.as-split-gutter').eq(0).click();
        cy.wait(250);
        cy.get('.as-split-gutter').eq(0).click();
        
        cy.wait(550);
        cy.get('.logs ul li').filter('.gutterDblClick').should('have.length', 2);
        cy.get('.logs ul li').filter('.gutterClick').should('have.length', 2);
        
        // Click 2 times with 600ms delay => +2 CLICK
        cy.get('.as-split-gutter').eq(0).click();
        cy.wait(600);
        cy.get('.as-split-gutter').eq(0).click();
        
        cy.wait(550);
        cy.get('.logs ul li').filter('.gutterDblClick').should('have.length', 2);
        cy.get('.logs ul li').filter('.gutterClick').should('have.length', 4);
    })

})
