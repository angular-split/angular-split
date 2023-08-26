/// <reference types="Cypress" />

import {
  moveGutterByMouse,
  checkSplitDirAndSizes,
  moveGutterByKeyboard,
  checkGutterAriaLabel,
  checkGuttersAriaValueTexts,
} from '../support/splitUtils'

context('Simple split example page tests', () => {
  const W = 1076
  const H = 300
  const GUTTER = 11

  beforeEach(() => {
    cy.visit('/examples/simple-split')
  })

  it('Display initial state', () => {
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [319.5, 745.5])
    checkSplitDirAndSizes('.ex-percent-wc > as-split', 'horizontal', W, H, GUTTER, [737.8125, 210.796875, 105.390625])
    checkSplitDirAndSizes('.ex-pixel > as-split', 'horizontal', W, H, GUTTER, [120, 774, 160])
    checkGutterAriaLabel('.ex-percent .as-split-gutter', 0, 'adjustable divider between two views')
    checkGutterAriaLabel('.ex-percent-wc .as-split-gutter', 0, 'adjustable divider between two views')
    checkGuttersAriaValueTexts('.ex-percent .as-split-gutter', ['30 percent'])
    checkGuttersAriaValueTexts('.ex-percent-wc .as-split-gutter', [null, '20 percent'])
  })

  it('Change direction', () => {
    cy.get('.btns > .btn').click()

    checkSplitDirAndSizes('.ex-percent > as-split', 'vertical', W, H, GUTTER, [86.6875, 202.296875])
    checkSplitDirAndSizes('.ex-percent-wc > as-split', 'vertical', W, H, GUTTER, [194.609375, 55.59375, 27.796875])
    checkSplitDirAndSizes('.ex-pixel > as-split', 'vertical', W, H, GUTTER, [120, 0, 160])
  })

  it('Move gutter horizontally', () => {
    moveGutterByMouse('.ex-percent .as-split-gutter', 0, 280, 0)
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [599.5, 465.5])

    moveGutterByMouse('.ex-percent-wc .as-split-gutter', 0, -280, 0)
    checkSplitDirAndSizes('.ex-percent-wc > as-split', 'horizontal', W, H, GUTTER, [457.8125, 490.796875, 105.390625])

    moveGutterByMouse('.ex-pixel .as-split-gutter', 0, 280, 0)
    checkSplitDirAndSizes('.ex-pixel > as-split', 'horizontal', W, H, GUTTER, [400, 494, 160])
  })

  it('Change direction & move gutter vertically', () => {
    cy.get('.btns > .btn').click()

    moveGutterByMouse('.ex-percent .as-split-gutter', 0, 0, 60)
    checkSplitDirAndSizes('.ex-percent > as-split', 'vertical', W, H, GUTTER, [146.6875, 142.296875])

    moveGutterByMouse('.ex-percent-wc .as-split-gutter', 0, 0, -60)
    checkSplitDirAndSizes('.ex-percent-wc > as-split', 'vertical', W, H, GUTTER, [134.609375, 115.59375, 27.796875])

    moveGutterByMouse('.ex-pixel .as-split-gutter', 0, 0, 60)
    checkSplitDirAndSizes('.ex-pixel > as-split', 'vertical', W, H, GUTTER, [180, 0, 100])
  })

  it('Move gutter horizontally and move it back', () => {
    moveGutterByMouse('.ex-percent .as-split-gutter', 0, 280, 0)
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [599.5, 465.5])

    moveGutterByMouse('.ex-percent .as-split-gutter', 0, -280, 0)
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [319.5, 745.5])

    moveGutterByMouse('.ex-percent-wc .as-split-gutter', 0, 200, 0)
    checkSplitDirAndSizes('.ex-percent-wc > as-split', 'horizontal', W, H, GUTTER, [937.828125, 10.78125, 105.390625])

    moveGutterByMouse('.ex-percent-wc .as-split-gutter', 0, -200, 0)
    checkSplitDirAndSizes('.ex-percent-wc > as-split', 'horizontal', W, H, GUTTER, [737.828125, 210.78125, 105.390625])

    moveGutterByMouse('.ex-pixel .as-split-gutter', 0, 280, 0)
    checkSplitDirAndSizes('.ex-pixel > as-split', 'horizontal', W, H, GUTTER, [400, 494, 160])

    moveGutterByMouse('.ex-pixel .as-split-gutter', 0, -280, 0)
    checkSplitDirAndSizes('.ex-pixel > as-split', 'horizontal', W, H, GUTTER, [120, 774, 160])
  })

  it('Move gutter horizontally to max, change direction', () => {
    moveGutterByMouse('.ex-percent .as-split-gutter', 0, -1000, 0)
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [0, 1065])

    moveGutterByMouse('.ex-percent-wc .as-split-gutter', 0, -1000, 0)
    checkSplitDirAndSizes('.ex-percent-wc > as-split', 'horizontal', W, H, GUTTER, [0.015625, 948.59375, 105.390625])

    moveGutterByMouse('.ex-pixel .as-split-gutter', 0, -1000, 0)
    checkSplitDirAndSizes('.ex-pixel > as-split', 'horizontal', W, H, GUTTER, [0, 894, 160])

    cy.get('.btns > .btn').click()

    checkSplitDirAndSizes('.ex-percent > as-split', 'vertical', W, H, GUTTER, [0, 289])
    moveGutterByMouse('.ex-percent .as-split-gutter', 0, 0, 1000)

    checkSplitDirAndSizes('.ex-percent-wc > as-split', 'vertical', W, H, GUTTER, [0.015625, 250.1875, 27.796875])
    moveGutterByMouse('.ex-percent-wc .as-split-gutter', 0, 0, 1000)

    checkSplitDirAndSizes('.ex-pixel > as-split', 'vertical', W, H, GUTTER, [0, 118, 160])
    moveGutterByMouse('.ex-pixel .as-split-gutter', 0, 0, 1000)

    cy.get('.btns > .btn').click()

    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [1065, 0])
    checkSplitDirAndSizes('.ex-percent-wc > as-split', 'horizontal', W, H, GUTTER, [1054, 0, 0])
    checkSplitDirAndSizes('.ex-pixel > as-split', 'horizontal', W, H, GUTTER, [278, 776, 0])
  })

  it('Move gutter horizontally by using keyboard', () => {
    moveGutterByKeyboard('.ex-percent .as-split-gutter', 0, 1, 'leftarrow')
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [269.5, 795.5])
    checkGuttersAriaValueTexts('.ex-percent .as-split-gutter', ['25 percent'])

    moveGutterByKeyboard('.ex-percent .as-split-gutter', 0, 1, 'rightarrow')
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [319.5, 745.5])
    checkGuttersAriaValueTexts('.ex-percent .as-split-gutter', ['30 percent'])

    moveGutterByKeyboard('.ex-percent .as-split-gutter', 0, 1, 'pagedown')
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [0, 1065])
    checkGuttersAriaValueTexts('.ex-percent .as-split-gutter', ['0 percent'])

    moveGutterByKeyboard('.ex-percent .as-split-gutter', 0, 1, 'pageup')
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [500, 565])
    checkGuttersAriaValueTexts('.ex-percent .as-split-gutter', ['47 percent'])

    moveGutterByKeyboard('.ex-percent-wc .as-split-gutter', 0, 1, 'leftarrow')
    checkSplitDirAndSizes('.ex-percent-wc > as-split', 'horizontal', W, H, GUTTER, [687.8125, 260.796875, 105.390625])
    checkGuttersAriaValueTexts('.ex-percent-wc .as-split-gutter', [null, '25 percent'])

    moveGutterByKeyboard('.ex-percent-wc .as-split-gutter', 0, 1, 'rightarrow')
    checkSplitDirAndSizes('.ex-percent-wc > as-split', 'horizontal', W, H, GUTTER, [737.8125, 210.796875, 105.390625])
    checkGuttersAriaValueTexts('.ex-percent-wc .as-split-gutter', [null, '20 percent'])

    moveGutterByKeyboard('.ex-percent-wc .as-split-gutter', 0, 1, 'pagedown')
    checkSplitDirAndSizes('.ex-percent-wc > as-split', 'horizontal', W, H, GUTTER, [237.8125, 710.796875, 105.390625])
    checkGuttersAriaValueTexts('.ex-percent-wc .as-split-gutter', [null, '67 percent'])

    moveGutterByKeyboard('.ex-percent-wc .as-split-gutter', 0, 1, 'pageup')
    checkSplitDirAndSizes('.ex-percent-wc > as-split', 'horizontal', W, H, GUTTER, [737.8125, 210.796875, 105.390625])
    checkGuttersAriaValueTexts('.ex-percent-wc .as-split-gutter', [null, '20 percent'])

    moveGutterByKeyboard('.ex-pixel .as-split-gutter', 0, 1, 'leftarrow')
    checkSplitDirAndSizes('.ex-pixel > as-split', 'horizontal', W, H, GUTTER, [70, 824, 160])
    checkGuttersAriaValueTexts('.ex-pixel .as-split-gutter', ['70 pixel', null])

    moveGutterByKeyboard('.ex-pixel .as-split-gutter', 0, 1, 'rightarrow')
    checkSplitDirAndSizes('.ex-pixel > as-split', 'horizontal', W, H, GUTTER, [120, 774, 160])
    checkGuttersAriaValueTexts('.ex-pixel .as-split-gutter', ['120 pixel', null])

    moveGutterByKeyboard('.ex-pixel .as-split-gutter', 0, 1, 'pageup')
    checkSplitDirAndSizes('.ex-pixel > as-split', 'horizontal', W, H, GUTTER, [620, 274, 160])
    checkGuttersAriaValueTexts('.ex-pixel .as-split-gutter', ['620 pixel', null])

    moveGutterByKeyboard('.ex-pixel .as-split-gutter', 0, 1, 'pagedown')
    checkSplitDirAndSizes('.ex-pixel > as-split', 'horizontal', W, H, GUTTER, [120, 774, 160])
    checkGuttersAriaValueTexts('.ex-pixel .as-split-gutter', ['120 pixel', null])
  })

  it('Move gutter vertically by using keyboard', () => {
    cy.get('.btns > .btn').click()

    moveGutterByKeyboard('.ex-percent .as-split-gutter', 0, 1, 'downarrow')
    checkSplitDirAndSizes('.ex-percent > as-split', 'vertical', W, H, GUTTER, [136.703125, 152.296875])
    checkGuttersAriaValueTexts('.ex-percent .as-split-gutter', ['47 percent'])

    moveGutterByKeyboard('.ex-percent .as-split-gutter', 0, 1, 'uparrow')
    checkSplitDirAndSizes('.ex-percent > as-split', 'vertical', W, H, GUTTER, [86.703125, 202.28125])
    checkGuttersAriaValueTexts('.ex-percent .as-split-gutter', ['30 percent'])

    moveGutterByKeyboard('.ex-percent .as-split-gutter', 0, 1, 'pagedown')
    checkSplitDirAndSizes('.ex-percent > as-split', 'vertical', W, H, GUTTER, [289, 0])
    checkGuttersAriaValueTexts('.ex-percent .as-split-gutter', ['100 percent'])

    moveGutterByKeyboard('.ex-percent .as-split-gutter', 0, 1, 'pageup')
    checkSplitDirAndSizes('.ex-percent > as-split', 'vertical', W, H, GUTTER, [0, 289])
    checkGuttersAriaValueTexts('.ex-percent .as-split-gutter', ['0 percent'])

    moveGutterByKeyboard('.ex-percent-wc .as-split-gutter', 0, 1, 'downarrow')
    checkSplitDirAndSizes('.ex-percent-wc > as-split', 'vertical', W, H, GUTTER, [244.609375, 5.59375, 27.796875])
    checkGuttersAriaValueTexts('.ex-percent-wc .as-split-gutter', [null, '2 percent'])

    moveGutterByKeyboard('.ex-percent-wc .as-split-gutter', 0, 1, 'uparrow')
    checkSplitDirAndSizes('.ex-percent-wc > as-split', 'vertical', W, H, GUTTER, [194.609375, 55.59375, 27.796875])
    checkGuttersAriaValueTexts('.ex-percent-wc .as-split-gutter', [null, '20 percent'])

    moveGutterByKeyboard('.ex-percent-wc .as-split-gutter', 0, 1, 'pagedown')
    checkSplitDirAndSizes('.ex-percent-wc > as-split', 'vertical', W, H, GUTTER, [278, 0, 0])
    checkGuttersAriaValueTexts('.ex-percent-wc .as-split-gutter', [null, '0 percent'])

    moveGutterByKeyboard('.ex-percent-wc .as-split-gutter', 0, 1, 'pageup')
    checkSplitDirAndSizes('.ex-percent-wc > as-split', 'vertical', W, H, GUTTER, [0, 278, 0])
    checkGuttersAriaValueTexts('.ex-percent-wc .as-split-gutter', [null, '100 percent'])

    moveGutterByKeyboard('.ex-pixel .as-split-gutter', 0, 1, 'downarrow')
    checkSplitDirAndSizes('.ex-pixel > as-split', 'vertical', W, H, GUTTER, [170, 0, 110])
    checkGuttersAriaValueTexts('.ex-pixel .as-split-gutter', ['170 pixel', null])

    moveGutterByKeyboard('.ex-pixel .as-split-gutter', 0, 1, 'uparrow')
    checkSplitDirAndSizes('.ex-pixel > as-split', 'vertical', W, H, GUTTER, [120, 48, 110])
    checkGuttersAriaValueTexts('.ex-pixel .as-split-gutter', ['120 pixel', null])

    moveGutterByKeyboard('.ex-pixel .as-split-gutter', 0, 1, 'pageup')
    checkSplitDirAndSizes('.ex-pixel > as-split', 'vertical', W, H, GUTTER, [0, 168, 110])
    checkGuttersAriaValueTexts('.ex-pixel .as-split-gutter', ['0 pixel', null])

    moveGutterByKeyboard('.ex-pixel .as-split-gutter', 0, 1, 'pagedown')
    checkSplitDirAndSizes('.ex-pixel > as-split', 'vertical', W, H, GUTTER, [278, 0, 0])
    checkGuttersAriaValueTexts('.ex-pixel .as-split-gutter', ['278 pixel', null])
  })
})
