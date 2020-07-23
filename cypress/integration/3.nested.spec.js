/// <reference types="Cypress" />

import { moveGutter, checkSplitDirAndSizes } from '../support/splitUtils'

context('Nested splits example page tests', () => {
  const W = 1070
  const H = 400
  const GUTTER = 11

  beforeEach(() => {
    cy.visit('/#/examples/nested-split')
  })

  it('Display initial state', () => {
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [423.59375, 635.390625])

    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(1) > as-split',
      'vertical',
      423.59375,
      H,
      GUTTER,
      [125.984375, 125.984375, 125.984375],
    )
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(2) > as-split',
      'vertical',
      635.390625,
      H,
      GUTTER,
      [97.25, 291.75],
    )
  })

  it('Move gutter horizontally 3 times and until maximum', () => {
    moveGutter('.split-example > as-split > .as-split-gutter', 0, 280, 0)

    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [703.609375, 355.390625])

    moveGutter('.split-example > as-split > .as-split-gutter', 0, -80, 0)

    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [623.609375, 435.390625])

    moveGutter('.split-example > as-split > .as-split-gutter', 0, 700, 0)

    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [1059, 0])
  })

  it('Move nested split 1 multiple times', () => {
    moveGutter('.split-example > as-split > .as-split-area:nth-child(1) > as-split > .as-split-gutter', 0, 0, 60)
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(1) > as-split',
      'vertical',
      423.59375,
      H,
      GUTTER,
      [186.015625, 65.984375, 125.984375],
    )

    moveGutter('.split-example > as-split > .as-split-area:nth-child(1) > as-split > .as-split-gutter', 1, 0, -300)
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(1) > as-split',
      'vertical',
      423.59375,
      H,
      GUTTER,
      [186.015625, 0, 191.984375],
    )

    // Move space smaller than gutter > move
    moveGutter('.split-example > as-split > .as-split-area:nth-child(1) > as-split > .as-split-gutter', 0, 0, -10)
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(1) > as-split',
      'vertical',
      423.59375,
      H,
      GUTTER,
      [176.015625, 10, 191.984375],
    )

    // Move space same as gutter > move
    moveGutter('.split-example > as-split > .as-split-area:nth-child(1) > as-split > .as-split-gutter', 0, 0, -GUTTER)
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(1) > as-split',
      'vertical',
      423.59375,
      H,
      GUTTER,
      [165.015625, 21, 191.984375],
    )

    // Move space bigger than gutter > move
    moveGutter('.split-example > as-split > .as-split-area:nth-child(1) > as-split > .as-split-gutter', 0, 0, -20)
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(1) > as-split',
      'vertical',
      423.59375,
      H,
      GUTTER,
      [145.015625, 41, 191.984375],
    )
  })

  it('Move nested split 2 multiple times', () => {
    moveGutter('.split-example > as-split > .as-split-area:nth-child(2) > as-split > .as-split-gutter', 0, 0, 600)
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(2) > as-split',
      'vertical',
      635.390625,
      H,
      GUTTER,
      [389, 0],
    )

    moveGutter('.split-example > as-split > .as-split-area:nth-child(2) > as-split > .as-split-gutter', 0, 0, -600)
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(2) > as-split',
      'vertical',
      635.390625,
      H,
      GUTTER,
      [0, 389],
    )
  })
})
