/// <reference types="Cypress" />

import { moveGutterByMouse, checkSplitDirAndSizes } from '../support/splitUtils'

context('Toggling DOM and visibility example page tests', () => {
  const W = 1076
  const H = 150
  const GUTTER = 15

  beforeEach(() => {
    cy.visit('/examples/toggling-dom-and-visibility')
  })

  it('Display initial state', () => {
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [348.66, 348.66, 348.66])
  })

  it('Hide first area and move gutter', () => {
    getVisibilityButton(0).click()
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, [0, GUTTER], [0, 530.5, 530.5])

    moveGutterByMouse('.as-split-gutter', 1, 50, 0)
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, [0, GUTTER], [0, 580.5, 480.5])

    moveGutterByMouse('.as-split-gutter', 1, -100, 0)
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, [0, GUTTER], [0, 480.5, 580.5])
  })

  it('Hide mid area and move gutter', () => {
    getVisibilityButton(1).click()
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, [GUTTER, 0], [530.5, 0, 530.5])

    moveGutterByMouse('.as-split-gutter', 0, 50, 0)
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, [GUTTER, 0], [580.5, 0, 480.5])

    moveGutterByMouse('.as-split-gutter', 0, -100, 0)
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, [GUTTER, 0], [480.5, 0, 580.5])
  })

  it('Hide last area and move gutter', () => {
    getVisibilityButton(2).click()
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, [GUTTER, 0], [530.5, 530.5, 0])

    moveGutterByMouse('.as-split-gutter', 0, 50, 0)
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, [GUTTER, 0], [580.5, 480.5, 0])

    moveGutterByMouse('.as-split-gutter', 0, -100, 0)
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, [GUTTER, 0], [480.5, 580.5, 0])
  })
})

function getVisibilityButton(index) {
  return cy.get('.btn-group:first').find('> .btn').eq(index)
}
