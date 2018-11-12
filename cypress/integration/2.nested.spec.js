/// <reference types="Cypress" />

import { moveGutter, checkSplitDirAndSizes } from '../support/splitUtils'

context('Nested example page tests', () => {
    const W = 1070;
    const H = 400;
    const GUTTER = 11;
    
    beforeEach(() => {
        cy.visit('/#/examples/nested-split')
    })

    it('Display initial state', () => {
        checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [424, 635]);
        
        checkSplitDirAndSizes('.split-example > as-split > as-split-area:nth-child(1) > as-split', 'vertical', 424, H, GUTTER, [126, 126, 126]);
        checkSplitDirAndSizes('.split-example > as-split > as-split-area:nth-child(2) > as-split', 'vertical', 635, H, GUTTER, [97, 292]);
    })

    it('Move gutter horizontally 3 times and until maximum', () => {
        moveGutter('.split-example > as-split > as-split-gutter', 0, 280, 0);
        
        checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [703, 356]);
        
        moveGutter('.split-example > as-split > as-split-gutter', 0, -80, 0);
        
        checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [623, 436]);
        
        moveGutter('.split-example > as-split > as-split-gutter', 0, 700, 0);
        
        checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [1059, 0]);
    })

    it('Move nested split 1 multiple times', () => {
        moveGutter('.split-example > as-split > as-split-area:nth-child(1) > as-split > as-split-gutter', 0, 0, 60);
        checkSplitDirAndSizes('.split-example > as-split > as-split-area:nth-child(1) > as-split', 'vertical', 424, H, GUTTER, [186, 66, 126]);
        
        moveGutter('.split-example > as-split > as-split-area:nth-child(1) > as-split > as-split-gutter', 1, 0, -300);
        checkSplitDirAndSizes('.split-example > as-split > as-split-area:nth-child(1) > as-split', 'vertical', 424, H, GUTTER, [186, 0, 192]);
        
        // Move space smaller than gutter > nothing change
        moveGutter('.split-example > as-split > as-split-area:nth-child(1) > as-split > as-split-gutter', 0, 0, -10);
        checkSplitDirAndSizes('.split-example > as-split > as-split-area:nth-child(1) > as-split', 'vertical', 424, H, GUTTER, [186, 0, 192]);
        
        // Move space same as gutter > move
        moveGutter('.split-example > as-split > as-split-area:nth-child(1) > as-split > as-split-gutter', 0, 0, -GUTTER);
        checkSplitDirAndSizes('.split-example > as-split > as-split-area:nth-child(1) > as-split', 'vertical', 424, H, GUTTER, [175, 11, 192]);
        
        // Move space bigger than gutter > move
        moveGutter('.split-example > as-split > as-split-area:nth-child(1) > as-split > as-split-gutter', 0, 0, -20);
        checkSplitDirAndSizes('.split-example > as-split > as-split-area:nth-child(1) > as-split', 'vertical', 424, H, GUTTER, [155, 31, 192]);
    })
    
    it('Move nested split 2 multiple times', () => {
        moveGutter('.split-example > as-split > as-split-area:nth-child(2) > as-split > as-split-gutter', 0, 0, 600);
        checkSplitDirAndSizes('.split-example > as-split > as-split-area:nth-child(2) > as-split', 'vertical', 635, H, GUTTER, [389, 0]);
        
        moveGutter('.split-example > as-split > as-split-area:nth-child(2) > as-split > as-split-gutter', 0, 0, -600);
        checkSplitDirAndSizes('.split-example > as-split > as-split-area:nth-child(2) > as-split', 'vertical', 635, H, GUTTER, [0, 389]);
    })
})
