/// <reference types="Cypress" />

import { moveGutter, checkSplitDirAndSizes } from '../support/splitUtils'


context('Geek demo example page tests', () => {
    const W = 1070;
    const H = 300;
    const GUTTER = 11;
    
    beforeEach(() => {
        cy.visit('/#/examples/geek-demo');
    })

    it('Display initial state', () => {
        checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [262, 524, 262]);
        cy.get('.opts-area div[draggable="true"]').should('have.length', 3);
    })
    
    it('Change direction / width / height / gutter size', () => {
        cy.get('.opts-prop .btn').contains('vertical').click();
        checkSplitDirAndSizes('.split-example > as-split', 'vertical', W, H, GUTTER, [70, 139, 69]);
        
        cy.get('.opts-prop .btn').contains('400').click();
        checkSplitDirAndSizes('.split-example > as-split', 'vertical', 400, H, GUTTER, [70, 139, 69]);
        
        cy.get('.opts-prop .btn').contains('horizontal').click();
        checkSplitDirAndSizes('.split-example > as-split', 'horizontal', 400, H, GUTTER, [95, 189, 94]);
        
        cy.get('.opts-prop .btn').contains('600').click();
        checkSplitDirAndSizes('.split-example > as-split', 'horizontal', 600, H, GUTTER, [145, 289, 144]);
        
        cy.get('.opts-prop .btn').contains('200').click();
        checkSplitDirAndSizes('.split-example > as-split', 'horizontal', 600, 200, GUTTER, [145, 289, 144]);
        
        cy.get('.opts-prop .btn').contains('vertical').click();
        checkSplitDirAndSizes('.split-example > as-split', 'vertical', 600, 200, GUTTER, [45, 89, 44]);
        
        cy.get('.opts-prop .btn').contains('350').click();
        checkSplitDirAndSizes('.split-example > as-split', 'vertical', 600, 350, GUTTER, [82, 164, 82]);
        
        cy.get('.opts-prop .btn').contains('7').click();
        checkSplitDirAndSizes('.split-example > as-split', 'vertical', 600, 350, 7, [84, 168, 84]);

        cy.get('.opts-prop .btn').contains('horizontal').click();
        cy.get('.opts-prop .btn').contains('22').click();
        checkSplitDirAndSizes('.split-example > as-split', 'horizontal', 600, 350, 22, [139, 278, 139]);
        
        cy.get('.opts-prop').contains('Width: ').parent().contains('null').click();
        checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, 350, 22, [257, 513, 256]);
    })
    
    
    it('Add areas, move all to limit and change direction / gutter size', () => {
        cy.get('.opts-area .btn').contains('Add area').click();
        cy.get('.opts-area .btn').contains('Add area').click();
        cy.get('.opts-area .btn').contains('Add area').click();
        cy.get('.opts-area .btn').contains('Add area').click();
        cy.get('.opts-area .btn').contains('Add area').click();

        checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [124, 124, 124, 125, 124, 124, 124, 124]);
        cy.get('.opts-area div[draggable="true"]').should('have.length', 8);
        
        cy.get('.opts-prop .btn').contains('vertical').click();
        checkSplitDirAndSizes('.split-example > as-split', 'vertical', W, H, GUTTER, [28, 28, 28, 28, 27, 28, 28, 28]);
        
        moveGutter('.as-split-gutter', 0, 0, -200);
        moveGutter('.as-split-gutter', 1, 0, -200);
        moveGutter('.as-split-gutter', 2, 0, -200);
        moveGutter('.as-split-gutter', 3, 0, -200);
        moveGutter('.as-split-gutter', 4, 0, -200);
        moveGutter('.as-split-gutter', 5, 0, -200);
        moveGutter('.as-split-gutter', 6, 0, -200);
        checkSplitDirAndSizes('.split-example > as-split', 'vertical', W, H, GUTTER, [0, 0, 0, 0, 0, 0, 0, 223]);
        
        moveGutter('.as-split-gutter', 0, 0, 100);
        moveGutter('.as-split-gutter', 1, 0, 100);
        moveGutter('.as-split-gutter', 2, 0, 100);
        moveGutter('.as-split-gutter', 3, 0, 100);
        moveGutter('.as-split-gutter', 4, 0, 100);
        moveGutter('.as-split-gutter', 5, 0, 100);
        moveGutter('.as-split-gutter', 6, 0, 100);
        checkSplitDirAndSizes('.split-example > as-split', 'vertical', W, H, GUTTER, [0, 0, 0, 0, 0, 0, 100, 123]);
        
        moveGutter('.as-split-gutter', 5, 0, 150);
        moveGutter('.as-split-gutter', 4, 0, 150);
        moveGutter('.as-split-gutter', 3, 0, 150);
        moveGutter('.as-split-gutter', 2, 0, 150);
        moveGutter('.as-split-gutter', 1, 0, 150);
        moveGutter('.as-split-gutter', 0, 0, 150);
        checkSplitDirAndSizes('.split-example > as-split', 'vertical', W, H, GUTTER, [100, 0, 0, 0, 0, 0, 0, 123]);
        
        cy.get('.opts-prop .btn').contains('horizontal').click();
        cy.get('.opts-prop .btn').contains('200').click();
        checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, 200, GUTTER, [445, 0, 0, 0, 0, 0, 0, 548]);
        
        cy.get('.opts-area .btn').contains('Add area').click();
        cy.get('.opts-area .btn').contains('Add area').click();
        cy.get('.opts-area .btn').contains('Add area').click();
        checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, 200, GUTTER, [87, 88, 87, 87, 87, 88, 87, 87, 87, 88, 87]);
        cy.get('.opts-area div[draggable="true"]').should('have.length', 11);

        cy.get('.opts-prop .btn').contains('22').click();
        checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, 200, 22, [77, 78, 77, 77, 77, 78, 77, 77, 77, 78, 77]);
        
        cy.get('.opts-prop .btn').contains('vertical').click();
        checkSplitDirAndSizes('.split-example > as-split', 'vertical', W, 220 /* <- because gutterSize*nbGutter */, 22, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        
        cy.get('.opts-prop .btn').contains('horizontal').click();
        checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, 200, 22, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 850]);
    })
    
    
    it.only('Add areas, check order, move them and check order', () => {
        // cy.get('.opts-area .btn').contains('Add area').click();
        // cy.get('.opts-area .btn').contains('Add area').click();
        // cy.get('.opts-area .btn').contains('Add area').click();
        // cy.get('.opts-area .btn').contains('Add area').click();
        // cy.get('.opts-area .btn').contains('Add area').click();

        // checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [124, 124, 124, 125, 124, 124, 124, 124]);
        // cy.get('.opts-area div[draggable="true"]').should('have.length', 8);
        // checkAreaOrder();
        
        moveArea(0, 2);
        checkAreaOrder();
    })


})



function checkAreaOrder() {
    // Retrieve all as-split-area displayed in order
    cy.get('.as-split-area').then($splitAreas => {
        const splitAreasNum = $splitAreas.map((i, $el) => $el.textContent);

        // Retrieve all listed areas displayed in order
        cy.get('.opts-area div[draggable="true"] .num').then($controlAreas => {
            const controlAreasNum = $controlAreas.map((i, $el) => $el.textContent);
            
            // Compare 2 lists > should be the same
            expect(splitAreasNum.get()).to.deep.eq(controlAreasNum.get());
        });
    })
}

function moveArea(numArea, gap) {
    const dataTransfer = new DataTransfer();
    dataTransfer.effectAllowed = 'all';

    const dataTransferOptions = {
        dataTransfer/*: {
            dropEffect: 'none',
            effectAllowed: 'all',
            files: [],
            types: ['Text'],
            setData: (x, y) => {},
            //getData: k => 'placeholder',
        }*/
    };

    cy.get('.opts-area div[draggable="true"]').eq(numArea).as('movedItem')
      .get('.opts-area div[draggable="true"]').eq(numArea + gap).as('destItem')
      .get('bs-sortable > div').as('dropDiv')
      .get('@movedItem')
        .trigger('dragstart', dataTransferOptions)
      .get('@destItem')
        .trigger('dragover', dataTransferOptions)
      .get('@dropDiv')
        .trigger('drop', dataTransferOptions);
}