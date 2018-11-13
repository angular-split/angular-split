/// <reference types="Cypress" />

import { moveGutter, checkSplitDirAndSizes } from '../support/splitUtils'


context('Simple example page tests', () => {
    const W = 1070;
    const H = 300;
    const GUTTER = 11;
    
    beforeEach(() => {
        cy.visit('/#/examples/sync-split')
    })

    it('Display initial state', () => {
        checkSplitDirAndSizes('.split-example > as-split', 'vertical', W, H, GUTTER, [87, 202]);
        checkSplitDirAndSizes('.split-example > as-split > as-split-area:nth-child(1) > as-split', 'horizontal', W, 87, GUTTER, [265, 794]);
        checkSplitDirAndSizes('.split-example > as-split > as-split-area:nth-child(2) > as-split', 'horizontal', W, 202, GUTTER, [265, 794]);
    })
    
    it('Move gutter upper split horizontally and check if other split follow', () => {
        moveGutter('.split-example > as-split > as-split-area:nth-child(1) > as-split > as-split-gutter', 0, 280, 0);
        checkSplitDirAndSizes('.split-example > as-split > as-split-area:nth-child(1) > as-split', 'horizontal', W, 87, GUTTER, [544, 515]);
        checkSplitDirAndSizes('.split-example > as-split > as-split-area:nth-child(2) > as-split', 'horizontal', W, 202, GUTTER, [544, 515]);
        
        moveGutter('.split-example > as-split > as-split-area:nth-child(1) > as-split > as-split-gutter', 0, 600, 0);
        checkSplitDirAndSizes('.split-example > as-split > as-split-area:nth-child(1) > as-split', 'horizontal', W, 87, GUTTER, [1059, 0]);
        checkSplitDirAndSizes('.split-example > as-split > as-split-area:nth-child(2) > as-split', 'horizontal', W, 202, GUTTER, [1059, 0]);
        
        moveGutter('.split-example > as-split > as-split-area:nth-child(1) > as-split > as-split-gutter', 0, -1500, 0);
        checkSplitDirAndSizes('.split-example > as-split > as-split-area:nth-child(1) > as-split', 'horizontal', W, 87, GUTTER, [0, 1059]);
        checkSplitDirAndSizes('.split-example > as-split > as-split-area:nth-child(2) > as-split', 'horizontal', W, 202, GUTTER, [0, 1059]);
    })
    
    it('Move gutter down split horizontally and check if other split follow', () => {
        moveGutter('.split-example > as-split > as-split-area:nth-child(2) > as-split > as-split-gutter', 0, 280, 0);
        checkSplitDirAndSizes('.split-example > as-split > as-split-area:nth-child(1) > as-split', 'horizontal', W, 87, GUTTER, [544, 515]);
        checkSplitDirAndSizes('.split-example > as-split > as-split-area:nth-child(2) > as-split', 'horizontal', W, 202, GUTTER, [544, 515]);
        
        moveGutter('.split-example > as-split > as-split-area:nth-child(2) > as-split > as-split-gutter', 0, 600, 0);
        checkSplitDirAndSizes('.split-example > as-split > as-split-area:nth-child(1) > as-split', 'horizontal', W, 87, GUTTER, [1059, 0]);
        checkSplitDirAndSizes('.split-example > as-split > as-split-area:nth-child(2) > as-split', 'horizontal', W, 202, GUTTER, [1059, 0]);
        
        moveGutter('.split-example > as-split > as-split-area:nth-child(2) > as-split > as-split-gutter', 0, -1500, 0);
        checkSplitDirAndSizes('.split-example > as-split > as-split-area:nth-child(1) > as-split', 'horizontal', W, 87, GUTTER, [0, 1059]);
        checkSplitDirAndSizes('.split-example > as-split > as-split-area:nth-child(2) > as-split', 'horizontal', W, 202, GUTTER, [0, 1059]);
    })
})
