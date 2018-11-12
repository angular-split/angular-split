/// <reference types="Cypress" />

import { moveGutter, checkSplitDirAndSizes } from '../support/splitUtils'


context('Simple example page tests', () => {
    const W = 1070;
    const H = 300;
    const GUTTER = 11;
    
    beforeEach(() => {
        cy.visit('/#/examples/simple-split')
    })

    it('Display initial state', () => {
        checkSplitDirAndSizes('as-split', 'horizontal', W, H, GUTTER, [318, 741]);
    })

    it('Change direction', () => {
        cy.get('.btns > .btn').click();
        checkSplitDirAndSizes('as-split', 'vertical', W, H, GUTTER, [87, 202]);
    })
    
    it('Move gutter horizontally', () => {
        moveGutter('as-split-gutter', 0, 280, 0);
        checkSplitDirAndSizes('as-split', 'horizontal', W, H, GUTTER, [597, 462]);
    })
    
    it('Change direction & move gutter vertically', () => {
        cy.get('.btns > .btn').click();
        moveGutter('as-split-gutter', 0, 0, 60);
        checkSplitDirAndSizes('as-split', 'vertical', W, H, GUTTER, [146, 143]);
    })
    
    it('Move gutter horizontally and move it back', () => {
        moveGutter('as-split-gutter', 0, 280, 0);
        checkSplitDirAndSizes('as-split', 'horizontal', W, H, GUTTER, [597, 462]);

        moveGutter('as-split-gutter', 0, -280, 0);
        checkSplitDirAndSizes('as-split', 'horizontal', W, H, GUTTER, [317, 742]);
    })
    
    it('Move gutter horizontally to max, change direction', () => {
        moveGutter('as-split-gutter', 0, -1000, 0);
        checkSplitDirAndSizes('as-split', 'horizontal', W, H, GUTTER, [0, 1059]);
        
        cy.get('.btns > .btn').click();
        checkSplitDirAndSizes('as-split', 'vertical', W, H, GUTTER, [0, 289]);
        
        moveGutter('as-split-gutter', 0, 0, 1000);
        cy.get('.btns > .btn').click();
        checkSplitDirAndSizes('as-split', 'horizontal', W, H, GUTTER, [1059, 0]);
    })
})
