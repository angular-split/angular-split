export function moveGutterByMouse(gutters, num, x, y) {
  cy.get(gutters)
    .eq(num)
    .trigger('mousedown', { which: 1, clientX: 0, clientY: 0 })
    .trigger('mousemove', { clientX: x * 0.25, clientY: y * 0.25 })
    .trigger('mousemove', { clientX: x * 0.5, clientY: y * 0.5 })
    .trigger('mousemove', { clientX: x * 0.75, clientY: y * 0.75 })
    .trigger('mousemove', { clientX: x, clientY: y })
    .trigger('mouseup')

  cy.document().trigger('mouseup', { force: true })
  cy.document().trigger('click', { force: true })
  cy.wait(10)
}

export function moveGutterByKeyboard(gutters, num, numKeyPresses, keySequence) {
  for (let i = 0; i < numKeyPresses; i++) {
    cy.get(gutters)
      .eq(num)
      .focus()
      .type(`{${keySequence}}`)
    cy.wait(10)
  }
}

export function checkGutterAriaLabel(gutters, num, ariaLabel) {
  cy.get(gutters)
    .eq(num)
    .should('have.attr', 'aria-label')
    .and('equal', ariaLabel)
}

export function checkGuttersAriaValueTexts(gutters, ariaValueTexts) {
  cy.get(gutters)
    .each(($gutter, index) => {
      const ariaValueText = ariaValueTexts[index]
      if (ariaValueText === null) {
        cy.wrap($gutter)
          .should('not.have.attr', 'aria-valuetext')
      } else {
        cy.wrap($gutter)
          .should('have.attr', 'aria-valuetext')
          .and('equal', ariaValueTexts[index])
      }
    })
}

//////////////////////////////////////////

export function checkSplitDirAndCalcSizes(el, dir, w, h, gutter, sizes) {
  const propFlexDir = dir === 'horizontal' ? 'row' : 'column'
  cy.get(el).should('have.css', 'flex-direction', propFlexDir)

  const propSize = dir === 'horizontal' ? 'width' : 'height'
  cy.get(`${el} > .as-split-gutter`).should('have.css', propSize, `${gutter}px`)

  const propSize2 = propSize === 'width' ? 'height' : 'width'
  const propValue2 = propSize === 'width' ? h : w

  cy.get(`${el} > as-split-area`)
    .should('have.length', sizes.length)
    .each(($li, index) => {
      cy.wrap($li).should('have.css', 'flex', `0 0 ${sizes[index]}`)
      cy.wrap($li).should('have.css', propSize2, `${propValue2}px`)
    })
}

//////////////////////////////////////////

export function checkSplitDirAndSizes(el, dir, w, h, gutter, sizes) {
  cy.log(`-- NEW SPLIT CHECK (${dir},${w},${h},${gutter})`)

  // Before real test, check if values provided are ok !
  const total = sizes.reduce((acc, v) => acc + v, 0) + gutter * (sizes.length - 1)
  // expect(total).to.eq((dir === 'horizontal') ? w : h);

  const propFlexDir = dir === 'horizontal' ? 'row' : 'column'
  cy.get(el).should('have.css', 'flex-direction', propFlexDir)

  const propSize = dir === 'horizontal' ? 'width' : 'height'
  const propSize2 = propSize === 'width' ? 'height' : 'width'
  const propValue2 = propSize === 'width' ? h : w

  cy.get(`${el} > .as-split-gutter`).should('have.length', sizes.length - 1)

  cy.get(`${el} > .as-split-gutter`).then(($el) => {
    const rect = $el[0].getBoundingClientRect()

    expect(rect[propSize]).to.be.eq(gutter)
    expect(rect[propSize2]).to.be.eq(propValue2)
  })

  cy.get(`${el} > .as-split-area`)
    .should('have.length', sizes.length)
    .each(($li, index) => {
      const rect = $li[0].getBoundingClientRect()

      expect(rect[propSize]).to.be.eq(sizes[index])
      expect(rect[propSize2]).to.be.eq(propValue2)
    })
}
