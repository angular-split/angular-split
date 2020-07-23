/// <reference types="Cypress" />

import { moveGutter, checkSplitDirAndSizes } from '../support/splitUtils'

context('Simple split example page tests', () => {
  const W = 1070
  const H = 300
  const GUTTER = 11

  beforeEach(() => {
    cy.visit('/#/examples/simple-split')
  })

  it('Display initial state', () => {
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [317.6875, 741.296875])
    checkSplitDirAndSizes('.ex-pixel > as-split', 'horizontal', W, H, GUTTER, [120, 768, 160])
  })

  it('Change direction', () => {
    cy.get('.btns > .btn').click()

    checkSplitDirAndSizes('.ex-percent > as-split', 'vertical', W, H, GUTTER, [86.6875, 202.296875])
    checkSplitDirAndSizes('.ex-pixel > as-split', 'vertical', W, H, GUTTER, [120, 0, 160])
  })

  it('Move gutter horizontally', () => {
    moveGutter('.ex-percent .as-split-gutter', 0, 280, 0)
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [597.703125, 461.28125])

    moveGutter('.ex-pixel .as-split-gutter', 0, 280, 0)
    checkSplitDirAndSizes('.ex-pixel > as-split', 'horizontal', W, H, GUTTER, [400, 488, 160])
  })

  it('Change direction & move gutter vertically', () => {
    cy.get('.btns > .btn').click()

    moveGutter('.ex-percent .as-split-gutter', 0, 0, 60)
    checkSplitDirAndSizes('.ex-percent > as-split', 'vertical', W, H, GUTTER, [146.6875, 142.296875])

    moveGutter('.ex-pixel .as-split-gutter', 0, 0, 60)
    checkSplitDirAndSizes('.ex-pixel > as-split', 'vertical', W, H, GUTTER, [180, 0, 100])
  })

  it('Move gutter horizontally and move it back', () => {
    moveGutter('.ex-percent .as-split-gutter', 0, 280, 0)
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [597.703125, 461.28125])

    moveGutter('.ex-percent .as-split-gutter', 0, -280, 0)
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [317.71875, 741.265625])

    moveGutter('.ex-pixel .as-split-gutter', 0, 280, 0)
    checkSplitDirAndSizes('.ex-pixel > as-split', 'horizontal', W, H, GUTTER, [400, 488, 160])

    moveGutter('.ex-pixel .as-split-gutter', 0, -280, 0)
    checkSplitDirAndSizes('.ex-pixel > as-split', 'horizontal', W, H, GUTTER, [120, 768, 160])
  })

  it('Move gutter horizontally to max, change direction', () => {
    moveGutter('.ex-percent .as-split-gutter', 0, -1000, 0)
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [0, 1059])

    moveGutter('.ex-pixel .as-split-gutter', 0, -1000, 0)
    checkSplitDirAndSizes('.ex-pixel > as-split', 'horizontal', W, H, GUTTER, [0, 888, 160])

    cy.get('.btns > .btn').click()

    checkSplitDirAndSizes('.ex-percent > as-split', 'vertical', W, H, GUTTER, [0, 289])
    moveGutter('.ex-percent .as-split-gutter', 0, 0, 1000)

    checkSplitDirAndSizes('.ex-pixel > as-split', 'vertical', W, H, GUTTER, [0, 118, 160])
    moveGutter('.ex-pixel .as-split-gutter', 0, 0, 1000)

    cy.get('.btns > .btn').click()

    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [1059, 0])
    checkSplitDirAndSizes('.ex-pixel > as-split', 'horizontal', W, H, GUTTER, [278, 770, 0])
  })
})
