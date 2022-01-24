/// <reference types="Cypress" />

import { moveGutter, checkSplitDirAndSizes, moveGutterByKeyboard, checkGutterAriaLabel } from '../support/splitUtils'

context('Simple split example page tests', () => {
  const W = 1076
  const H = 300
  const GUTTER = 11

  beforeEach(() => {
    cy.visit('/examples/simple-split')
  })

  it('Display initial state', () => {
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [319.5, 745.5])
    checkSplitDirAndSizes('.ex-pixel > as-split', 'horizontal', W, H, GUTTER, [120, 774, 160])
    checkGutterAriaLabel('.ex-percent .as-split-gutter', 0, 'adjustable divider between two views')
  })

  it('Change direction', () => {
    cy.get('.btns > .btn').click()

    checkSplitDirAndSizes('.ex-percent > as-split', 'vertical', W, H, GUTTER, [86.6875, 202.296875])
    checkSplitDirAndSizes('.ex-pixel > as-split', 'vertical', W, H, GUTTER, [120, 0, 160])
  })

  it('Move gutter horizontally', () => {
    moveGutter('.ex-percent .as-split-gutter', 0, 280, 0)
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [599.5, 465.5])

    moveGutter('.ex-pixel .as-split-gutter', 0, 280, 0)
    checkSplitDirAndSizes('.ex-pixel > as-split', 'horizontal', W, H, GUTTER, [400, 494, 160])
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
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [599.5, 465.5])

    moveGutter('.ex-percent .as-split-gutter', 0, -280, 0)
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [319.5, 745.5])

    moveGutter('.ex-pixel .as-split-gutter', 0, 280, 0)
    checkSplitDirAndSizes('.ex-pixel > as-split', 'horizontal', W, H, GUTTER, [400, 494, 160])

    moveGutter('.ex-pixel .as-split-gutter', 0, -280, 0)
    checkSplitDirAndSizes('.ex-pixel > as-split', 'horizontal', W, H, GUTTER, [120, 774, 160])
  })

  it('Move gutter horizontally to max, change direction', () => {
    moveGutter('.ex-percent .as-split-gutter', 0, -1000, 0)
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [0, 1065])

    moveGutter('.ex-pixel .as-split-gutter', 0, -1000, 0)
    checkSplitDirAndSizes('.ex-pixel > as-split', 'horizontal', W, H, GUTTER, [0, 894, 160])

    cy.get('.btns > .btn').click()

    checkSplitDirAndSizes('.ex-percent > as-split', 'vertical', W, H, GUTTER, [0, 289])
    moveGutter('.ex-percent .as-split-gutter', 0, 0, 1000)

    checkSplitDirAndSizes('.ex-pixel > as-split', 'vertical', W, H, GUTTER, [0, 118, 160])
    moveGutter('.ex-pixel .as-split-gutter', 0, 0, 1000)

    cy.get('.btns > .btn').click()

    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [1065, 0])
    checkSplitDirAndSizes('.ex-pixel > as-split', 'horizontal', W, H, GUTTER, [278, 776, 0])
  })

  it('Move gutter horizontally by using keyboard', () => {
    moveGutterByKeyboard('.ex-percent .as-split-gutter', 0, 1, 'leftarrow')
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [269.5, 795.5])

    moveGutterByKeyboard('.ex-percent .as-split-gutter', 0, 1, 'rightarrow')
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [319.5, 745.5])

    moveGutterByKeyboard('.ex-percent .as-split-gutter', 0, 1, 'pagedown')
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [0, 1065])

    moveGutterByKeyboard('.ex-percent .as-split-gutter', 0, 1, 'pageup')
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [500, 565])
  })

  it('Move gutter vertically by using keyboard', () => {
    cy.get('.btns > .btn').click()

    moveGutterByKeyboard('.ex-percent .as-split-gutter', 0, 1, 'downarrow')
    checkSplitDirAndSizes('.ex-percent > as-split', 'vertical', W, H, GUTTER, [136.703125, 152.296875])

    moveGutterByKeyboard('.ex-percent .as-split-gutter', 0, 1, 'uparrow')
    checkSplitDirAndSizes('.ex-percent > as-split', 'vertical', W, H, GUTTER, [86.703125, 202.28125])

    moveGutterByKeyboard('.ex-percent .as-split-gutter', 0, 1, 'pagedown')
    checkSplitDirAndSizes('.ex-percent > as-split', 'vertical', W, H, GUTTER, [289, 0])

    moveGutterByKeyboard('.ex-percent .as-split-gutter', 0, 1, 'pageup')
    checkSplitDirAndSizes('.ex-percent > as-split', 'vertical', W, H, GUTTER, [0, 289])
  })
})
