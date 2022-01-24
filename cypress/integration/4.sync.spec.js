/// <reference types="Cypress" />

import { moveGutterByMouse, checkSplitDirAndSizes } from '../support/splitUtils'

context('Sync splits example page tests', () => {
  const W = 1076
  const H = 300
  const GUTTER = 11

  beforeEach(() => {
    cy.visit('/examples/sync-split')
  })

  it('Display initial state', () => {
    checkSplitDirAndSizes('.split-example > as-split', 'vertical', W, H, GUTTER, [55.59375, 55.59375, 166.796875])
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(1) > as-split',
      'horizontal',
      W,
      55.59375,
      GUTTER,
      [266.25, 798.75],
    )
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(2) > as-split',
      'horizontal',
      W,
      55.59375,
      GUTTER,
      [266.25, 798.75],
    )
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(3) > as-split',
      'horizontal',
      W,
      166.796875,
      GUTTER,
      [266.25, 798.75],
    )
  })

  it('Move gutter first split horizontally and check if others splits follow', () => {
    moveGutterByMouse('.split-example > as-split > .as-split-area:nth-child(1) > as-split > .as-split-gutter', 0, 280, 0)
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(1) > as-split',
      'horizontal',
      W,
      55.59375,
      GUTTER,
      [546.25, 518.75],
    )
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(2) > as-split',
      'horizontal',
      W,
      55.59375,
      GUTTER,
      [546.25, 518.75],
    )
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(3) > as-split',
      'horizontal',
      W,
      166.796875,
      GUTTER,
      [546.25, 518.75],
    )

    moveGutterByMouse('.split-example > as-split > .as-split-area:nth-child(1) > as-split > .as-split-gutter', 0, 600, 0)
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(1) > as-split',
      'horizontal',
      W,
      55.59375,
      GUTTER,
      [1065, 0],
    )
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(2) > as-split',
      'horizontal',
      W,
      55.59375,
      GUTTER,
      [1065, 0],
    )
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(3) > as-split',
      'horizontal',
      W,
      166.796875,
      GUTTER,
      [1065, 0],
    )

    moveGutterByMouse('.split-example > as-split > .as-split-area:nth-child(1) > as-split > .as-split-gutter', 0, -1500, 0)
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(1) > as-split',
      'horizontal',
      W,
      55.59375,
      GUTTER,
      [0, 1065],
    )
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(2) > as-split',
      'horizontal',
      W,
      55.59375,
      GUTTER,
      [0, 1065],
    )
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(3) > as-split',
      'horizontal',
      W,
      166.796875,
      GUTTER,
      [0, 1065],
    )
  })

  it('Move gutter second split horizontally and check if others splits follow', () => {
    moveGutterByMouse('.split-example > as-split > .as-split-area:nth-child(2) > as-split > .as-split-gutter', 0, 280, 0)
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(1) > as-split',
      'horizontal',
      W,
      55.59375,
      GUTTER,
      [546.25, 518.75],
    )
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(2) > as-split',
      'horizontal',
      W,
      55.59375,
      GUTTER,
      [546.25, 518.75],
    )
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(3) > as-split',
      'horizontal',
      W,
      166.796875,
      GUTTER,
      [546.25, 518.75],
    )

    moveGutterByMouse('.split-example > as-split > .as-split-area:nth-child(2) > as-split > .as-split-gutter', 0, 600, 0)
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(1) > as-split',
      'horizontal',
      W,
      55.59375,
      GUTTER,
      [1065, 0],
    )
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(2) > as-split',
      'horizontal',
      W,
      55.59375,
      GUTTER,
      [1065, 0],
    )
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(3) > as-split',
      'horizontal',
      W,
      166.796875,
      GUTTER,
      [1065, 0],
    )

    moveGutterByMouse('.split-example > as-split > .as-split-area:nth-child(2) > as-split > .as-split-gutter', 0, -1500, 0)
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(1) > as-split',
      'horizontal',
      W,
      55.59375,
      GUTTER,
      [0, 1065],
    )
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(2) > as-split',
      'horizontal',
      W,
      55.59375,
      GUTTER,
      [0, 1065],
    )
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(3) > as-split',
      'horizontal',
      W,
      166.796875,
      GUTTER,
      [0, 1065],
    )
  })
})
