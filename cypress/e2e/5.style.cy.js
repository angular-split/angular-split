/// <reference types="Cypress" />

import { moveGutterByMouse, checkSplitDirAndSizes } from '../support/splitUtils'

context('Custom split style example page tests', () => {
  const W = 1076
  const H = 300

  beforeEach(() => {
    cy.visit('/examples/custom-gutter-style')
  })

  // ----- EXAMPLE A

  it('should display initial state for example a', () => {
    checkSplitDirAndSizes('.ex-a > as-split', 'horizontal', W, H, 35, [301.796875, 402.390625, 301.8125])
  })

  it('should not move from non handle for example a', () => {
    moveGutterByMouse('.ex-a .as-split-gutter', 0, 280, 0)
    checkSplitDirAndSizes('.ex-a > as-split', 'horizontal', W, H, 35, [301.796875, 402.390625, 301.8125])
  })

  it('should move from handle for example a', () => {
    moveGutterByMouse('.ex-a .as-split-gutter .custom-hand-gutter-icon', 0, 280, 0)
    checkSplitDirAndSizes('.ex-a > as-split', 'horizontal', W, H, 35, [581.796875, 122.390625, 301.8125])
  })

  // ----- EXAMPLE B

  it('should display initial state for example b', () => {
    checkSplitDirAndSizes('.ex-b > as-split', 'horizontal', W, H, 1, [322.1875, 537, 214.796875])
  })

  // ----- EXAMPLE C

  it('should display initial state for example c', () => {
    checkSplitDirAndSizes('.ex-c > as-split', 'horizontal', W, H, 25, [300.296875, 100.09375, 400.390625, 200.1875])
  })

  it('should not move from collapse button for example c', () => {
    moveGutterByMouse('.ex-c .as-split-gutter .custom-collapse-gutter-header div', 0, 50, 0)
    checkSplitDirAndSizes('.ex-c > as-split', 'horizontal', W, H, 25, [300.296875, 100.09375, 400.390625, 200.1875])
  })

  it('should move from anywhere other than buttons for example c', () => {
    moveGutterByMouse('.ex-c .as-split-gutter', 0, 50, 0)
    checkSplitDirAndSizes('.ex-c > as-split', 'horizontal', W, H, 25, [350.296875, 50.09375, 400.390625, 200.1875])
  })

  it('should collapse left area on collapse button click', () => {
    cy.get('.ex-c .as-split-gutter:first-of-type .custom-collapse-gutter-header div:first-of-type').click()
    checkSplitDirAndSizes('.ex-c > as-split', 'horizontal', W, H, 25, [0, 400.390625, 400.390625, 200.1875])
  })
})
