/// <reference types="Cypress" />

context('Basic operation', () => {
    const W = 1070;
    const H = 300;
    const GUTTER = 11;
    
    beforeEach(() => {
        cy.visit('http://localhost:4200/#/examples/simple-split')
        cy.viewport(1200, 800);
    })

    it('Display initial state', () => {
        checkSplitDirAndSizes('as-split', 'horizontal', W, H, GUTTER, ['calc(-3.3px + 30%)', 'calc(-7.7px + 70%)']);
    })

    it('Change direction', () => {
        cy.get('.btns > .btn').click();
        
        checkSplitDirAndSizes('as-split', 'vertical', W, H, GUTTER, ['calc(-3.3px + 30%)', 'calc(-7.7px + 70%)']);
    })
    
    it('Move gutter horizontally', () => {
        moveElement('as-split-gutter', 280, 0);
        
        checkSplitDirAndSizes('as-split', 'horizontal', W, H, GUTTER, ['calc(-6.20566px + 56.4151%)', 'calc(-4.79434px + 43.5849%)']);
    })
    
    it('Change direction & move gutter vertically', () => {
        cy.get('.btns > .btn').click();
        
        moveElement('as-split-gutter', 0, 60);

        checkSplitDirAndSizes('as-split', 'vertical', W, H, GUTTER, ['calc(-5.57586px + 50.6897%)', 'calc(-5.42414px + 49.3103%)']);
    })
    
    it('Move gutter horizontally and move it back', () => {
        moveElement('as-split-gutter', 280, 0);
        
        checkSplitDirAndSizes('as-split', 'horizontal', W, H, GUTTER, ['calc(-6.20566px + 56.4151%)', 'calc(-4.79434px + 43.5849%)']);

        moveElement('as-split-gutter', -280, 0);
        
        checkSplitDirAndSizes('as-split', 'horizontal', W, H, GUTTER, ['calc(-3.29513px + 29.9558%)', 'calc(-7.70487px + 70.0442%)']);
    })
})


function moveElement(element, x, y) {
    cy.get(`${ element }`)
        .trigger('mousedown', { which: 1, pageX: 0, pageY: 0 })
        .trigger('mousemove', { pageX: x, pageY: y });
        
    cy.document().trigger('mouseup', { force: true });
    
}

function checkSplitDirAndSizes(el, dir, w, h, gutter, sizes) {
    const propFlexDir = (dir === 'horizontal') ? 'row' : 'column';
    cy.get(el).should('have.css', 'flex-direction', propFlexDir);

    const propSize = (dir === 'horizontal') ? 'width' : 'height';
    cy.get(`${ el } as-split-gutter`).should('have.css', propSize, `${ gutter }px`);

    const propSize2 = (propSize === 'width') ? 'height' : 'width';
    const propValue2 = (propSize === 'width') ? h : w;

    cy.get(`${ el } as-split-area`)
        .should('have.length', sizes.length)
        .each(($li, index) => {
            cy.wrap($li).should('have.css', 'flex', `0 0 ${ sizes[index] }`);
            cy.wrap($li).should('have.css', propSize2, `${ propValue2 }px`);
        })
}
