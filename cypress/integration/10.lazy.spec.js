/// <reference types="Cypress" />

import { moveGutter, checkSplitDirAndSizes } from '../support/splitUtils'

context('Lazy loaded modules: Scenario 1', () => {
  const W = 1100
  const H = 200
  const GUTTER = 11

  beforeEach(() => {
    cy.visit('/lazy')
  })

  it('Display initial state without split loaded/displayed', () => {
    cy.get('as-split').should('have.length', 0)
  })

  it('Use split from lazy loaded module', () => {
    cy.get('a[href="#/lazy"]').click()
    cy.wait(1000)

    cy.get('as-split').should('have.length', 1)
    checkSplitDirAndSizes('as-split', 'horizontal', W, H, GUTTER, [323.390625, 431.1875, 323.390625])

    moveGutter('.as-split-gutter', 0, 100, 0)
    checkSplitDirAndSizes('as-split', 'horizontal', W, H, GUTTER, [423.40625, 331.1875, 323.390625])

    moveGutter('.as-split-gutter', 1, -50, 0)
    checkSplitDirAndSizes('as-split', 'horizontal', W, H, GUTTER, [423.40625, 281.1875, 373.375])
  })
})

context('Lazy loaded modules: Scenario 2', () => {
  const W = 1100
  const H = 200
  const GUTTER = 11

  beforeEach(() => {
    cy.visit('/lazy2')
  })

  it('Display initial state with split loaded & displayed', () => {
    cy.get('as-split').should('have.length', 1)
    checkSplitDirAndSizes('as-split', 'horizontal', W, H, GUTTER, [323.390625, 431.1875, 323.390625])

    moveGutter('.as-split-gutter', 0, 100, 0)
    checkSplitDirAndSizes('as-split', 'horizontal', W, H, GUTTER, [423.40625, 331.1875, 323.390625])

    moveGutter('.as-split-gutter', 1, -50, 0)
    checkSplitDirAndSizes('as-split', 'horizontal', W, H, GUTTER, [423.40625, 281.1875, 373.375])
  })

  it('Use split from lazy loaded module', () => {
    cy.get('a[href="#/lazy"]').click()
    cy.wait(1000)

    cy.get('as-split').should('have.length', 1)
    checkSplitDirAndSizes('as-split', 'horizontal', W, H, GUTTER, [323.390625, 431.1875, 323.390625])

    moveGutter('.as-split-gutter', 0, 100, 0)
    checkSplitDirAndSizes('as-split', 'horizontal', W, H, GUTTER, [423.40625, 331.1875, 323.390625])

    moveGutter('.as-split-gutter', 1, -50, 0)
    checkSplitDirAndSizes('as-split', 'horizontal', W, H, GUTTER, [423.40625, 281.1875, 373.375])
  })
})
