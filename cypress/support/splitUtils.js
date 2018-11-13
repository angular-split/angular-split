
export function moveGutter(gutters, num, x, y) {
    cy.get(gutters).eq(num)
        .trigger('mousedown', { which: 1, pageX: 0, pageY: 0 })
        .trigger('mousemove', { pageX: x*.25, pageY: y*.25 })
        .trigger('mousemove', { pageX: x*.50, pageY: y*.50 })
        .trigger('mousemove', { pageX: x*.75, pageY: y*.75 })
        .trigger('mousemove', { pageX: x, pageY: y })
        .trigger('mouseup');
        
    cy.document().trigger('mouseup', { force: true });
}

//////////////////////////////////////////

export function checkSplitDirAndCalcSizes(el, dir, w, h, gutter, sizes) {
    const propFlexDir = (dir === 'horizontal') ? 'row' : 'column';
    cy.get(el).should('have.css', 'flex-direction', propFlexDir);

    const propSize = (dir === 'horizontal') ? 'width' : 'height';
    cy.get(`${ el } > as-split-gutter`).should('have.css', propSize, `${ gutter }px`);

    const propSize2 = (propSize === 'width') ? 'height' : 'width';
    const propValue2 = (propSize === 'width') ? h : w;

    cy.get(`${ el } > as-split-area`)
        .should('have.length', sizes.length)
        .each(($li, index) => {
            cy.wrap($li).should('have.css', 'flex', `0 0 ${ sizes[index] }`);
            cy.wrap($li).should('have.css', propSize2, `${ propValue2 }px`);
        })
}

//////////////////////////////////////////

export function checkSplitDirAndSizes(el, dir, w, h, gutter, sizes) {
    cy.log(`-- NEW SPLIT CHECK (${ dir },${ w },${ h },${ gutter })`);
    // Before real test, check if values provided are ok !
    const total = sizes.reduce((acc, v) => acc + v, 0) + gutter * (sizes.length - 1);
    expect(total).to.eq((dir === 'horizontal') ? w : h);

    const propFlexDir = (dir === 'horizontal') ? 'row' : 'column';
    cy.get(el).should('have.css', 'flex-direction', propFlexDir);

    const propSize = (dir === 'horizontal') ? 'width' : 'height';
    const propSize2 = (propSize === 'width') ? 'height' : 'width';
    const propValue2 = (propSize === 'width') ? h : w;

    cy.get(`${ el } > as-split-gutter`).should('have.length', sizes.length - 1);
    cy.get(`${ el } > as-split-gutter`).invoke(propSize).should('eq', gutter);
    cy.get(`${ el } > as-split-gutter`).invoke(propSize2).should('eq', propValue2);

    cy.get(`${ el } > as-split-area`)
        .should('have.length', sizes.length)
        .each(($li, index) => {
            cy.wrap($li).invoke(propSize).should('eq', sizes[index]);
            cy.wrap($li).invoke(propSize2).should('eq', propValue2);
        })
}

